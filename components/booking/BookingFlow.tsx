"use client";

import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormInput, FormTextarea, FieldError } from "@/components/forms/FormField";
import { SecuringSessionTransition } from "@/components/booking/SecuringSessionTransition";
import { GrowthSessionConfirmed } from "@/components/booking/GrowthSessionConfirmed";
import { trackConversion } from "@/lib/analytics";
import { wait, prefersReducedMotion } from "@/lib/motion";
import { DISCUSSION_TOPIC_OPTIONS as DISCUSSION_TOPICS } from "@/lib/forms/options";

const STEPS = ["About", "Time", "Confirm"] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\d\s-]{7,20}$/;
const URL_REGEX = /^https?:\/\/.+/i;

const DATE_FORMATTER = new Intl.DateTimeFormat("en-KE", {
  timeZone: "Africa/Nairobi",
  weekday: "short",
  day: "numeric",
  month: "short",
});

const DATE_FORMATTER_LONG = new Intl.DateTimeFormat("en-KE", {
  timeZone: "Africa/Nairobi",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

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
 * Only weekdays — NairobiX is available Monday–Friday, so weekends never
 * appear in the calendar at all. Starts from today (i = 0): Zoho Bookings is
 * the source of truth for whether any slots remain today, so the calendar
 * must offer it rather than assuming it's always exhausted — the
 * availability fetch for that date already renders "not available" if Zoho
 * returns no remaining times.
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

/**
 * "submitting": the request is in flight but the Confirm step is still on
 * screen, with the button in its brief processing state — mirrors
 * BusinessGrowthAuditForm's handleSubmit pattern.
 * "securing": SecuringSessionTransition is shown, gated on the real Zoho
 * Bookings response, never a fixed timer alone.
 */
type Phase = "form" | "submitting" | "securing" | "confirmed";

export function BookingFlow() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("form");

  const [selectedDateISO, setSelectedDateISO] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");
  const [exhaustedDates, setExhaustedDates] = useState<Set<string>>(new Set());

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [submitError, setSubmitError] = useState("");

  const upcomingDates = useMemo(() => buildUpcomingDates(28), []);

  useEffect(() => {
    if (!selectedDateISO) return;

    let cancelled = false;

    fetch(`/api/bookings/availability?date=${selectedDateISO}`)
      .then((response) => response.json())
      .then((payload) => {
        if (cancelled) return;
        if (!payload.success) {
          setAvailabilityError(payload.error || "We couldn't load available times for this date.");
          return;
        }
        const times: string[] = payload.times || [];
        setAvailableTimes(times);
        if (times.length === 0) {
          setExhaustedDates((prev) => new Set(prev).add(selectedDateISO));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAvailabilityError("We couldn't load available times for this date. Please try again.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoadingTimes(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedDateISO]);

  const handleSelectDate = (iso: string) => {
    setSelectedDateISO(iso);
    setSelectedTime(null);
    setAvailableTimes([]);
    setAvailabilityError("");
    setIsLoadingTimes(true);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateAbout = () => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = "This field is required.";
    if (!formData.lastName.trim()) errors.lastName = "This field is required.";
    if (!formData.businessName.trim()) errors.businessName = "This field is required.";
    if (!formData.email.trim()) {
      errors.email = "This field is required.";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = "Please use a valid email address.";
    }
    if (!formData.phone.trim()) {
      errors.phone = "This field is required.";
    } else if (!PHONE_REGEX.test(formData.phone.trim())) {
      errors.phone = "Please use a valid phone number.";
    }
    if (formData.website.trim() && !URL_REGEX.test(formData.website.trim())) {
      errors.website = "Please include http:// or https://.";
    }
    if (!formData.discussionTopic) errors.discussionTopic = "Please choose a focus area.";
    if (!formData.priority.trim()) errors.priority = "This field is required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goToNextStep = () => {
    if (step === 0 && !validateAbout()) return;
    if (step === 1 && (!selectedDateISO || !selectedTime)) return;
    setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const goToPreviousStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleConfirm = async () => {
    if (!selectedDateISO || !selectedTime) return;

    setSubmitError("");
    setPhase("submitting");

    const reduceMotion = prefersReducedMotion();
    const buttonHoldMs = reduceMotion ? 0 : 450;
    const minTransitionMs = reduceMotion ? 0 : 900;

    // Fire the real request immediately — the button's brief processing
    // state and the securing-session transition only ever wait on this
    // promise, never simulate it.
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
      }),
    }).then(async (response) => ({
      ok: response.ok,
      payload: await response.json(),
    }));

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
      if (elapsed < minTransitionMs) {
        await wait(minTransitionMs - elapsed);
      }

      trackConversion("generate_lead", { form_type: "consultation_booking" });
      setPhase("confirmed");
    } catch {
      setSubmitError("We couldn't confirm your consultation right now. Please try again.");
      setPhase("form");
    }
  };

  if (phase === "confirmed" && selectedDateISO && selectedTime) {
    return (
      <GrowthSessionConfirmed
        formattedDate={DATE_FORMATTER_LONG.format(new Date(`${selectedDateISO}T00:00:00`))}
        formattedTime={formatTime12h(selectedTime)}
        email={formData.email}
        discussionTopic={formData.discussionTopic}
        firstName={formData.firstName.trim()}
      />
    );
  }

  const isLocked = phase === "submitting";

  return (
    <Container width="narrow" className="py-12 sm:py-16">
      <StepIndicator step={step} />

      <Card variant="outline" className="mt-8 overflow-hidden p-6 sm:p-8 lg:p-10">
        {phase === "securing" ? (
          <SecuringSessionTransition />
        ) : (
          <>
            {step === 0 && (
              <section key={step} className="animate-step-fade">
                <SectionIntro
                  number="01"
                  title="About you"
                  description="Tell us a little about your business, so the conversation is useful from the first minute."
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <FormInput label="First Name" name="firstName" value={formData.firstName} onChange={handleFieldChange} required error={formErrors.firstName} />
                  <FormInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleFieldChange} required error={formErrors.lastName} />
                  <FormInput label="Business Name" name="businessName" value={formData.businessName} onChange={handleFieldChange} required error={formErrors.businessName} />
                  <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleFieldChange} placeholder="you@example.com" required error={formErrors.email} />
                  <FormInput label="Phone / WhatsApp" name="phone" type="tel" value={formData.phone} onChange={handleFieldChange} placeholder="+254..." required error={formErrors.phone} />
                  <FormInput label="Website" name="website" type="url" value={formData.website} onChange={handleFieldChange} placeholder="https:// (optional)" error={formErrors.website} />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-[var(--text-secondary)]">
                    <span className="flex items-center gap-2">
                      Consultation focus
                      <span className="text-[var(--color-primary)]">*</span>
                    </span>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {DISCUSSION_TOPICS.map((topic) => {
                        const isSelected = formData.discussionTopic === topic;
                        return (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, discussionTopic: topic }));
                              setFormErrors((prev) => ({ ...prev, discussionTopic: "" }));
                            }}
                            aria-pressed={isSelected}
                            className={`rounded-full border px-4 py-3 text-sm transition ${
                              isSelected
                                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white"
                                : "border-white/10 bg-white/[0.02] text-[var(--text-secondary)] hover:border-white/20"
                            }`}
                          >
                            {topic}
                          </button>
                        );
                      })}
                    </div>
                    <FieldError message={formErrors.discussionTopic} />
                  </label>
                </div>

                <div className="mt-6">
                  <FormTextarea
                    label="Your current priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleFieldChange}
                    placeholder="What's the biggest constraint on growth right now?"
                    required
                    rows={4}
                    error={formErrors.priority}
                  />
                </div>

                <StepFooter onNext={goToNextStep} nextLabel="Choose a Time →" />
              </section>
            )}

            {step === 1 && (
              <section key={step} className="animate-step-fade">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">02</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Choose a time that works for you</h2>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-[var(--text-secondary)]">
                    <span>Monday–Friday</span>
                    <span className="text-[var(--text-tertiary)]" aria-hidden="true">·</span>
                    <span>9:00 AM–5:00 PM EAT</span>
                    <span className="text-[var(--text-tertiary)]" aria-hidden="true">·</span>
                    <span>30 minutes</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                  {upcomingDates.map((date) => {
                    const iso = toISODate(date);
                    const isSelected = selectedDateISO === iso;
                    const isExhausted = exhaustedDates.has(iso) && !isSelected;

                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => handleSelectDate(iso)}
                        aria-pressed={isSelected}
                        className={`rounded-2xl border px-2 py-3 text-center text-sm transition ${
                          isSelected
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white"
                            : isExhausted
                              ? "border-white/10 bg-white/[0.02] text-[var(--text-tertiary)] opacity-60 hover:border-white/20"
                              : "border-white/10 bg-white/[0.02] text-[var(--text-secondary)] hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="block text-[11px] uppercase tracking-wide text-[var(--text-tertiary)]">
                          {DATE_FORMATTER.format(date).split(" ")[0]}
                        </span>
                        <span className="mt-1 block text-base font-semibold">{date.getDate()}</span>
                      </button>
                    );
                  })}
                </div>

                {selectedDateISO && (
                  <div className="mt-8 border-t border-white/10 pt-8" aria-live="polite">
                    <p className="text-sm font-medium text-white">
                      {DATE_FORMATTER_LONG.format(new Date(`${selectedDateISO}T00:00:00`))}
                    </p>

                    {isLoadingTimes && (
                      <div className="mt-4 flex flex-wrap gap-2.5" aria-hidden="true">
                        {[0, 1, 2, 3].map((i) => (
                          <span key={i} className="h-11 w-24 animate-pulse rounded-full bg-white/[0.04]" />
                        ))}
                      </div>
                    )}
                    {isLoadingTimes && <p className="sr-only">Loading available times…</p>}

                    {!isLoadingTimes && availabilityError && (
                      <div className="mt-4">
                        <FieldError message={availabilityError} />
                      </div>
                    )}

                    {!isLoadingTimes && !availabilityError && availableTimes.length === 0 && (
                      <p className="mt-4 text-sm text-[var(--text-tertiary)]">
                        This date isn&apos;t available. Please choose another date above.
                      </p>
                    )}

                    {!isLoadingTimes && availableTimes.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {availableTimes.map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              aria-pressed={isSelected}
                              className={`rounded-full border px-4 py-3 text-sm transition ${
                                isSelected
                                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white"
                                  : "border-white/10 bg-white/[0.02] text-[var(--text-secondary)] hover:border-white/20 hover:bg-white/[0.04]"
                              }`}
                            >
                              {formatTime12h(time)}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                <StepFooter onBack={goToPreviousStep} onNext={goToNextStep} nextDisabled={!selectedDateISO || !selectedTime} nextLabel="Review & Confirm →" />
              </section>
            )}

            {step === 2 && selectedDateISO && selectedTime && (
              <section key={step} className="animate-step-fade">
                <SectionIntro number="03" title="Confirm your consultation" description="Please review the details below before confirming." />
                <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm">
                  <SummaryRow label="Consultation" value="NairobiX Business Growth Consultation" />
                  <SummaryRow label="Date" value={DATE_FORMATTER_LONG.format(new Date(`${selectedDateISO}T00:00:00`))} />
                  <SummaryRow label="Time" value={`${formatTime12h(selectedTime)} (Africa/Nairobi, EAT)`} />
                  <SummaryRow label="Duration" value="30 minutes" />
                  <SummaryRow label="Name" value={`${formData.firstName} ${formData.lastName}`.trim()} />
                  <SummaryRow label="Business" value={formData.businessName} />
                  <SummaryRow label="Email" value={formData.email} />
                  <SummaryRow label="Phone" value={formData.phone} />
                  <SummaryRow label="Focus" value={formData.discussionTopic} />
                </div>

                {submitError && <div className="mt-4"><FieldError message={submitError} /></div>}

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    disabled={isLocked}
                    className="text-sm font-medium text-[var(--text-secondary)] hover:text-white disabled:opacity-50"
                  >
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
                      "Confirm Consultation"
                    )}
                  </Button>
                </div>
              </section>
            )}
          </>
        )}
      </Card>
    </Container>
  );
}

function StepIndicator({ step }: { step: number }) {
  return (
    <>
      <p aria-live="polite" className="sr-only">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </p>
      <ol className="flex items-center justify-between gap-2" aria-label="Booking progress">
        {STEPS.map((label, index) => {
          const isActive = index === step;
          const isDone = index < step;
          return (
            <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition ${
                  isActive
                    ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                    : isDone
                      ? "bg-white/15 text-white"
                      : "bg-white/5 text-[var(--text-tertiary)]"
                }`}
              >
                {index + 1}
              </span>
              <span className={`hidden text-xs font-medium sm:inline ${isActive ? "text-white" : "text-[var(--text-tertiary)]"}`}>
                {label}
              </span>
              {index < STEPS.length - 1 && <span className="h-px flex-1 bg-white/10" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </>
  );
}

function SectionIntro({ number, title, description }: { number: string; title: string; description?: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">{number}</p>
      <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{description}</p> : null}
    </div>
  );
}

function StepFooter({
  onBack,
  onNext,
  nextDisabled,
  nextLabel,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel: string;
}) {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
      {onBack ? (
        <button type="button" onClick={onBack} className="text-sm font-medium text-[var(--text-secondary)] hover:text-white">
          ← Back
        </button>
      ) : (
        <p className="text-sm text-[var(--text-tertiary)]">Your information is secure and only used for this consultation.</p>
      )}
      <Button onClick={onNext} disabled={nextDisabled} variant="primary">
        {nextLabel}
      </Button>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-[var(--text-tertiary)]">{label}</span>
      <span className="text-right font-medium text-white">{value}</span>
    </div>
  );
}
