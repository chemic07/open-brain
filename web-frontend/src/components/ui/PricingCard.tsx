import { FiCheck, FiStar } from "react-icons/fi";
import Button from "./Button";

interface PricingCardProps {
  title: string;
  price: string;
  subtitle: string;
  features: string[];
  highlighted?: boolean;
  onAction?: () => void;
  isLoading?: boolean;
}

export default function PricingCard({
  title,
  price,
  subtitle,
  features,
  highlighted,
  onAction,
  isLoading,
}: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 backdrop-blur-xl transition-all duration-300 h-full
      ${
        highlighted
          ? "border-blue-500/40 bg-blue-500/5 shadow-[0_0_40px_rgba(59,130,246,0.15)] scale-[1.02] z-10"
          : "border-white/10 bg-[#0D1117] hover:border-white/20"
      }`}
    >
      {/* badeg */}
      {highlighted && (
        <div className="absolute flex items-center gap-1.5 -top-3 right-6 text-xs px-3 py-1 rounded-full bg-blue-500 text-white font-semibold shadow-lg">
          <FiStar size={12} />
          <span>Popular</span>
        </div>
      )}

      {/* header */}
      <div className="mb-6">
        <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{subtitle}</p>
      </div>

      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-white text-4xl font-bold tracking-tight">
          {price}
        </span>
        <span className="text-gray-500 text-sm font-medium">/month</span>
      </div>

      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-gray-300 text-sm"
          >
            <FiCheck className="text-blue-400 mt-0.5 flex-shrink-0" size={16} />
            <span className="leading-tight">{feature}</span>
          </li>
        ))}
      </ul>

      {/* button */}
      <div className="w-full">
        <Button
          text={isLoading ? "Processing..." : `Get Started`}
          onClick={onAction}
          disabled={isLoading}
          variant={"primary"}
          className="w-full py-3.5 shadow-md"
        />
      </div>
    </div>
  );
}
