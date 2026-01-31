import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { createCheckout } from "../../store/features/payment";
import Button from "./Button";

export default function UpgradeCard() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.payment);
  const [upgrading, setUpgrading] = useState(false);

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      const result = await dispatch(createCheckout({ plan: "PLUS" })).unwrap();

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Upgrade error:", error);
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <div className="mx-3 my-4 p-4 rounded-xl bg-linear-to-br from-blue-600 via-blue-700 to-blue-900 relative overflow-hidden shadow-lg">
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none"></div>

      <h3 className="text-white font-bold text-base mb-1">
        Upgrade to Premium!
      </h3>
      <p className="text-white/70 text-xs leading-relaxed mb-5">
        Unlock AI search, chat, and unlimited content.
      </p>
      <Button
        text={upgrading ? "Processing..." : "Upgrade"}
        size="sm"
        onClick={handleUpgrade}
        disabled={upgrading || loading}
      />
    </div>
  );
}
