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
    id: "city",
    title: "City",
    coverImage: "https://res.cloudinary.com/dba2kof3v/image/upload/v1777849818/malik-buraimoh-EMjpo0YjHPw-unsplash_bhm6f7.jpg",
    photoCount: 1,
    photos: [
      { src: "https://res.cloudinary.com/dba2kof3v/image/upload/v1777849818/malik-buraimoh-EMjpo0YjHPw-unsplash_bhm6f7.jpg", alt: "City 1", caption: "City · Victoria Island, Lagos" },
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate",
    coverImage: "https://res.cloudinary.com/dba2kof3v/image/upload/v1777849467/p3_l57yec.jpg",
    photoCount: 2,
    photos: [
      { src: "https://res.cloudinary.com/dba2kof3v/image/upload/v1777849467/p3_l57yec.jpg", alt: "Real Estate 1", caption: "Real Estate · Lagos Continental Hotel" },
      { src: "https://res.cloudinary.com/dba2kof3v/image/upload/v1777849469/p6_nh0r74.jpg", alt: "Real Estate 2", caption: "Real Estate · Lagos Water Corporation" },
    ],
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