import { useState } from "react";
import { FiPlus, FiMinus, FiStar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion"; // Added for smooth opening

const faqs = [
  {
    q: "What is Open Brain exactly?",
    a: "Open Brain is your personal knowledge hub where you can save links, notes, and resources, and instantly find them later using AI-powered semantic search.",
  },
  {
    q: "How is this different from bookmarks?",
    a: "Bookmarks only store URLs. Open Brain understands the content, lets you tag and organize it, and allows you to search by meaning instead of just titles.",
  },
  {
    q: "Is my data private and secure?",
    a: "Yes. Your private collections are visible only to you unless you choose to share them. We use secure authentication and encrypted storage.",
  },
  {
    q: "Can I share my collections with others?",
    a: "Absolutely. You can create public or private collections and share them with friends, teammates, or the community.",
  },
  {
    q: "Will Open Brain work on mobile and browser?",
    a: "Yes. Open Brain works on all modern browsers, and we’re building mobile-friendly experiences and browser extensions for quick saving.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative bg-[#05070A] py-24 px-6 md:px-20 overflow-hidden"
    >
      {/* glow at back*/}
      <div className="pointer-events-none absolute inset-x-0 top-20 h-64 bg-radial-[ellipse_at_center] from-blue-500/20 via-transparent to-transparent blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-2 rounded-full border border-white/10 text-gray-400 bg-white/5 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm transition hover:bg-white/10 mb-5">
          <FiStar className="text-sky-400" />
          <span className="tracking-wider uppercase">FAQs</span>
        </div>

        <div className="text-center mb-14">
          <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight">
            Questions about Open Brain?
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Everything you need to know before building your second brain.
          </p>
        </div>

        {/* FAQ List - w-full ensures cards span the max-w-4xl width */}
        <div className="space-y-4 w-full">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-[#0D1117]/80 backdrop-blur-md transition-all duration-300 hover:border-blue-500/30 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
                >
                  <span
                    className={`font-medium transition-colors ${isOpen ? "text-sky-500" : "text-white"}`}
                  >
                    {item.q}
                  </span>
                  <span className="text-sky-200 shrink-0">
                    {isOpen ? <FiMinus /> : <FiPlus />}
                  </span>
                </button>

                {/* Animated Answer Section */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-2">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
