import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { IoCheckmarkCircle, IoCalendarOutline } from "react-icons/io5"; // Ionicons
import { BsCreditCard, BsZoomIn } from "react-icons/bs"; // Bootstrap Icons

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
    }
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <IoCheckmarkCircle className="w-20 h-20 text-green-500" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful
          </h1>
          <p className="text-gray-500 mb-8">
            Thank you for upgrading to the{" "}
            <span className="font-semibold text-blue-600">PLUS</span> plan!
          </p>

          {/* Details Table */}
          <div className="space-y-4 border-t border-b border-gray-100 py-6 mb-8 text-left">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 flex items-center gap-3 text-sm">
                <BsCreditCard className="text-gray-400 w-4 h-4" /> Amount Paid:
              </span>
              <span className="font-bold text-gray-900">$1.49 USD</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 flex items-center gap-3 text-sm">
                <IoCalendarOutline className="text-gray-400 w-4 h-4" /> Billing
                Period:
              </span>
              <span className="font-medium text-gray-900">Monthly</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 flex items-center gap-3 text-sm">
                <BsZoomIn className="text-blue-500 w-4 h-4" /> Tokens Added:
              </span>
              <span className="font-bold text-blue-600">10,000</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-200"
          >
            Return to Dashboard
          </button>

          <p className="mt-6 text-xs text-gray-400 tracking-wide uppercase">
            Receipt sent to your registered email
          </p>
        </div>
      </div>
    </div>
  );
}
