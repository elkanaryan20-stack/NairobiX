import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)] ${className}`}>
      {children}
    </p>
  );
}
