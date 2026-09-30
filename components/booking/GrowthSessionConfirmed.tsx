"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const MONO = "font-mono text-[10px] uppercase tracking-[0.2em]";

const NEXT = [
  "A confirmation arrives in your inbox from our booking system.",
  "NairobiX reviews what you shared, so the thirty minutes go to your business rather than introductions.",
  "The team confirms the meeting details with you before the session.",
];

const PREPARE = [
  "The one outcome you'd most like from the next six months",
  "How customers find you today, and what happens after they enquire",
  "The tools you already use — website, CRM, WhatsApp, spreadsheets",
];

/**
 * Shown once Zoho Bookings has actually created the appointment (see
 * BookingFlow). Every detail comes from the booking itself — the chosen
 * slot, the email given, and Zoho's booking reference when returned. No
 * meeting link is shown because none exists yet; the copy says how it
 * arrives instead of inventing one.
 */
export function GrowthSessionConfirmed({
  formattedDate,
  formattedTime,
  localTime,
  email,
  discussionTopic,
  firstName,
  bookingId,
}: {
  formattedDate: string;
  formattedTime: string;
  localTime?: string | null;
  email: string;
  discussionTopic: string;
  firstName: string;
  bookingId?: string;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div role="status" aria-live="polite" className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
      <div>
        <p className={`${MONO} flex items-center gap-2 text-[var(--color-primary)]`}>
          <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-[9px] text-black">
            ✓
          </span>
          Booked
        </p>
        <h2 ref={headingRef} tabIndex={-1} className="mt-4 font-display text-4xl font-medium tracking-tight text-white outline-none sm:text-5xl">
          Consultation confirmed.
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-8 text-[var(--text-secondary)]">
          {firstName ? `Thank you, ${firstName}. ` : ""}Your Business Growth Consultation is booked. A confirmation is on its way to{" "}
          <span className="text-white">{email}</span>.
        </p>

        <dl className="mt-8 divide-y divide-white/10 border-y border-white/10 text-sm">
          <Row label="Date" value={formattedDate} />
          <Row label="Time" value={`${formattedTime} · East Africa Time (EAT, UTC+3)`} />
          {localTime ? <Row label="Your time" value={localTime.replace(/ your time/, "")} /> : null}
          <Row label="Duration" value="30 minutes" />
          {discussionTopic ? <Row label="Focus" value={discussionTopic} /> : null}
          <Row label="Meeting details" value="Confirmed with you by the team before the session" />
          {bookingId ? <Row label="Booking reference" value={bookingId} mono /> : null}
        </dl>
      </div>

      <div className="lg:pt-10">
        <div className="border border-white/10 bg-[#0c0d0e] p-6 sm:p-8">
          <p className={`${MONO} text-white/50`}>What happens next</p>
          <ol className="mt-5 space-y-4">
            {NEXT.map((step, i) => (
              <li key={step} className="grid grid-cols-[2rem_minmax(0,1fr)] text-[15px] leading-6 text-white/80">
                <span className="font-mono text-xs leading-6 text-[var(--color-primary)]">{String(i + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className={`${MONO} text-white/50`}>Worth having to hand</p>
            <ul className="mt-4 space-y-2.5">
              {PREPARE.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-white/70">
                  <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-[var(--color-primary)]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-5 text-white/40">Nothing needs to be prepared formally — rough notes are plenty.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link href="/case-studies" className="text-white hover:text-[var(--color-primary)]">
            See how we approach problems →
          </Link>
          <Link href="/insights" className="text-white/70 hover:text-white">
            Read NairobiX Insights →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3">
      <dt className="shrink-0 text-white/45">{label}</dt>
      <dd className={`text-right text-white ${mono ? "font-mono text-xs" : "font-medium"}`}>{value}</dd>
    </div>
  );
}
