import type { SVGProps } from "react";

/**
 * The Nia mark: an "N"-only glyph sharing the NairobiX logo's geometry
 * (paired vertical strokes + connecting diagonal), used wherever Nia is
 * referenced visually instead of a generic chat/AI icon. Renders in
 * `currentColor` so it inherits color from its parent like any other icon.
 */
export function NiaMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.5" y="4" width="3.6" height="16" fill="currentColor" />
      <rect x="16.9" y="4" width="3.6" height="16" fill="currentColor" />
      <path d="M7.1 4L16.9 20" stroke="currentColor" strokeWidth="3.6" strokeLinecap="square" />
    </svg>
  );
}
