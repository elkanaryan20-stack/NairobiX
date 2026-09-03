"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BOOKING_URL, NAV_ITEMS } from "@/lib/site-data";

const CTAS = [
  { label: "Book a Consultation", href: BOOKING_URL, external: true },
  { label: "Get Free Growth Assessment", href: "/business-growth-audit", external: false },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#030304]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-white" aria-label="NairobiX home">
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
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition ${
                  isActive ? "text-[var(--color-primary)]" : "text-[var(--text-secondary)] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {CTAS.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener noreferrer" : undefined}
              className={
                cta.label === "Book a Consultation"
                  ? "inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10"
                  : "inline-flex items-center rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-strong)]"
              }
            >
              {cta.label}
            </a>
          ))}
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
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mb-3 flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white"
              >
                Book a Consultation
              </a>
              <Link
                href="/business-growth-audit"
                className="flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white"
              >
                Get Free Growth Assessment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
