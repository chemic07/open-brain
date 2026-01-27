import { useState } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/dashboard/Header";
import DashboardContent from "../components/dashboard/DashboardContent";

export default function DashboardOverview() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

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
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      <SideBar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        active={activeTab}
        setActive={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar">
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
    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-3xl bg-white/50">
      <h2 className="text-xl font-semibold text-gray-400">
        {title} coming soon
      </h2>
    </div>
  );
}
