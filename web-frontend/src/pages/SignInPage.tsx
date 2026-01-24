import { FiBarChart2, FiTwitter } from "react-icons/fi";
import AuthButton from "../components/ui/AuthButton";
import { FaGoogle } from "react-icons/fa";
import InputField from "../components/ui/InputFiled";
import clsx from "clsx";
import { Link } from "react-router-dom";

export default function SignInPage() {
  return (
    <div className="bg-linear-to-br from-blue-900 via-blue-700 to-blue-900 min-h-screen flex justify-center py-10">
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

        <div className="bg-black text-white py-10 px-15 w-1/2 flex flex-col justify-between">
          <div className="flex justify-center items-center flex-col text-center gap-2">
            <h1 className="text-2xl font-semibold">Sign In to Your Account</h1>
            <p className="text-[12px] opacity-80 max-w-sm">
              Enter your credentials to access your workspace.
            </p>
          </div>

          <div className="flex flex-row gap-2">
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

          <div className="flex items-center my-4">
            <hr className="grow border-t border-gray-400" />
            <span className="px-2 text-gray-500 text-[13px]">Or</span>
            <hr className="grow border-t border-gray-400" />
          </div>

          <div className="flex flex-col mb-5 gap-3">
            <InputField placeholder="e.g. john@email.com" label="Email" />
            <InputField
              placeholder="********"
              label="Password"
              type="password"
            />
          </div>

          <AuthButton text="Sign In" />

          <div className="flex flex-row justify-center gap-x-2">
            <p className="text-gray-400">Don’t have an account?</p>
            <Link
              to="/auth/signup"
              className="text-white font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
