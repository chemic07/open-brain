import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiZap,
  FiAlertCircle,
  FiCreditCard,
  FiTrendingUp,
  FiInfo,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchUserProfile } from "../../store/features/user";
import { getMaxTokens } from "../../utils/getToken";
import api from "../../services/api";
import Button from "../ui/Button";
import { showToast } from "../../utils/toast";

export default function SubscriptionTab() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userProfile);
  const [cancelLoading, setCancelLoading] = useState(false);
  console.log("user" + user);
  const plan = user?.plan || "FREE";
  const maxTokens = getMaxTokens(plan);
  const remaining = user?.tokens.totalRemaining || 0;

  //cal per
  const tokenPercentage = Math.min(
    Math.max((remaining / maxTokens) * 100, 0),
    100,
  );
  const isLowTokens = tokenPercentage < 20;

  const handleCancelSubscription = async () => {
    if (
      !window.confirm(
        "Are you sure? Your pro features will stop at the end of the billing cycle.",
      )
    )
      return;

    setCancelLoading(true);
    try {
      await api.post("/payment/cancel");
      await dispatch(fetchUserProfile());
      showToast({
        type: "success",
        message: "Subscription cancelled successfully",
      });
    } catch (error) {
      showToast({ type: "error", message: "Failed to cancel subscription" });
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* token card */}
      <section className="bg-white dark:bg-[#181818] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-white/10 rounded-lg">
                <FiZap className="text-blue-600 dark:text-white/40" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white/90">
                  AI Token Usage
                </h2>
                <p className="text-sm text-gray-500 dark:text-white/50">
                  Monthly allowance based on {plan} plan
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900 dark:text-white/90">
                {remaining.toLocaleString()}
              </span>
              <span className="text-gray-400 dark:text-white/35 font-medium">
                {" "}
                / {maxTokens.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="relative w-full h-3 bg-sky-600 dark:bg-white/10 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full transition-all duration-1000 ease-out rounded-full ${
                isLowTokens
                  ? "bg-orange-500 dark:bg-orange-400"
                  : "bg-blue-600 dark:bg-sky-600"
              }`}
              style={{ width: `${tokenPercentage}%` }}
            />
          </div>

          {isLowTokens && (
            <div className="flex items-center gap-2 text-orange-700 dark:text-white/50 bg-orange-50 dark:bg-white/10 p-3 rounded-xl text-sm border border-orange-100 dark:border-white/20">
              <FiAlertCircle className="shrink-0" />
              <p>
                You've used over 80% of your tokens. Upgrade to keep using AI
                features.
              </p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-white/5 px-6 py-3 border-t border-black/20 dark:border-white/10 flex items-center gap-2">
          <FiInfo className="text-gray-400 dark:text-white/35" size={14} />
          <p className="text-xs text-gray-500 dark:text-white/50">
            Tokens reset at the start of every billing cycle.
          </p>
        </div>
      </section>

      {/* plan details */}
      <section className="bg-white dark:bg-[#181818] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-purple-50 dark:bg-white/10 rounded-lg">
            <FiCreditCard
              className="text-blue-600 dark:text-white/40"
              size={20}
            />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white/90">
            Subscription Plan
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white/90 capitalize">
                {plan} Plan
              </h3>
              {user?.isSubscribed && (
                <span className="px-2 py-0.5 bg-green-100 dark:bg-white/10 text-green-700 dark:text-white/80 text-xs font-bold rounded-full uppercase tracking-wider">
                  Active
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-white/50">
              {user?.isSubscribed
                ? "Your subscription is currently active."
                : "You are currently using the limited free version."}
            </p>
          </div>

          {!user?.isSubscribed ? (
            <Button
              text="Explore Plans"
              variant="primary"
              onClick={() => navigate("/upgrade")}
              headIcon={<FiTrendingUp />}
              className="w-full md:w-auto px-8"
            />
          ) : (
            <Button
              text={cancelLoading ? "Cancelling..." : "Cancel Plan"}
              variant="outline"
              onClick={handleCancelSubscription}
              disabled={cancelLoading}
              className="dark:text-white dark:border-white/10"
            />
          )}
        </div>
      </section>
    </div>
  );
}
