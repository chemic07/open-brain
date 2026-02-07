import { easeOut, motion, type Variants } from "framer-motion";
import PricingCard from "../ui/PricingCard";
import { useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

export default function Pricing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState<string | null>(null);

  const handlePlanClick = async (plan: "PLUS" | "PRO") => {
    if (!isAuthenticated) {
      navigate("/auth/signin");
      return;
    }

    try {
      setLoading(plan);
      const res = await api.post("/payment/create-checkout", {
        plan,
      });
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Checkout error", err);
      alert("Failed to start checkout");
    } finally {
      setLoading(null);
    }
  };

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
        {/* radial background*/}
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
          {/* Free */}
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
                "Limited AI semantic search",
              ]}
              onAction={() => navigate("/auth/signin")}
            />
          </motion.div>

          {/* Plus */}
          <motion.div variants={cardVariants}>
            <PricingCard
              highlighted
              title="Plus"
              price="₹149/mo"
              subtitle="For power users"
              features={[
                "Unlimited links",
                "5x AI-powered semantic search",
                "Auto-generated tags & summaries",
                "Chat with your content",
                "Share collections publicly",
                "Priority processing",
              ]}
              onAction={() => handlePlanClick("PLUS")}
              isLoading={loading === "PLUS"}
            />
          </motion.div>

          {/* Pro */}
          <motion.div variants={cardVariants}>
            <PricingCard
              title="Pro"
              price="₹399/mo"
              subtitle="For teams & professionals"
              features={[
                "Everything in Plus",
                "10x AI chat",
                "Team workspaces",
                "Collaborative collections",
                "Custom integrations",
                "Priority support",
              ]}
              onAction={() => handlePlanClick("PRO")}
              isLoading={loading === "PRO"}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
