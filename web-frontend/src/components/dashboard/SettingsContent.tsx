import { useState } from "react";
import ProfileTab from "./ProfileTab";
import SubscriptionTab from "./SubscriptionTab";

type TabType = "profile" | "subscription";

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  return (
    <div className="max-w-8xl mx-auto px-4 md:px-8 py-10">
      {/* header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white/90 tracking-tight mb-2">
          Settings
        </h1>
        <p className="text-gray-500 dark:text-white/50">
          Manage your account preferences, profile details, and billing
          information.
        </p>
      </header>

      {/* tab switch */}
      <div className="flex gap-6 mb-8 border-b border-gray-200 dark:border-white/10">
        {(["profile", "subscription"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-semibold capitalize transition-all relative ${
              activeTab === tab
                ? "text-blue-600 dark:text-sky-600"
                : "text-gray-400 dark:text-white/35 hover:text-gray-600 dark:hover:text-white/50"
            }`}
          >
            {tab}
            {/* line active */}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-sky-600 dark:text-sky-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* tab */}
      <div className="animate-in fade-in duration-300">
        {activeTab === "profile" ? <ProfileTab /> : <SubscriptionTab />}
      </div>
    </div>
  );
}
