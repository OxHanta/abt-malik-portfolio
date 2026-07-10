import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";

const BLOB_SHAPES = [
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "40% 60% 70% 30% / 40% 70% 30% 60%",
  "50% 50% 30% 70% / 30% 60% 40% 70%",
  "70% 30% 50% 50% / 50% 40% 60% 50%",
  "30% 70% 60% 40% / 70% 50% 30% 60%",
];

export function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [blobIndex, setBlobIndex] = useState(0);
  const blobTimer = useRef(0);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const liquidX = useSpring(mouseX, { stiffness: 65, damping: 16, mass: 0.7 });
  const liquidY = useSpring(mouseY, { stiffness: 65, damping: 16, mass: 0.7 });

  useAnimationFrame((_t, delta) => {
    blobTimer.current += delta;
    if (blobTimer.current > 420) {
      setBlobIndex((i) => (i + 1) % BLOB_SHAPES.length);
      blobTimer.current = 0;
    }
  });

  useEffect(() => {
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el) return;
      const isInteractive =
        el.closest("a, button, [data-cursor]") !== null ||
        getComputedStyle(el).cursor === "pointer" ||
        getComputedStyle(el).cursor === "none";
      setHovered(isInteractive);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", checkHover);
    window.addEventListener("mouseleave", () => setVisible(false));
    window.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [mouseX, mouseY, visible]);

  return (
    <>
      {/* Main blob */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center overflow-hidden"
        style={{
          x: liquidX,
          y: liquidY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "#ff4c29",
          mixBlendMode: "difference",
        }}
        animate={{
          width: hovered ? 36 : 12,
          height: hovered ? 36 : 12,
          opacity: visible ? 1 : 0,
          scale: clicked ? 0.85 : (hovered ? 1.1 : 1),
          borderRadius: BLOB_SHAPES[blobIndex],
        }}
        transition={{
          width: { duration: 0.3, ease: [0.25, 0, 0, 1] },
          height: { duration: 0.3, ease: [0.25, 0, 0, 1] },
          opacity: { duration: 0.2 },
          scale: { duration: 0.25, ease: "easeOut" },
          borderRadius: { duration: 0.4, ease: "easeInOut" },
        }}
      />

      {/* Sharp dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "#ff4c29",
          mixBlendMode: "difference",
          width: 6,
          height: 6,
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
