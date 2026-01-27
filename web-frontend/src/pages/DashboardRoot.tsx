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

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" replace />;
}
