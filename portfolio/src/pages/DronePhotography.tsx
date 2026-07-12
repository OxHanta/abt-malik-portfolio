import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ZoomIn, ZoomOut, Maximize, ChevronRight, ChevronLeft } from "lucide-react";
import { useCursor } from "@/context/CursorContext";
import { ImageLightbox, type LightboxImage } from "@/components/ImageLightbox";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
// @ts-expect-error - missing types for pannellum-react
import { Pannellum } from "pannellum-react";

const DRONE_PHOTOS = [

  {
    id: 1,
    title: "Land Inspection at Lekki Phase 1",
    src: "https://res.cloudinary.com/dba2kof3v/image/upload/v1783636943/insp_zehpw2.jpg",
    aspect: "aspect-[16/10]",
    caption: "Detailed aerial view of land inspection and surveying at Lekki Phase 1."
  },
  {
    id: 2,
    title: "Victoria Island",
    src: "https://res.cloudinary.com/dba2kof3v/image/upload/v1783638042/Ozimbadwe_2_dowqgj.jpg",
    aspect: "aspect-[4/3]",
    caption: "Aerial view of Victoria Island with boats moving across the lagoon and the city skyline in the background."
  },
  {
    id: 3,
    title: "Apapa Port",
    src: "https://res.cloudinary.com/dba2kof3v/image/upload/v1783637933/port_mstwzu.jpg",
    aspect: "aspect-[3/2]",
    caption: "Apapa port bustling with different shipping containers."
  },
  {
    id: 4,
    title: "Lagos Continental Hotel",
    src: "https://res.cloudinary.com/dba2kof3v/image/upload/v1783637049/LC_btvr1c.jpg",
    aspect: "aspect-[4/3]",
    caption: "The Lagos Continental Hotel towering over the skyline."
  },
  {
    id: 5,
    title: "Blue Line Metro & National Theatre",
    src: "https://res.cloudinary.com/dba2kof3v/image/upload/v1783707196/Train_2_jgyqfz.jpg",
    aspect: "aspect-[3/2]",
    caption: "Aerial view of Lagos city showcasing the Blue Line metro train with the iconic National Theatre standing proudly in the background."
  },


  {
    id: 6,
    title: "Victoria Island at Night",
    src: "https://res.cloudinary.com/dba2kof3v/image/upload/v1783715547/Ozimbadwe_night_nd2wgy.jpg",
    aspect: "aspect-[4/3]",
    caption: "The Ozimbadwe waterfront lit up at night, showcasing the vibrant Victoria Island skyline reflecting across the Lagos Lagoon."
  },
  {
    id: 7,
    title: "Lagos Blue Line Metro",
    src: "https://res.cloudinary.com/dba2kof3v/image/upload/v1783715482/Train_e7fji9.jpg",
    aspect: "aspect-[16/10]",
    caption: "Aerial view of Lagos city featuring the Blue Line metro train gliding through the urban landscape, a landmark in the city's modern transit infrastructure."
  },
  {
    id: 8,
    title: "National Theater",
    src: "https://res.cloudinary.com/dba2kof3v/image/upload/v1783636939/national_nps2b5.jpg",
    aspect: "aspect-[16/10]",
    caption: "Iconic aerial view of the National Theater."
  },
];

const LIGHTBOX_IMAGES: LightboxImage[] = DRONE_PHOTOS.map((photo) => ({
  src: photo.src,
  alt: photo.title,
  caption: `${photo.title} · ${photo.caption}`
}));

const PANORAMAS = [
  "https://res.cloudinary.com/dba2kof3v/image/upload/v1783635994/pan_1_zmrsyl.jpg",
  "https://res.cloudinary.com/dba2kof3v/image/upload/v1783635984/pan_2_dshaww.jpg"
];

export default function DronePhotography() {
  const [, setLocation] = useLocation();
  const { setLabel } = useCursor();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Panorama State
  const [panoIndex, setPanoIndex] = useState(0);
  const [hfov, setHfov] = useState(120);
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const panImageRef = useRef<any>(null);

  const handleNextPano = () => {
    setPanoIndex((prev) => (prev + 1) % PANORAMAS.length);
  };

  const handlePrevPano = () => {
    setPanoIndex((prev) => (prev === 0 ? PANORAMAS.length - 1 : prev - 1));
  };

  const syncZoom = () => {
    if (panImageRef.current && panImageRef.current.getViewer) {
      setHfov(panImageRef.current.getViewer().getHfov());
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleZoomChange = (newHfov: number) => {
    setHfov(newHfov);
    if (panImageRef.current && panImageRef.current.getViewer) {
      panImageRef.current.getViewer().setHfov(newHfov);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    return () => {
      setLabel("");
    };
  }, []);

  // Fix scroll jump when exiting full screen
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && viewerContainerRef.current) {
        // Small timeout to allow browser layout to settle after exiting fullscreen
        setTimeout(() => {
          viewerContainerRef.current?.scrollIntoView({ behavior: "instant", block: "center" });
        }, 50);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
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

        <div
          ref={viewerContainerRef}
          onMouseEnter={() => setLabel("Drag")}
          onMouseLeave={() => setLabel("")}
          onWheel={() => setTimeout(syncZoom, 50)}
          className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-[#161616] group force-cursor-grab"
        >
          <Pannellum
            ref={panImageRef}
            width="100%"
            height="100%"
            image={PANORAMAS[panoIndex]}
            pitch={10}
            yaw={180}
            hfov={hfov}
            autoLoad
            mouseZoom={true}
            onMouseup={() => setTimeout(syncZoom, 50)}
            showZoomCtrl={false}
            showFullscreenCtrl={false}
          />

          {/* Navigation Chevrons */}
          <button
            onClick={handlePrevPano}
            onMouseEnter={() => setLabel("")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#FF442B] hover:border-[#FF442B] transition-all force-cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNextPano}
            onMouseEnter={() => setLabel("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#FF442B] hover:border-[#FF442B] transition-all force-cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Custom Toolbar Overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 px-6 py-3 rounded-full bg-black/30 backdrop-blur-md border border-white/20 shadow-2xl transition-opacity duration-300">
            <button
              onClick={() => handleZoomChange(Math.min(120, hfov + 10))}
              className="text-white hover:text-[#FF442B] transition-colors p-1 force-cursor-pointer"
            >
              <ZoomOut size={18} />
            </button>

            <input
              type="range"
              min="50"
              max="120"
              value={170 - hfov}
              onChange={(e) => handleZoomChange(170 - parseInt(e.target.value))}
              className="w-24 md:w-48 h-1 bg-white/20 rounded-lg appearance-none force-cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-[#FF442B] [&::-webkit-slider-thumb]:transition-colors"
            />

            <button
              onClick={() => handleZoomChange(Math.max(50, hfov - 10))}
              className="text-white hover:text-[#FF442B] transition-colors p-1 force-cursor-pointer"
            >
              <ZoomIn size={18} />
            </button>

            <div className="w-px h-6 bg-white/20 mx-1 md:mx-2" />

            <button
              onClick={handleFullscreen}
              onMouseEnter={() => setLabel("")}
              className="text-white hover:text-[#FF442B] transition-colors ml-1 p-1 force-cursor-pointer"
            >
              <Maximize size={18} />
            </button>
          </div>
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
