import { motion } from "framer-motion";

interface WhyChooseCardProps {
  imageSrc: string;
  title: string;
  subTitle: string;
  iconSize: number;
}

export default function WhyChooseCard(props: WhyChooseCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      className="bg-[#0D1117]/80 backdrop-blur-md max-w-87.5 rounded-3xl flex flex-col justify-center items-center border border-white/10 p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
    >
      <div className="w-full aspect-square max-h-48 flex justify-center items-center rounded-2xl bg-linear-to-b from-gray-800/50 to-transparent border border-white/5 mb-6">
        <img
          src={props.imageSrc}
          alt={props.title}
          style={{ width: props.iconSize, height: props.iconSize }}
          className="object-contain filter brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        />
      </div>

      <div className="text-center md:text-left w-full">
        <h3 className="font-heading text-xl font-semibold text-white tracking-tight mb-3">
          {props.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {props.subTitle}
        </p>
      </div>
    </motion.div>
  );
}
