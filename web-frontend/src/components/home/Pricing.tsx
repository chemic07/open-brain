import { easeOut, motion, type Variants } from "framer-motion";
import PricingCard from "../ui/PricingCard";

export default function Pricing() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <section
      id="pricing"
      className="relative bg-[#05070A] py-24 px-6 md:px-20 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Radial background */}
        <div
          className="
            pointer-events-none absolute left-80 top-15 h-75 w-150
            bg-radial-[ellipse_at_center]
            from-sky-400 via-blue-400/20 to-gray-950
            blur-2xl
          "
        />

        {/* header */}
        <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
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
        </motion.div>

        {/* cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={cardVariants}>
            <PricingCard
              title="Free"
              price="₹0"
              subtitle="Perfect for getting started"
              features={[
                "Save up to 100 links",
                "Basic content organization",
                "Manual tagging",
                "Private collections",
                "Basic search",
                "Limitied AI  semantic search",
              ]}
            />
          </motion.div>

          <motion.div variants={cardVariants}>
            <PricingCard
              highlighted
              title="Plus"
              price="₹149/mo"
              subtitle="For power users"
              features={[
                "Unlimited links",
                "5x more AI-powered semantic search",
                "Auto-generated tags & summaries",
                "Chat with your content (AI assistant)",
                "Share collections publicly",
                "Priority processing",
              ]}
            />
          </motion.div>

          <motion.div variants={cardVariants}>
            <PricingCard
              title="Pro"
              price="₹399/mo"
              subtitle="For teams & professionals"
              features={[
                "Everything in Plus",
                "Chat 10x with your content (AI assistant)",
                "Team workspaces (up to 5 members)",
                "Collaborative collections",
                "Custom integrations",
                "Priority support",
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
