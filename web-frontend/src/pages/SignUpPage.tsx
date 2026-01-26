import { FiBarChart2, FiTwitter } from "react-icons/fi";
import AuthButton from "../components/ui/AuthButton";
import { FaGoogle } from "react-icons/fa";
import InputField from "../components/ui/InputFiled";
import clsx from "clsx";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <main className="bg-radial-[at_50%_50%] from-blue-600 to-blue-900 to-90%">
      <div className=" min-h-screen flex justify-center py-10">
        <div className="flex justify-center rounded-2xl overflow-hidden w-full max-w-5xl">
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

          <div className="bg-black text-white py-10 px-15 w-1/2 flex flex-col justify-between">
            <div className="flex justify-center items-center flex-col text-center gap-2">
              <h1 className="text-2xl font-semibold">Create Your Brain</h1>
              <p className="text-[12px] opacity-80 max-w-sm">
                Start building your personal knowledge hub and share curated
                collections with others.
              </p>
            </div>

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

            <div className="flex flex-col mb-5 gap-3">
              <div className="flex flex-row gap-4">
                <InputField placeholder="First name" label="First Name" />
                <InputField placeholder="Last name" label="Last Name" />
              </div>

              <InputField placeholder="you@openbrain.app" label="Email" />
              <InputField placeholder="Create a password" label="Password" />
            </div>

            <AuthButton text="Create Account" />

            <div className="flex flex-row justify-center gap-x-2">
              <p className="text-gray-400">Already have a brain?</p>
              <Link
                to="/auth/signin"
                className="text-white font-semibold hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
