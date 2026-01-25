import appLogo from "../../assets/images/logo/app_logo2.svg";
import { NavLink } from "react-router-dom";
import Button from "../ui/Button";

function NavBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <div className="bg-blue-600 rounded-lg p-1.5 flex items-center justify-center">
            {/* Using a custom star/spark icon style to match the image */}
            {/* <FiBarChart2 className="text-white rotate-180" size={20} /> */}
            <img src={appLogo} className="h-6 w-6 text-white" />
          </div>
          Open Brain
        </div>

        {/* 2. Centered Navigation Island */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-8 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-gray-300">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-white" : "hover:text-white transition"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/features" className="hover:text-white transition">
                Features
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className="hover:text-white transition">
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/pricing" className="hover:text-white transition">
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-white transition">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* 3. Action Section */}
        <div className="flex items-center gap-4">
          <Button
            text="Sign Up"
            variant="glass"
            size="sm"
            className="bg-white/5 border-white/10 hover:bg-white/10 px-6"
          />
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
