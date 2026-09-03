import Link from "next/link";
import type { ReactNode } from "react";

const VARIANT_CLASSES = {
  primary: "bg-[var(--color-primary)] font-semibold text-white hover:bg-[var(--color-primary-strong)]",
  secondary: "border border-white/15 bg-white/5 font-medium text-white hover:border-white/30 hover:bg-white/10",
  ghost: "font-medium text-white hover:text-[var(--color-primary)]",
} as const;

const SIZE_CLASSES = {
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-sm",
} as const;

type SharedProps = {
  children: ReactNode;
  variant?: keyof typeof VARIANT_CLASSES;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
};

type ButtonProps = SharedProps & {
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  href,
  external,
  onClick,
  type = "button",
  disabled,
  variant = "primary",
  size = "lg",
  className = "",
  children,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
