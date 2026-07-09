import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Play } from "lucide-react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const FOOTAGE_CLIPS = [
  {
    id: 1,
    title: "Featured Aerial Reel",
    src: "https://res.cloudinary.com/dba2kof3v/video/upload/v1777849250/0319EBA1-0D5B-445B-BEB2-6A18DFCF7F47_wnaerh.mp4",
    poster: "https://res.cloudinary.com/dba2kof3v/video/upload/v1777849250/0319EBA1-0D5B-445B-BEB2-6A18DFCF7F47_wnaerh.jpg",
    aspect: "aspect-video",
    description: "Featured camera raw drone footage edit."
  },
  {
    id: 2,
    title: "Tokyo Streets By Night",
    src: "https://assets.mixkit.co/videos/preview/mixkit-downtown-tokyo-by-night-39726-large.mp4",
    poster: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=1200&auto=format&fit=crop",
    aspect: "aspect-video",
    description: "Highly saturated neon traffic trails and cityscape scans."
  },
  {
    id: 3,
    title: "Coniferous Canopy",
    src: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-thick-forest-43105-large.mp4",
    poster: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200&auto=format&fit=crop",
    aspect: "aspect-video",
    description: "Slow sweeping glide above endless dense green forests."
  },
  {
    id: 4,
    title: "Coastal Tide Volumetrics",
    src: "https://assets.mixkit.co/videos/preview/mixkit-waves-crashing-on-rocks-from-above-43093-large.mp4",
    poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    aspect: "aspect-video",
    description: "Topological water contour scans and breaking whitewater waves."
  }
];

export default function StockFootage() {
  const [, setLocation] = useLocation();
  const [activeClipIndex, setActiveClipIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      setLocation("/");
    }
  };

  const handleOpenPlayer = (index: number) => {
    setActiveClipIndex(index);
  };

  const handleClosePlayer = () => {
    setActiveClipIndex(null);
  };

  const activeClip = activeClipIndex !== null ? FOOTAGE_CLIPS[activeClipIndex] : null;

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
            Motion Stock
          </p>
          <h1
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
            className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight"
          >
            Stock Footage
          </h1>
          <p className="text-white/50 text-sm md:text-base font-sans max-w-xl leading-relaxed mt-2">
            Cinematic B-roll collections, high-speed camera tracking, and drone clips available for license and visual integration.
          </p>
        </div>
      </section>

      {/* Footage Grid section */}
      <section className="px-6 md:px-16 lg:px-24 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {FOOTAGE_CLIPS.map((clip, i) => (
            <motion.div
              key={clip.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
              onClick={() => handleOpenPlayer(i)}
              className="group flex flex-col gap-4 cursor-none"
            >
              {/* Video viewport wrapper */}
              <div className={`relative overflow-hidden bg-[#161616] rounded-xl border border-white/5 w-full ${clip.aspect}`}>
                {/* Looping video preview playing at low opacity on hover */}
                <video
                  src={clip.src}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                {/* Static cover poster */}
                <img
                  src={clip.poster}
                  alt={clip.title}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1508847154043-be12a62861c1?q=80&w=1200&auto=format&fit=crop";
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Scanline texture */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
                  }}
                />

                {/* Center play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play size={18} fill="white" className="text-white translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-1 px-1">
                <h3
                  style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  className="text-white font-semibold text-base group-hover:text-[#FF442B] transition-colors duration-300"
                >
                  {clip.title}
                </h3>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                  {clip.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />

      {/* Dynamic Custom Video Player Overlay */}
      {activeClip && (
        <VideoPlayer
          src={activeClip.src}
          isOpen={activeClipIndex !== null}
          onClose={handleClosePlayer}
          title={activeClip.title}
        />
      )}
    </div>
  );
}
