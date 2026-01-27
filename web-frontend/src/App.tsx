import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomeLayout from "./pages/HomeLayout";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardRoot from "./pages/DashboardRoot";
import DashboardOverview from "./pages/DashboardOverview";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { useAppDispatch } from "./hooks/redux";
import { useEffect } from "react";
import { loadUser } from "./store/features/auth";
import { getToken } from "./utils/LocalStorage";

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
    path: "/dashboard",
    element: <DashboardRoot />,
    children: [{ index: true, element: <DashboardOverview /> }],
  },
]);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
