import { FiUser } from "react-icons/fi";
import { useAppSelector } from "../../hooks/redux";

export default function ProfileSection() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      <div className="hidden lg:block text-right">
        <p className="text-sm font-semibold text-gray-800 leading-none group-hover:text-blue-600 transition-colors">
          {user?.userName}
        </p>
        <p className="text-[11px] text-gray-500 mt-1">
          {user?.plan.toUpperCase()}
          {" Plan "}
        </p>
      </div>
      <div className="relative">
        <div className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 group-hover:border-blue-400 transition-all object-cover">
          <FiUser size={20} />
        </div>
      </div>
    </div>
  );
}
