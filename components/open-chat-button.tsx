import type { AnchorHTMLAttributes, ReactNode } from "react";
import { BOTPRESS_SHARE_URL } from "@/lib/site-data";

export function OpenChatButton({
  children,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a
      href={BOTPRESS_SHARE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
