import { FiBell, FiMenu, FiSun } from "react-icons/fi";
import SearachBar from "../ui/SearchBar";
import ProfileSection from "../ui/ProfileSection";

interface IHeaderProps {
  setIsOpen: (open: boolean) => void;
}

export default function Header({ setIsOpen }: IHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 md:px-6 sticky top-0 z-30 w-full">
      {/* mobile menu*/}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden mr-3 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Open Menu"
      >
        <FiMenu size={20} />
      </button>

      <SearachBar />

      {/* right side */}
      <div className="ml-auto flex items-center gap-2 md:gap-4">
        {/* theme and notification */}
        <div className="flex items-center gap-1 border-r border-black/20 pr-2 md:pr-4">
          <button
            className="p-2 text-gray-500 hover:bg-black/10 rounded-full transition-colors"
            aria-label="Toggle Theme"
          >
            <FiSun size={20} />
          </button>
          <button
            className="p-2 text-gray-500 hover:bg-black/10 rounded-full transition-colors relative"
            aria-label="Notifications"
          >
            <FiBell size={20} />
            {/* dot */}
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
        </div>

        {/* profile */}
        <ProfileSection />
      </div>
    </header>
  );
}
