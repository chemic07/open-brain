import { FiBarChart2, FiTwitter } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthButton from "../components/ui/AuthButton";
import InputField from "../components/ui/InputFiled";
import { loginUser, clearError } from "../store/features/auth";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { showToast } from "../utils/toast";

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      showToast({
        type: "success",
        message: "Welcome back!",
        options: { description: "You have successfully logged in." },
      });
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <main className="bg-radial-[at_50%_50%] from-blue-600 to-blue-900 to-90% min-h-screen">
      <div className="flex justify-center items-center min-h-screen py-0 px-0 md:px-4 md:py-10">
        <div className="flex flex-col md:flex-row md:rounded-2xl overflow-hidden w-full max-w-4xl min-h-screen md:min-h-120 shadow-2xl">
          {/* left*/}
          <div
            className={clsx(
              "bg-linear-to-br from-blue-100 via-blue-400 via-blue-200 to-blue-900",
              "text-white p-8 md:w-1/2 flex flex-col justify-between h-64 md:h-auto",
            )}
          >
            <div className="flex items-center">
              <div className="bg-white rounded-full p-1.5">
                <FiBarChart2 className="text-black text-base" />
              </div>
              <h1 className="ml-3 font-bold tracking-tight text-white">
                Open Brain
              </h1>
            </div>

            <div className="mt-4 md:mt-0">
              <p className="font-semibold text-2xl md:text-4xl text-white">
                Welcome Back 👋
              </p>
              <p className="text-xs md:text-sm opacity-90 mt-1 md:mt-2 text-white/80 max-w-xs">
                Sign in to continue building your second brain.
              </p>
            </div>
          </div>

          {/* right */}
          <form
            onSubmit={handleSubmit}
            className="bg-black text-white py-10 px-6 sm:px-10 md:px-15 flex-1 md:w-1/2 flex flex-col justify-center gap-6"
          >
            <div className="flex flex-col text-center gap-2">
              <h1 className="text-2xl md:text-3xl font-semibold">Sign In</h1>
              <p className="text-xs md:text-sm opacity-60">
                Enter your credentials to access your workspace.
              </p>
            </div>

            {/* social login */}
            <div className="flex flex-row gap-3">
              <AuthButton
                type="button"
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

            <div className="flex items-center">
              <hr className="grow border-t border-white/10" />
              <span className="px-3 text-gray-500 text-xs uppercase tracking-widest">
                Or
              </span>
              <hr className="grow border-t border-white/10" />
            </div>

            <div className="flex flex-col gap-4">
              <InputField
                variant="dark"
                name="email"
                placeholder="e.g. john@email.com"
                label="Email"
                required
              />
              <InputField
                variant="dark"
                name="password"
                placeholder="********"
                label="Password"
                type="password"
                required
              />

              {error && (
                <p className="text-red-500 text-xs text-center animate-pulse">
                  {error}
                </p>
              )}
            </div>

            <AuthButton
              type="submit"
              text={loading ? "Signing in..." : "Sign In"}
              disabled={loading}
              className="mt-2"
            />

            <div className="flex flex-row justify-center gap-x-2 mt-2 text-sm">
              <p className="text-gray-400">Don’t have an account?</p>
              <Link
                to="/auth/signup"
                className="text-white font-semibold hover:text-blue-400 transition-colors underline underline-offset-4"
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
