import { FiClock, FiExternalLink } from "react-icons/fi";
import type { Content, Tag } from "../../store/features/content";

interface ISearchResultCard {
  tags: Tag[];
  content: Content;
  similarity: number;
}

export default function SearchResultCard(result: ISearchResultCard) {
  return (
    <div
      key={result.content._id}
      className="bg-gray-50 dark:bg-[#181818] rounded-xl border border-gray-300 dark:border-white/10 p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-white/50 transition-all duration-200 group relative"
    >
      {/* match  */}
      <div className="absolute top-3 right-3">
        <span className="px-2.5 py-1 bg-gray-800 dark:bg-white/20 text-white dark:text-white/90 text-xs font-sans rounded-full">
          {Math.round(result.similarity * 100)}% match
        </span>
      </div>
      {/* type */}
      <div className="mb-3">
        <span className="px-2 py-1 bg-black/10 dark:bg-white/10 text-gray-600 dark:text-white/35 text-xs font-medium rounded uppercase">
          {result.content.type}
        </span>
      </div>
      {/* title */}
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white/90 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-white transition-colors pr-16">
        {result.content.title}
      </h3>
      <div className="flex flex-row gap-1.5 mb-2">
        <FiExternalLink
          size={20}
          className="mb-1 text-gray-900 dark:text-white/90"
        />
        <a
          className="text-blue-600 dark:text-white/35 line-clamp-1 hover:underline"
          href={result.content.link.url}
        >
          {result.content.link.url}
        </a>
      </div>

      {/* description */}
      <p className="text-sm text-gray-600 dark:text-white/50 mb-3 line-clamp-3">
        {result.content.link.description || "No description available"}
      </p>
      {/* tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {result.content.tags.slice(0, 3).map((tag) => (
          <span
            key={tag._id}
            className="px-2.5 py-1 bg-blue-50 dark:bg-white/10 text-blue-600 dark:text-white/35 text-xs font-medium rounded-md"
          >
            {tag.name}
          </span>
        ))}
        {result.content.tags.length > 3 && (
          <span className="px-2.5 py-1 bg-black/10 dark:bg-white/10 text-gray-600 dark:text-white/35 text-xs font-medium rounded-md">
            +{result.content.tags.length - 3}
          </span>
        )}
      </div>
      {/* time */}
      <div className="text-xs text-gray-400 dark:text-white/35 flex items-center gap-1">
        <FiClock size={12} />
        {new Date(result.content.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
