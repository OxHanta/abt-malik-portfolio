import { useState } from "react";
import { useCursor } from "@/context/CursorContext";
import { ImageLightbox, type LightboxImage } from "@/components/ImageLightbox";

// Define the Album data structure
type Album = {
  id: string;
  title: string;
  coverImage: string;
  photos: LightboxImage[];
  photoCount: number;
};

// Mock data for the albums
const ALBUMS: Album[] = [
  {
    id: "events",
    title: "Events",
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    photoCount: 4,
    photos: [
      { src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop", alt: "Event 1", caption: "Events · Concert" },
      { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop", alt: "Event 2", caption: "Events · Festival" },
      { src: "https://images.unsplash.com/photo-1540039155733-d7696d4ebc59?q=80&w=1974&auto=format&fit=crop", alt: "Event 3", caption: "Events · Live Show" },
      { src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop", alt: "Event 4", caption: "Events · Party" },
    ],
  },
  {
    id: "city",
    title: "City",
    coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop",
    photoCount: 3,
    photos: [
      { src: "https://res.cloudinary.com/dba2kof3v/image/upload/v1777849818/malik-buraimoh-EMjpo0YjHPw-unsplash_bhm6f7.jpg", alt: "Nature 1", caption: "City · Victoria Island, Lagos" },
      { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop", alt: "Nature 2", caption: "Nature · Mountains" },
      { src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2070&auto=format&fit=crop", alt: "Nature 3", caption: "Nature · Valley" },
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    photoCount: 4,
    photos: [
      { src: "https://res.cloudinary.com/dba2kof3v/image/upload/v1777849467/p3_l57yec.jpg", alt: "Real Estate 1", caption: "Real Estate · Lagos Continental Hotel" },
      { src: "https://res.cloudinary.com/dba2kof3v/image/upload/v1777849469/p6_nh0r74.jpg", alt: "Real Estate 2", caption: "Real Estate · Lagos Water Corporation" },
      { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", alt: "Real Estate 3", caption: "Real Estate · Modern" },
      { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop", alt: "Real Estate 4", caption: "Real Estate · Backyard" },
    ],
  },
  {
    id: "placeholder-1",
    title: "Coming Soon",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
    photoCount: 0,
    photos: [],
  },
  {
    id: "placeholder-2",
    title: "Coming Soon",
    coverImage: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=2070&auto=format&fit=crop",
    photoCount: 0,
    photos: [],
  },
];

export function Gallery() {
  const { setLabel } = useCursor();
  const [activeAlbumIndex, setActiveAlbumIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleOpenAlbum = (index: number) => {
    if (ALBUMS[index].photos.length > 0) {
      setActiveAlbumIndex(index);
      setLightboxIndex(0);
    }
  };

  const handleClose = () => {
    setLightboxIndex(null);
    // Delay clearing active album so lightbox close animation finishes smoothly
    setTimeout(() => setActiveAlbumIndex(null), 300);
  };

  const activeAlbum = activeAlbumIndex !== null ? ALBUMS[activeAlbumIndex] : null;

  const handlePrev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const handleNext = () =>
    setLightboxIndex((i) =>
      i !== null && activeAlbum && i < activeAlbum.photos.length - 1 ? i + 1 : i
    );

  return (
    <>
      <section className="relative bg-[#0B0B0B] pt-10 pb-28 overflow-hidden">


        {/* Heading */}
        <div className="px-6 md:px-10 mb-14">
          <h2
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
            className="text-white font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
          >
            Gallery Albums
          </h2>
        </div>

        {/* ── Scrollable albums strip ── */}
        <div className="w-full overflow-x-auto cursor-none select-none no-scrollbar px-6 md:px-10">
          <div className="flex items-stretch gap-6 w-max pb-8">
            {ALBUMS.map((album, i) => (
              <div
                key={album.id}
                className="relative w-[320px] md:w-[400px] aspect-[4/5] bg-[#161616] overflow-hidden group cursor-none"
                onClick={() => handleOpenAlbum(i)}
                onMouseEnter={() => setLabel(album.photos.length > 0 ? "View Album" : "Soon")}
                onMouseLeave={() => setLabel("")}
              >
                <img
                  src={album.coverImage}
                  alt={album.title}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end pointer-events-none">
                  <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-1">
                    {album.title}
                  </h3>
                  <p className="font-['DM_Mono'] text-[11px] uppercase tracking-widest text-white/50">
                    {album.photoCount} {album.photoCount === 1 ? 'Photo' : 'Photos'}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox for the currently active album */}
      <ImageLightbox
        images={activeAlbum ? activeAlbum.photos : []}
        index={lightboxIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}