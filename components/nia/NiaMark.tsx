import type { SVGProps } from "react";

type WipePhase = "idle" | "out" | "hold" | "in";

const WIPE_ANIMATION_CLASS: Partial<Record<WipePhase, string>> = {
  out: "animate-nia-wipe-out",
  in: "animate-nia-wipe-in",
};

/**
 * The Nia mark: an "N"-only glyph sharing the NairobiX logo's geometry
 * (paired vertical strokes + connecting diagonal), used wherever Nia is
 * referenced visually instead of a generic chat/AI icon. Renders in
 * `currentColor` so it inherits color from its parent like any other icon.
 *
 * `wipePhase` drives the rare signature disappear/reappear behavior (see
 * lib/useNiaPersonality.ts) via clip-path — the glyph's position never
 * changes, only how much of it is visible.
 */
export function NiaMark({
  wipePhase = "idle",
  ...props
}: SVGProps<SVGSVGElement> & { wipePhase?: WipePhase }) {
  const wipeClass = WIPE_ANIMATION_CLASS[wipePhase] ?? "";
  const holdStyle = wipePhase === "hold" ? { clipPath: "inset(0 100% 0 0)" } : undefined;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
      className={[props.className, wipeClass].filter(Boolean).join(" ")}
      style={{ ...props.style, ...holdStyle }}
    >
      <rect x="3.5" y="4" width="3.6" height="16" fill="currentColor" />
      <rect x="16.9" y="4" width="3.6" height="16" fill="currentColor" />
      <path d="M7.1 4L16.9 20" stroke="currentColor" strokeWidth="3.6" strokeLinecap="square" />
    </svg>
  );
}
