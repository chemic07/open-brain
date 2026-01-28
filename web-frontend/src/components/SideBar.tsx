import { motion, AnimatePresence, type Variants } from "framer-motion";
import SidebarItem from "./ui/SideBarItem";
import {
  FiMenu,
  FiHome,
  FiTwitter,
  FiVideo,
  FiLink,
  FiFileText,
  FiBox,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import appLogo from "../assets/images/logo/app_logo2.svg";
import type { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logout } from "../store/features/auth";

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  active: string;
  setActive: (id: string) => void;
}

export default function SideBar({
  isOpen,
  setIsOpen,
  active,
  setActive,
}: SideBarProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  function handleLogout() {
    try {
      if (!loading) {
        dispatch(logout());
      }
    } catch (error) {
      console.log(error);
    }
  }

  const mobileVariants: Variants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const textVariants = {
    initial: { opacity: 0, width: 0 },
    animate: { opacity: 1, width: "auto", marginLeft: 8 },
    exit: { opacity: 0, width: 0, marginLeft: 0 },
  };

  const Content = (
    <div className="flex flex-col h-full overflow-x-hidden bg-white">
      {/* top */}
      <div
        className={`flex items-center px-4 py-4 overflow-hidden ${
          isOpen ? "justify-between" : "justify-center"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="logo-section"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={textVariants}
              className="flex items-center overflow-hidden shrink-0"
            >
              <div className="bg-blue-600 rounded-lg p-1.5 flex items-center justify-center shrink-0">
                <img src={appLogo} className="h-5 w-5" alt="Logo" />
              </div>
              <span className="font-bold text-blue-700 text-lg whitespace-nowrap ml-2">
                Open Brain
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded hover:bg-sky-100 shrink-0 transition-colors z-10"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* menu */}
      <div className="flex-1 px-2 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {mainItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            active={active}
            setActive={setActive}
            open={isOpen}
          />
        ))}

        <div className="my-4 border-t border-black/15 mx-3 shrink-0" />

        {brainItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            active={active}
            setActive={setActive}
            open={isOpen}
          />
        ))}
      </div>

      {/* bottom */}
      <div className="mt-auto px-2 pb-4 space-y-1 border-t border-gray-50 pt-4 overflow-hidden shrink-0">
        <BottomItem
          icon={<FiSettings size={18} className="shrink-0" />}
          label="Settings"
          open={isOpen}
        />
        <BottomItem
          icon={<FiLogOut size={18} className="shrink-0" />}
          label="Logout"
          open={isOpen}
          color="text-red-500 hover:bg-red-50"
          onClick={handleLogout}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* dek aside */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 240 : 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col h-screen bg-white border-r border-gray-200 sticky top-0 z-30 overflow-hidden"
      >
        {Content}
      </motion.aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer Content */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={mobileVariants}
        className="fixed inset-y-0 left-0 w-64 bg-white z-50 md:hidden shadow-2xl overflow-hidden"
      >
        {Content}
      </motion.div>
    </>
  );
}

interface BottomItemProps {
  icon: ReactNode;
  label: string;
  open: boolean;
  color?: string;
  onClick?: () => void;
}

function BottomItem({
  onClick,
  icon,
  label,
  open,
  color = "text-gray-600 hover:bg-gray-50",
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

const mainItems = [
  { id: "dashboard", label: "Dashboard", icon: FiHome },
  { id: "tweets", label: "Tweets", icon: FiTwitter },
  { id: "videos", label: "Videos", icon: FiVideo },
  { id: "links", label: "Links", icon: FiLink },
  { id: "articles", label: "Articles", icon: FiFileText },
];

const brainItems = [
  { id: "collections", label: "Collections", icon: FiBox },
  { id: "shared", label: "Shared Brains", icon: FiUsers },
];
