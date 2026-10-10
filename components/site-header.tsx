"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FocusEvent } from "react";
import { ChevronDown } from "lucide-react";
import { BOOKING_URL, NAV_ITEMS, SOLUTION_CATEGORIES } from "@/lib/site-data";
import { SkipToContent } from "@/components/skip-to-content";

const CTAS = [
  { label: "Find Your Growth Leak", href: "/business-growth-audit", external: false },
  { label: "Talk to Us", href: BOOKING_URL, external: false },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Growth Systems mega-menu. Open state is explicit (not CSS :hover alone) so it
  // survives the pointer crossing the gap between the trigger and the panel,
  // and can close on Escape, an outside click, or another nav item.
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const suppressFocusOpen = useRef(false);

  const openMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  }, []);
  const closeMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(false);
  }, []);
  // A short grace period bridges the gap between trigger and panel.
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(false), 150);
  }, []);
  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && (triggerRef.current?.contains(next) || panelRef.current?.contains(next))) return;
    closeMenu();
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        suppressFocusOpen.current = true;
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!triggerRef.current?.contains(target) && !panelRef.current?.contains(target)) closeMenu();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // The floating Nia launcher is mounted independently in the root layout.
  // On short mobile viewports its fixed bottom-right bubble overlaps the last
  // CTA in this open menu, obscuring it and intercepting taps meant for it —
  // so tell Nia to hide itself for as long as this menu is open.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("nairobix:mobile-nav", { detail: { open: mobileOpen } }));
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#030304]/80 backdrop-blur-xl">
      <SkipToContent />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="-my-2 flex items-center gap-2 py-2 text-white" aria-label="NairobiX home">
          <Image
            src="/images/NairobiX-logo.png"
            alt="NairobiX"
            width={32}
            height={32}
            preload
            className="h-7 w-auto object-contain sm:h-8 lg:h-9"
          />
          <span className="text-lg font-bold sm:text-xl lg:text-2xl">Nairobi<span className="text-[var(--color-primary)]">X</span></span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const linkClass = `relative text-sm font-medium transition after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-[var(--color-primary)] after:transition-all after:duration-300 ${
              isActive
                ? "text-[var(--color-primary)] after:w-full"
                : "text-[var(--text-secondary)] after:w-0 hover:text-white hover:after:w-full"
            }`;

            if (item.label === "Growth Systems") {
              return (
                <div key={item.label} className="contents">
                <Link
                  ref={triggerRef}
                  href={item.href}
                  aria-expanded={menuOpen}
                  aria-controls="solutions-menu"
                  onPointerEnter={openMenu}
                  onPointerLeave={scheduleClose}
                  onFocus={() => {
                    if (suppressFocusOpen.current) {
                      suppressFocusOpen.current = false;
                      return;
                    }
                    openMenu();
                  }}
                  onBlur={handleBlur}
                  onClick={closeMenu}
                  className={`inline-flex items-center gap-1 py-2 ${linkClass}`}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </Link>

                {/* Growth Systems mega-menu — spans the header's content container, so its
                    edges are the page grid's edges and can never leave the viewport. */}
                <div
                  id="solutions-menu"
                  ref={panelRef}
                  onPointerEnter={openMenu}
                  onPointerLeave={scheduleClose}
                  onFocus={openMenu}
                  onBlur={handleBlur}
                  className={`absolute inset-x-4 top-full z-50 hidden pt-2 transition-[opacity,transform,visibility] duration-200 ease-out sm:inset-x-6 lg:inset-x-8 lg:block ${
                    menuOpen ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0d] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                    <div className="grid grid-cols-3 divide-x divide-white/10">
                      {SOLUTION_CATEGORIES.map((category, groupIndex) => (
                        <div key={category.id} className="px-7 pb-6 pt-7">
                          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-primary)]">
                            Group {pad(groupIndex + 1)}
                          </p>
                          <p className="mt-2 text-base font-semibold text-white">{category.title}</p>
                          <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">{category.intro}</p>
                          <ul className="mt-5 space-y-1">
                            {category.items.map((solution) => (
                              <li key={solution.id}>
                                <Link
                                  href={`/solutions/${solution.id}`}
                                  onClick={closeMenu}
                                  className="group/link -mx-3 flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:bg-white/[0.04] hover:text-white focus-visible:bg-white/[0.04] focus-visible:text-white focus-visible:outline-offset-0"
                                >
                                  <span className="flex items-baseline gap-3">
                                    <span aria-hidden="true" className="font-mono text-[10px] tracking-[0.18em] text-white/35">
                                      {pad(SOLUTION_CATEGORIES.flatMap((c) => c.items).findIndex((i) => i.id === solution.id) + 1)}
                                    </span>
                                    {solution.title}
                                  </span>
                                  <span
                                    aria-hidden="true"
                                    className="-translate-x-1 text-[var(--color-primary)] opacity-0 transition duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100 group-focus-visible/link:translate-x-0 group-focus-visible/link:opacity-100"
                                  >
                                    →
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-white/10 px-7 py-4">
                      <p className="text-sm text-[var(--text-secondary)]">Not sure where to start?</p>
                      <Link
                        href="/business-growth-audit"
                        onClick={closeMenu}
                        className="group/cta whitespace-nowrap text-sm font-semibold text-[var(--color-primary)] transition-colors hover:text-white"
                      >
                        Find Your Growth Leak{" "}
                        <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                </div>
              );
            }

            return (
              <Link key={item.label} href={item.href} className={linkClass} onPointerEnter={closeMenu} onFocus={closeMenu}>
                {item.label}
              </Link>
            );
          })}
        </nav>


        <div className="hidden items-center gap-3 lg:flex">
          {CTAS.map((cta) => {
            const className =
              cta.label === "Talk to Us"
                ? "inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10"
                : "inline-flex items-center rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-on-primary)] transition hover:bg-[var(--color-primary-strong)]";
            // Internal CTAs use client-side navigation: a plain <a> reloaded the
            // whole document, re-running every tag on the site's two key CTAs.
            return cta.external ? (
              <a key={cta.label} href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
                {cta.label}
              </a>
            ) : (
              <Link key={cta.label} href={cta.href} className={className}>
                {cta.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-white" />
            <span className="block h-0.5 w-5 rounded-full bg-white" />
            <span className="block h-0.5 w-5 rounded-full bg-white" />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#030304] lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-3 py-3 text-base font-medium ${
                  pathname === item.href ? "text-[var(--color-primary)]" : "text-[var(--text-secondary)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-white/10 pt-4">
              <Link
                href={BOOKING_URL}
                onClick={() => setMobileOpen(false)}
                className="mb-3 flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white"
              >
                Talk to Us
              </Link>
              <Link
                href="/business-growth-audit"
                className="flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-[var(--color-on-primary)]"
              >
                Find Your Growth Leak
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
