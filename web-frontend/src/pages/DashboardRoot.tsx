import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import LoadingAnimation from "../components/ui/LoadingAnimation";
import { fetchUserProfile } from "../store/features/user";
import { useEffect } from "react";

export default function DashboardRoot() {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log("fetching user profile");
    dispatch(fetchUserProfile());
  }, [dispatch, !userProfile]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    // replace to remove the the page from history stack
    // state to make user if login failes the user login and redirect to the last stacked page
    <Navigate to="/auth/signin" replace />
  );
}
