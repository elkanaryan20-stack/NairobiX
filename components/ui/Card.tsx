import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

const VARIANT_CLASSES = {
  outline: "border border-white/10 bg-white/[0.02]",
  elevated: "border border-white/10 bg-white/[0.02] shadow-[var(--shadow-elevated)]",
  surface: "border border-white/10 bg-[var(--color-surface-3)]",
} as const;

type CardOwnProps<T extends ElementType> = {
  as?: T;
  variant?: keyof typeof VARIANT_CLASSES;
  className?: string;
  children: ReactNode;
};

type CardProps<T extends ElementType> = CardOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps<T>>;

export function Card<T extends ElementType = "div">({
  as,
  variant = "outline",
  className = "",
  children,
  ...rest
}: CardProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component className={`rounded-[var(--radius-card)] ${VARIANT_CLASSES[variant]} ${className}`} {...rest}>
      {children}
    </Component>
  );
}
