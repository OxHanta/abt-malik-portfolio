import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useCursor } from "@/context/CursorContext";
import { ImageLightbox, type LightboxImage } from "@/components/ImageLightbox";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
// @ts-expect-error - missing types for pannellum-react
import { Pannellum } from "pannellum-react";

const DRONE_PHOTOS = [
  {
    id: 1,
    title: "Cyberpunk Grid",
    src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    aspect: "aspect-[16/10]",
    caption: "Aerial view of a sprawling neon-lit urban grid at dusk."
  },
  {
    id: 2,
    title: "Emerald Canopy",
    src: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
    caption: "Top-down view of dense pine forest in late autumn."
  },
  {
    id: 3,
    title: "Azure Shore",
    src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1200&auto=format&fit=crop",
    aspect: "aspect-[3/2]",
    caption: "Volumetric scans of coral reefs and deep blue waters."
  },
  {
    id: 4,
    title: "High Sierra",
    src: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=1200&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
    caption: "Frozen ridge-line topography details."
  },
  {
    id: 5,
    title: "Metropolis Glow",
    src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop",
    aspect: "aspect-[16/10]",
    caption: "Stark architectural geometry and lighting."
  },
  {
    id: 6,
    title: "Coastal Drift",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    aspect: "aspect-[3/2]",
    caption: "Ocean waves colliding with cliffs, viewed from above."
  }
];

const LIGHTBOX_IMAGES: LightboxImage[] = DRONE_PHOTOS.map((photo) => ({
  src: photo.src,
  alt: photo.title,
  caption: `${photo.title} · ${photo.caption}`
}));

export default function DronePhotography() {
  const [, setLocation] = useLocation();
  const { setLabel } = useCursor();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    return () => {
      setLabel("");
    };
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      setLocation("/");
    }
  };

  const handleOpen = (i: number) => setLightboxIndex(i);
  const handleClose = () => setLightboxIndex(null);
  const handlePrev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const handleNext = () =>
    setLightboxIndex((i) =>
      i !== null && i < LIGHTBOX_IMAGES.length - 1 ? i + 1 : i
    );

  return (
    <div className="bg-[#0B0B0B] min-h-screen text-white flex flex-col selection:bg-[#FF442B] selection:text-white">
      <Navbar />

      {/* Header section */}
      <section className="relative pt-32 pb-12 px-6 md:px-16 lg:px-24 flex flex-col gap-8">
        <div>
          <button
            onClick={handleBack}
            className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300 font-mono text-xs uppercase tracking-widest cursor-none"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-300">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            Back to Home
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-mono text-xs text-[#FF442B] uppercase tracking-widest">
            Aerial Portfolio
          </p>
          <h1
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
            className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight"
          >
            Aerials
          </h1>
          <p className="text-white/50 text-sm md:text-base font-sans max-w-xl leading-relaxed mt-2">
            A selection of high-altitude landscape stills, urban structures, and coastlines captured from unique aerial perspectives.
          </p>
        </div>
      </section>

      {/* Image Grid section */}
      <section className="px-6 md:px-16 lg:px-24 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DRONE_PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
              onClick={() => handleOpen(i)}
              className="group flex flex-col gap-4 cursor-none"
            >
              {/* Photo viewport */}
              <div className={`relative overflow-hidden bg-[#161616] rounded-xl border border-white/5 w-full ${photo.aspect}`}>
                <img
                  src={photo.src}
                  alt={photo.title}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
              </div>

              {/* Title & Caption */}
              <div className="flex flex-col gap-1 px-1">
                <h3
                  style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  className="text-white font-semibold text-base"
                >
                  {photo.title}
                </h3>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 360 VR Panorama Viewer Section */}
      <section className="px-6 md:px-16 lg:px-24 pb-28 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-xs text-[#FF442B] uppercase tracking-widest">
            Immersive Experience
          </p>
          <h2
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            360° Panorama VR
          </h2>
          <p className="text-white/50 text-sm md:text-base font-sans max-w-xl">
            Explore the aerial view in a fully interactive 360-degree environment. Drag to look around.
          </p>
        </div>

        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-[#161616] cursor-grab active:cursor-grabbing">
          <Pannellum
            width="100%"
            height="100%"
            image="https://pannellum.org/images/alma.jpg"
            pitch={10}
            yaw={180}
            hfov={110}
            autoLoad
            showZoomCtrl={false}
            showFullscreenCtrl={false}
          />
        </div>
      </section>

      <Footer />

      {/* Lightbox for Zoom */}
      <ImageLightbox
        images={LIGHTBOX_IMAGES}
        index={lightboxIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
