import { Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <div className="bg-red-300">Home Page</div>
      <Outlet></Outlet>
    </>
  );
}
