"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { BOOKING_URL, NAV_ITEMS, SOLUTION_CATEGORIES } from "@/lib/site-data";
import { SkipToContent } from "@/components/skip-to-content";

const CTAS = [
  { label: "Book a Consultation", href: BOOKING_URL, external: false },
  { label: "Get Free Growth Assessment", href: "/business-growth-audit", external: false },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
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
            const isActive = pathname === item.href;
            const linkClass = `relative text-sm font-medium transition after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-[var(--color-primary)] after:transition-all after:duration-300 ${
              isActive
                ? "text-[var(--color-primary)] after:w-full"
                : "text-[var(--text-secondary)] after:w-0 hover:text-white hover:after:w-full"
            }`;

            if (item.label === "Solutions") {
              return (
                <div key={item.label} className="group relative">
                  <Link href={item.href} className={`inline-flex items-center gap-1 py-2 ${linkClass}`}>
                    {item.label}
                    <ChevronDown
                      className="h-3.5 w-3.5 transition group-hover:rotate-180 group-focus-within:rotate-180"
                      aria-hidden="true"
                    />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-6 shadow-[var(--shadow-elevated)]">
                      <div className="grid grid-cols-3 gap-6">
                        {SOLUTION_CATEGORIES.map((category) => (
                          <div key={category.id}>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                              {category.title}
                            </p>
                            <ul className="space-y-2.5">
                              {category.items.map((solution) => (
                                <li key={solution.id}>
                                  <Link
                                    href={`/solutions/${solution.id}`}
                                    className="text-sm text-[var(--text-secondary)] transition hover:text-white"
                                  >
                                    {solution.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                        <p className="text-sm text-[var(--text-secondary)]">Not sure where to start?</p>
                        <Link
                          href="/business-growth-audit"
                          className="whitespace-nowrap text-sm font-semibold text-[var(--color-primary)] transition hover:text-white"
                        >
                          Get Your Free Growth Assessment →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link key={item.label} href={item.href} className={linkClass}>
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
                  : "inline-flex items-center rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-on-primary)] transition hover:bg-[var(--color-primary-strong)]"
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
              <Link
                href={BOOKING_URL}
                onClick={() => setMobileOpen(false)}
                className="mb-3 flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white"
              >
                Book a Consultation
              </Link>
              <Link
                href="/business-growth-audit"
                className="flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-[var(--color-on-primary)]"
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
