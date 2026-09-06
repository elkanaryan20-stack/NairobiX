"use client";

import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { FormInput, FormTextarea, FieldError } from "@/components/forms/FormField";
import { trackConversion } from "@/lib/analytics";
import { DISCUSSION_TOPIC_OPTIONS as DISCUSSION_TOPICS } from "@/lib/forms/options";

const STEPS = ["Consultation", "Date", "Time", "Details", "Confirm"] as const;

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

function buildUpcomingDates(count: number): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; dates.length < count; i += 1) {
    const candidate = new Date(today);
    candidate.setDate(today.getDate() + i);
    dates.push(candidate);
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
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  website: "",
  discussionTopic: "",
  priority: "",
};

export function BookingFlow() {
  const [step, setStep] = useState(0);

  const [selectedDateISO, setSelectedDateISO] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isBooked, setIsBooked] = useState(false);

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
        setAvailableTimes(payload.times || []);
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

  const validateDetails = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) errors.fullName = "This field is required.";
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
    if (!formData.discussionTopic) errors.discussionTopic = "Please choose a topic.";
    if (!formData.priority.trim()) errors.priority = "This field is required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirm = async () => {
    if (!selectedDateISO || !selectedTime) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/bookings/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDateISO,
          time: selectedTime,
          fullName: formData.fullName.trim(),
          businessName: formData.businessName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          website: formData.website.trim(),
          discussionTopic: formData.discussionTopic,
          priority: formData.priority.trim(),
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setSubmitError(payload.error || "We couldn't confirm your consultation right now.");
        return;
      }

      trackConversion("generate_lead", { form_type: "consultation_booking" });
      setIsBooked(true);
    } catch {
      setSubmitError("We couldn't confirm your consultation right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isBooked && selectedDateISO && selectedTime) {
    return (
      <Container width="narrow" className="py-16 sm:py-20">
        <Card variant="outline" className="mx-auto max-w-2xl p-8 text-center sm:p-10">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-2xl text-emerald-300">
            ✓
          </div>
          <Heading variant="heading-lg" as="h1">
            Your consultation is confirmed.
          </Heading>
          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
            Thank you. Your NairobiX Growth Consultation has been scheduled.
          </p>
          <div className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left text-sm">
            <SummaryRow label="Date" value={DATE_FORMATTER_LONG.format(new Date(`${selectedDateISO}T00:00:00`))} />
            <SummaryRow label="Time" value={`${formatTime12h(selectedTime)} (Africa/Nairobi, EAT)`} />
            <SummaryRow label="Duration" value="30 minutes" />
            <SummaryRow label="Business" value={formData.businessName} />
          </div>
          <p className="mt-6 text-sm leading-6 text-[var(--text-tertiary)]">
            A confirmation has been sent to {formData.email}. Our team will reach out shortly before your
            consultation to confirm the meeting link.
          </p>
          <Button href="/" variant="primary" className="mt-8">
            Return to NairobiX
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container width="narrow" className="py-12 sm:py-16">
      <StepIndicator step={step} />

      <Card variant="outline" className="mt-8 p-6 sm:p-8 lg:p-10">
        {step === 0 && (
          <section>
            <Eyebrow>30-MINUTE CONSULTATION</Eyebrow>
            <Heading variant="heading-lg" as="h1" className="mt-3">
              NairobiX Business Growth Consultation
            </Heading>
            <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
              A focused 30-minute session with the NairobiX team to understand your business, identify
              where growth is being held back, and determine the right NairobiX solution for your stage —
              whether that&apos;s digital marketing, CRM and sales systems, automation, AI, or web and digital
              solutions.
            </p>
            <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
              There&apos;s no fixed pitch — this is a working conversation about your business, not a sales
              call.
            </p>
            <div className="mt-8 flex justify-end">
              <Button onClick={() => setStep(1)} variant="primary">
                Choose a Date →
              </Button>
            </div>
          </section>
        )}

        {step === 1 && (
          <section>
            <SectionIntro number="02" title="Choose a date" description="Select a date for your consultation. Times are shown in East Africa Time (EAT)." />
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
              {upcomingDates.map((date) => {
                const iso = toISODate(date);
                const isSelected = selectedDateISO === iso;
                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => handleSelectDate(iso)}
                    aria-pressed={isSelected}
                    className={`rounded-2xl border px-2 py-3 text-center text-sm transition ${
                      isSelected
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white"
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
            <StepFooter
              onBack={() => setStep(0)}
              onNext={() => setStep(2)}
              nextDisabled={!selectedDateISO}
              nextLabel="Choose a Time →"
            />
          </section>
        )}

        {step === 2 && (
          <section>
            <SectionIntro
              number="03"
              title="Choose a time"
              description={
                selectedDateISO
                  ? `Available times for ${DATE_FORMATTER_LONG.format(new Date(`${selectedDateISO}T00:00:00`))} (EAT).`
                  : undefined
              }
            />
            {isLoadingTimes && <p className="text-sm text-[var(--text-tertiary)]">Loading available times…</p>}
            {!isLoadingTimes && availabilityError && <FieldError message={availabilityError} />}
            {!isLoadingTimes && !availabilityError && availableTimes.length === 0 && (
              <p className="text-sm text-[var(--text-tertiary)]">
                No times are available on this date. Please go back and choose another date.
              </p>
            )}
            {!isLoadingTimes && availableTimes.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
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
            <StepFooter
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
              nextDisabled={!selectedTime}
              nextLabel="Continue →"
            />
          </section>
        )}

        {step === 3 && (
          <section>
            <SectionIntro number="04" title="Your details" description="Tell us a little about your business so the consultation is useful from the first minute." />
            <div className="grid gap-5 md:grid-cols-2">
              <FormInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleFieldChange} required error={formErrors.fullName} />
              <FormInput label="Business Name" name="businessName" value={formData.businessName} onChange={handleFieldChange} required error={formErrors.businessName} />
              <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleFieldChange} placeholder="you@example.com" required error={formErrors.email} />
              <FormInput label="Phone / WhatsApp" name="phone" type="tel" value={formData.phone} onChange={handleFieldChange} placeholder="+254..." required error={formErrors.phone} />
              <div className="md:col-span-2">
                <FormInput label="Website" name="website" type="url" value={formData.website} onChange={handleFieldChange} placeholder="https:// (optional)" error={formErrors.website} />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">
                <span className="flex items-center gap-2">
                  What would you like to discuss?
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
                label="Tell us briefly about your current priority"
                name="priority"
                value={formData.priority}
                onChange={handleFieldChange}
                placeholder="What's the biggest growth challenge on your mind right now?"
                required
                rows={4}
                error={formErrors.priority}
              />
            </div>

            <StepFooter
              onBack={() => setStep(2)}
              onNext={() => {
                if (validateDetails()) setStep(4);
              }}
              nextLabel="Review & Confirm →"
            />
          </section>
        )}

        {step === 4 && selectedDateISO && selectedTime && (
          <section>
            <SectionIntro number="05" title="Confirm your consultation" description="Please review the details below before confirming." />
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm">
              <SummaryRow label="Consultation" value="NairobiX Business Growth Consultation" />
              <SummaryRow label="Date" value={DATE_FORMATTER_LONG.format(new Date(`${selectedDateISO}T00:00:00`))} />
              <SummaryRow label="Time" value={`${formatTime12h(selectedTime)} (Africa/Nairobi, EAT)`} />
              <SummaryRow label="Duration" value="30 minutes" />
              <SummaryRow label="Business" value={formData.businessName} />
              <SummaryRow label="Email" value={formData.email} />
              <SummaryRow label="Phone" value={formData.phone} />
              <SummaryRow label="Discussion Topic" value={formData.discussionTopic} />
            </div>

            {submitError && <div className="mt-4"><FieldError message={submitError} /></div>}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={isSubmitting}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-white disabled:opacity-50"
              >
                ← Back
              </button>
              <Button onClick={handleConfirm} disabled={isSubmitting} variant="primary">
                {isSubmitting ? "Confirming…" : "Confirm Consultation"}
              </Button>
            </div>
          </section>
        )}
      </Card>
    </Container>
  );
}

function StepIndicator({ step }: { step: number }) {
  return (
    <ol className="flex items-center justify-between gap-2" aria-label="Booking progress">
      {STEPS.map((label, index) => {
        const isActive = index === step;
        const isDone = index < step;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition ${
                isActive
                  ? "bg-[var(--color-primary)] text-white"
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
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel: string;
}) {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
      <button type="button" onClick={onBack} className="text-sm font-medium text-[var(--text-secondary)] hover:text-white">
        ← Back
      </button>
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
