import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import HomeLayout from "./pages/HomeLayout";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardRoot from "./pages/DashboardRoot";
import DashboardOverview from "./pages/DashboardOverview";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { useEffect } from "react";
import { loadUser } from "./store/features/auth";
import { fetchUserProfile } from "./store/features/user/userThunk";
import { getToken } from "./utils/LocalStorage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import UpgradePage from "./pages/UpgradePage";
import LoadingAnimation from "./components/ui/LoadingAnimation";
import GoogleAuthCallback from "./pages/GoogleAuthCallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <HomePage></HomePage> }],
  },

  {
    path: "/auth/signin",
    element: <SignInPage />,
  },
  {
    path: "/auth/signup",
    element: <SignUpPage />,
  },

  {
    path: "/auth/google/callback",
    element: <GoogleAuthCallback />,
  },

  {
    path: "/dashboard",
    element: <DashboardRoot />,
    children: [{ index: true, element: <DashboardOverview /> }],
  },

  {
    path: "/upgrade",
    element: <UpgradePage />,
  },

  {
    path: "/payment/success",
    element: <SuccessPage />,
  },
  {
    path: "/payment/cancel",
    element: <CancelPage />,
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const { userProfile, loading } = useAppSelector((state) => state.user);
  const token = getToken();

  useEffect(() => {
    if (token) {
      // Load auth user data
      dispatch(loadUser());
      // Fetch full user profile
      if (!userProfile) {
        dispatch(fetchUserProfile());
      }
    }
  }, [dispatch, token, userProfile]);

  // Show loading screen while fetching initial data
  // Only show loading if we have a token but no user data yet
  if (token && loading && !userProfile) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
