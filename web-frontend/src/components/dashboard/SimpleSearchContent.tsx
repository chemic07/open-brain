import { useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { searchContent } from "../../store/features/content/contentThunks";
import LinkCard from "../ui/LinkCard";

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
      <h1 className="text-xl font-bold mb-4">Results for: "{query}"</h1>

      {loading && <p>Searching...</p>}

      <div className="grid gap-4">
        {contents.length > 0
          ? contents.map((item, index) => {
              let currContent = item;
              return (
                <LinkCard
                  type={currContent.type}
                  id={currContent._id}
                  createdAt={currContent.createdAt}
                  title={currContent.title}
                  tags={currContent.tags}
                  url={currContent.title}
                  summary={currContent.title}
                  key={currContent._id}
                />
              );
            })
          : !loading && <p className="text-gray-400">No matches found.</p>}
      </div>
    </main>
  );
}
