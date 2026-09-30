import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

// NairobiX environments (see the "NairobiX environments" block in
// globals.css). Each tone is chosen for what the visitor should feel at that
// point in the page, and publishes its surface colour as --section-bg, so
// components that need an opaque fill matching the section (e.g. a hollow
// node masking a line) can use bg-[var(--section-bg)] instead of a hex.
const TONE_CLASSES = {
  /** Site-wide default dark (inner pages). */
  base: "bg-[#0b0b0d] [--section-bg:#0b0b0d]",
  /** Site-wide raised dark (inner pages). */
  surface: "bg-[#111214] [--section-bg:#111214]",
  /** Core black — neutral. */
  core: "bg-[#070707] [--section-bg:#070707]",
  /** Graphite — neutral raised. */
  graphite: "bg-[#101112] [--section-bg:#101112]",
  /** Business + human context: warm black, warm edge light, long lines. */
  warmth: "nx-env-warmth",
  /** Operating system: steel-black, divisions on the card edges. */
  steel: "nx-env-steel",
  /** Friction: charcoal with broken, interrupted lines. */
  friction: "nx-env-friction",
  /** Flow: ink with system paths and a scroll-driven signal. */
  flow: "nx-env-flow",
  /** Precision: cool slate, engineering columns, vignette. */
  technical: "nx-env-technical",
  /** Architecture: blueprint alignment lines and intersection markers. */
  blueprint: "nx-env-blueprint",
  /** Human context: the photograph is the environment (see page markup). */
  photo: "nx-env-photo",
  /** Relevance: warm charcoal with soft banding. */
  business: "nx-env-business",
  /** Experience: interface graphite with depth behind the workspace. */
  interface: "nx-env-interface",
  /** Application: quiet ink black — imagery carries the section. */
  ink: "bg-[#08090a] [--section-bg:#08090a]",
  /** Knowledge: the one light editorial surface. Content needs dark text. */
  editorial: "nx-env-editorial",
  /** Focus: the richest warm near-black, directional light. */
  focus: "nx-env-focus",
  /** Clarity: pure black, deliberately bare. */
  clear: "bg-[#060606] [--section-bg:#060606]",
  /** Confidence / closure: deep black. */
  deep: "bg-[#050505] [--section-bg:#050505]",
  /** Solutions page: the business system map (hero). */
  map: "nx-env-map",
  /** Solutions page: the interactive architecture. */
  architecture: "nx-env-architecture",
  /** Solutions page: Acquire & Grow group. */
  acquire: "nx-env-acquire",
  /** Solutions page: Convert & Scale group. */
  convert: "nx-env-convert",
  /** Solutions page: Build & Innovate group. */
  build: "nx-env-build",
} as const;

// The NairobiX spacing scale. Section height is always content-driven — these
// are the only padding steps, and mobile never inherits desktop whitespace.
//   default — a standard chapter
//   compact — secondary material (related reading, notes)
//   lead    — a section that leads straight into a closely related next one:
//             full breathing room above, a shorter hand-off below
//   hero    — page openings
const SPACING_CLASSES = {
  default: "py-16 sm:py-20 lg:py-28",
  compact: "py-12 sm:py-16",
  lead: "pt-16 pb-10 sm:pt-20 sm:pb-12 lg:pt-28 lg:pb-16",
  hero: "py-16 sm:py-24 lg:py-32",
} as const;

export function Section({
  children,
  tone = "base",
  border = "none",
  spacing = "default",
  containerWidth = "default",
  seam,
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: keyof typeof TONE_CLASSES;
  border?: "none" | "top";
  spacing?: keyof typeof SPACING_CLASSES;
  containerWidth?: "default" | "narrow" | "prose";
  /** A system node on this section's top boundary, on the content grid's
      left edge ("signal" = orange, for decision points). Use sparingly. */
  seam?: "node" | "signal";
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${TONE_CLASSES[tone]} ${border === "top" ? "border-t border-white/10" : ""} ${seam ? "relative" : ""} ${className}`}
    >
      {seam ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <span className="nx-seam-node" data-signal={seam === "signal"} />
              <span className="nx-seam-line" />
            </div>
          </div>
        </div>
      ) : null}
      <Container width={containerWidth} className={SPACING_CLASSES[spacing]}>
        {children}
      </Container>
    </section>
  );
}
