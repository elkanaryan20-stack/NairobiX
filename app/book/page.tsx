import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";

const TITLE = "Book a Consultation";
const DESCRIPTION =
  "Book a 30-minute NairobiX Business Growth Consultation: a focused conversation about your growth priority, your biggest constraint and the practical next step.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/book" });

const MONO = "font-mono text-[10px] uppercase tracking-[0.2em]";

const DISCUSS = [
  "Your current growth priority",
  "The biggest constraint behind it",
  "How customers find you, and what happens next",
  "Where systems — CRM, automation, AI, digital — could genuinely help",
  "A clear, practical next step",
];

const PREPARE = ["Your main priority for the next six months", "How enquiries arrive today", "The tools you already use"];

/** Session context, shown beside the booking interface. */
function SessionContext({ fromAssessment }: { fromAssessment: boolean }) {
  return (
    <div className="space-y-8">
      <div>
        <p className={`${MONO} text-white/45`}>Who it&apos;s for</p>
        <p className="mt-2 text-[15px] leading-7 text-white/80">
          Owners and leaders of growing businesses who want to talk through a specific growth challenge or opportunity
          with the team.
        </p>
      </div>
      <div>
        <p className={`${MONO} text-white/45`}>What we&apos;ll cover</p>
        <ol className="mt-3 space-y-2">
          {DISCUSS.map((item, i) => (
            <li key={item} className="grid grid-cols-[1.75rem_minmax(0,1fr)] text-[15px] leading-6 text-white/80">
              <span className="font-mono text-xs leading-6 text-[var(--color-primary)]">{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <p className={`${MONO} text-white/45`}>Worth having to hand</p>
        <ul className="mt-3 space-y-1.5">
          {PREPARE.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-white/65">
              <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-[var(--color-primary)]" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-white/40">Rough notes are plenty — nothing formal.</p>
      </div>
      <div className="border-t border-white/10 pt-6">
        <p className={`${MONO} text-white/45`}>After you book</p>
        <p className="mt-2 text-sm leading-6 text-white/70">
          {fromAssessment
            ? "We'll review your Growth Assessment together with what you share here, so the conversation starts from your business context."
            : "We review what you share in the booking before the call, so the thirty minutes go to your business — not an introduction."}
        </p>
        {!fromAssessment ? (
          <p className="mt-3 text-sm leading-6 text-white/50">
            Not ready to talk yet?{" "}
            <Link href="/business-growth-audit" className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-[var(--color-primary)]">
              Start the 4-minute assessment
            </Link>{" "}
            instead.
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  // The only signal this page has that a visitor completed a Growth
  // Assessment — set by the assessment's own "Book a Consultation" link.
  const fromAssessment = params.ref === "assessment";

  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/book" })} />
      <SiteHeader />
      <main id="main-content" className="bg-[#070707] text-white">
        {/* A compact introduction: the booking itself is the page. */}
        <Section tone="clear" spacing="compact" className="border-b border-white/10">
          <div className="grid gap-8 pt-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16 lg:pt-8">
            <div>
              <Eyebrow>{fromAssessment ? "NEXT STEP AFTER YOUR ASSESSMENT" : "NAIROBIX · CONSULTATION"}</Eyebrow>
              <Heading as="h1" variant="display-lg" className="mt-4">
                Business Growth Consultation
              </Heading>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                A focused 30-minute conversation about where your business is today, what&apos;s holding growth back,
                and the practical next step.
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {[
                ["Length", "30 minutes"],
                ["Days", "Monday–Friday"],
                ["Hours", "9:00–17:00 EAT"],
              ].map(([term, value]) => (
                <div key={term}>
                  <dt className={`${MONO} text-white/45`}>{term}</dt>
                  <dd className="mt-2 text-sm font-medium text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        <Section tone="core">
          <BookingFlow context={<SessionContext fromAssessment={fromAssessment} />} />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
