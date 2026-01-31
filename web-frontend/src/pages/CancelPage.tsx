import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoCloseCircle } from "react-icons/io5";

export default function CancelPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
        <div className="flex justify-center mb-6">
          <IoCloseCircle className="w-20 h-20 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-500 mb-8">
          No charges were made. You can try upgrading again whenever you're
          ready.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-xl transition-all"
        >
          <IoArrowBack /> Back to Dashboard
        </button>
      </div>
    </div>
  );
}
