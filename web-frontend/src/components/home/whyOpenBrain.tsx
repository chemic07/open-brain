export default function WhyOpenBrain() {
  return (
    <section className="flex justify-center items-center flex-col">
      {/* badge */}
      <div className="z-10 mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium text-gray-300 backdrop-blur-sm transition hover:border-white/20">
        <span className="flex items-center gap-1">Make your life easier</span>
      </div>
      <div className=" text-center">
        <h1 className="text-white text-5xl font-semibold">Why Open Brain?</h1>
        <p className="text-white">
          From your first line of code to final deployment, GitHub provides AI
          <br />
          and automation tools to help you build and ship <br /> better software
          faster.
        </p>
      </div>
    </section>
  );
}
