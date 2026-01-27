import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

export default function DashboardRoot() {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" replace />;
}
