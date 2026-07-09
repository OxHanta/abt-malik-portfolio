import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const curtain = useAnimation();
  const nameControls = useAnimation();
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Step 1: fade in name
    nameControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    });

    // Step 2: animate counter 0→100 over 900ms
    const start = performance.now();
    const countDuration = 900;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / countDuration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Step 3: brief pause then slide up
        setTimeout(async () => {
          await nameControls.start({
            opacity: 0,
            transition: { duration: 0.25 },
          });
          await curtain.start({
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          });
          document.body.style.overflow = "";
          onComplete();
        }, 250);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#0D0D0D] flex flex-col items-center justify-center"
      animate={curtain}
    >
      {/* Tagline — each word staggers in */}
      <motion.h1
        style={{ fontFamily: "'Inter Tight', sans-serif" }}
        className="text-white text-5xl md:text-7xl font-bold leading-none tracking-tight text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={nameControls}
      >
        {["Design.", "Motion.", "Reality."].map((word, i) => (
          <motion.span
            key={word}
            className="inline-block mr-[0.25em] last:mr-0"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.15 }}
          >
            {i === 2 ? (
              <span className="text-[#FF442B]">{word}</span>
            ) : (
              word
            )}
          </motion.span>
        ))}
      </motion.h1>

      {/* Counter */}
      <motion.div
        className="mt-6 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-white/20 text-xs uppercase tracking-[0.3em]"
        >
          Loading
        </span>
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-[#FF442B] text-xs tabular-nums w-[3ch]"
        >
          {String(count).padStart(3, "0")}
        </span>
      </motion.div>

      {/* Thin progress line */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-[#1a1a1a] w-full">
        <motion.div
          className="h-full bg-[#FF442B]"
          style={{ width: `${count}%` }}
        />
      </div>
    </motion.div>
  );
}
