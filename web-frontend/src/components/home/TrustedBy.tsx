import LogoSocialProof from "./LogoSocialProof";

export default function () {
  return (
    <section className=" z-10 mt-20 px-6">
      <div className="max-w-7xl mx-auto flex justify-center items-center flex-col">
        <div>
          <p className="text-white text-2xl font-sans">
            Loved and trusted by over 100 humans at top collage and schools
          </p>
        </div>
        <LogoSocialProof />
        <hr className=" border-t border-red-400" />
      </div>
    </section>
  );
}
