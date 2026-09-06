"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export function OpenChatButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("nia:open"))}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
