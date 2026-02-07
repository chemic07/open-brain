import { useState } from "react";
import { FiCopy, FiCheck, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { useAppDispatch } from "../../hooks/redux";
import { deleteContent, type Tag } from "../../store/features/content";

import { showToast } from "../../utils/toast";

interface ILinkCardProps {
  title: string;
  url: string;
  summary: string;
  tags: Tag[];
  id: string;
  type: string;
  createdAt: string;
}

export default function LinkCard({
  title,
  url,
  summary,
  tags,
  id,
}: ILinkCardProps) {
  const dispatch = useAppDispatch();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      showToast({ type: "success", message: "Linked copied" });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
      showToast({ type: "error", message: "Failed to copy" });
    }
  };

  //handle del
  const handleDelete = () => {
    showToast({
      type: "warning",
      message: "Confirm Deletion",
      options: {
        description:
          "Are you sure you want to delete this link? This cannot be undone.",
        duration: 8000,
        action: {
          label: "Delete",
          onClick: async () => {
            try {
              await dispatch(deleteContent(id)).unwrap();

              //show success toast
              showToast({
                type: "success",
                message: "Deleted successfully",
              });
            } catch (error) {
              showToast({
                type: "error",
                message: "Failed to delete",
              });
            }
          },
        },
      },
    });
  };

  return (
    <div className="bg-white dark:bg-[#181818] rounded-xl border border-gray-200 dark:border-white/10 p-6 hover:border-blue-300 dark:hover:border-white/50 hover:shadow-lg transition-all group flex flex-col h-full">
      {/* header */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-10 h-10 bg-blue-50 dark:bg-white/20 rounded-md md:rounded-xl flex items-center justify-center border border-blue-100 dark:border-white/10 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors">
          <FiExternalLink
            className="text-blue-600 dark:text-white group-hover:text-white transition-colors"
            size={20}
          />
        </div>

        <div className="flex gap-1">
          {/* copy */}
          <button
            onClick={handleCopy}
            className={`p-2 rounded-xl transition-all duration-200 ${
              copied
                ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10"
                : "text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-white/80"
            }`}
            title="Copy to clipboard"
          >
            {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
          </button>

          {/* del button */}
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-white/10 hover:text-red-600 dark:hover:text-white rounded-xl transition-colors"
            title="Delete item"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      {/* content */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white/90 mb-2 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
        {title}
      </h3>

      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 dark:text-white/35 text-xs font-medium truncate mb-4 block hover:underline"
      >
        {url}
      </a>

      <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed mb-6 grow">
        {summary.slice(0, 250) + "..."}
      </p>

      {/* tag*/}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50 dark:border-white/5">
        {tags.map((tag) => (
          <span
            key={tag._id + Math.random()}
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-sky-100 dark:bg-white/10 text-gray-500 dark:text-white/35 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-white/20 group-hover:text-black/70 dark:group-hover:text-white transition-colors"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
