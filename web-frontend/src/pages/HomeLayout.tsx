import { Outlet } from "react-router-dom";
import Navbar from "../components/home/Navbar";

export default function HomeLayout() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
}
