import { useEffect } from "react";
import { FiShare2, FiTrash2, FiEye, FiCalendar, FiPlus } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAllContent } from "../../store/features/content";
import Button from "../ui/Button";
import LinkCard from "../ui/LinkCard";
import MetricCard from "../ui/MetricCard";
import { useState } from "react";
import AddContentDialog from "../ui/AddContentDialog";

export default function DashboardContent() {
  const dispatch = useAppDispatch();
  const { contents, loading, error } = useAppSelector((state) => state.content);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchAllContent());
  }, [dispatch]);

  // last 6 links
  const recentLinks = contents.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* top */}
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
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
            <FiCalendar className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              Jan 1, 2026 - Feb 1, 2026
            </span>
          </div>
          <Button
            headIcon={<FiPlus size={18} />}
            text="Add New Link"
            variant="secondary"
            onClick={() => setShowAddDialog(true)}
          />
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          label="Total Links"
          value={contents.length.toString()}
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
          icon={<FiShare2 className="text-gray-600" />}
        />
        <MetricCard
          label="Uncategorized"
          value={contents.filter((c) => c.tags.length === 0).length.toString()}
          change="-10.5%"
          isUp={false}
          previous="30 more from last month"
          icon={<FiTrash2 className="text-gray-600" />}
        />
      </div>

      {/* recents */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Links</h2>
          <button className="text-sm font-semibold text-blue-600 hover:underline">
            View all
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* error and loading */}
        {error && !loading && (
          <div className="text-center flex flex-col  py-12  rounded-xl border border-red-100">
            <h3 className="text-lg font-semibold text-black mb-2">
              Failed to load content
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="flex items-center justify-center">
              <Button
                text="Try Again"
                variant="outline"
                onClick={() => dispatch(fetchAllContent())}
              />
            </div>
          </div>
        )}

        {/* empty state */}
        {!loading && !error && contents.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <FiEye className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No links yet
            </h3>
            <p className="text-gray-500 mb-4">
              Start by adding your first link to your brain!
            </p>
            <Button
              headIcon={<FiPlus size={18} />}
              text="Add Your First Link"
              variant="primary"
              onClick={() => setShowAddDialog(true)}
            />
          </div>
        )}

        {/* content grid*/}
        {!loading && !error && recentLinks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentLinks.map((content) => (
              <LinkCard
                key={content._id}
                id={content._id}
                title={content.title}
                url={content.link.url}
                summary={content.link.description || "No description available"}
                tags={content.tags.map((tag) => tag.name)}
                type={content.type}
                createdAt={content.createdAt}
              />
            ))}
          </div>
        )}
      </div>

      {/* add content dialog */}
      {showAddDialog && (
        <AddContentDialog onClose={() => setShowAddDialog(false)} />
      )}
    </div>
  );
}
