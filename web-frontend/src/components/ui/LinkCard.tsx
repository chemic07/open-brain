import { FiExternalLink, FiShare2, FiTrash2 } from "react-icons/fi";

interface ILinkCardProps {
  title: string;
  url: string;
  summary: string;
  tags: string[];
  id: string;
  key: string;
  type: string;
  createdAt: string;
}

export default function LinkCard({
  title,
  url,
  summary,
  tags,
}: ILinkCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all group flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 transition-colors">
          <FiExternalLink
            className="text-blue-600 group-hover:text-white transition-colors"
            size={20}
          />
        </div>
        <div className="flex gap-1">
          <button className="p-2 text-gray-400 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-colors">
            <FiShare2 size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-800 rounded-xl transition-colors">
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 text-xs font-medium truncate mb-4 block hover:underline"
      >
        {url}
      </a>

      <p className="text-gray-500 text-sm leading-relaxed mb-6 grow">
        {summary}
      </p>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
        {tags.map((tag: string) => (
          <span
            key={tag}
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-sky-100  text-gray-500 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
