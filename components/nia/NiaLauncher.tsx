"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NiaChat } from "@/components/nia/NiaChat";
import { NiaMark } from "@/components/nia/NiaMark";
import { NiaNote } from "@/components/nia/NiaNote";
import { useNiaPersonality } from "@/lib/useNiaPersonality";

export function NiaLauncher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const {
    buttonRef,
    glyphClass,
    bodyClass,
    wipePhase,
    isRolling,
    away,
    bubble,
    travelStyle,
    rotorStyle,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    triggerClickRoll,
  } = useNiaPersonality({ active: !isOpen && !mobileNavOpen, pathname });

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
        // A click-through, clipped stage the size of the viewport: Nia can roll
        // to (and past) its edges without ever creating page overflow or
        // touching layout — she only ever moves by transform.
        <div className="pointer-events-none fixed inset-0 z-50 overflow-clip">
          <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6" style={travelStyle}>
            <div className={bodyClass}>
              <NiaNote text={bubble.text} visible={bubble.visible} />
              <button
                ref={buttonRef}
                type="button"
                onClick={() => triggerClickRoll(() => setIsOpen(true))}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onFocus={onFocus}
                onBlur={onBlur}
                aria-label="Open Nia, the NairobiX Growth Assistant"
                aria-expanded={false}
                className={`${away ? "pointer-events-none" : "pointer-events-auto"} flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-[0_10px_28px_rgba(0,0,0,0.45)] transition hover:bg-[var(--color-primary-strong)]`}
              >
                <span className="block" style={rotorStyle}>
                  <NiaMark
                    wipePhase={wipePhase}
                    className={`h-6 w-6 ${isRolling ? "animate-nia-roll" : glyphClass}`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
