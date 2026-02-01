import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import PricingCard from "../components/ui/PricingCard";

interface Plan {
  id: "PLUS" | "PRO";
  name: string;
  price: string;
  monthlyPrice: number;
  subtitle: string;
  tokens: string;
  features: string[];
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    id: "PLUS",
    name: "Plus",
    price: "₹149",
    monthlyPrice: 149,
    subtitle: "Perfect for power users",
    tokens: "10,000 tokens/month",
    features: [
      "Unlimited links",
      "AI-powered semantic search",
      "Auto-generated tags & summaries",
      "Chat with your content",
      "10,000 AI tokens/month",
      "Priority processing",
      "Share collections publicly",
    ],
    highlighted: true,
  },
  {
    id: "PRO",
    name: "Pro",
    price: "₹399",
    monthlyPrice: 399,
    subtitle: "For teams & professionals",
    tokens: "50,000 tokens/month",
    features: [
      "Everything in Plus",
      "50,000 AI tokens/month",
      "Team workspaces (10 members)",
      "Collaborative collections",
      "Team analytics",
      "API access",
      "Custom integrations",
      "Priority support",
    ],
  },
];

export default function UpgradePage() {
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUpgrade = async (planId: "PLUS" | "PRO") => {
    setLoading(planId);
    try {
      const response = await api.post("/payment/create-checkout", {
        plan: planId,
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Upgrade error:", error);
      alert("Failed to start checkout");
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <FiArrowLeft /> Back to Dashboard
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Upgrade Your Plan
          </h1>
          <p className="text-gray-400 text-lg">
            Unlock the full power of your digital brain with AI-powered
            features.
          </p>
        </div>

        {/* Price Cards*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              title={plan.name}
              price={plan.price}
              subtitle={plan.subtitle}
              features={plan.features}
              highlighted={plan.highlighted}
              onAction={() => handleUpgrade(plan.id)}
              isLoading={loading === plan.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
