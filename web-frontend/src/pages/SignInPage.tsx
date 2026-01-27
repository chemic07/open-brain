import { FiBarChart2, FiTwitter } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Logic Imports
import AuthButton from "../components/ui/AuthButton";
import InputField from "../components/ui/InputFiled";
import { loginUser, clearError } from "../store/features/auth";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Get state from Redux
  const { loading, error } = useAppSelector((state) => state.auth);

  /* ---------------- HANDLERS ---------------- */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const resultAction = await dispatch(loginUser({ email, password }));

    // If login is successful, navigate to dashboard
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  /* ---------------- CLEANUP ---------------- */
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <main className="bg-radial-[at_50%_50%] from-blue-600 to-blue-900 to-90%">
      <div className=" min-h-screen flex justify-center py-10">
        <div className="flex justify-center rounded-2xl overflow-hidden w-full max-w-5xl">
          <div
            className={clsx(
              "bg-linear-to-br from-blue-100 via-blue-400 via-blue-200 to-black-100",
              "text-white p-6 w-1/2 flex flex-col justify-between",
            )}
          >
            <div className="flex items-center">
              <div className="bg-white rounded-full p-1">
                <FiBarChart2 className="text-black text-sm" />
              </div>
              <h1 className="ml-3 font-semibold">Open Brain</h1>
            </div>

            <div>
              <p className="font-semibold text-3xl">Welcome Back 👋</p>
              <p className="text-sm opacity-80 mt-1">
                Sign in to continue building your second brain and collaborating
                with your friends.
              </p>
            </div>
          </div>

          {/* ADDED: <form> and onSubmit logic */}
          <form
            onSubmit={handleSubmit}
            className="bg-black text-white py-10 px-15 w-1/2 flex flex-col justify-between"
          >
            <div className="flex justify-center items-center flex-col text-center gap-2">
              <h1 className="text-2xl font-semibold">
                Sign In to Your Account
              </h1>
              <p className="text-[12px] opacity-80 max-w-sm">
                Enter your credentials to access your workspace.
              </p>
            </div>

            <div className="flex flex-row gap-2">
              <AuthButton
                type="button" // Prevent social buttons from submitting the form
                text="Google"
                variant="authOutline"
                width="full"
                headIcon={<FaGoogle size={18} />}
              />
              <AuthButton
                type="button"
                text="X"
                variant="authOutline"
                width="full"
                headIcon={<FiTwitter size={18} />}
              />
            </div>

            <div className="flex items-center my-4">
              <hr className="grow border-t border-gray-400" />
              <span className="px-2 text-gray-500 text-[13px]">Or</span>
              <hr className="grow border-t border-gray-400" />
            </div>

            <div className="flex flex-col mb-5 gap-3">
              {/* ADDED: name props for FormData to work */}
              <InputField
                name="email"
                placeholder="e.g. john@email.com"
                label="Email"
                required
              />
              <InputField
                name="password"
                placeholder="********"
                label="Password"
                type="password"
                required
              />

              {/* ADDED: Dynamic Error Display */}
              {error && (
                <p className="text-red-500 text-xs text-center mt-2">{error}</p>
              )}
            </div>

            {/* UPDATED: type="submit" and loading state */}
            <AuthButton
              type="submit"
              text={loading ? "Signing in..." : "Sign In"}
              disabled={loading}
            />

            <div className="flex flex-row justify-center gap-x-2">
              <p className="text-gray-400">Don’t have an account?</p>
              <Link
                to="/auth/signup"
                className="text-white font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
