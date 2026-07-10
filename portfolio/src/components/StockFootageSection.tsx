import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Play } from "lucide-react";
import { VideoPlayer } from "@/components/VideoPlayer";

const PREVIEW_CLIPS = [
  {
    id: 1,
    title: "Wizkid — Greater Lagos Concert",
    src: "https://res.cloudinary.com/dba2kof3v/video/upload/v1783638852/DJI_0487_1_hutdlp.mp4",
    poster: "https://res.cloudinary.com/dba2kof3v/video/upload/v1783638852/DJI_0487_1_hutdlp.jpg",
    description: "Aerial drone coverage of Wizkid performing at the Greater Lagos concert."
  },
  {
    id: 2,
    title: "Raw to Edited",
    src: "https://res.cloudinary.com/dba2kof3v/video/upload/v1783638482/Edited_1_fhr1z8.mp4",
    poster: "https://res.cloudinary.com/dba2kof3v/video/upload/v1783638482/Edited_1_fhr1z8.jpg",
    description: "A before and after clip showcasing the raw drone footage to finished edit."
  }
];

export function StockFootageSection() {
  const [activeClipIndex, setActiveClipIndex] = useState<number | null>(null);

  const handleOpenPlayer = (index: number) => {
    setActiveClipIndex(index);
  };

  const handleClosePlayer = () => {
    setActiveClipIndex(null);
  };

  const activeClip = activeClipIndex !== null ? PREVIEW_CLIPS[activeClipIndex] : null;

  return (
    <section id="stock-footage" className="relative bg-[#0D0D0D] border-t border-white/10 px-6 md:px-16 py-20 md:py-28 overflow-hidden select-none">
      <p className="font-mono text-xs text-[#FF442B] uppercase tracking-widest mb-4">
        Motion Stock
      </p>
      <h2
        style={{ fontFamily: "'Inter Tight', sans-serif" }}
        className="text-white font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-14"
      >
        Stock Footage
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {PREVIEW_CLIPS.map((clip, i) => (
          <div
            key={clip.id}
            onClick={() => handleOpenPlayer(i)}
            className="group flex flex-col gap-4 cursor-pointer"
          >
            {/* Video viewport */}
            <div className="relative overflow-hidden bg-[#161616] rounded-xl border border-white/5 w-full aspect-video">
              <video
                src={clip.src}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                autoPlay
                loop
                muted
                playsInline
              />
              <img
                src={clip.poster}
                alt={clip.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <Play size={18} fill="white" className="text-white translate-x-0.5" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 px-1">
              <h3 className="text-white font-semibold text-lg group-hover:text-[#FF442B] transition-colors duration-300">
                {clip.title}
              </h3>
              <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                {clip.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-start">
        <Link href="/stock-footage">
          <span className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300 font-mono text-xs uppercase tracking-widest cursor-pointer">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#FF442B]/40 group-hover:bg-[#FF442B]/5 transition-all duration-300">
              <ArrowRight size={14} className="text-white/60 group-hover:text-[#FF442B] group-hover:translate-x-0.5 transition-all" />
            </div>
            View all
          </span>
        </Link>
      </div>

      {activeClip && (
        <VideoPlayer
          src={activeClip.src}
          isOpen={activeClipIndex !== null}
          onClose={handleClosePlayer}
          title={activeClip.title}
        />
      )}
    </section>
  );
}
