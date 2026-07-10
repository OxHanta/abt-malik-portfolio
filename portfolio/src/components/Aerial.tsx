import { useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useCursor } from "@/context/CursorContext";
import { ImageLightbox, type LightboxImage } from "@/components/ImageLightbox";
import { VideoPlayer } from "@/components/VideoPlayer";

const DRONE_IMGS = [
  "https://res.cloudinary.com/dba2kof3v/image/upload/v1783636943/insp_zehpw2.jpg",
  "https://res.cloudinary.com/dba2kof3v/image/upload/v1783638042/Ozimbadwe_2_dowqgj.jpg",
  "https://res.cloudinary.com/dba2kof3v/image/upload/v1783637933/port_mstwzu.jpg",
];

const PHOTOS = [
  { id: 1, aspect: "aspect-[16/10]", src: DRONE_IMGS[0] },
  { id: 2, aspect: "aspect-[4/3]", src: DRONE_IMGS[1] },
  { id: 3, aspect: "aspect-[16/10]", src: DRONE_IMGS[2] },
];

// Lightbox image list (unique photos only)
const LIGHTBOX_IMAGES: LightboxImage[] = PHOTOS.map((p, i) => ({
  src: p.src,
  alt: `Aerial shot ${i + 1}`,
  caption: `Aerial Direction · Shot ${(i + 1).toString().padStart(2, "0")}`,
}));

export function Aerial() {
  const { setLabel } = useCursor();
  const isPaused = useRef(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const handleOpen = (i: number) => setLightboxIndex(i % PHOTOS.length);
  const handleClose = () => setLightboxIndex(null);
  const handlePrev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const handleNext = () =>
    setLightboxIndex((i) =>
      i !== null && i < LIGHTBOX_IMAGES.length - 1 ? i + 1 : i
    );

  return (
    <>
      <section id="aerials" className="relative bg-[#0B0B0B] py-28 overflow-hidden">


        {/* Heading */}
        <div className="px-6 md:px-10 mb-14">
          <h2
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
            className="text-white font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
          >
            Aerials
          </h2>
        </div>

        {/* Featured video placeholder */}
        <div className="px-6 md:px-10 mb-10">
          <div
            className="relative w-full bg-[#111111] overflow-hidden cursor-none group"
            style={{ aspectRatio: "21/9", maxHeight: "620px" }}
            onClick={() => setVideoOpen(true)}
            onMouseEnter={() => setLabel("Play Reel")}
            onMouseLeave={() => setLabel("")}
          >
            {/* Video preview cover image with fallback */}
            <img
              src="https://res.cloudinary.com/dba2kof3v/video/upload/v1777849250/0319EBA1-0D5B-445B-BEB2-6A18DFCF7F47_wnaerh.jpg"
              alt="Featured Reel Preview"
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              onError={(e) => {
                // Fallback to a high-quality dark drone aerial photo if the Cloudinary frame isn't pre-generated
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2000&auto=format&fit=crop";
              }}
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/35 pointer-events-none" />

            {/* Scanline texture */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
              }}
            />

            {/* Centre play mark */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-black/45 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M5 3.5L14.5 9L5 14.5V3.5Z" fill="white" />
                </svg>
              </div>
            </div>

            {/* Corner meta */}
            <span className="absolute bottom-5 left-6 font-['DM_Mono'] text-[10px] uppercase tracking-widest text-white/40">
              Featured Reel
            </span>

          </div>
        </div>
        {/* Drone Photography Title */}
        <div className="px-6 md:px-10 mb-6 flex justify-between items-end">
          <h3 className="font-['Inter_Tight'] font-bold text-2xl text-white">
            Photography
          </h3>
        </div>

        {/* ── Grid photo layout ── */}
        <div
          className="w-full cursor-none select-none px-6 md:px-10"
          onMouseEnter={() => {
            setLabel("View Shot");
          }}
          onMouseLeave={() => {
            setLabel("");
          }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {PHOTOS.map((photo, i) => (
              <div
                key={i}
                className={`relative ${photo.aspect} bg-[#161616] overflow-hidden group rounded-lg`}
                onClick={() => handleOpen(i)}
              >
                <img
                  src={photo.src}
                  alt={`Aerial shot ${photo.id}`}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>


        {/* View all button */}
        <div className="px-6 md:px-10 mt-10 flex justify-start">
          <Link href="/aerials">
            <span
              onMouseEnter={() => setLabel("View")}
              onMouseLeave={() => setLabel("")}
              className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300 font-mono text-xs uppercase tracking-widest cursor-pointer select-none"
            >
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#FF442B]/40 group-hover:bg-[#FF442B]/5 transition-all duration-300">
                <ArrowRight size={14} className="text-white/60 group-hover:text-[#FF442B] group-hover:translate-x-0.5 transition-all" />
              </div>
              View all
            </span>
          </Link>
        </div>
      </section>

      <ImageLightbox
        images={LIGHTBOX_IMAGES}
        index={lightboxIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* Video player for Featured Reel */}
      <VideoPlayer
        src="https://res.cloudinary.com/dba2kof3v/video/upload/v1777849250/0319EBA1-0D5B-445B-BEB2-6A18DFCF7F47_wnaerh.mp4"
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        title="Featured Reel"
      />
    </>
  );
}
