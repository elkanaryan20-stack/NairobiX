import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BusinessGrowthAuditForm } from "@/components/forms/business-growth-audit-form";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";

const TITLE = "Business Growth Assessment";
const DESCRIPTION =
  "A short diagnostic of how your business attracts, converts and serves customers — so NairobiX can identify what's worth reviewing and the most practical next step.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/business-growth-audit",
});

/**
 * A focused diagnostic environment, not a page of the marketing site: the
 * full navigation and footer are replaced by a minimal header (logo + a way
 * back) and a slim legal footer, so the only task on the page is the
 * assessment. The intro answers what a cold visitor needs before starting —
 * what this is, why do it, how long it takes, what happens next — and
 * stays short so the first question is close to the top on a phone.
 */
export default function BusinessGrowthAuditPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/business-growth-audit" })} />

      <header className="border-b border-white/10 bg-[#070707]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="-my-2 flex items-center gap-2 py-2 text-white" aria-label="NairobiX home">
            <Image src="/images/NairobiX-logo.png" alt="" width={32} height={32} className="h-6 w-auto object-contain" />
            <span className="text-lg font-bold">
              Nairobi<span className="text-[var(--color-primary)]">X</span>
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span> Back to NairobiX
          </Link>
        </div>
      </header>

      <main id="main-content" className="nx-env-blueprint min-h-[calc(100vh-4rem)] text-white [--section-bg:#09090a]">
        <BusinessGrowthAuditForm />
      </main>

      <footer className="border-t border-white/10 bg-[#030304]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-[var(--text-tertiary)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 NairobiX.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="inline-block py-2 transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="inline-block py-2 transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
