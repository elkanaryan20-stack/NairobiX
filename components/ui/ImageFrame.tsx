import Image from "next/image";

const ASPECT_CLASSES = {
  hero: "aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/5]",
  wide: "aspect-[16/9]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
} as const;

// Inline SVG fractal-noise turbulence — a lightweight, dependency-free grain
// texture applied over every treated photo so disparate source images read
// as one unified, art-directed system rather than dropped-in stock photos.
export const GRAIN_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function ImageFrame({
  src,
  alt,
  aspect = "wide",
  preload = false,
  sizes = "100vw",
  className = "",
  treatment = true,
}: {
  src: string;
  alt: string;
  aspect?: keyof typeof ASPECT_CLASSES;
  preload?: boolean;
  sizes?: string;
  className?: string;
  treatment?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-image)] ${ASPECT_CLASSES[aspect]} ${className}`}
    >
      <Image src={src} alt={alt} fill preload={preload} sizes={sizes} className="object-cover" />
      {treatment ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/15 to-transparent" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
          />
        </>
      ) : null}
    </div>
  );
}
