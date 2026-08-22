import type { AnchorHTMLAttributes, ReactNode } from "react";

const BOTPRESS_SHARE_URL =
  "https://cdn.botpress.cloud/webchat/v3.7/shareable.html?configUrl=https://files.bpcontent.cloud/2026/08/01/07/20260801073051-QOAXJ859.json";

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
