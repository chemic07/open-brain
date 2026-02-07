import { motion, AnimatePresence, type Variants } from "framer-motion";
import SidebarItem from "./ui/SideBarItem";
import { AiOutlineStar } from "react-icons/ai";
import swoosh1 from "./../assets/images/icons/swoosh2.svg";

import {
  FiMenu,
  FiHome,
  FiTwitter,
  FiVideo,
  FiFileText,
  FiBox,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiCodepen,
} from "react-icons/fi";
import { BottomItem } from "./ui/BottomSideBarItem";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logout } from "../store/features/auth";
import UpgradeCard from "./ui/UpgradeCard";

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
  const { loading, user } = useAppSelector((state) => state.auth);

  function handleLogout() {
    try {
      if (!loading) {
        dispatch(logout());
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleSettingsClick() {
    setActive("settings");
    if (window.innerWidth < 768) {
      setIsOpen(false);
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
    <div className="flex flex-col h-full overflow-x-hidden bg-white dark:bg-[#131314]">
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
              <div className="flex flex-col ">
                <span className="font-bold text-blue-700 dark:text-white font-sans text-xl md:text-2xl  whitespace-nowrap md-0 md:ml-2">
                  Open Brain
                </span>
                <img
                  src={swoosh1}
                  alt="swoosh svg"
                  className="ml-1 md:ml-5 w-25 md:w-30 -rotate-2"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-balck dark:text-white hover:bg-sky-100 dark:bg-white/10 dark:hover:bg-white/10 shrink-0 transition-colors z-10"
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

        <div className="my-4 border-t border-black/15 dark:border-white/15 mx-3 shrink-0" />

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
      <div className="mt-auto px-2  space-y-1 border-t border-gray-50 dark:border-gray-100 pt-4 overflow-hidden shrink-0">
        <BottomItem
          icon={<FiSettings size={18} className="shrink-0" />}
          label="Settings"
          open={isOpen}
          onClick={handleSettingsClick}
          isActive={active === "settings"}
        />
        <BottomItem
          icon={<FiLogOut size={18} className="shrink-0" />}
          label="Logout"
          open={isOpen}
          color="text-red-500 darl:text-white/70 hover:bg-red-100  dark:hover:bg-[#212121] mb-2"
          onClick={handleLogout}
        />
      </div>

      <AnimatePresence>
        {isOpen && !user?.isSubscribed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <UpgradeCard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* dek aside */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 240 : 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col h-screen bg-white border-r border-gray-200 dark:border-gray-100 sticky top-0 z-30 overflow-hidden"
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

const mainItems = [
  { id: "dashboard", label: "Dashboard", icon: FiHome },
  { id: "tweets", label: "Tweets", icon: FiTwitter },
  { id: "videos", label: "Videos", icon: FiVideo },
  { id: "notes", label: "Notes", icon: FiCodepen },
  { id: "articles", label: "Articles", icon: FiFileText },
];

const brainItems = [
  { id: "aiSearch", label: "AI Search", icon: FiBox },
  {
    id: "aiChat",
    label: "AI Chat",
    icon: AiOutlineStar,
  },
  { id: "shared", label: "Shared Brains", icon: FiUsers },
];
