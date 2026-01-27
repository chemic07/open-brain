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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Share Your Brain</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/20 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Generating share link...</p>
          </div>
        ) : shareLink ? (
          <div className="space-y-4">
            {/* Status Banner */}
            <div
              className={`border rounded-lg p-4 ${
                shareLink.isActive
                  ? "bg-green-50 border-sky-200"
                  : "bg-orange-50 border-orange-200"
              }`}
            >
              <div className="flex gap-3">
                <FiShare2 className="shrink-0 mt-0.5 " size={18} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-black/90">
                      {shareLink.isActive
                        ? "Sharing Active"
                        : "Sharing Disabled"}
                    </p>
                  </div>
                  <p className="text-sm text-gray-800">
                    {shareLink.isActive
                      ? "Anyone with this link can view all your saved links"
                      : "Link is disabled. Enable to allow access"}
                  </p>
                </div>
              </div>
            </div>

            {/* Share Link Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Share Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700 focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
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

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={() => window.open(shareUrl, "_black")}
                text="Preview"
                variant="outline"
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
