import { motion } from "framer-motion";
import { FiStar, FiSearch, FiArrowRight } from "react-icons/fi";

export default function AISearchDemo() {
  return (
    <section className="bg-[#05070A] py-24 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* left */}

        <div className="relative group">
          <div
            className="
          pointer-events-none absolute -translate-15 left-50 top-0 h-90 w-150
          bg-radial-[ellipse_at_center]
          from-sky-400 via-blue-400/20 to-gray-950
          blur-2xl
        "
          />
          <div className="absolute -inset-1  bg-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

          <div className="relative bg-[#0D1117] rounded-2xl border border-white/10 backdrop-blur-xl p-6 shadow-2xl overflow-hidden">
            <div className="flex flex-col gap-5">
              {/* AI Query */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <FiStar className="text-purple-400" />
                <span className="text-gray-300 text-sm">
                  “Show React animation resources I saved last week”
                </span>
              </div>

              {/* ai result */}
              <div className="p-4 rounded-xl bg-linear-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                <p className="text-purple-300 text-xs mb-2">Top result</p>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <FiSearch className="text-purple-300" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      Framer Motion Crash Course
                    </p>
                    <p className="text-gray-500 text-xs">
                      animation · react · tutorial
                    </p>
                  </div>
                </div>
              </div>

              {/* more result */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>3 more related results</span>av
                <FiArrowRight />
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center items-start space-y-6"
        >
          {/* badge */}
          <div className="flex items-center gap-2 rounded-full border border-white/5 text-white bg-white/5 hover:bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm">
            <FiStar />
            <span className="tracking-wider uppercase">AI Search</span>
          </div>

          <h2 className="text-white font-bold text-4xl md:text-5xl leading-[1.1] tracking-tight">
            Ask in plain English.
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-300 to-sky-800">
              Get instant answers.
            </span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
            No more digging through folders or remembering keywords. Open Brain
            understands what you mean and finds the best matches from everything
            you’ve saved.
          </p>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li>• Search by topic, time, or intent</li>
            <li>• Works across all your collections</li>
            <li>• Learns from how you organize</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
