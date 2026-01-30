import Button from "./Button";

export default function UpgradeCard() {
  return (
    <div className="mx-3 my-4 p-4 rounded-xl bg-linear-to-br from-blue-600 via-blue-700 via-blue-600 to-blue-900 relative overflow-hidden shadow-lg">
      {/* bg */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none"></div>

      <h3 className="text-white font-bold text-mb mb-1">Upgrade to Premium!</h3>
      <p className="text-white/70 text-[11px] leading-relaxed mb-5">
        Upgrade your account and unlock all of the benefits.
      </p>
      <Button text="Upgrade" size="sm" />
    </div>
  );
}
