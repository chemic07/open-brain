import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface BottomItemProps {
  icon: ReactNode;
  label: string;
  open: boolean;
  color?: string;
  onClick?: () => void;
}

export function BottomItem({
  onClick,
  icon,
  label,
  open,
  color = "text-gray-600 hover:bg-sky-50",
}: BottomItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-colors overflow-hidden ${color}`}
    >
      <div className="flex items-center min-w-5 justify-center">{icon}</div>
      <AnimatePresence mode="wait">
        {open && (
          <motion.span
            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
            animate={{ opacity: 1, width: "auto", marginLeft: 12 }}
            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap overflow-hidden font-medium"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
