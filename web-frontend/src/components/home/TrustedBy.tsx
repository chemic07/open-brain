import LogoSocialProof from "./LogoSocialProof";

export default function TrustedBy() {
  return (
    <section className="relative z-10 mt-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* Heading */}
        <p className="text-center text-gray-300 font-heading text-base md:text-2xl">
          Loved and trusted by students and educators from top schools &
          colleges
        </p>

        {/* Logos */}
        <LogoSocialProof />

        {/* Divider */}
      </div>
    </section>
  );
}
