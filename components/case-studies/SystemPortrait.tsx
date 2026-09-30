import Image from "next/image";
import { GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import { Fragment } from "@/components/case-studies/fragments";
import type { UIFragment } from "@/lib/case-studies";

/**
 * A "system portrait": a real photograph of the kind of business, with three
 * fragments of the designed system composed over it and joined by thin
 * system lines — an art-directed hero, not a dashboard. On small screens the
 * photograph leads and two fragments follow, stacked.
 */
export function SystemPortrait({
  image,
  imageAlt,
  fragments,
  preload = false,
  compact = false,
}: {
  image: string;
  imageAlt: string;
  fragments: UIFragment[];
  preload?: boolean;
  /** Smaller composition for index previews. */
  compact?: boolean;
}) {
  const [a, b, c] = fragments;
  return (
    <figure className="relative">
      {/* Desktop composition */}
      <div className={`relative hidden md:block ${compact ? "aspect-[16/11]" : "aspect-[16/12]"}`}>
        <div className="absolute inset-y-0 right-0 w-[74%] overflow-hidden rounded-[var(--radius-image)] bg-white/[0.03]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            preload={preload}
            sizes={compact ? "(min-width: 1024px) 480px, 70vw" : "(min-width: 1280px) 620px, 60vw"}
            className="object-cover grayscale-[35%] transition-[scale] duration-700 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-[#070707]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/80 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }} />
          {/* Blueprint alignment lines over the photograph */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "25% 33.333%",
            }}
          />
        </div>

        {/* System lines joining the fragments */}
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d={compact ? "M 46 30 L 50 30 L 50 62" : "M 20 45 L 20 62 L 36 62"} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
          <path d={compact ? "M 50 62 L 56 62 L 56 70" : "M 36 62 L 80 62 L 80 44"} fill="none" stroke="rgba(249,115,22,0.7)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
        <span aria-hidden="true" className={`absolute ${compact ? "left-[50%]" : "left-[36%]"} top-[62%] z-30 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-primary)] bg-[#070707]`}>
          <span className="absolute inset-[3px] rounded-full bg-[var(--color-primary)]" />
        </span>

        {a ? <div className={`absolute left-0 z-20 ${compact ? "top-[6%] w-[46%]" : "top-[3%] w-[42%]"}`}><Fragment fragment={a} /></div> : null}
        {b ? (
          <div className={`absolute z-20 ${compact ? "bottom-[6%] right-[4%] w-[44%]" : "-bottom-[5%] left-[40%] w-[40%]"}`}>
            <Fragment fragment={b} />
          </div>
        ) : null}
        {c && !compact ? <div className="absolute -top-[4%] right-[2%] z-10 w-[36%]"><Fragment fragment={c} /></div> : null}
      </div>

      {/* Mobile composition */}
      <div className="md:hidden">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-image)] bg-white/[0.03]">
          <Image src={image} alt={imageAlt} fill preload={preload} sizes="100vw" className="object-cover grayscale-[35%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/30 to-transparent" />
        </div>
        {!compact ? (
          <div className="relative z-10 -mt-16 space-y-3 px-3">
            {a ? <Fragment fragment={a} /> : null}
            {b ? <div className="ml-8"><Fragment fragment={b} /></div> : null}
          </div>
        ) : null}
      </div>
      <figcaption className="sr-only">
        Illustrative composition of the designed system: a photograph of the kind of business, with interface fragments
        from the proposed system.
      </figcaption>
    </figure>
  );
}
