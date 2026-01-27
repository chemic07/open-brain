import { FiShare2, FiTrash2, FiEye, FiCalendar, FiPlus } from "react-icons/fi";
import Button from "../ui/Button";
import LinkCard from "../ui/LinkCard";
import MetricCard from "../ui/MetricCard";

export default function DashboardContent() {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* ===== TOP WIDGET BAR ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* heading */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 capitalize tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Welcome back! Here is what's happening with your brain today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {" "}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
            <FiCalendar className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              Jan 1, 2026 - Feb 1, 2026
            </span>
          </div>
          <Button
            headIcon={<FiPlus size={18}></FiPlus>}
            text="Add New Link"
            variant="secondary"
          ></Button>
        </div>
      </div>

      {/* ===== STATS GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          label="Total Links"
          value="870"
          change="+15.5%"
          isUp={true}
          previous="30 more from last month"
          icon={<FiEye className="text-blue-600" />}
        />
        <MetricCard
          label="Total Shared"
          value="45"
          change="+8.4%"
          isUp={true}
          previous="30 more from last month"
          icon={<FiShare2 className="text-purple-600" />}
        />
        <MetricCard
          label="Uncategorized"
          value="101"
          change="-10.5%"
          isUp={false}
          previous="30 more from last month"
          icon={<FiTrash2 className="text-red-500" />}
        />
      </div>

      {/* ===== RECENT LINKS SECTION ===== */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Links</h2>
          <button className="text-sm font-semibold text-blue-600 hover:underline">
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <LinkCard
              key={index}
              title="Framer Motion Documentation"
              url="https://framer.com/motion"
              summary="Complete guide to production-ready-ready animations for React apps."
              tags={["Frontend", "Animation"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
