import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

export default function DashboardRoot() {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center text-black">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    // replace to remove the the page from history stack
    // state to make user if login failes the user login and redirect to the last stacked page
    <Navigate to="/auth/signin" replace />
  );
}
