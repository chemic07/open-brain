import { useState } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/dashboard/Header";

export default function DashboardOverview() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="h-screen flex bg-gray-50">
      <SideBar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        active={activeTab}
        setActive={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header setIsOpen={setIsSidebarOpen} />
        {/* content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">
              {activeTab}
            </h1>
            <p className="text-gray-500 mt-2">
              Welcome back! Here is what's happening today.
            </p>
            [content]
          </div>
        </main>
      </div>
    </div>
  );
}
