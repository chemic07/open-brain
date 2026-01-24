import { FiBarChart2 } from "react-icons/fi";

function NavBar() {
  return (
    <header className="bg-black border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-semibold">
          <div className="bg-blue-200 rounded-3xl p-1">
            <FiBarChart2 className="text-white text-sm" />
          </div>
          Open Brain
        </div>

        <ul className="flex items-center gap-2 text-gray-300">
          <li></li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
