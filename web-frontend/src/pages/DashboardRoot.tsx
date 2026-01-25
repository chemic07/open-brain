import { Outlet } from "react-router-dom";

export default function DashboardRoot() {
  return (
    <>
      {/* <div className="bg-red-50"> dashboard layout</div> */}
      <Outlet></Outlet>
    </>
  );
}
