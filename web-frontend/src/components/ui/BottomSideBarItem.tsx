// components/ui/BottomSideBarItem.tsx
import { AnimatePresence, motion } from "framer-motion";
import { type ReactElement } from "react";

interface BottomItemProps {
  icon: ReactElement;
  label: string;
  open: boolean;
  color?: string;
  onClick: () => void;
  isActive?: boolean;
}

export function BottomItem({
  icon,
  label,
  open,
  color = "text-gray-600 hover:bg-blue-50",
  onClick,
  isActive = false,
}: BottomItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
        isActive ? "bg-blue-50 text-blue-600" : color
      }`}
    >
      <span className="shrink-0">{icon}</span>
      <AnimatePresence mode="wait">
        {open && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-3 text-sm font-medium whitespace-nowrap overflow-hidden"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
