import { motion, AnimatePresence } from "framer-motion";
import { FiDollarSign, FiGrid, FiHome, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { AiFillQuestionCircle, AiOutlineContacts } from "react-icons/ai";

const navItems = [
  { label: "Home", href: "#home", icon: <FiHome size={26} /> },
  { label: "Why", href: "#why", icon: <AiFillQuestionCircle size={26} /> },
  {
    label: "Features",
    href: "#features",
    icon: <FiGrid size={26} />,
  },
  {
    label: "Pricing",
    href: "#pricing",
    icon: <FiDollarSign size={26} />,
  },
  { label: "Contact", href: "#contact", icon: <AiOutlineContacts size={26} /> },
];

export default function MobileMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 md:hidden
        h-14 w-14 rounded-2xl
        bg-transparent text-white
        flex items-center justify-center
        border border-white/20
        shadow-lg"
      >
        <FiMenu size={26} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 md:hidden
            w-64 rounded-2xl
            bg-white/10 backdrop-blur-xl
            border border-white/20
            shadow-2xl p-4"
          >
            {/* close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute bottom-3 right-3
              h-10 w-10 rounded-full
              border border-white/30
              text-white flex items-center justify-center"
            >
              <FiX />
            </button>

            {/* items */}
            <div className="flex flex-col gap-2 text-white">
              {navItems.map((item) => (
                <div className="flex flex-row items-center justify-start ">
                  {item.icon}
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3
                  px-4 py-3 rounded-xl
                  hover:bg-white/10 transition"
                  >
                    {item.label}
                  </a>
                </div>
              ))}

              <hr className="border-white/20 my-2" />

              <button
                onClick={() => {
                  setIsOpen(false);
                  isAuthenticated
                    ? navigate("/dashboard")
                    : navigate("/auth/signin");
                }}
                className="px-2 w-40 py-3 rounded-xl
                bg-blue-600/80 hover:bg-blue-600
                transition text-center"
              >
                {isAuthenticated ? "Dashboard" : "Sign In"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
