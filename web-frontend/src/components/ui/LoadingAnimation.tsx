import { motion } from "framer-motion";

export default function LoadingAnimation() {
  return (
    <div className="h-screen bg-white dark:bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* center Dot */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full" />
          </motion.div>
        </div>

        {/* dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* text */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-base font-medium text-gray-900 dark:text-white/90 mt-2"
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );
}
