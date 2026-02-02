import { useState, useEffect } from "react";
import { FiX, FiCopy, FiCheck, FiShare2 } from "react-icons/fi";
import { useAppSelector } from "../../hooks/redux";
import Button from "./Button";

interface ShareModalProps {
  onClose: () => void;
}

export default function ShareModal({ onClose }: ShareModalProps) {
  const { shareLink, loading } = useAppSelector((state) => state.share);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (shareLink?.hash) {
      setShareUrl(`${window.location.origin}/share/${shareLink.hash}`);
    }
  }, [shareLink]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#181818] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* head */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white/90">
            Share Your Brain
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/20 dark:hover:bg-white/10 rounded-lg transition-colors text-gray-900 dark:text-white/90"
          >
            <FiX size={20} />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-white/50">
              Generating share link...
            </p>
          </div>
        ) : shareLink ? (
          <div className="space-y-4">
            {/* banner */}
            <div
              className={`border rounded-lg p-4 ${
                shareLink.isActive
                  ? "bg-green-50 dark:bg-white/10 border-sky-200 dark:border-white/20"
                  : "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20"
              }`}
            >
              <div className="flex gap-3">
                <FiShare2
                  className="shrink-0 mt-0.5 text-gray-900 dark:text-white/90"
                  size={18}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-black/90 dark:text-white/90">
                      {shareLink.isActive
                        ? "Sharing Active"
                        : "Sharing Disabled"}
                    </p>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-white/50">
                    {shareLink.isActive
                      ? "Anyone with this link can view all your saved links"
                      : "Link is disabled. Enable to allow access"}
                  </p>
                </div>
              </div>
            </div>

            {/* share input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-2">
                Your Share Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-white/5 text-sm text-gray-700 dark:text-white/90 focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center gap-2 font-medium"
                >
                  {copied ? (
                    <>
                      <FiCheck size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <FiCopy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => window.open(shareUrl, "_black")}
                text="Preview"
                variant={localStorage.theme === "dark" ? "glass" : "outline"}
                size={"sm"}
                disabled={!shareLink.isActive}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
