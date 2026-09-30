"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const MONO = "font-mono text-[10px] uppercase tracking-[0.2em]";

/**
 * The shared frame for NairobiX lead forms: a compact editorial introduction,
 * then the form in a bordered workspace. With `aside`, the context column
 * (what happens next, alternatives) sits beside the form and stays in view.
 * `icon` is accepted for compatibility but no longer rendered.
 */
export function LeadFormShell({
  eyebrow,
  title,
  description,
  aside,
  children,
}: {
  icon?: string;
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#070707] text-white">
      <section className="border-b border-white/10">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className={`${MONO} text-[var(--color-primary)]`}>{eyebrow}</p>
            <Heading as="h1" variant="display-lg" className="mt-4">
              {title}
            </Heading>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">{description}</p>
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-14 lg:py-16">
        {aside ? (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-14">
            <div className="border border-white/10 bg-[#0c0d0e] p-5 sm:p-8 lg:p-10">{children}</div>
            <aside className="lg:sticky lg:top-28 lg:self-start">{aside}</aside>
          </div>
        ) : (
          <div className="border border-white/10 bg-[#0c0d0e] p-5 sm:p-8 lg:p-10">{children}</div>
        )}
      </Container>
    </div>
  );
}

/** Numbered "what happens next" steps for a form's context column. */
export function FormContext({
  steps,
  note,
  alternative,
}: {
  steps: string[];
  note?: string;
  alternative?: { lead: string; label: string; href: string };
}) {
  return (
    <div className="space-y-8">
      <div>
        <p className={`${MONO} text-white/50`}>What happens next</p>
        <ol className="mt-4 space-y-3">
          {steps.map((step, i) => (
            <li key={step} className="grid grid-cols-[2rem_minmax(0,1fr)] text-[15px] leading-6 text-white/80">
              <span className="font-mono text-xs leading-6 text-[var(--color-primary)]">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
        {note ? <p className="mt-4 text-sm leading-6 text-white/50">{note}</p> : null}
      </div>
      {alternative ? (
        <div className="border-t border-white/10 pt-6">
          <p className="text-sm text-white/60">{alternative.lead}</p>
          <Link href={alternative.href} className="group mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-white">
            {alternative.label}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

/** A compact confirmation: what was received, and what happens next. */
export function FormSuccessState({
  title,
  description,
  details,
  next,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  details?: [string, string][];
  next?: string[];
  actionLabel: string;
  actionHref: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div role="status" aria-live="polite">
      <p className={`${MONO} flex items-center gap-2 text-[var(--color-primary)]`}>
        <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-[9px] text-black">
          ✓
        </span>
        Received
      </p>
      <h2 ref={ref} tabIndex={-1} className="mt-4 font-display text-3xl font-medium tracking-tight text-white outline-none sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]">{description}</p>
      {details && details.length > 0 ? (
        <dl className="mt-6 divide-y divide-white/10 border-y border-white/10 text-sm">
          {details.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-6 py-3">
              <dt className="shrink-0 text-white/45">{label}</dt>
              <dd className="text-right font-medium text-white">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {next && next.length > 0 ? (
        <ol className="mt-8 space-y-3">
          {next.map((step, i) => (
            <li key={step} className="grid grid-cols-[2rem_minmax(0,1fr)] text-[15px] leading-6 text-white/80">
              <span className="font-mono text-xs leading-6 text-[var(--color-primary)]">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      ) : null}
      <Link href={actionHref} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[var(--color-primary)]">
        {actionLabel}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div role="alert" className="mb-6 flex items-start gap-3 border-l-2 border-red-400/70 bg-red-500/[0.06] px-4 py-3 text-sm leading-6 text-red-200">
      <span aria-hidden="true" className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-red-300/70 text-[10px] font-bold">
        !
      </span>
      <span>{message}</span>
    </div>
  );
}
