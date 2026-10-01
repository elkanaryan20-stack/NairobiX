import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// The NairobiX legal documents — one registry for routes, cross-links, the
// footer and the sitemap, so the three pages always point at each other
// correctly. Each document keeps its own last-updated date.

export type LegalDocumentKey = "privacy" | "terms" | "cookies";

export const LEGAL_DOCUMENTS: Record<
  LegalDocumentKey,
  { href: string; title: string; summary: string; lastUpdated: string; lastUpdatedISO: string; legacyHref?: string }
> = {
  privacy: {
    href: "/privacy-policy",
    title: "Privacy Policy",
    summary: "How NairobiX collects, uses, protects and manages personal information.",
    lastUpdated: "1 October 2026",
    lastUpdatedISO: "2026-10-01",
    legacyHref: "/privacy",
  },
  terms: {
    href: "/terms-of-service",
    title: "Terms of Service",
    summary: "The rules for using the NairobiX website and digital services, and how they relate to Client agreements.",
    lastUpdated: "1 October 2026",
    lastUpdatedISO: "2026-10-01",
    legacyHref: "/terms",
  },
  cookies: {
    href: "/cookie-policy",
    title: "Cookie Policy",
    summary: "The cookies and similar browser technologies this website uses, and how to control them.",
    lastUpdated: "1 October 2026",
    lastUpdatedISO: "2026-10-01",
  },
};

export const LEGAL_ORDER: LegalDocumentKey[] = ["privacy", "terms", "cookies"];

/** Page metadata for a legal document, with the full brand line as the title. */
export function legalMetadata(key: LegalDocumentKey, description: string): Metadata {
  const doc = LEGAL_DOCUMENTS[key];
  const fullTitle = `NairobiX ${doc.title} | Growth Systems for Ambitious Businesses`;
  const base = pageMetadata({ title: doc.title, description, path: doc.href });
  return {
    ...base,
    title: { absolute: fullTitle },
    openGraph: { ...base.openGraph, title: fullTitle },
    twitter: { ...base.twitter, title: fullTitle },
  };
}
