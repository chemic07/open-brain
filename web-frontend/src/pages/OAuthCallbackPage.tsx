import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { loadUser } from "../store/features/auth";
import { setToken } from "../utils/LocalStorage";
import LoadingAnimation from "../components/ui/LoadingAnimation";
import { showToast } from "../utils/toast";

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // Save token to localStorage
      setToken(token);

      // Load user data
      dispatch(loadUser());

      // Show success toast
      showToast({
        type: "success",
        message: "Successfully signed in!",
      });

      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      // No token received, redirect to signin with error
      showToast({
        type: "error",
        message: "Authentication failed. Please try again.",
      });
      navigate("/auth/signin");
    }
  }, [searchParams, navigate, dispatch]);

  return <LoadingAnimation />;
}
