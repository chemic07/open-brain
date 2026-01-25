import HeroSection from "../components/home/HeroSection";
import TrustedBy from "../components/home/TrustedBy";
import WhyOpenBrain from "../components/home/whyOpenBrain";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-bg-dark antialiased">
      <main>
        <HeroSection />
        <TrustedBy />
        <WhyOpenBrain />

        {/* 4. Social Proof / Logo Cloud Placeholder */}
        {/* <section className="py-20 border-t border-white/5">
          <p className="text-center text-gray-500 text-sm font-medium mb-10">
            TRUSTED BY TEAMS AT
          </p>
          <div className="flex justify-center gap-12 opacity-30 grayscale">
            <div className="h-8 w-24 bg-gray-700 rounded-md animate-pulse" />
            <div className="h-8 w-24 bg-gray-700 rounded-md animate-pulse" />
            <div className="h-8 w-24 bg-gray-700 rounded-md animate-pulse" />
            <div className="h-8 w-24 bg-gray-700 rounded-md animate-pulse" />
          </div>
        </section> */}
      </main>

      {/* Footer Placeholder */}
      {/* <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-xs">
        &copy; {new Date().getFullYear()} NexusFlow AI. All rights reserved.
      </footer> */}
    </div>
  );
}
