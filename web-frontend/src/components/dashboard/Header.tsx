import { useState } from "react";
import { FiMenu, FiSend, FiSun } from "react-icons/fi";
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
    // When searching, switch the tab to 'search' and keep the query
    setSearchParams({ tab: "search", q: query });
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 md:px-6 sticky top-0 z-30 w-full">
        {/* mobile menu*/}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden mr-3 p-2 text-gray-600 hover:bg-sky-100 rounded-lg transition-colors"
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
          {/* theme and share */}
          <div className="flex items-center gap-1 border-r border-black/20 pr-2 md:pr-4">
            <button
              className="p-2 text-gray-500 hover:bg-black/10 rounded-full transition-colors"
              aria-label="Toggle Theme"
            >
              <FiSun size={20} />
            </button>
            <button
              onClick={handleShareClick}
              disabled={loading}
              className="p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-colors relative disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Share Your Brain"
              title="Share Your Brain"
            >
              <FiSend size={20} />
              {shareLink?.isActive && (
                <span className="absolute top-3.5 right-1.5 w-2 h-2 bg-green-500 rounded-full border border-white" />
              )}
            </button>
          </div>

          {/* profile */}
          <ProfileSection />
        </div>
      </header>

      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareModal onClose={() => setIsShareModalOpen(false)} />
      )}
    </>
  );
}
