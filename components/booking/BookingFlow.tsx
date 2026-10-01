"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { FormInput, FormTextarea, FieldError } from "@/components/forms/FormField";
import { SingleChoiceCards } from "@/components/forms/ChoiceCard";
import { SecuringSessionTransition } from "@/components/booking/SecuringSessionTransition";
import { GrowthSessionConfirmed } from "@/components/booking/GrowthSessionConfirmed";
import { formTrackingPayload, newEventId, trackEvent, trackOnce } from "@/lib/analytics";
import { wait, prefersReducedMotion } from "@/lib/motion";
import { DISCUSSION_TOPIC_OPTIONS as DISCUSSION_TOPICS } from "@/lib/forms/options";

// Time first: a visitor who has decided to talk sees real availability
// before typing anything (schedule-first). Details and confirmation follow.
const STEPS = ["Time", "Details", "Confirm"] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\d\s-]{7,20}$/;
const URL_REGEX = /^https?:\/\/.+/i;
const NAIROBI_TZ = "Africa/Nairobi";

const DATE_FORMATTER_LONG = new Intl.DateTimeFormat("en-KE", {
  timeZone: NAIROBI_TZ,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const MONTH_FORMATTER = new Intl.DateTimeFormat("en-KE", { month: "long", year: "numeric" });
const SHORT_MONTH = new Intl.DateTimeFormat("en-KE", { month: "short" });
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * Only weekdays — NairobiX is available Monday–Friday. Starts from today:
 * Zoho Bookings is the source of truth for whether any slots remain, so the
 * calendar offers today and lets the availability fetch decide.
 */
function buildUpcomingDates(count: number): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; dates.length < count; i += 1) {
    const candidate = new Date(today);
    candidate.setDate(today.getDate() + i);
    if (!isWeekend(candidate)) dates.push(candidate);
  }
  return dates;
}

function formatTime12h(time: string): string {
  const [hourStr, minute] = time.split(":");
  const hour = Number(hourStr);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute} ${period}`;
}

/** The visitor's own equivalent of a Nairobi slot, or null if they're on EAT. */
function localEquivalent(iso: string, time: string): string | null {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const instant = new Date(`${iso}T${time}:00+03:00`);
  const inNairobi = new Intl.DateTimeFormat("en-KE", { timeZone: NAIROBI_TZ, hour: "numeric", minute: "2-digit", hour12: true }).format(instant);
  const inLocal = new Intl.DateTimeFormat("en-KE", { hour: "numeric", minute: "2-digit", weekday: "short", hour12: true }).format(instant);
  const localOnly = new Intl.DateTimeFormat("en-KE", { hour: "numeric", minute: "2-digit", hour12: true }).format(instant);
  if (localOnly === inNairobi) return null;
  return `${inLocal} your time (${zone.replace(/_/g, " ")})`;
}

const initialFormState = {
  firstName: "",
  lastName: "",
  businessName: "",
  email: "",
  phone: "",
  website: "",
  discussionTopic: "",
  priority: "",
};

type Phase = "form" | "submitting" | "securing" | "confirmed";

/**
 * The consultation booking workspace: session context on the left (sticky on
 * desktop), the booking interface on the right. On confirmation the whole
 * workspace is replaced by the confirmation composition.
 */
export function BookingFlow({ context }: { context: ReactNode }) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("form");

  const [selectedDateISO, setSelectedDateISO] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");
  const [exhaustedDates, setExhaustedDates] = useState<Set<string>>(new Set());
  const [reloadKey, setReloadKey] = useState(0);
  const [localTime, setLocalTime] = useState<string | null>(null);

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [bookingId, setBookingId] = useState<string | undefined>();

  const panelRef = useRef<HTMLDivElement>(null);
  const upcomingDates = useMemo(() => buildUpcomingDates(20), []);

  useEffect(() => {
    if (!selectedDateISO) return;
    let cancelled = false;

    fetch(`/api/bookings/availability?date=${selectedDateISO}`)
      .then((response) => response.json())
      .then((payload) => {
        if (cancelled) return;
        if (!payload.success) {
          setAvailabilityError(payload.error || "We couldn't load times for this date.");
          return;
        }
        const times: string[] = payload.times || [];
        setAvailableTimes(times);
        if (times.length === 0) setExhaustedDates((prev) => new Set(prev).add(selectedDateISO));
      })
      .catch(() => {
        if (!cancelled) setAvailabilityError("We couldn't load times for this date — the connection may have dropped.");
      })
      .finally(() => {
        if (!cancelled) setIsLoadingTimes(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedDateISO, reloadKey]);

  // Bring the panel back into view when the step changes on small screens.
  const scrollToPanel = () => {
    const panel = panelRef.current;
    if (panel && panel.getBoundingClientRect().top < 0) {
      panel.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }
  };

  const handleSelectDate = (iso: string) => {
    setSelectedDateISO(iso);
    setSelectedTime(null);
    setLocalTime(null);
    setAvailableTimes([]);
    setAvailabilityError("");
    setIsLoadingTimes(true);
  };

  const retryAvailability = () => {
    setAvailabilityError("");
    setIsLoadingTimes(true);
    setReloadKey((k) => k + 1);
  };

  const handleSelectTime = (time: string) => {
    trackOnce("booking_start", { form_type: "consultation_booking" });
    setSelectedTime(time);
    setLocalTime(selectedDateISO ? localEquivalent(selectedDateISO, time) : null);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Error messages say how to fix the problem, not just that there is one.
  const validateDetails = () => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = "Please enter your first name.";
    if (!formData.lastName.trim()) errors.lastName = "Please enter your last name.";
    if (!formData.businessName.trim()) errors.businessName = "Please enter your business name — or your own name if you're independent.";
    if (!formData.email.trim()) errors.email = "Please enter the email the confirmation should go to.";
    else if (!EMAIL_REGEX.test(formData.email.trim())) errors.email = "That email doesn't look complete — check for a missing @ or domain.";
    if (!formData.phone.trim()) errors.phone = "Please enter a phone or WhatsApp number.";
    else if (!PHONE_REGEX.test(formData.phone.trim())) errors.phone = "Please use digits only, with an optional + and country code.";
    if (formData.website.trim() && !URL_REGEX.test(formData.website.trim())) errors.website = "Please start the address with https://";
    if (!formData.discussionTopic) errors.discussionTopic = "Please choose the area you'd most like to focus on.";
    if (!formData.priority.trim()) errors.priority = "A sentence is enough — it helps us prepare.";
    setFormErrors(errors);
    const first = Object.keys(errors)[0];
    if (first) requestAnimationFrame(() => document.querySelector<HTMLElement>(`[name="${first}"]`)?.focus());
    return !first;
  };

  const goToNextStep = () => {
    if (step === 0 && (!selectedDateISO || !selectedTime)) return;
    if (step === 1 && !validateDetails()) return;
    setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    requestAnimationFrame(scrollToPanel);
  };

  const goToStep = (target: number) => {
    setStep(target);
    requestAnimationFrame(scrollToPanel);
  };

  const handleConfirm = async () => {
    if (!selectedDateISO || !selectedTime) return;

    setSubmitError("");
    setPhase("submitting");
    const eventId = newEventId();

    const reduceMotion = prefersReducedMotion();
    const buttonHoldMs = reduceMotion ? 0 : 450;
    const minTransitionMs = reduceMotion ? 0 : 900;

    // The real request fires immediately; the transitions only ever wait on it.
    const submission = fetch("/api/bookings/appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: selectedDateISO,
        time: selectedTime,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        businessName: formData.businessName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        website: formData.website.trim(),
        discussionTopic: formData.discussionTopic,
        priority: formData.priority.trim(),
        // Tracking is for the server-side Meta event only. Attribution reaches Zoho
        // Bookings only when ZOHO_BOOKINGS_ATTRIBUTION_FIELD names a configured field.
        ...formTrackingPayload(eventId),
      }),
    }).then(async (response) => ({ ok: response.ok, payload: await response.json() }));

    await wait(buttonHoldMs);
    setPhase("securing");
    const start = Date.now();

    try {
      const { ok, payload } = await submission;
      if (!ok || !payload.success) {
        setSubmitError(payload.error || "We couldn't confirm your consultation right now.");
        setPhase("form");
        return;
      }
      const elapsed = Date.now() - start;
      if (elapsed < minTransitionMs) await wait(minTransitionMs - elapsed);
      setBookingId(payload.data?.bookingId || undefined);
      trackEvent(
        "booking_complete",
        { form_type: "consultation_booking", focus: formData.discussionTopic },
        { eventId, userData: { email: formData.email, phone: formData.phone } },
      );
      setPhase("confirmed");
    } catch {
      setSubmitError("We couldn't reach the booking system. Your details are still here — please try again.");
      setPhase("form");
    }
  };

  if (phase === "confirmed" && selectedDateISO && selectedTime) {
    return (
      <GrowthSessionConfirmed
        formattedDate={DATE_FORMATTER_LONG.format(new Date(`${selectedDateISO}T00:00:00`))}
        formattedTime={formatTime12h(selectedTime)}
        localTime={localTime}
        email={formData.email}
        discussionTopic={formData.discussionTopic}
        firstName={formData.firstName.trim()}
        bookingId={bookingId}
      />
    );
  }

  const isLocked = phase === "submitting";
  const selectedLabel = selectedDateISO ? DATE_FORMATTER_LONG.format(new Date(`${selectedDateISO}T00:00:00`)) : "";
  const leadingBlanks = upcomingDates.length ? (upcomingDates[0].getDay() + 6) % 7 : 0;

  return (
    // data-nia-quiet: Nia stays still while the visitor is working in here.
    <div data-nia-quiet className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
      <aside className="order-2 lg:order-1">
        <div className="lg:sticky lg:top-28">{context}</div>
      </aside>

      <div ref={panelRef} className="order-1 scroll-mt-24 lg:order-2">
        <StepIndicator step={step} />
        <div className="mt-6 border border-white/10 bg-[#0c0d0e] p-5 sm:p-8">
          {phase === "securing" ? (
            <SecuringSessionTransition />
          ) : (
            <>
              {step === 0 && (
                <section key="time" className="animate-step-fade" aria-labelledby="booking-time-heading">
                  <StepHeading number="01" id="booking-time-heading" title="Choose a time">
                    30 minutes · Monday–Friday · times shown in East Africa Time (Nairobi)
                  </StepHeading>

                  <div role="group" aria-label="Available weekdays">
                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                      {WEEKDAYS.map((d) => (
                        <p key={d} className="pb-1 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                          {d}
                        </p>
                      ))}
                      {Array.from({ length: leadingBlanks }).map((_, i) => (
                        <span key={`blank-${i}`} aria-hidden="true" />
                      ))}
                      {upcomingDates.map((date, i) => {
                        const iso = toISODate(date);
                        const isSelected = selectedDateISO === iso;
                        const isExhausted = exhaustedDates.has(iso) && !isSelected;
                        const newMonth = i === 0 || date.getMonth() !== upcomingDates[i - 1].getMonth();
                        return (
                          <button
                            key={iso}
                            type="button"
                            onClick={() => handleSelectDate(iso)}
                            aria-pressed={isSelected}
                            aria-label={`${DATE_FORMATTER_LONG.format(new Date(`${iso}T00:00:00`))}${isExhausted ? ", no times left" : ""}`}
                            className={`relative min-h-12 rounded-md border px-1 py-2 text-center transition ${
                              isSelected
                                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white"
                                : isExhausted
                                  ? "border-white/5 text-white/30 line-through decoration-white/20"
                                  : "border-white/10 text-white/80 hover:border-white/25 hover:bg-white/[0.04]"
                            }`}
                          >
                            {newMonth ? (
                              <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-primary)]">
                                {SHORT_MONTH.format(date)}
                              </span>
                            ) : null}
                            <span className="block text-base font-semibold">{date.getDate()}</span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-2 text-xs text-white/40">{MONTH_FORMATTER.format(upcomingDates[0])} onwards · weekends unavailable</p>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-6" aria-live="polite">
                    {!selectedDateISO ? (
                      <p className="text-sm text-white/55">Select a day to see available times.</p>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-white">{selectedLabel}</p>
                        {isLoadingTimes ? (
                          <>
                            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4" aria-hidden="true">
                              {[0, 1, 2, 3].map((i) => (
                                <span key={i} className="h-11 animate-pulse rounded-md bg-white/[0.05]" />
                              ))}
                            </div>
                            <p className="sr-only">Checking availability…</p>
                          </>
                        ) : availabilityError ? (
                          <div className="mt-4 flex flex-wrap items-center gap-4">
                            <FieldError message={availabilityError} />
                            <button type="button" onClick={retryAvailability} className="text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-[var(--color-primary)]">
                              Try again
                            </button>
                          </div>
                        ) : availableTimes.length === 0 ? (
                          <p className="mt-4 text-sm text-white/60">No times are left on this day. Please choose another day above.</p>
                        ) : (
                          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4" role="group" aria-label="Available times">
                            {availableTimes.map((time) => {
                              const isSelected = selectedTime === time;
                              return (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => handleSelectTime(time)}
                                  aria-pressed={isSelected}
                                  className={`min-h-11 rounded-md border px-2 text-sm transition ${
                                    isSelected
                                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white"
                                      : "border-white/10 text-white/80 hover:border-white/25 hover:bg-white/[0.04]"
                                  }`}
                                >
                                  {formatTime12h(time)}
                                </button>
                              );
                            })}
                          </div>
                        )}
                        {selectedTime && localTime ? <p className="mt-3 text-xs text-white/50">That&apos;s {localTime}.</p> : null}
                      </>
                    )}
                  </div>

                  <StepFooter
                    note={selectedTime ? `${selectedLabel} · ${formatTime12h(selectedTime)} EAT` : "Availability comes directly from our calendar."}
                    onNext={goToNextStep}
                    nextDisabled={!selectedDateISO || !selectedTime}
                    nextLabel="Continue to your details →"
                  />
                </section>
              )}

              {step === 1 && (
                <section key="details" className="animate-step-fade" aria-labelledby="booking-details-heading">
                  <StepHeading number="02" id="booking-details-heading" title="About you and your business">
                    So the conversation is useful from the first minute. About two minutes.
                  </StepHeading>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormInput label="First name" name="firstName" value={formData.firstName} onChange={handleFieldChange} required autoComplete="given-name" error={formErrors.firstName} />
                    <FormInput label="Last name" name="lastName" value={formData.lastName} onChange={handleFieldChange} required autoComplete="family-name" error={formErrors.lastName} />
                    <FormInput label="Business name" name="businessName" value={formData.businessName} onChange={handleFieldChange} required autoComplete="organization" error={formErrors.businessName} />
                    <FormInput label="Email" name="email" type="email" inputMode="email" value={formData.email} onChange={handleFieldChange} placeholder="you@company.com" required autoComplete="email" error={formErrors.email} />
                    <FormInput label="Phone / WhatsApp" name="phone" type="tel" inputMode="tel" value={formData.phone} onChange={handleFieldChange} placeholder="+254…" required autoComplete="tel" error={formErrors.phone} />
                    <FormInput label="Website (optional)" name="website" type="url" inputMode="url" value={formData.website} onChange={handleFieldChange} placeholder="https://" autoComplete="url" error={formErrors.website} />
                  </div>

                  <div className="mt-6">
                    <SingleChoiceCards
                      label="What would you like to focus on?"
                      name="discussionTopic"
                      value={formData.discussionTopic}
                      onSelect={(value) => {
                        setFormData((prev) => ({ ...prev, discussionTopic: value }));
                        setFormErrors((prev) => ({ ...prev, discussionTopic: "" }));
                      }}
                      options={[...DISCUSSION_TOPICS]}
                      required
                      error={formErrors.discussionTopic}
                      columns={3}
                    />
                  </div>

                  <div className="mt-6">
                    <FormTextarea
                      label="What's the most important thing to discuss?"
                      name="priority"
                      value={formData.priority}
                      onChange={handleFieldChange}
                      placeholder="For example: enquiries come in on WhatsApp, but follow-up is inconsistent."
                      required
                      rows={3}
                      error={formErrors.priority}
                    />
                  </div>

                  <StepFooter onBack={() => goToStep(0)} onNext={goToNextStep} nextLabel="Review booking →" />
                </section>
              )}

              {step === 2 && selectedDateISO && selectedTime && (
                <section key="confirm" className="animate-step-fade" aria-labelledby="booking-confirm-heading">
                  <StepHeading number="03" id="booking-confirm-heading" title="Review and confirm">
                    Check the details — you can change anything before confirming.
                  </StepHeading>

                  <dl className="divide-y divide-white/10 border-y border-white/10 text-sm">
                    <SummaryRow label="Consultation" value="Business Growth Consultation · 30 minutes" />
                    <SummaryRow label="When" value={`${selectedLabel} · ${formatTime12h(selectedTime)} EAT`} action={{ label: "Change", onClick: () => goToStep(0) }} />
                    {localTime ? <SummaryRow label="Your time" value={localTime.replace(/ your time/, "")} /> : null}
                    <SummaryRow label="Name" value={`${formData.firstName} ${formData.lastName}`.trim()} action={{ label: "Edit", onClick: () => goToStep(1) }} />
                    <SummaryRow label="Business" value={formData.businessName} />
                    <SummaryRow label="Email" value={formData.email} />
                    <SummaryRow label="Phone" value={formData.phone} />
                    <SummaryRow label="Focus" value={formData.discussionTopic} />
                  </dl>

                  {submitError ? (
                    <div role="alert" className="mt-5 border-l-2 border-red-400/70 bg-red-500/[0.06] px-4 py-3">
                      <p className="text-sm text-red-200">{submitError}</p>
                      <button type="button" onClick={() => goToStep(0)} className="mt-2 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4">
                        Choose another time
                      </button>
                    </div>
                  ) : null}

                  <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button type="button" onClick={() => goToStep(1)} disabled={isLocked} className="text-sm font-medium text-white/60 hover:text-white disabled:opacity-50">
                      ← Back
                    </button>
                    <Button onClick={handleConfirm} disabled={isLocked} variant="primary">
                      {isLocked ? (
                        <span className="inline-flex items-center gap-2">
                          Confirming
                          <span className="inline-flex gap-0.5" aria-hidden="true">
                            <span className="h-1 w-1 animate-pulse rounded-full bg-current" style={{ animationDelay: "0ms" }} />
                            <span className="h-1 w-1 animate-pulse rounded-full bg-current" style={{ animationDelay: "150ms" }} />
                            <span className="h-1 w-1 animate-pulse rounded-full bg-current" style={{ animationDelay: "300ms" }} />
                          </span>
                        </span>
                      ) : (
                        "Confirm my consultation"
                      )}
                    </Button>
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: number }) {
  return (
    <>
      <p aria-live="polite" className="sr-only">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </p>
      <ol className="flex items-center gap-3" aria-label="Booking progress">
        {STEPS.map((label, index) => {
          const isActive = index === step;
          const isDone = index < step;
          return (
            <li key={label} className="flex flex-1 items-center gap-3 last:flex-none">
              <span className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] transition ${
                    isActive ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]" : isDone ? "bg-white/15 text-white" : "border border-white/15 text-white/40"
                  }`}
                >
                  {isDone ? "✓" : index + 1}
                </span>
                <span className={`text-xs font-medium ${isActive ? "text-white" : "text-white/45"}`}>{label}</span>
              </span>
              {index < STEPS.length - 1 && <span className="h-px flex-1 bg-white/10" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </>
  );
}

function StepHeading({ number, id, title, children }: { number: string; id: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)]">{number}</p>
      <h2 id={id} className="mt-2 font-display text-2xl font-medium tracking-tight text-white sm:text-[1.75rem]">
        {title}
      </h2>
      {children ? <p className="mt-2 text-sm leading-6 text-white/55">{children}</p> : null}
    </div>
  );
}

function StepFooter({
  note,
  onBack,
  onNext,
  nextDisabled,
  nextLabel,
}: {
  note?: string;
  onBack?: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel: string;
}) {
  return (
    <div className="mt-8 flex flex-col-reverse gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
      {onBack ? (
        <button type="button" onClick={onBack} className="self-start text-sm font-medium text-white/60 hover:text-white sm:self-auto">
          ← Back
        </button>
      ) : (
        <p className="text-sm text-white/50">{note}</p>
      )}
      <Button onClick={onNext} disabled={nextDisabled} variant="primary" className="w-full sm:w-auto">
        {nextLabel}
      </Button>
    </div>
  );
}

function SummaryRow({ label, value, action }: { label: string; value: string; action?: { label: string; onClick: () => void } }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="shrink-0 text-white/45">{label}</dt>
      <dd className="flex items-baseline gap-3 text-right font-medium text-white">
        {value}
        {action ? (
          <button type="button" onClick={action.onClick} className="text-xs font-semibold text-[var(--color-primary)] hover:text-white">
            {action.label}
          </button>
        ) : null}
      </dd>
    </div>
  );
}
