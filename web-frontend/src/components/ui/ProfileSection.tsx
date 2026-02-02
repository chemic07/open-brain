import { FiUser, FiStar } from "react-icons/fi";
import { useAppSelector } from "../../hooks/redux";
import magic from "../../assets/images/icons/magic_icon.svg";

export default function ProfileSection() {
  const user = useAppSelector((state) => state.auth.user);
  const isPlus = user?.plan?.toLowerCase() === "plus";

  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      {/* text Section */}
      <div className="hidden lg:flex flex-col items-end text-right">
        <p className="text-sm font-semibold text-gray-800 dark:text-white/90 transition-colors leading-none group-hover:text-blue-600 dark:group-hover:text-sky-600">
          {user?.userName}
        </p>

        {/* Plan Container with Relative positioning for overlapping */}
        <div className="relative mt-1.5 pt-1">
          {isPlus && (
            <img
              src={magic}
              className="w-4 h-4 absolute -top-1 -right-1.5   drop-shadow-sm 
                          group-hover:rotate-0 transition-transform duration-300"
            />
          )}
          <p className="text-[10px] font-bold text-gray-500 dark:text-white/30 tracking-widest uppercase px-2 py-0.5 rounded-full">
            {user?.plan}
          </p>
        </div>
      </div>

      {/* avatar Section */}
      <div className="relative">
        <div className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 transition-all dark:bg-white/5 group-hover:border-blue-400 dark:group-hover:border-sky-600">
          <FiUser size={20} className="text-gray-700 dark:text-white/90" />
        </div>
      </div>
    </div>
  );
}
