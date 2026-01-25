import schoolLogo from "../../assets/images/logo/school_logo.png";
import shriRamLogo from "../../assets/images/logo/shri_ram_logo.png";
import globalLogo from "../../assets/images/logo/global_logo.png";
import gyanGangaLogo from "../../assets/images/logo/gg_logo.png";

import React, { useRef, useEffect, useState } from "react";
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
  {
    name: "Central Academy School",
    url: schoolLogo,
    height: 50,
  },
  {
    name: "Shri Ram College",
    url: shriRamLogo,
    height: 50,
  },
  {
    name: "Gyan Ganga College",
    url: gyanGangaLogo,
    height: 80,
  },
  {
    name: "Global College",
    url: globalLogo,
    height: 45,
  },
];

const duplicatedLogos = [...logos, ...logos];

const LogoSocialProof: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      const totalWidth = trackRef.current.scrollWidth;
      setWidth(totalWidth / 2);
    }
  }, []);

  return (
    <section className="py-20 overflow-hidden bg-gra ">
      <div>
        <motion.div
          ref={trackRef}
          className="flex items-center gap-16 w-max"
          animate={{ x: [-0, -width] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              duration: 30,
            },
          }}
        >
          {duplicatedLogos.map((logo, i) => (
            <img
              key={i}
              src={logo.url}
              alt={logo.name}
              style={{ height: `${logo.height * 2}px` }}
              className="w-auto mr-10 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500"
            />
          ))}
        </motion.div>
      </div>
      <hr className="my-3 border-t border-gray-100 " />
    </section>
  );
};

export default LogoSocialProof;
