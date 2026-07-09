import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, X } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

interface VideoPlayerProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function VideoPlayer({ src, isOpen, onClose, title = "Featured Reel" }: VideoPlayerProps) {
  const { setLabel } = useCursor();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Play/pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((err) => console.log("Video play interrupted:", err));
    }
  };

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Space for Play/Pause (prevent default scroll)
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
      // Escape for Close
      if (e.code === "Escape") {
        e.preventDefault();
        onClose();
      }
      // M for Mute
      if (e.code === "KeyM") {
        e.preventDefault();
        toggleMute();
      }
      // F for Fullscreen
      if (e.code === "KeyF") {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPlaying, isMuted, isFullscreen]);

  // Sync state with HTML5 video events
  const handlePlay = () => {
    setIsPlaying(true);
    setLabel("Pause");
  };
  const handlePause = () => {
    setIsPlaying(false);
    setLabel("Play");
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Seek video
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
    setCurrentTime(pos * duration);
  };

  // Volume control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  // Fullscreen control
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Track fullscreen changes from ESC or double click
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Controls visibility on mouse movement
  const resetControlsTimeout = () => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 2500);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      resetControlsTimeout();
    } else {
      setControlsVisible(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  // Clean up cursor label when unmounting or when isOpen changes to false
  useEffect(() => {
    if (!isOpen) {
      setLabel("");
    }
    return () => {
      setLabel("");
    };
  }, [isOpen, setLabel]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md overflow-hidden cursor-none"
          onMouseMove={resetControlsTimeout}
          onClick={onClose}
          onMouseEnter={() => setLabel("Close")}
          onMouseLeave={() => setLabel("")}
        >
          {/* Top Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 z-10"
            onMouseEnter={() => setLabel("")}
            onMouseLeave={() => setLabel("Close")}
          >
            <X size={20} />
          </button>

          {/* Main Video Viewport Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            ref={containerRef}
            className="relative max-h-[85vh] aspect-video w-full max-w-5xl rounded-lg overflow-hidden border border-white/10 bg-black shadow-2xl flex flex-col group/player"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setLabel(isPlaying ? "Pause" : "Play")}
            onMouseLeave={() => setLabel("Close")}
          >
            <video
              ref={videoRef}
              src={src}
              className="w-full h-full object-contain cursor-none"
              onClick={togglePlay}
              onPlay={handlePlay}
              onPause={handlePause}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              autoPlay
              playsInline
            />

            {/* Custom Control Bar */}
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-14 pb-6 px-6 flex flex-col gap-4 transition-all duration-300 select-none ${
                controlsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
              }`}
              onMouseEnter={() => setLabel("")}
              onMouseLeave={() => setLabel(isPlaying ? "Pause" : "Play")}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress Slider */}
              <div
                className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative group/progress flex items-center"
                onClick={handleSeek}
              >
                <div
                  className="bg-[#ff4c29] h-full rounded-full relative"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                />
                <div
                  className="w-3.5 h-3.5 bg-white rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2 border border-black/25 opacity-0 group-hover/progress:opacity-100 transition-opacity duration-150 shadow"
                  style={{ left: `${(currentTime / (duration || 1)) * 100}%` }}
                />
              </div>

              {/* Lower Control Bar */}
              <div className="flex items-center justify-between">
                {/* Left side actions */}
                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                  </button>

                  {/* Volume Group */}
                  <div className="flex items-center gap-2 group/volume">
                    <button
                      onClick={toggleMute}
                      className="text-white/80 hover:text-white transition-colors duration-200"
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-0 overflow-hidden group-hover/volume:w-16 group-focus-within/volume:w-16 transition-all duration-350 ease-out h-1 bg-white/20 appearance-none rounded-full accent-[#ff4c29] outline-none cursor-pointer"
                    />
                  </div>

                  {/* Time indicator */}
                  <span className="font-['DM_Mono'] text-xs text-white/55">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-4">
                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}