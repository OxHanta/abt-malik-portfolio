import { motion } from "framer-motion";

export function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-white py-12 border-b border-border flex whitespace-nowrap">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 10,
        }}
        className="flex space-x-16 min-w-max"
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-4xl md:text-6xl font-display font-bold text-black uppercase">
            — Alex Graham
          </span>
        ))}
      </motion.div>
    </div>
  );
}
