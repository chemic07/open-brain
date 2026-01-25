import PricingCard from "../ui/PricingCard";

export default function Pricing() {
  return (
    <section className="relative bg-[#05070A] py-24 px-6 md:px-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          className="
          pointer-events-none absolute left-80 top-15 h-75 w-150
          bg-radial-[ellipse_at_center]
          from-sky-400 via-blue-400/20 to-gray-950
          blur-2xl
        "
        />
        {/* header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium text-gray-300 backdrop-blur-sm">
            Pricing
          </div>

          <h2 className="text-white text-4xl md:text-5xl font-semibold">
            Simple pricing for every mind
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl">
            Start for free. Upgrade when you want powerful AI search, sharing,
            and advanced organization.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FREE */}
          <PricingCard
            title="Free"
            price="₹0"
            subtitle="For personal use"
            features={[
              "Save unlimited links",
              "Basic search",
              "Tag & organize content",
              "Private collections",
            ]}
          />

          {/* PRO */}
          <PricingCard
            highlighted
            title="Pro"
            price="₹299/mo"
            subtitle="For power users"
            features={[
              "AI semantic search",
              "Smart suggestions",
              "Advanced tagging",
              "Unlimited collections",
              "Priority updates",
            ]}
          />

          {/* TEAM */}
          <PricingCard
            title="Team"
            price="₹799/mo"
            subtitle="For collaboration"
            features={[
              "Everything in Pro",
              "Shared team spaces",
              "Role-based access",
              "Team analytics",
              "Priority support",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Card Component ---------------- */
