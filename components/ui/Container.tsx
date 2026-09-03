import type { ElementType, ReactNode } from "react";

const WIDTH_CLASSES = {
  default: "max-w-7xl",
  narrow: "max-w-5xl",
  prose: "max-w-[var(--max-width-prose)]",
} as const;

export function Container({
  children,
  width = "default",
  className = "",
  as: Component = "div",
}: {
  children: ReactNode;
  width?: keyof typeof WIDTH_CLASSES;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Component className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${WIDTH_CLASSES[width]} ${className}`}>
      {children}
    </Component>
  );
}
