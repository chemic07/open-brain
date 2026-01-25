import HeroSection from "../components/home/HeroSection";
import TrustedBy from "../components/home/TrustedBy";
import WhyOpenBrain from "../components/home/whyOpenBrain";
import Features from "../components/home/Features";
import FAQSection from "../components/home/FAQ";
import Footer from "../components/home/Footer";
import Pricing from "../components/home/Pricing";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-bg-dark antialiased">
      <main>
        <HeroSection />
        <TrustedBy />
        <WhyOpenBrain />
        <Features />
        <Pricing />
        <FAQSection />
        <Footer />
      </main>
    </div>
  );
}
