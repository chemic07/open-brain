import { useState } from "react";
import appLogo from "../../assets/images/logo/app_logo2.svg";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Why", href: "#why" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

function NavBar() {
  const [active, setActive] = useState<string>("home");
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        {/* app logo  */}
        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <div className="bg-blue-600 rounded-lg p-1.5 flex items-center justify-center">
            <img src={appLogo} className="h-6 w-6 text-white" />
          </div>
          Open Brain
        </div>

        {/* link to sectin */}
        <div className="hidden md:block">
          <ul className="relative flex items-center gap-2 px-2 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-gray-300">
            {navItems.map((item) => (
              <li key={item.label} className="relative">
                {active === item.label && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute -inset-y-1 -inset-x-1 rounded-full bg-blue-600"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <a
                  href={item.href}
                  onClick={() => setActive(item.label)}
                  className={`relative z-10 px-4  rounded-full transition
                  ${active === item.label ? "text-white" : "hover:text-white"}
                  `}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* go to auth*/}
        <div className="flex items-center gap-4">
          <Button
            text={isAuthenticated ? "Dashboard" : "Sign In"}
            variant="glass"
            size="sm"
            onClick={() => {
              isAuthenticated
                ? navigate("/dashboard")
                : navigate("/auth/signin");
            }}
            className="bg-white/5 border-white/10 hover:bg-white/10 px-3 md:px-6"
          />
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
