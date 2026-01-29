import { useState, useEffect } from "react";
import clsx from "clsx";
import { FiSearch } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { searchContent, clearSearch } from "../../store/features/search";
import SearchResultCard from "../ui/SearchResultCard";

export default function AiSearchContent() {
  const dispatch = useAppDispatch();
  const { results, query, loading, error, total } = useAppSelector(
    (state) => state.search,
  );
  const { user } = useAppSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Clear search
  useEffect(() => {
    return () => {
      dispatch(clearSearch());
    };
  }, [dispatch]);

  //search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
      await dispatch(
        searchContent({
          query: searchQuery,
          limit: 20,
        }),
      );
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setHasSearched(false);
    dispatch(clearSearch());
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* header */}
        <div
          className={clsx(
            "flex flex-col items-center text-center transition-all duration-500",
            hasSearched ? "pt-8 pb-6" : "pt-20 pb-12",
          )}
        >
          <h1
            className={clsx(
              "flex flex-col font-bold tracking-tight text-gray-800 transition-all duration-500",
              hasSearched ? "text-2xl md:text-3xl" : "text-2xl md:text-4xl",
            )}
          >
            <span>
              {hasSearched
                ? "Top matches from your knowledge base"
                : `Good Morning, ${user?.name}`}
            </span>

            {!hasSearched && (
              <span className="mt-2">
                Find anything from{" "}
                <span className="text-blue-500">your saved knowledge.</span>
              </span>
            )}
          </h1>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className={clsx(
              "w-full transition-all duration-500",
              hasSearched ? "max-w-2xl mt-6" : "max-w-3xl mt-12",
            )}
          >
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FiSearch size={20} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your saved content using natural language..."
                className="w-full pl-12 pr-24 py-4 text-sm md:text-lg border-2 border-gray-200 rounded-2xl  focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-white shadow-sm hover:shadow-lg transition-shadow"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading || !searchQuery.trim()}
                  className="px-3 py-1 md:px-6 md:py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* result */}
        {hasSearched && (
          <div className="mt-8">
            {/* loading */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Searching your content...</p>
              </div>
            )}
            {/* err */}
            {/* {error && (
              <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
                <p className="text-red-600 font-medium">⚠ {error}</p>
              </div>
            )} */}

            {/* Results Header */}
            {!loading && !error && results.length > 0 && (
              <div className="mb-6">
                <p className="text-gray-600">
                  Found{" "}
                  <span className="font-semibold text-gray-900">{total}</span>{" "}
                  results for "
                  <span className="font-semibold text-gray-900">{query}</span>"
                </p>
              </div>
            )}
            {/* Results Grid */}
            {!loading && !error && results.length > 0 && (
              <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((result) => (
                  <SearchResultCard
                    key={result.content._id}
                    content={result.content}
                    tags={result.content.tags}
                    similarity={result.similarity}
                  />
                ))}
              </div>
            )}
            {/* No Results */}
            {!loading && !error && query && results.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <div className="text-6xl mb-4 flex items-center justify-center">
                  <FiSearch size={40} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any content matching "{query}"
                </p>
                <button
                  onClick={handleClear}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try a different search
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
