import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { FiSend, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import magicIcon from "../../assets/images/icons/magic_icon.svg";
import {
  sendMessage,
  addUserMessage,
  clearChat,
} from "../../store/features/chat";
import InputField from "../ui/InputFiled";

export default function AiChatContent() {
  const dispatch = useAppDispatch();
  const { messages, loading, sources } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.auth);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // clear chat
  useEffect(() => {
    return () => {
      dispatch(clearChat());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");

    // add mg to ui
    dispatch(addUserMessage(userMessage));

    // add msg in history
    await dispatch(
      sendMessage({
        message: userMessage,
        conversationHistory: messages,
      }),
    );
  };

  const handleClear = () => {
    dispatch(clearChat());
  };

  const suggestedQuestions = [
    "What Tweets  did I save?",
    "Article where Elon was taking about OpenAI",
    "What links from reddit do I have?",
    "Summarize my open note related content",
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-transparent dark:to-transparent flex flex-col ">
      <div className="max-w-full mx-auto w-full flex flex-col h-screen">
        <div className="p-6 pb-4 bg-gray-50 dark:bg-transparent border-b border-black/20 dark:border-white/10 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl dark:text-white font-bold text-gray-800">
                Chat with Your{" "}
                <span className="text-blue-500 dark:text-blue-400">Brain.</span>
              </h1>{" "}
            </div>
            {messages.length > 0 && (
              <button
                onClick={handleClear}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                title="Clear conversation"
              >
                <FiTrash2 size={20} />
              </button>
            )}
          </div>
        </div>
        {/* msg container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar px-10 ">
          {/* welcome hai ji */}
          {messages.length === 0 && (
            <div className="text-center mt-12">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Hello, {user?.userName}! 👋
              </h2>
              <p className="text-gray-600 dark:text-white/70 mb-6">
                Ask me anything about your saved content
              </p>
              {/* suggestion */}
              <div className="max-w-2xl mx-auto">
                <p className="text-sm text-gray-500 dark:text-white/50 mb-3">
                  Try asking:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      className="p-3 bg-white dark:bg-[#212121] border border-gray-200 dark:border-white/10 rounded-lg hover:border-blue-500 dark:hover:border-white/20 hover:bg-blue-50 dark:hover:bg-[#303030] transition-all text-left text-sm text-gray-700 dark:text-white/80 hover:text-blue-700 dark:hover:text-white/90"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* <UpgradeModal onClose={() => {}} /> */}

          {/* msges */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-blue-600 dark:bg-blue-500 text-white"
                    : "bg-white dark:bg-[#181818] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white/90 shadow-sm"
                }`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
                {msg.timestamp && (
                  <p
                    className={`text-[10px] mt-2 ${
                      msg.role === "user"
                        ? "text-gray-300 dark:text-white/50"
                        : "text-gray-400 dark:text-white/35"
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </div>
          ))}
          {/* loading bar */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Sources Display */}
        {sources.length > 0 && (
          <div className="px-10 pb-4">
            <div className="bg-blue-50 dark:bg-white/10 border border-blue-200 dark:border-white/20 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-900 dark:text-white/70 mb-3">
                Sources referenced:
              </p>
              <div className="flex flex-wrap gap-2">
                {sources.map((source) => (
                  <a
                    key={source.id}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white dark:bg-white/5 px-3 py-2 rounded-lg text-sm text-blue-600 dark:text-gray-300/80 hover:bg-black/10 dark:hover:bg-white/15 transition-colors border border-blue-200 dark:border-white/20"
                  >
                    <span className="font-medium">
                      {source.title.slice(0, 40)}
                      {source.title.length > 40 ? "..." : ""}
                    </span>
                    <span className="text-xs text-white bg-blue-900 dark:bg-white/30 dark:text- px-2 py-0.5 rounded-full">
                      {source.similarity}%
                    </span>
                    <FiExternalLink size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* input */}
        <div className="p-6 pt-4 bg-white dark:bg-black border-t border-black/25 dark:border-white/10 sticky bottom-0">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <InputField
              icon={<img src={magicIcon} alt="magic" className="h-5 w-5" />}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your saved content..."
              disabled={loading}
              variant="light"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <FiSend size={18} />
                  <span className="hidden md:inline">Send</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
