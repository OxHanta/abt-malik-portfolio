import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const SENTENCE =
  " I help brands, founders, and creators bridge the gap between vision and reality. Through expert execution in design, video creation and editing, I deliver production-ready assets that command attention and drive business outcomes.";

function Word({
  word,
  progress,
  index,
  total,
}: {
  word: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const pct = index / total;
  const color = useTransform(
    progress,
    [Math.max(0, pct - 0.08), pct, Math.min(1, pct + 0.08)],
    ["#2a2a2a", "#FF442B", "#ffffff"]
  );

  return (
    <motion.span style={{ color }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const words = SENTENCE.split(" ");

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-[#0C0C0C] min-h-screen flex flex-col justify-center px-6 md:px-16"
    >
      <p className="absolute top-4 left-6 md:left-10 font-['DM_Mono'] text-[11px] uppercase tracking-widest text-primary">About</p>
      <div className="max-w-5xl mx-auto w-full py-24">

        <h2 className="font-['Inter_Tight'] font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-12 text-center">
          {words.map((word, i) => (
            <Word
              key={i}
              word={word}
              progress={scrollYProgress}
              index={i}
              total={words.length}
            />
          ))}
        </h2>

        <div className="flex justify-center">
          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            download="Malik_Resume.pdf"
            className="shrink-0 inline-flex items-center gap-2 border border-white/30 text-white font-['DM_Mono'] text-[11px] uppercase tracking-widest px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>
        </div>

      </div>
    </section>
  );
}
