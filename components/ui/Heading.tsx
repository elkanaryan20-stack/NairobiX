import type { ElementType, ReactNode } from "react";

const VARIANT_CLASSES = {
  "display-xl": "font-display text-4xl font-medium tracking-tight sm:text-5xl lg:text-7xl",
  "display-lg": "font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-6xl",
  "display-md": "font-display text-3xl font-medium tracking-tight sm:text-4xl",
  "heading-lg": "font-display text-2xl font-medium tracking-tight sm:text-3xl",
  "heading-md": "font-display text-xl font-medium tracking-tight sm:text-2xl",
} as const;

const DEFAULT_TAG: Record<keyof typeof VARIANT_CLASSES, ElementType> = {
  "display-xl": "h1",
  "display-lg": "h2",
  "display-md": "h2",
  "heading-lg": "h3",
  "heading-md": "h3",
};

export function Heading({
  variant,
  as,
  id,
  children,
  className = "",
}: {
  variant: keyof typeof VARIANT_CLASSES;
  as?: ElementType;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const Component = as ?? DEFAULT_TAG[variant];
  return (
    <Component id={id} className={`text-white ${VARIANT_CLASSES[variant]} ${className}`}>
      {children}
    </Component>
  );
}
