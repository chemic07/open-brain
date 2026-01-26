import schoolLogo from "../../assets/images/logo/school_logo.png";
import shriRamLogo from "../../assets/images/logo/shri_ram_logo.png";
import globalLogo from "../../assets/images/logo/global_logo.png";
import gyanGangaLogo from "../../assets/images/logo/gg_logo.png";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const logos = [
  {
    name: "Google",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    height: 32,
  },
  {
    name: "Stripe",
    url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    height: 32,
  },
  {
    name: "Meta",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    height: 30,
  },
  {
    name: "Salesforce",
    url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    height: 34,
  },
  { name: "Central Academy School", url: schoolLogo, height: 46 },
  { name: "Shri Ram College", url: shriRamLogo, height: 46 },
  { name: "Gyan Ganga College", url: gyanGangaLogo, height: 60 },
  { name: "Global College", url: globalLogo, height: 44 },
];

const duplicated = [...logos, ...logos];

export default function LogoSocialProof() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [halfWidth, setHalfWidth] = useState(0);

  useEffect(() => {
    if (!trackRef.current) return;

    const updateWidth = () => {
      setHalfWidth(trackRef.current!.scrollWidth / 2);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-16 bg-transparent">
      {/* Clipping Wrapper */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="inline-flex items-center gap-16"
          animate={{ x: [-0, -halfWidth] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicated.map((logo, i) => (
            <div key={i} className="flex items-center justify-center shrink-0">
              <img
                src={logo.url}
                alt={logo.name}
                style={{ height: logo.height }}
                className="w-auto opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <hr className="mt-10 border-white/10" />
    </section>
  );
}
