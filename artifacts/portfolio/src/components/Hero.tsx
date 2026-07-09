import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

const CYCLING_WORDS = ["Design", "Shoot", "Fly"];
const GLITCH_CHARS = "!<>-_\\/[]{}=+*^?#@%&$";

function useScramble(target: string) {
  const [display, setDisplay] = useState(target);
  const iterRef = useRef(0);
  const idRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    iterRef.current = 0;
    if (idRef.current) clearInterval(idRef.current);

    idRef.current = setInterval(() => {
      const iter = iterRef.current;
      const maxIter = target.length * 4;

      setDisplay(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < Math.floor(iter / 4)) return char;
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );

      iterRef.current++;
      if (iter >= maxIter) {
        setDisplay(target);
        if (idRef.current) clearInterval(idRef.current);
      }
    }, 35);

    return () => {
      if (idRef.current) clearInterval(idRef.current);
    };
  }, [target]);

  return display;
}

export function Hero() {
  const [malikHovered, setMalikHovered] = useState(false);
  const [mobileTapped, setMobileTapped] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const scrambled = useScramble(CYCLING_WORDS[wordIndex]);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll tracking scoped to the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Row 1 drifts left as you scroll
  const rawRow1X = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const row1X = useSpring(rawRow1X, { stiffness: 80, damping: 20 });

  // Row 2 drifts right as you scroll
  const rawRow2X = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const row2X = useSpring(rawRow2X, { stiffness: 80, damping: 20 });

  // Mouse tilt tracking — normalised -1 to +1
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateY = useSpring(useTransform(tiltX, [-1, 1], [-14, 14]), { stiffness: 90, damping: 18 });
  const rotateX = useSpring(useTransform(tiltY, [-1, 1], [8, -8]), { stiffness: 90, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    tiltX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    tiltY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Auto-dismiss mobile photos after 5s
  useEffect(() => {
    if (!mobileTapped) return;
    const t = setTimeout(() => setMobileTapped(false), 5000);
    return () => clearTimeout(t);
  }, [mobileTapped]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0D0D0D] flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 select-none flex flex-col items-start w-fit mx-auto px-6">

        {/* Row 1 — drifts left on scroll */}
        <motion.div
          style={{ x: row1X }}
          className="flex items-baseline flex-wrap gap-x-3"
        >
          <span
            style={{ fontFamily: "'Antic', sans-serif" }}
            className="text-5xl md:text-6xl xl:text-7xl text-white leading-none"
          >
            Hello,
          </span>

          <span
            style={{ fontFamily: "'Gluten', cursive" }}
            className="relative text-4xl md:text-5xl xl:text-6xl text-white font-black leading-none cursor-default select-none"
            onMouseEnter={() => !isMobile && setMalikHovered(true)}
            onMouseLeave={() => !isMobile && setMalikHovered(false)}
            onClick={() => isMobile && setMobileTapped(v => !v)}
          >
            I'm Malik
            <sup
              style={{ fontFamily: "'Gluten', cursive" }}
              className="text-[#B8752A] text-xl md:text-2xl font-black align-super ml-0.5"
            >
              *
            </sup>
          </span>
        </motion.div>

        {/* Row 2 — drifts right on scroll */}
        <motion.div
          style={{ x: row2X }}
          className="flex items-end gap-5 mt-1 pl-[40px] pr-[40px]"
        >
          <p
            style={{ fontFamily: "'Nunito', sans-serif" }}
            className="text-xs md:text-sm text-white/50 leading-snug font-normal shrink-0"
          >
            bringing ideas to life
            <br />
            across every medium
          </p>
          <span
            style={{ fontFamily: "'Chivo Mono', monospace" }}
            className="flex items-end gap-3 text-4xl md:text-5xl xl:text-6xl text-white font-black leading-none tracking-tight"
          >
            I
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={CYCLING_WORDS[wordIndex]}
                className="text-[#FF442B] inline-block"
                style={{ minWidth: "6ch", lineHeight: 1.1 }}
                initial={{ opacity: 0, x: -6 }}
                animate={{
                  opacity: [0, 1, 0.7, 1, 0.85, 1],
                  x: [-6, 3, -2, 1, 0],
                  filter: [
                    "blur(4px) brightness(2)",
                    "blur(1px) brightness(1.5)",
                    "blur(0px) brightness(1)",
                    "blur(2px) brightness(1.8)",
                    "blur(0px) brightness(1)",
                  ],
                }}
                exit={{ opacity: 0, x: 6, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {scrambled}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>
      </div>

      {/* Photos — hover on desktop, tap on mobile */}
      <AnimatePresence>
        {(isMobile ? mobileTapped : malikHovered) && (
          <>
            {(isMobile ? ([
              // Mobile: 2 above text, 3 below — all fitted within 390px screen
              // [src,          w,   h,    left,   top,    tX,     tY,      initRot, persp, delay]
              ["malik-2.png", 108, 116, "2%", "24%", "0%", "0%", -20, 700, 0],
              ["malik-1.png", 105, 113, "57%", "20%", "0%", "0%", 18, 900, 0.07],
              ["malik-5.png", 105, 113, "2%", "58%", "0%", "0%", 20, 850, 0.12],
              ["malik-6.png", 105, 113, "57%", "58%", "0%", "0%", -18, 800, 0.17],
              ["malik-3.png", 105, 113, "30%", "70%", "-50%", "0%", -16, 800, 0.22],
            ] as const) : ([
              // Desktop: full size
              // [src,          w,   h,   left,   top,    tX,      tY,      initRot, persp, delay]
              ["malik-2.png", 155, 168, "8%", "44%", "0%", "-50%", -22, 700, 0],
              ["malik-1.png", 150, 162, "52%", "14%", "-50%", "0%", 18, 900, 0.07],
              ["malik-3.png", 150, 162, "52%", "74%", "-50%", "0%", -16, 800, 0.12],
              ["malik-5.png", 148, 160, "9%", "74%", "0%", "0%", 20, 850, 0.17],
              ["malik-6.png", 148, 160, "88%", "48%", "-50%", "-50%", -18, 800, 0.22],
            ] as const)).map(([src, w, h, left, top, tX, tY, initRot, persp, delay]) => (
              <motion.img
                key={src}
                src={`${import.meta.env.BASE_URL}images/${src}`}
                alt="Malik"
                draggable={false}
                className="absolute z-20 pointer-events-none rounded-2xl object-cover"
                style={{
                  width: w, height: h,
                  left, top,
                  translateX: tX, translateY: tY,
                  rotateY, rotateX,
                  transformPerspective: persp,
                }}
                initial={{ scale: 0, rotate: initRot, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: -initRot, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 22,
                  delay,
                  opacity: { duration: 0.15, delay },
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
