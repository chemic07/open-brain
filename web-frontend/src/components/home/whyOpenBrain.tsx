import getLinkIcon from "../../assets/images/icons/get_link_icon.png";
import AISearchLinkIcon from "../../assets/images/icons/ai_search_icon.png";
import ShareLinkIcon from "../../assets/images/icons/share_link_icon.png";

import WhyChooseCard from "./whyChooseCard";
export default function WhyOpenBrain() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden py-24 px-45">
      {/* radial glow */}
      <div
        className="
          pointer-events-none absolute top-40 h-75 w-150
          bg-radial-[ellipse_at_center]
          from-sky-400 via-blue-400/20 to-gray-950
          blur-2xl
        "
      />

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* badge */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium text-gray-300 backdrop-blur-sm transition hover:border-white/20">
          Make your life easier
        </div>

        {/* text */}
        <div className="text-center max-w-2xl">
          <h1 className="text-white text-5xl font-semibold">Why Open Brain?</h1>
          <p className="text-gray-400 mt-5 font-medium">
            Open Brain helps you capture, organize, and rediscover everything
            you learn online. Save links, search with AI, and turn scattered
            resources into structured knowledge.
          </p>
        </div>

        <div className="mt-10 flex flex-row justify-center gap-5 flex-wrap">
          <WhyChooseCard
            imageSrc={getLinkIcon}
            iconSize={160}
            title="Second Brain for Links"
            subTitle="Save, organize, and instantly find any link using smart search and AI-powered understanding."
          />

          <WhyChooseCard
            iconSize={160}
            imageSrc={AISearchLinkIcon}
            title="AI Semantic Search"
            subTitle="Search by meaning, not just keywords. Ask questions and get the most relevant resources instantly."
          />

          <WhyChooseCard
            iconSize={160}
            imageSrc={ShareLinkIcon}
            title="Share Your Brain"
            subTitle="Create public or private collections and share your curated knowledge with friends or teams."
          />
        </div>
      </div>
    </section>
  );
}
