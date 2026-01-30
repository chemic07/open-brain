import { type ReactNode, useState } from "react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div
      className={clsx(
        "relative group transition-all w-full",
        size === "sm" ? "max-w-xs" : "max-w-2xl",
      )}
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors">
        {headIcon ? (
          <span className="text-xl">{headIcon}</span>
        ) : (
          <FiSearch
            className={clsx(
              "transition-colors",
              variant === "Primary" ? "text-blue-500" : "text-gray-400",
              "group-focus-within:text-blue-600",
            )}
          />
        )}
      </div>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={text}
        className={clsx(
          "w-full transition-all outline-none border",
          // Size Logic
          size === "sm"
            ? "py-2 pl-10 pr-12 text-sm rounded-lg"
            : "py-4 pl-12 pr-16 text-lg rounded-2xl",
          // Variant Logic
          variant === "Primary"
            ? "bg-white border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
            : "bg-gray-50 border-transparent focus:bg-white focus:border-gray-300",
        )}
      />

      {/* Keyboard Shortcut - Hidden when typing */}
      {!query && (
        <div className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 px-2 py-1 border border-gray-200 rounded-md bg-white text-[10px] text-gray-400 font-mono shadow-sm pointer-events-none">
          <span>⌘</span>
          <span>K</span>
        </div>
      )}
    </div>
  );
}
