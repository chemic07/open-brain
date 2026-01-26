import { FiSearch } from "react-icons/fi";

export default function SearachBar() {
  return (
    <div className="flex-1 max-w-md hidden sm:block">
      <div className="relative group">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-10 pr-12 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
        />
        {/* shortcut */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 border border-gray-200 rounded bg-white text-[10px] text-gray-400 font-mono shadow-sm pointer-events-none">
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>
    </div>
  );
}
