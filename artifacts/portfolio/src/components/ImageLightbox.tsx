import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type LightboxImage = {
  src: string;
  alt: string;
  caption?: string;
};

type Props = {
  images: LightboxImage[];
  index: number | null;          // null = closed
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const SWIPE_THRESHOLD = 60; // px

export function ImageLightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const isOpen = index !== null;
  const image = index !== null ? images[index] : null;

  // Touch tracking
  const touchStartX = useRef<number | null>(null);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, onPrev, onNext]);

  /* ── Scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* ── Touch / swipe ── */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -SWIPE_THRESHOLD) onNext();
    else if (delta > SWIPE_THRESHOLD) onPrev();
    touchStartX.current = null;
  }, [onNext, onPrev]);

  const total = images.length;
  const hasPrev = index !== null && index > 0;
  const hasNext = index !== null && index < total - 1;

  return (
    <AnimatePresence>
      {isOpen && image && (
        /* ── Backdrop ── */
        <motion.div
          id="lightbox-backdrop"
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={(e) => {
            // Close when clicking directly on the backdrop
            if ((e.target as HTMLElement).id === "lightbox-backdrop") onClose();
          }}
          style={{
            background: "rgba(0,0,0,0.88)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* ── Close button ── */}
          <button
            id="lightbox-close"
            aria-label="Close image preview"
            onClick={onClose}
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* ── Counter ── */}
          <span
            className="absolute top-5 left-1/2 -translate-x-1/2 font-['DM_Mono'] text-[10px] uppercase tracking-widest text-white/30"
          >
            {(index! + 1).toString().padStart(2, "0")} / {total.toString().padStart(2, "0")}
          </span>

          {/* ── Prev arrow ── */}
          <button
            id="lightbox-prev"
            aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            disabled={!hasPrev}
            className="absolute left-4 md:left-8 z-10 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 disabled:opacity-20 disabled:pointer-events-none transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* ── Image ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="relative flex flex-col items-center gap-4 max-w-[92vw] max-h-[85vh] pointer-events-none"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.3, ease: [0.25, 0, 0, 1] }}
            >
              <img
                src={image.src}
                alt={image.alt}
                draggable={false}
                className="max-w-[92vw] max-h-[78vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
                style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.7)" }}
              />

              {/* Caption */}
              {image.caption && (
                <p
                  className="font-['DM_Mono'] text-[10px] uppercase tracking-widest text-white/35 text-center"
                >
                  {image.caption}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── Next arrow ── */}
          <button
            id="lightbox-next"
            aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            disabled={!hasNext}
            className="absolute right-4 md:right-8 z-10 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 disabled:opacity-20 disabled:pointer-events-none transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* ── Dot indicators ── */}
          {total > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full transition-all duration-300"
                  style={{
                    background: i === index ? "#FF442B" : "rgba(255,255,255,0.25)",
                    transform: i === index ? "scale(1.4)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
