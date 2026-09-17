import Link from "next/link";
import { Children } from "react";
import type { ReactNode } from "react";

const TRAILING_ARROW = /^(.*?)\s*→$/;

/**
 * If the button's label ends in the site's "→" convention (used throughout
 * without a separate element to animate independently), splits it out into
 * its own span so hover can nudge just the arrow — without any call site
 * needing to change its copy or markup.
 */
function withAnimatedArrow(children: ReactNode): ReactNode {
  const items = Children.toArray(children);
  const last = items[items.length - 1];
  if (typeof last !== "string") return children;

  const match = TRAILING_ARROW.exec(last);
  if (!match) return children;

  const [, textBefore] = match;
  return (
    <>
      {items.slice(0, -1)}
      {textBefore}
      {textBefore ? " " : null}
      <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
    </>
  );
}

const VARIANT_CLASSES = {
  primary: "bg-[var(--color-primary)] font-semibold text-[var(--color-on-primary)] hover:bg-[var(--color-primary-strong)]",
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
  const classes = `group inline-flex items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;
  const content = withAnimatedArrow(children);

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
