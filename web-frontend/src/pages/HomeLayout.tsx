import { Outlet } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import MobileMenu from "../components/home/MobileMenu";
import { useState } from "react";

export default function HomeLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar />
      <Outlet />
      <MobileMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
    </>
  );
}
