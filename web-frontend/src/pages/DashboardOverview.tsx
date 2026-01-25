export default function DashboardOverview() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Fading Grid Background */}

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-red-500 to-slate-950" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="inline-block mb-4 px-4 py-2 bg-purple-500/10 backdrop-blur-sm rounded-full border border-purple-500/20">
          <span className="text-purple-300 text-sm font-medium">
            ✨ Introducing our new platform
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
          Build faster with the power of AI
        </h1>

        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Transform your workflow with our cutting-edge SaaS platform. Ship
          products 10x faster with intelligent automation and seamless
          collaboration.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 transition-all duration-200">
            Get Started Free
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg font-semibold text-white border border-white/20 hover:bg-white/20 transition-all duration-200">
            Watch Demo
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>14-day free trial</span>
          </div>
        </div>
      </div>
    </div>
  );
}
