import { FiPlay, FiArrowDownRight } from "react-icons/fi";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[120vh] md:min-h-[130vh] w-full bg-[#020617] overflow-hidden px-4">
      {/* grid */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full 
   bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-blue-900 to-90%
  pointer-events-none"
      />

      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(139, 92, 246, 0.8)"
                strokeWidth="1"
              />
            </pattern>
            <radialGradient id="fade">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="fadeMask">
              <rect width="100%" height="100%" fill="url(#fade)" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
            mask="url(#fadeMask)"
          />
        </svg>
      </div>

      {/* badge */}
      <div className="z-10 mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 mt-30 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-sm transition hover:border-white/20">
        <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
          News
        </span>
        <span className="flex items-center gap-1">
          Explore Our New AI Features
          <FiArrowDownRight size={12} className="text-gray-500" />
        </span>
      </div>

      {/* 3. Hero Content */}
      <div className="z-10 max-w-4xl text-center">
        <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1] ">
          Streamlined Project Management. <br />
          <span className="opacity-90">Unlock Peak Productivity</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-gray-400 mb-10 leading-relaxed ">
          Manage task tracking, progress, and collaborate seamlessly across
          teams with intuitive tools to help close deals faster.
        </p>

        {/* 4. Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            text="Get Started"
            variant="primary"
            size="lg"
            tailIcon={<FiArrowDownRight size={18} />}
          />
          <Button
            text="Book a Demo"
            variant="glass"
            size="lg"
            headIcon={<FiPlay size={16} fill="currentColor" />}
          />
        </div>
      </div>

      <div className="z-10 mt-16 w-full max-w-5xl rounded-2xl border border-white/10 bg-slate-900/50 p-2 shadow-2xl shadow-blue-500/10 backdrop-blur-xl">
        <div className="aspect-video w-full rounded-xl bg-slate-950/50 border border-white/5 overflow-hidden">
          {/* placeholder */}
          <div className="flex h-full items-center justify-center text-gray-700 font-mono text-sm italic">
            [Dashboard Interface Component]
          </div>
        </div>
      </div>

      <div className=" absolute bottom-0 left-0 w-full h-80 bg-linear-to-b from-transparent via-gray-900 to-gray-950" />
    </section>
  );
}
