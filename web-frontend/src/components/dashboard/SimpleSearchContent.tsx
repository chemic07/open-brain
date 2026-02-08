import { useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { searchContent } from "../../store/features/content/contentThunks";
import SimpleLinkCard from "../ui/SimpleLinkCard";

export default function SimpleSearchContent() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const query = searchParams.get("q") || "";

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const { contents, loading } = useAppSelector((state) => state.content);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // 500 ms wait

    return () => {
      clearTimeout(handler); // clear time out
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(searchContent(debouncedQuery));
    }
  }, [debouncedQuery, dispatch]);

  return (
    <main className="p-6">
      <h1 className="text-xl text-black/80 dark:text-white/90 font-bold mb-4">
        Results for: "{query}"
      </h1>

      {loading && <p>Searching...</p>}

      <div className="grid gap-4">
        {contents.length > 0
          ? contents.map((item) => {
              let currContent = item;
              return (
                <SimpleLinkCard
                  id={currContent._id}
                  title={currContent.title}
                  tags={currContent.tags}
                  url={currContent.link.url}
                  summary={currContent.link.description!}
                  key={currContent._id}
                />
              );
            })
          : !loading && <p className="text-gray-400">No matches found.</p>}
      </div>
    </main>
  );
}
