import { FiUser } from "react-icons/fi";

export default function ProfileSection() {
  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      <div className="hidden lg:block text-right">
        <p className="text-sm font-semibold text-gray-800 leading-none group-hover:text-blue-600 transition-colors">
          Raj lodhi
        </p>
        <p className="text-[11px] text-gray-500 mt-1">Free Plan</p>
      </div>
      <div className="relative">
        <div className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 group-hover:border-blue-400 transition-all object-cover">
          <FiUser size={20} />
        </div>
      </div>
    </div>
  );
}
