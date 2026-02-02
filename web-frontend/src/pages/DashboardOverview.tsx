import { useState } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/dashboard/Header";
import DashboardContent from "../components/dashboard/DashboardContent";
import AiSearchContent from "../components/dashboard/AiSearchContent";
import AiChatContent from "../components/dashboard/AiChatContent";
import SettingsContent from "../components/dashboard/SettingsContent";
import { useSearchParams } from "react-router-dom";
import SimpleSearchContent from "../components/dashboard/SimpleSearchContent";

export default function DashboardOverview() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const [activeTab, setActiveTab] = useState("dashboard");
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || "dashboard";

  const setActiveTab = (tabId: string) => {
    setSearchParams({ tab: tabId });

    // if (window.innerWidth < 768) {
    //   setIsSidebarOpen(false);
    // }
  };
  // this decides what to show in the content
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "tweets":
        return <PlaceholderView title="Twitter Links" />;
      case "videos":
        return <PlaceholderView title="Video Collection" />;
      case "links":
        return <PlaceholderView title="General Links" />;
      case "articles":
        return <PlaceholderView title="Saved Articles" />;
      case "aiSearch":
        return <AiSearchContent />;
      case "aiChat":
        return <AiChatContent />;
      case "shared":
        return <PlaceholderView title="Shared brain" />;
      case "settings":
        return <SettingsContent></SettingsContent>;
      case "search":
        return <SimpleSearchContent></SimpleSearchContent>;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="h-screen flex bg-linear-to-b from-gray-50 to-white dark:bg-linear-to-b dark:from-[#212121]  dark:to-black overflow-hidden">
      <SideBar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        active={activeTab}
        setActive={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {/* content */}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

//  placeholder
function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="m-5 flex flex-col items-center justify-center h-64 shadow-sm font-sans rounded-xl md:rounded-3xl bg-white/50 dark:bg-white/5">
      <h2 className="text-xl font-medium text-gray-400 dark:text-white">
        {title} coming soon
      </h2>
    </div>
  );
}
