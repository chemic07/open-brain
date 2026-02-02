import { AnimatePresence, motion } from "framer-motion";

export default function SidebarItem({ item, active, setActive, open }: any) {
  const Icon = item.icon;
  const isActive = active === item.id;

  return (
    <div className="relative mb-1">
      {isActive && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-lg bg-sky-100 dark:bg-[#1f3760]"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <button
        onClick={() => {
          setActive(item.id);
        }}
        className={`relative z-10 w-full flex items-center justify-between px-3 py-2 rounded-lg
  ${
    isActive
      ? "text-blue-700 dark:text-white"
      : "text-gray-600 dark:text-[#c4c7c5]"
  }
`}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} />
          <AnimatePresence>
            {open && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {open && item.badge && (
          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </button>
    </div>
  );
}
