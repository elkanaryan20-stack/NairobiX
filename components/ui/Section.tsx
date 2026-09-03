import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

const TONE_CLASSES = {
  base: "bg-[#0b0b0d]",
  surface: "bg-[#111214]",
} as const;

const SPACING_CLASSES = {
  default: "py-20 sm:py-24 lg:py-28",
  compact: "py-12 sm:py-16",
  hero: "py-20 sm:py-24 lg:py-32",
} as const;

export function Section({
  children,
  tone = "base",
  border = "none",
  spacing = "default",
  containerWidth = "default",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: keyof typeof TONE_CLASSES;
  border?: "none" | "top";
  spacing?: keyof typeof SPACING_CLASSES;
  containerWidth?: "default" | "narrow" | "prose";
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${TONE_CLASSES[tone]} ${border === "top" ? "border-t border-white/10" : ""} ${className}`}
    >
      <Container width={containerWidth} className={SPACING_CLASSES[spacing]}>
        {children}
      </Container>
    </section>
  );
}
