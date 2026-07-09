import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLocation } from "wouter";
import { useCursor } from "@/context/CursorContext";
import { PROJECTS } from "@/lib/projects";

function ProjectCard({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  const { setLabel } = useCursor();
  const [, setLocation] = useLocation();

  return (
    <motion.div
      className="flex flex-col gap-4 cursor-none"
      onHoverStart={() => setLabel("View")}
      onHoverEnd={() => setLabel("")}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
      onClick={() => {
        setLabel(""); // clear cursor label
        setLocation(`/project/${project.id}`);
      }}
    >
      <div
        className="relative overflow-hidden bg-[#1a1a1a] w-full"
        style={{ aspectRatio: "4/3", borderRadius: "16px" }}
      >
        {project.img === "accent-red" ? (
          <div className="w-full h-full bg-[#FF442B] flex flex-col items-center justify-center relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-black/40 group-hover:opacity-60 transition-opacity duration-300" />
            <span className="font-['DM_Mono'] text-[10px] uppercase tracking-widest text-white/50 relative z-10">Teo Ignis</span>
          </div>
        ) : (
          <motion.img
            src={project.img.startsWith("http") ? project.img : `${import.meta.env.BASE_URL}images/${project.img}`}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
          />
        )}
        <motion.div
          className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.18)" }}
        />
      </div>

      <div className="flex items-start justify-between gap-4">
        <h3
          style={{ fontFamily: "'Inter Tight', sans-serif" }}
          className="text-white font-semibold text-base leading-snug"
        >
          {project.title}
        </h3>
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-white/35 text-[10px] shrink-0 mt-0.5"
        >
          {project.date}
        </span>
      </div>

      <p
        style={{ fontFamily: "'DM Mono', monospace" }}
        className="text-[#FF442B] text-[9px] uppercase tracking-widest -mt-2"
      >
        {project.category}
      </p>
    </motion.div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawLeft = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rawRight = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const leftX = useSpring(rawLeft, { stiffness: 80, damping: 20 });
  const rightX = useSpring(rawRight, { stiffness: 80, damping: 20 });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-[#0D0D0D] border-t border-white/10 px-6 md:px-16 py-20 md:py-28 overflow-hidden"
    >
      <p className="absolute top-4 left-6 md:left-10 font-['DM_Mono'] text-[11px] uppercase tracking-widest text-[#FF442B]">
        Projects
      </p>
      <h2
        style={{ fontFamily: "'Inter Tight', sans-serif" }}
        className="text-white font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-14 md:mb-16"
      >
        Proof of Work
      </h2>
      <motion.div style={{ x: leftX }} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-10">
        {PROJECTS.slice(0, 2).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
      <motion.div style={{ x: rightX }} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-10">
        {PROJECTS.slice(2, 4).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
      {PROJECTS.length > 4 && (
        <motion.div style={{ x: leftX }} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {PROJECTS.slice(4).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
