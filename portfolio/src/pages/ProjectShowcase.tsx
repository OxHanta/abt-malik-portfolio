import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useCursor } from "@/context/CursorContext";
import { PROJECTS } from "@/lib/projects";
import { ImageLightbox, type LightboxImage } from "@/components/ImageLightbox";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ProjectShowcase() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { setLabel } = useCursor();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Parse ID and find project
  const projectId = id ? parseInt(id, 10) : 1;
  const projectIndex = PROJECTS.findIndex((p) => p.id === projectId);
  const project = projectIndex !== -1 ? PROJECTS[projectIndex] : null;

  // Scroll to top on load/change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Clean up cursor label on unmount
  useEffect(() => {
    return () => {
      setLabel("");
    };
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center text-white px-6">
        <h1 className="text-3xl font-bold font-display mb-4">Project Not Found</h1>
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-[#FF442B] font-mono text-sm hover:underline cursor-none"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
    );
  }

  // Next Project details
  const nextProjectIndex = (projectIndex + 1) % PROJECTS.length;
  const nextProject = PROJECTS[nextProjectIndex];

  // Convert gallery images to Lightbox format
  const lightboxImages: LightboxImage[] = (project.gallery || []).map((src: string, i: number) => ({
    src,
    alt: `${project.title} Detail ${i + 1}`,
    caption: `${project.title} · Detail ${i + 1}`,
  }));

  const handleOpenLightbox = (index: number) => setLightboxIndex(index);
  const handleCloseLightbox = () => setLightboxIndex(null);
  const handlePrevLightbox = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const handleNextLightbox = () =>
    setLightboxIndex((i) =>
      i !== null && i < lightboxImages.length - 1 ? i + 1 : i
    );

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      setLocation("/#projects");
    }
  };

  return (
    <div className="bg-[#0B0B0B] min-h-screen text-white flex flex-col selection:bg-[#FF442B] selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-16 lg:px-24 flex flex-col gap-10">
        {/* Back navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            onMouseEnter={() => setLabel("Back")}
            onMouseLeave={() => setLabel("")}
            className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300 font-mono text-xs uppercase tracking-widest cursor-none"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-300">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            Back to Works
          </button>

          <span className="font-mono text-xs text-white/20 tracking-wider">
            PROJECT {projectIndex + 1} OF {PROJECTS.length}
          </span>
        </div>

        {/* Title and Meta */}
        <div className="flex flex-col gap-6">
          <p className="font-mono text-xs text-[#FF442B] uppercase tracking-widest">
            {project.category}
          </p>
          <h1
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter"
          >
            {project.title}
          </h1>
        </div>

        {/* Project Header Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[21/9] bg-[#161616] rounded-2xl overflow-hidden mt-6 border border-white/5"
        >
          {project.img === "accent-red" ? (
            <div className="w-full h-full bg-[#FF442B] flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
              <span className="font-['DM_Mono'] text-xs uppercase tracking-widest text-white/55 relative z-10">Teo Ignis</span>
            </div>
          ) : (
            <>
              <img
                src={project.img.startsWith("http") ? project.img : `${import.meta.env.BASE_URL}images/${project.img}`}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </>
          )}
        </motion.div>

        {/* Dynamic metadata row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/10 mt-10">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">Client</p>
            <p className="font-display text-sm font-semibold">{project.client}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">Role</p>
            <p className="font-display text-sm font-semibold">{project.role}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">Services</p>
            <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-white/70">
              {project.services.join(" · ")}
            </div>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">Timeline</p>
            <p className="font-display text-sm font-semibold">{project.date}</p>
          </div>
        </div>
      </section>

      {/* Case Study Details */}
      <section className="px-6 md:px-16 lg:px-24 py-10 flex flex-col lg:flex-row gap-16">
        {/* Left Side: Overview */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h2
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
            className="text-2xl md:text-3xl font-bold tracking-tight text-white/90"
          >
            Overview
          </h2>
          <p className="text-white/60 font-sans text-base leading-relaxed max-w-xl">
            {project.description}
          </p>
          {project.link && (
            <div className="mt-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-mono text-[10px] uppercase tracking-widest px-6 py-3 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer"
              >
                Visit Live Site <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>

        {/* Right Side: Challenge & Solution */}
        <div className="lg:w-1/2 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
              className="text-lg font-bold tracking-tight text-white/90 uppercase"
            >
              The Challenge
            </h3>
            <p className="text-white/60 font-sans text-sm leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
              className="text-lg font-bold tracking-tight text-white/90 uppercase"
            >
              The Solution
            </h3>
            <p className="text-white/60 font-sans text-sm leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Showcase Gallery */}
      {project.gallery && project.gallery.length > 0 ? (
        <section className="px-6 md:px-16 lg:px-24 py-16 flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-white/20" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/30">
              Detail Showcase ({project.gallery.length} Images)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((imgSrc: string, i: number) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden bg-[#161616] border border-white/5 group cursor-none"
                onClick={() => handleOpenLightbox(i)}
                onMouseEnter={() => setLabel("Zoom")}
                onMouseLeave={() => setLabel("")}
              >
                <img
                  src={imgSrc}
                  alt={`${project.title} detail ${i + 1}`}
                  className="w-full h-auto block group-hover:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center" />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* YouTube Video Embeds */}
      {project.youtubeEmbeds && project.youtubeEmbeds.length > 0 && (
        <section className="px-6 md:px-16 lg:px-24 py-16 border-t border-white/10 flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-white/20" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/30">
              Featured Video
            </span>
          </div>

          <div className="flex justify-center items-center w-full">
            {project.youtubeEmbeds.map((embedUrl: string, idx: number) => (
              <div key={idx} className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#111]">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Social Media Embeds */}
      {project.socialEmbeds && project.socialEmbeds.length > 0 && (
        <section className="px-6 md:px-16 lg:px-24 py-16 border-t border-white/10 flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-white/20" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/30">
              Social Media Showcase
            </span>
          </div>

          <div className="flex flex-wrap gap-8 justify-center items-center">
            {project.socialEmbeds.map((embedUrl: string, idx: number) => {
              // Convert any Instagram post/reel URL to the embed format
              let embedSrc = embedUrl;
              if (embedUrl.includes("instagram.com/reel/")) {
                const match = embedUrl.match(/instagram\.com\/reel\/([^/?]+)/);
                if (match && match[1]) {
                  embedSrc = `https://www.instagram.com/reel/${match[1]}/embed/`;
                }
              } else if (embedUrl.includes("instagram.com/p/")) {
                const match = embedUrl.match(/instagram\.com\/p\/([^/?]+)/);
                if (match && match[1]) {
                  embedSrc = `https://www.instagram.com/p/${match[1]}/embed/`;
                }
              }
              return (
                <div key={idx} className="w-full max-w-[400px] aspect-[9/16] min-h-[580px] rounded-xl overflow-hidden border border-white/10 bg-[#111]">
                  <iframe
                    src={embedSrc}
                    className="w-full h-full"
                    scrolling="no"
                    allowFullScreen
                    frameBorder="0"
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Next Project Footer Link */}
      <section
        className="w-full bg-[#111] hover:bg-[#161616] border-t border-white/10 py-24 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 cursor-none transition-colors duration-300 mt-auto group"
        onClick={() => {
          setLabel("");
          setLocation(`/project/${nextProject.id}`);
        }}
        onMouseEnter={() => setLabel("Next")}
        onMouseLeave={() => setLabel("")}
      >
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-white/30 uppercase tracking-widest">
            Next Showcase
          </span>
          <h2
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
            className="text-4xl md:text-6xl font-bold leading-none tracking-tight group-hover:text-[#FF442B] transition-colors duration-300"
          >
            {nextProject.title}
          </h2>
        </div>

        <div className="w-16 h-16 rounded-full border border-white/15 flex items-center justify-center bg-black/30 group-hover:border-[#FF442B]/40 group-hover:bg-[#FF442B]/5 transition-all duration-300 shrink-0">
          <ArrowRight size={24} className="text-white/60 group-hover:text-[#FF442B] group-hover:translate-x-1 transition-all" />
        </div>
      </section>

      <Footer />

      {/* Lightbox for gallery zoom */}
      <ImageLightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={handleCloseLightbox}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />
    </div>
  );
}
