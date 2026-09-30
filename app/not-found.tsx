import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const ROUTES = [
  ["Solutions", "/solutions", "The six connected solution areas"],
  ["Case studies", "/case-studies", "How we approach real business problems"],
  ["Insights", "/insights", "Practical thinking on growth, CRM, automation and AI"],
  ["Contact", "/contact", "Start a conversation with the team"],
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="bg-[#070707] text-white">
        <Container className="py-20 sm:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)]">404 · Page not found</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            This page isn&apos;t part of the system.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
            The link may be out of date, or the page may have moved. These are good places to continue.
          </p>
          <ul className="mt-12 grid border-t border-white/10 sm:grid-cols-2">
            {ROUTES.map(([label, href, text]) => (
              <li key={href} className="border-b border-white/10">
                <Link href={href} className="group flex items-baseline justify-between gap-6 py-5 sm:pr-8">
                  <span>
                    <span className="block font-display text-xl text-white">{label}</span>
                    <span className="mt-1 block text-sm text-white/55">{text}</span>
                  </span>
                  <span aria-hidden="true" className="text-[var(--color-primary)] transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <Button href="/" variant="secondary">Back to the homepage →</Button>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
