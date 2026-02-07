import { useState } from "react";
import { FiMenu, FiSend, FiSun, FiMoon } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { generateShareLink } from "../../store/features/share/shareThunk";
import SearachBar from "../ui/SearchBar";
import ProfileSection from "../ui/ProfileSection";
import ShareModal from "../ui/ShareModal";
import { useSearchParams } from "react-router-dom";

interface IHeaderProps {
  setIsOpen: (open: boolean) => void;
}

export default function Header({ setIsOpen }: IHeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { shareLink, loading } = useAppSelector((state) => state.share);
  console.log(searchParams);

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize state from class list on mount
    return document.documentElement.classList.contains("dark");
  });

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.theme = "light";
      setIsDarkMode(false);
    } else {
      root.classList.add("dark");
      localStorage.theme = "dark";
      setIsDarkMode(true);
    }
  };

  const handleShareClick = async () => {
    try {
      if (!shareLink) {
        await dispatch(generateShareLink()).unwrap();
      }
      setIsShareModalOpen(true);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchParams({ tab: "search", q: query });
  };

  return (
    <>
      <header className="h-16 bg-white dark:bg-[#212121] border-b border-gray-200 dark:border-white/10 flex items-center px-2 md:px-6 sticky top-0 z-30 w-full transition-colors">
        {/* mobile menu*/}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden mr-1 md:mr-3 p-2 text-gray-600 dark:text-gray-400 hover:bg-sky-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Open Menu"
        >
          <FiMenu size={20} />
        </button>

        <SearachBar
          variant="secondary"
          size="sm"
          text="search anything..."
          onSearch={handleSearch}
        />

        {/* right side */}
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1 border-r border-black/10 dark:border-white/10 pr-2 md:pr-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
              aria-label="Toggle Theme"
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <button
              onClick={handleShareClick}
              disabled={loading}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-full transition-colors relative disabled:opacity-50"
              aria-label="Share Your Brain"
            >
              <FiSend size={20} />
              {shareLink?.isActive && (
                <span className="absolute top-3 right-2 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-[#0D1117]" />
              )}
            </button>
          </div>

          <ProfileSection />
        </div>
      </header>

      {isShareModalOpen && (
        <ShareModal onClose={() => setIsShareModalOpen(false)} />
      )}
    </>
  );
}
