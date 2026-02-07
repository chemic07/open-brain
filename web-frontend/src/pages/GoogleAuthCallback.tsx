import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setToken } from "../utils/LocalStorage";
import LoadingAnimation from "../components/ui/LoadingAnimation";
import { toast } from "sonner";
import { useAppDispatch } from "../hooks/redux";
import { loadUser } from "../store/features/auth";

const GoogleAuthCallback = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      toast.error("Google authentication failed");
      navigate("/auth/signin");
      return;
    }

    if (token) {
      setToken(token);
      toast.success("Signed in with Google");
      dispatch(loadUser()).then(() => {
        navigate("/dashboard");
      });
      console.log("redirecting to dashboard");
      navigate("/dashboard");
    } else {
      toast.error("Invalid Google login");
      console.log("redirecting to signin");
      navigate("/auth/signin");
    }
  }, [navigate, searchParams]);

  return <LoadingAnimation />;
};

export default GoogleAuthCallback;
