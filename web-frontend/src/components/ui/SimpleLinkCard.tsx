import { useState } from "react";
import { FiCopy, FiCheck, FiTrash2 } from "react-icons/fi";
import { useAppDispatch } from "../../hooks/redux";
import { deleteContent, type Tag } from "../../store/features/content";
import { showToast } from "../../utils/toast";

interface ILinkCardProps {
  title: string;
  url: string;
  summary: string;
  tags: Tag[];
  id: string;
}

export default function SimpleLinkCard({
  title,
  url,
  summary,
  tags,
  id,
}: ILinkCardProps) {
  const dispatch = useAppDispatch();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    showToast({ type: "success", message: "Link copied" });
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDelete = async () => {
    await dispatch(deleteContent(id)).unwrap();
    showToast({ type: "success", message: "Deleted" });
  };

  return (
    <div className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-white/10 rounded-xl p-4 md:p-5 flex flex-col gap-3">
      {/* header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white line-clamp-2">
          {title}
        </h3>

        <div className="flex gap-1">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-white/10"
          >
            {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
          </button>

          <button
            onClick={handleDelete}
            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-white/10"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* url */}
      <p className="text-xs text-gray-400 dark:text-white/40 truncate">{url}</p>

      <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed line-clamp-3">
        {summary.slice(0, 150) + "..."}
      </p>

      {/* tags */}
      <div className="flex flex-wrap gap-2 pt-2">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag._id}
            className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-white/80 dark:text-white/50"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
