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
      className="bg-black/5 rounded-xl border border-gray-300 p-5 hover:shadow-lg transition-all duration-200 group relative"
    >
      {/* match  */}
      <div className="absolute top-3 right-3">
        <span className="px-2.5 py-1 bg-gray-800 text-white text-xs font-sans rounded-full">
          {Math.round(result.similarity * 100)}% match
        </span>
      </div>
      {/* type */}
      <div className="mb-3">
        <span className="px-2 py-1 bg-black/10 text-gray-600 text-xs font-medium rounded uppercase">
          {result.content.type}
        </span>
      </div>
      {/* title */}
      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors pr-16">
        {result.content.title}
      </h3>
      <div className="flex flex-row gap-1.5 mb-2">
        <FiExternalLink size={25} />
        <a
          className="text-blue-200 line-clamp-1"
          href={result.content.link.url}
        >
          {result.content.link.url}
        </a>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
        {result.content.link.description || "No description available"}
      </p>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {result.content.tags.slice(0, 3).map((tag) => (
          <span
            key={tag._id}
            className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-md"
          >
            {tag.name}
          </span>
        ))}
        {result.content.tags.length > 3 && (
          <span className="px-2.5 py-1 bg-black/10 text-gray-600 text-xs font-medium rounded-md">
            +{result.content.tags.length - 3}
          </span>
        )}
      </div>
      {/* Time */}
      <div className="text-xs text-gray-400 flex items-center gap-1">
        <FiClock size={12} />
        {new Date(result.content.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
