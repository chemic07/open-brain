import { type ReactNode, useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import clsx from "clsx";

type Variant = "Primary" | "secondary";
type Size = "sm" | "lg";

interface ISearchbarProps {
  text: string;
  headIcon?: ReactNode;
  variant: Variant;
  size: Size;
  onSearch?: (value: string) => void;
}

export default function SearchBar({
  text,
  headIcon,
  variant,
  size,
  onSearch,
}: ISearchbarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearch) onSearch(val);
  };

  return (
    <div
      className={clsx(
        "relative group transition-all w-full",
        size === "sm" ? "max-w-xs" : "max-w-2xl",
      )}
    >
      {/* icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors z-10">
        {headIcon ? (
          <span className="text-xl dark:text-gray-300">{headIcon}</span>
        ) : (
          <FiSearch
            className={clsx(
              "transition-colors",
              variant === "Primary"
                ? "text-blue-500 dark:text-blue-400"
                : "text-gray-400 dark:text-gray-500",
              "group-focus-within:text-blue-600 dark:group-focus-within:text-white",
            )}
          />
        )}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={text}
        className={clsx(
          "w-full transition-all outline-none border",
          size === "sm"
            ? "py-2 pl-10 pr-12 text-sm rounded-lg"
            : "py-4 pl-12 pr-16 text-lg rounded-2xl",
          variant === "Primary"
            ? "bg-white border-gray-200 text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-400/10"
            : "bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-blue-500 dark:bg-[#303030] dark:text-gray-200 dark:focus:bg-gray-100 dark:focus:border-white/20",
        )}
      />

      {/* keyboardshorcut */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
        {!query && (
          <div className="hidden md:flex absolute right-0.5 top-1/2 -translate-y-1/2 items-center gap-1 px-2 py-1 border border-gray-200 rounded-md bg-white text-[10px] text-gray-400 font-mono shadow-sm pointer-events-none dark:bg-white/10 dark:border-white/10 dark:text-white/30">
            <span>⌘</span>
            <span>K</span>
          </div>
        )}
      </div>
    </div>
  );
}
