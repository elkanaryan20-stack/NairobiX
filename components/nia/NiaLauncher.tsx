"use client";

import { useEffect, useState } from "react";
import { NiaChat } from "@/components/nia/NiaChat";
import { NiaMark } from "@/components/nia/NiaMark";

export function NiaLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Hide the floating bubble while the site header's mobile menu is open —
  // see the matching dispatch in components/site-header.tsx.
  useEffect(() => {
    const handleMobileNav = (event: Event) => {
      setMobileNavOpen((event as CustomEvent<{ open: boolean }>).detail.open);
    };
    window.addEventListener("nairobix:mobile-nav", handleMobileNav);
    return () => window.removeEventListener("nairobix:mobile-nav", handleMobileNav);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lets other components (e.g. "Talk to Nia" links) open the panel without
  // prop-drilling or a global store — see components/open-chat-button.tsx.
  useEffect(() => {
    const handleOpenRequest = () => setIsOpen(true);
    window.addEventListener("nia:open", handleOpenRequest);
    return () => window.removeEventListener("nia:open", handleOpenRequest);
  }, []);

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 z-50 sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[min(640px,calc(100vh-7rem))] sm:w-[400px]">
          <NiaChat onClose={() => setIsOpen(false)} />
        </div>
      ) : mobileNavOpen ? null : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Nia, the NairobiX Growth Assistant"
          aria-expanded={false}
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-[0_12px_32px_rgba(249,115,22,0.35)] transition hover:bg-[var(--color-primary-strong)] sm:bottom-6 sm:right-6"
        >
          <NiaMark className="h-6 w-6" />
        </button>
      )}
    </>
  );
}
