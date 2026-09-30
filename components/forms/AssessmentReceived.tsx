"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BOOKING_URL } from "@/lib/site-data";

const MONO = "font-mono text-[10px] uppercase tracking-[0.2em]";

// What actually happens after an assessment — no response time is promised.
const NEXT = [
  { title: "Received", text: "Your answers are with NairobiX, attached to your business." },
  { title: "Review", text: "The team reviews them across acquisition, sales, systems and operations." },
  { title: "Opportunities", text: "We identify where marketing, sales, technology or automation could make the most difference." },
  { title: "Next step", text: "We get in touch with the most relevant next step for where your business is now." },
];

/**
 * Rendered in place of the assessment once the Zoho submission has actually
 * succeeded (see business-growth-audit-form.tsx). Shows only what was
 * submitted — never an invented reference, date or response time.
 */
export function AssessmentReceived({
  firstName,
  companyName,
  email,
  priority,
  timeline,
}: {
  firstName: string;
  companyName: string;
  email?: string;
  priority?: string;
  timeline?: string;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const rows = [
    ["Business", companyName.trim()],
    ["Priority", priority?.trim()],
    ["Timing", timeline?.trim()],
    ["We'll reply to", email?.trim()],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <div className="bg-[#070707] text-white">
      <Container className="py-14 sm:py-20">
        <div role="status" aria-live="polite" className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <p className={`${MONO} flex items-center gap-2 text-[var(--color-primary)]`}>
              <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-[9px] text-black">
                ✓
              </span>
              Assessment received
            </p>
            <h1 ref={headingRef} tabIndex={-1} className="mt-4 font-display text-4xl font-medium leading-[1.08] tracking-tight text-white outline-none sm:text-5xl">
              Your business context is with NairobiX.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-[var(--text-secondary)]">
              {firstName.trim() ? `Thank you, ${firstName.trim()}. ` : ""}We&apos;ll review your answers and identify the most
              relevant next step — across acquisition, sales, systems and operations.
            </p>

            {rows.length > 0 ? (
              <dl className="mt-8 divide-y divide-white/10 border-y border-white/10 text-sm">
                {rows.map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="shrink-0 text-white/45">{label}</dt>
                    <dd className="text-right font-medium text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="mt-10 border border-white/10 bg-white/[0.02] p-6">
              <p className="font-display text-xl text-white">Want to talk it through sooner?</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Book a 30-minute consultation and we&apos;ll bring your assessment into the conversation.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button href={`${BOOKING_URL}?ref=assessment`} variant="primary" size="md">
                  Book a Consultation →
                </Button>
                <Button href="/case-studies" variant="secondary" size="md">
                  See how we approach problems →
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:pt-10">
            <div className="border border-white/10 bg-[#0c0d0e] p-6 sm:p-8">
              <p className={`${MONO} text-white/50`}>What happens next</p>
              <ol className="relative mt-6 space-y-6 border-l border-white/15 pl-6">
                {NEXT.map((step, i) => (
                  <li key={step.title} className="relative">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[31px] top-1 h-[11px] w-[11px] rounded-full border ${
                        i === 0 ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-white/40 bg-[#0c0d0e]"
                      }`}
                    />
                    <p className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-primary)]">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-medium text-white">{step.title}</span>
                      {i === 0 ? <span className={`${MONO} text-[var(--color-primary)]`}>Done</span> : null}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/65">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-6 text-sm text-white/55">
              In the meantime,{" "}
              <Link href="/insights" className="font-semibold text-white hover:text-[var(--color-primary)]">
                NairobiX Insights
              </Link>{" "}
              has practical reading on growth, CRM, automation and AI.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
