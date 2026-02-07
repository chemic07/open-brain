import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchContentByType } from "../../store/features/content";
import type { ContentType } from "../../store/features/content/contentTypes";
import Button from "../ui/Button";
import LinkCard from "../ui/LinkCard";
import AddContentDialog from "../ui/AddContentDialog";
import { motion } from "framer-motion";

interface ByTypeContentProps {
  type: ContentType;
  title: string;
}

export default function ByTypeContent({ type, title }: ByTypeContentProps) {
  const dispatch = useAppDispatch();
  const { contents, loading, error } = useAppSelector((state) => state.content);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchContentByType(type));
  }, [dispatch, type]);

  return (
    <main className="bg-[#F9FAFB] dark:bg-transparent px-3 md:px-5 py-2.5 md:py-6 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1
                className={`text-2xl md:text-3xl font-bold capitalize tracking-tight text-gray-900 dark:text-white`}
              >
                {title}
              </h1>
            </div>
            <p className="text-gray-500 dark:text-white/60 mt-2">
              {contents.length} {type}
              {contents.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          {contents.length !== 0 && (
            <div className="flex items-center gap-2">
              <Button
                headIcon={<FiPlus size={18} />}
                text="Add New Link"
                variant={
                  localStorage.theme === "light" ? "secondary" : "primary"
                }
                onClick={() => setShowAddDialog(true)}
              />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              All {title}
            </h2>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-100 dark:bg-white/10 rounded-xl animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center flex flex-col py-12 rounded-xl border border-red-100 dark:border-white/10 bg-red-50/30 dark:bg-white/5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white/70 mb-2">
                Failed to load content
              </h3>
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <div className="flex items-center justify-center">
                <Button
                  text="Try Again"
                  variant={localStorage.theme === "dark" ? "outline" : "glass"}
                  onClick={() => dispatch(fetchContentByType(type))}
                />
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && contents.length === 0 && (
            <div className="text-center flex flex-col py-16 rounded-xl border-2  border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90 mb-2">
                No {type}s yet
              </h3>
              <p className="text-gray-600 dark:text-white/50 mb-6">
                Start saving your favorite {type}s to access them anytime
              </p>
              <div className="flex items-center justify-center">
                <Button
                  text={`Add First ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                  variant={
                    localStorage.theme === "light" ? "secondary" : "primary"
                  }
                  headIcon={<FiPlus size={18} />}
                  onClick={() => setShowAddDialog(true)}
                />
              </div>
            </div>
          )}

          {/* Content Grid */}
          {!loading && !error && contents.length > 0 && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {contents.map((content) => (
                <motion.div
                  key={content._id}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.98 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.35, ease: "easeOut" },
                    },
                  }}
                >
                  <LinkCard
                    id={content._id}
                    key={content._id}
                    title={content.title}
                    url={content.link.url}
                    summary={
                      content.link.description || "No description available"
                    }
                    tags={content.tags}
                    type={content.type}
                    createdAt={content.createdAt}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Add Content Dialog */}
        {showAddDialog && (
          <AddContentDialog onClose={() => setShowAddDialog(false)} />
        )}
      </div>
    </main>
  );
}
