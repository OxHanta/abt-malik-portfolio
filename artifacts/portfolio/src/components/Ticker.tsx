import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

const SKILLS = [
  "Graphic Designer",
  "Drone Pilot",
  "Video Editor",
];

export function Ticker() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 300,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [-4, 0, 4],
    { clamp: false }
  );

  // x wraps between -25% and 0% (4 copies → each copy is 25% of track)
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const BASE_SPEED = -1.5; // % per second — negative = leftward

  useAnimationFrame((_t, delta) => {
    const vf = velocityFactor.get();
    // (1 + vf): scrolling down multiplies speed, scrolling up reverses direction
    const moveBy = BASE_SPEED * (delta / 1000) * (1 + vf);
    baseX.set(baseX.get() + moveBy);
  });

  // 4 copies so wrap is always seamless
  const items = [...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS];

  return (
    <div className="w-full overflow-hidden bg-[#0D0D0D] border-y border-white/10 py-4 select-none">
      <motion.div style={{ x }} className="flex items-center whitespace-nowrap w-max">
        {items.map((skill, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
              className="text-sm md:text-base uppercase tracking-widest font-semibold text-white px-6"
            >
              {skill}
            </span>
            <img
              src={`${import.meta.env.BASE_URL}images/star-sep.png`}
              alt="★"
              className="w-4 h-4 shrink-0"
              style={{ filter: "hue-rotate(-20deg) saturate(3) brightness(1.2)" }}
              draggable={false}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
