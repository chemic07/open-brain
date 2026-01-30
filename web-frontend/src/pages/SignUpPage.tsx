import { FiBarChart2, FiTwitter } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthButton from "../components/ui/AuthButton";
import InputField from "../components/ui/InputFiled";
import { signupUser, clearError } from "../store/features/auth";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

export default function SignUpPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    const resultAction = await dispatch(
      signupUser({
        userName: `${firstName} ${lastName}`,
        email: email as string,
        password: password as string,
      }),
    );

    if (signupUser.fulfilled.match(resultAction)) {
      navigate("/auth/signin");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <main className="bg-radial-[at_50%_50%] from-blue-600 to-blue-900 to-90% min-h-screen">
      <div className="flex justify-center items-center py-0 px-0 md:px-4 md:py-10">
        <div className="flex flex-col md:flex-row md:rounded-2xl overflow-hidden w-full max-w-5xl shadow-2xl min-h-[700px]">
          {/* left */}
          <div
            className={clsx(
              "bg-linear-to-br from-blue-100 via-blue-400 via-blue-200 to-blue-900",
              "text-white p-8 md:w-1/2 flex flex-col justify-between",
            )}
          >
            <div className="flex items-center">
              <div className="bg-white rounded-full p-1.5 shadow-sm">
                <FiBarChart2 className="text-black text-sm" />
              </div>
              <h1 className="ml-3 font-bold tracking-tight text-white ">
                Open Brain
              </h1>
            </div>

            <div className="mt-10 md:mt-0">
              <p className="font-semibold text-3xl md:text-4xl text-white leading-tight">
                Save Everything. <br className="hidden md:block" /> Find
                Anything.
              </p>
              <p className="text-sm md:text-base opacity-90 mt-3 text-white/80 max-w-sm">
                Drop links, notes, and ideas into your second brain. Search them
                later with AI-powered semantic search.
              </p>
            </div>
          </div>
          {/* right */}
          <form
            onSubmit={handleSubmit}
            className="bg-black text-white py-10 px-6 sm:px-10 md:px-15 md:w-1/2 flex flex-col justify-center gap-5"
          >
            <div className="flex flex-col text-center gap-2">
              <h1 className="text-2xl md:text-3xl font-semibold">
                Create Your Brain
              </h1>
              <p className="text-xs md:text-sm opacity-60">
                Start building your personal knowledge hub today.
              </p>
            </div>
            {/* social login */}
            <div className="flex flex-row gap-3">
              <AuthButton
                text="Google"
                variant="authOutline"
                width="full"
                headIcon={<FaGoogle size={18} />}
              />
              <AuthButton
                text="X"
                variant="authOutline"
                width="full"
                headIcon={<FiTwitter size={18} />}
              />
            </div>
            <div className="flex items-center">
              <hr className="grow border-t border-white/10" />
              <span className="px-3 text-gray-500 text-[11px] uppercase tracking-widest">
                or
              </span>
              <hr className="grow border-t border-white/10" />
            </div>
            {/* form */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <InputField
                  variant="dark"
                  name="firstName"
                  placeholder="First name"
                  label="First Name"
                  required
                />
                <InputField
                  variant="dark"
                  name="lastName"
                  placeholder="Last name"
                  label="Last Name"
                  required
                />
              </div>

              <InputField
                variant="dark"
                name="email"
                placeholder="you@openbrain.app"
                label="Email"
                required
              />
              <InputField
                variant="dark"
                name="password"
                placeholder="Create a password"
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
              text={loading ? "Creating..." : "Create Account"}
              width="full"
              disabled={loading}
              type="submit"
              className="mt-2"
            />
            <div className="flex flex-row justify-center gap-x-2 mt-2 text-sm">
              <p className="text-gray-400">Already have a brain?</p>
              <Link
                to="/auth/signin"
                className="text-white font-semibold hover:text-blue-400 transition-colors underline underline-offset-4"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
