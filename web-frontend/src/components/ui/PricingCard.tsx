import { FiCheck, FiStar } from "react-icons/fi";
import Button from "./Button";
interface PricingCardProps {
  title: string;
  price: string;
  subtitle: string;
  features: string[];
  highlighted?: boolean;
}

export default function PricingCard({
  title,
  price,
  subtitle,
  features,
  highlighted,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl border p-8 backdrop-blur-xl transition-all duration-300
      ${
        highlighted
          ? "border-blue-500/40 bg-blue-500/5 shadow-[0_0_40px_rgba(59,130,246,0.15)] scale-[1.02]"
          : "border-white/10 bg-[#0D1117] hover:border-white/20"
      }`}
    >
      {highlighted && (
        <div className="absolute flex flex-row -top-3 right-6 text-xs px-3 py-1 rounded-full bg-blue-500 text-white font-semibold shadow">
          <FiStar className="mr-2 items-center"></FiStar> Popular
        </div>
      )}

      <h3 className="text-white text-xl font-semibold mb-1">{title}</h3>
      <p className="text-gray-400 text-sm mb-6">{subtitle}</p>

      <div className="text-white text-4xl font-bold mb-6">{price}</div>

      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
            <FiCheck className="text-blue-400" />
            {f}
          </li>
        ))}
      </ul>

      <div className="flex flex-col px-15 justify-end">
        <Button text="Get Started"></Button>
      </div>
    </div>
  );
}
