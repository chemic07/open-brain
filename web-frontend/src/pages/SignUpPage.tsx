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

  /* ---------------- HANDLERS ---------------- */
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

  //error clear
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <main className="bg-radial-[at_50%_50%] from-blue-600 to-blue-900 to-90%">
      <div className="min-h-screen flex justify-center py-10">
        <div className="flex justify-center rounded-2xl overflow-hidden w-full max-w-5xl">
          {/* -------- LEFT PANEL -------- */}
          <div
            className={clsx(
              "bg-linear-to-br from-blue-100 via-blue-400 via-blue-200 to-blue-900",
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
              <p className="font-semibold text-3xl">
                Save Everything. Find Anything.
              </p>
              <p className="text-sm opacity-80 mt-1">
                Drop links, notes, and ideas into your second brain. Search them
                later with AI-powered semantic search and never lose context
                again.
              </p>
            </div>
          </div>

          {/* -------- RIGHT PANEL -------- */}
          <form
            onSubmit={handleSubmit}
            className="bg-black text-white py-10 px-15 w-1/2 flex flex-col justify-between"
          >
            <div className="flex justify-center items-center flex-col text-center gap-2">
              <h1 className="text-2xl font-semibold">Create Your Brain</h1>
              <p className="text-[12px] opacity-80 max-w-sm">
                Start building your personal knowledge hub and share curated
                collections with others.
              </p>
            </div>

            {/* -------- SOCIAL LOGIN (future) -------- */}
            <div className="flex flex-row gap-2">
              <AuthButton
                text="Continue with Google"
                variant="authOutline"
                width="full"
                headIcon={<FaGoogle size={18} />}
              />
              <AuthButton
                text="Continue with X"
                variant="authOutline"
                width="full"
                headIcon={<FiTwitter size={18} />}
              />
            </div>

            <div className="flex items-center my-4">
              <hr className="grow border-t border-gray-400" />
              <span className="px-2 text-gray-500 text-[13px]">or</span>
              <hr className="grow border-t border-gray-400" />
            </div>

            {/* -------- FORM -------- */}
            <div className="flex flex-col mb-5 gap-3">
              <div className="flex flex-row gap-4">
                <InputField
                  name="firstName"
                  placeholder="First name"
                  label="First Name"
                  required={true}
                />
                <InputField
                  name="lastName"
                  placeholder="Last name"
                  label="Last Name"
                  required={true}
                />
              </div>

              <InputField
                name="email"
                placeholder="you@openbrain.app"
                label="Email"
                required={true}
              />
              <InputField
                name="password"
                placeholder="Create a password"
                label="Password"
                type="password"
                required={true}
              />

              {error && (
                <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
              )}
            </div>

            {/* -------- SUBMIT -------- */}
            <AuthButton
              text={loading ? "Creating..." : "Create Account"}
              width="full"
              disabled={loading}
              type="submit"
            />

            <div className="flex flex-row justify-center gap-x-2 mt-3">
              <p className="text-gray-400">Already have a brain?</p>
              <Link
                to="/auth/signin"
                className="text-white font-semibold hover:underline"
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
