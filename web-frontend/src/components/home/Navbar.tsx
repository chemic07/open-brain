import { useState } from "react";
import appLogo from "../../assets/images/logo/app_logo2.svg";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [active, setActive] = useState<string>("home");
  const navigate = useNavigate();

  const linkClass = (id: string) =>
    id === active
      ? "bg-blue-600 px-3 py-1 rounded-3xl text-white"
      : "px-3 py-1 rounded-3xl hover:text-white";

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
          <ul className="flex items-center gap-4 px-3 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-gray-300">
            <li className={linkClass("home")}>
              <a href="#home" onClick={() => setActive("home")}>
                Home
              </a>
            </li>

            <li className={linkClass("why")}>
              <a href="#why" onClick={() => setActive("why")}>
                Why
              </a>
            </li>

            <li className={linkClass("features")}>
              <a href="#features" onClick={() => setActive("features")}>
                Features
              </a>
            </li>

            <li className={linkClass("pricing")}>
              <a href="#pricing" onClick={() => setActive("pricing")}>
                Pricing
              </a>
            </li>

            <li className={linkClass("contact")}>
              <a href="#contact" onClick={() => setActive("contact")}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* go to auth*/}
        <div className="flex items-center gap-4">
          <Button
            text="Sign Up"
            variant="glass"
            size="sm"
            onClick={() => {
              navigate("/auth/signup");
            }}
            className="bg-white/5 border-white/10 hover:bg-white/10 px-6"
          />
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
