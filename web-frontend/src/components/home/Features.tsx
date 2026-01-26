import { FiStar, FiSearch, FiLink, FiShare2 } from "react-icons/fi";
import AISearchDemo from "./AISearchDemo";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <section
      id="features"
      className="bg-[#05070A] py-24 px-6 md:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* lefts */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center items-start space-y-6"
        >
          {/* Badge */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 text-gray-400 bg-white/5 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm transition hover:bg-white/10">
            <FiStar />
            <span className="tracking-wider uppercase">How it helps</span>
          </div>

          <h2 className="text-white font-bold text-4xl md:text-5xl leading-[1.1] tracking-tight">
            Turn scattered links into <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-300 to-sky-500">
              organized knowledge hubs
            </span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
            Collect resources while browsing, group them into smart collections,
            and revisit everything later without digging through bookmarks or
            chats.
          </p>
        </motion.div>

        {/* Right Side: Visual Card */}
        <div className="relative group">
          <div
            className="
          pointer-events-none absolute -translate-15  left-65 top-0 h-90 w-150
          bg-radial-[ellipse_at_center]
          from-sky-400 via-blue-400/20 to-gray-950
          blur-2xl
        "
          />
          <div className="relative bg-[#0D1117] rounded-2xl border border-white/10 backdrop-blur-xl p-6 shadow-2xl overflow-hidden">
            <div className="flex flex-col gap-5">
              {/* Search Bar */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <FiSearch className="text-blue-400" />
                <span className="text-gray-400 text-sm">
                  Search: “React animation tutorial…”
                </span>
              </div>

              {/* Saved Link Cards */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <FiLink className="text-sky-400" />
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">
                      Framer Motion Guide
                    </span>
                    <span className="text-gray-500 text-xs">
                      animation · react · ui
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <FiLink className="text-sky-400" />
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">
                      Tailwind Component Library
                    </span>
                    <span className="text-gray-500 text-xs">
                      design · components
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <FiShare2 className="text-purple-400" />
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">
                      Shared Team Collection
                    </span>
                    <span className="text-gray-500 text-xs">
                      collaboration · public
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Tag */}
              <div className="self-start mt-2 text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                AI-powered semantic results
              </div>
            </div>
          </div>
          ;
        </div>
      </div>
      <AISearchDemo />
    </section>
  );
}
