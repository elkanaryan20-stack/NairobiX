"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { FieldError, FormInput, FormTextarea } from "@/components/forms/FormField";
import { ErrorBanner } from "@/components/forms/LeadFormShell";
import { Button } from "@/components/ui/Button";
import { formTrackingPayload, newEventId, trackEvent } from "@/lib/analytics";
import { getLeadSource } from "@/lib/attribution";

// What the enquiry is about. Sent to the CRM as the first line of the
// Description (not a picklist field), so no Zoho configuration is needed.
const TOPICS = ["Growth Strategy", "Marketing", "CRM & Sales", "Automation", "AI", "Website / Digital", "Partnership", "Something else"];

const initialState = {
  First_Name: "",
  Last_Name: "",
  Email: "",
  Phone: "",
  Company: "",
  Topic: "",
  Message: "",
};

type Field = keyof typeof initialState;

export function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const topicLabelId = useId();
  const topicErrorId = useId();
  const confirmationRef = useRef<HTMLDivElement>(null);

  const setField = (name: Field, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Move focus to the confirmation so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (isSuccess) confirmationRef.current?.focus();
  }, [isSuccess]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setField(event.target.name as Field, event.target.value);

  const validateForm = () => {
    const next: Partial<Record<Field, string>> = {};
    const required: Field[] = ["First_Name", "Last_Name", "Email", "Phone", "Company", "Topic", "Message"];
    // Each message says how to fix the problem, not just that there is one.
    const MESSAGES: Record<Field, string> = {
      First_Name: "Please enter your first name.",
      Last_Name: "Please enter your last name.",
      Email: "Please enter the email we should reply to.",
      Phone: "Please enter a phone or WhatsApp number.",
      Company: "Please enter your business name — or your own name.",
      Topic: "Please choose the closest option.",
      Message: "A sentence or two is enough.",
    };
    for (const field of required) {
      if (!formData[field].trim()) next[field] = MESSAGES[field];
    }
    if (formData.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) next.Email = "That email doesn't look complete — check for a missing @ or domain.";
    if (formData.Phone && !/^[+()\d\s-]{7,20}$/.test(formData.Phone)) next.Phone = "Please use digits only, with an optional + and country code.";
    const first = Object.keys(next)[0];
    if (first) requestAnimationFrame(() => document.querySelector<HTMLElement>(`#enquiry [name="${first}"]`)?.focus());
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    if (!validateForm()) return;

    setIsSubmitting(true);
    const eventId = newEventId();
    try {
      const { Topic, Message, ...details } = formData;
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "contact",
          ...details,
          Description: `Topic: ${Topic}\n\n${Message.trim()}`,
          Marketing_Channel: getLeadSource(),
          ...formTrackingPayload(eventId),
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) {
        setSubmitError(payload.error || "We couldn't send your message right now. Nothing you typed has been lost — please try again.");
        return;
      }
      trackEvent("contact_submit", { form_type: "contact", topic: formData.Topic }, { eventId, userData: { email: formData.Email, phone: formData.Phone } });
      setIsSuccess(true);
    } catch (error) {
      console.error("Contact submission failed", error);
      setSubmitError("We couldn't send your message right now. Nothing you typed has been lost — please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div ref={confirmationRef} tabIndex={-1} role="status" className="border-t-2 border-[var(--color-primary)] pt-8 outline-none">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)]">Sent</p>
        <h3 className="mt-3 font-display text-3xl font-medium tracking-tight text-white">Message received.</h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
          We have your context. NairobiX will review it and determine the appropriate next step, and reply to{" "}
          <span className="text-white">{formData.Email}</span>.
        </p>
        <dl className="mt-6 grid gap-4 border-y border-white/10 py-5 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Topic</dt>
            <dd className="mt-1.5 text-white/85">{formData.Topic}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Business</dt>
            <dd className="mt-1.5 text-white/85">{formData.Company}</dd>
          </div>
        </dl>
        <p className="mt-6 text-sm leading-6 text-white/60">
          In the meantime, the{" "}
          <Link href="/business-growth-audit" className="font-semibold text-white hover:text-[var(--color-primary)]">
            Business Growth Assessment
          </Link>{" "}
          gives the team a fuller picture of your business, and{" "}
          <Link href="/insights" className="font-semibold text-white hover:text-[var(--color-primary)]">
            Insights
          </Link>{" "}
          has practical reading on growth, systems and AI.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      {submitError ? <ErrorBanner message={submitError} /> : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput label="First name" name="First_Name" value={formData.First_Name} onChange={handleChange} required autoComplete="given-name" error={errors.First_Name} />
        <FormInput label="Last name" name="Last_Name" value={formData.Last_Name} onChange={handleChange} required autoComplete="family-name" error={errors.Last_Name} />
        <FormInput label="Email" name="Email" type="email" inputMode="email" value={formData.Email} onChange={handleChange} required autoComplete="email" error={errors.Email} />
        <FormInput label="Phone / WhatsApp" name="Phone" type="tel" inputMode="tel" value={formData.Phone} onChange={handleChange} required autoComplete="tel" error={errors.Phone} />
      </div>
      <FormInput
        label="Company / business"
        name="Company"
        value={formData.Company}
        onChange={handleChange}
        required
        autoComplete="organization"
        helperText="If you're enquiring as an individual, your own name is fine."
        error={errors.Company}
      />

      <fieldset aria-describedby={errors.Topic ? topicErrorId : undefined}>
        <legend id={topicLabelId} className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
          What would you like to discuss?
          <span className="text-[var(--color-primary)]">*</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOPICS.map((topic) => {
            const checked = formData.Topic === topic;
            return (
              <label
                key={topic}
                className={`relative inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm transition duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-primary)] ${
                  checked
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white"
                    : "border-white/12 text-white/75 hover:border-white/25 hover:text-white"
                }`}
              >
                <input
                  type="radio"
                  name="Topic"
                  value={topic}
                  checked={checked}
                  onChange={() => setField("Topic", topic)}
                  className="sr-only"
                />
                {topic}
              </label>
            );
          })}
        </div>
        <FieldError message={errors.Topic} id={topicErrorId} />
      </fieldset>

      <FormTextarea
        label="Message"
        name="Message"
        value={formData.Message}
        onChange={handleChange}
        rows={5}
        placeholder="A little context helps: what you're working on, and what you'd like to happen next."
        required
        error={errors.Message}
      />

      <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-[var(--text-tertiary)]">
          Used only to respond to your enquiry. See our{" "}
          <Link href="/privacy-policy" className="underline decoration-white/25 underline-offset-4 hover:text-white">
            privacy policy
          </Link>
          .
        </p>
        <Button type="submit" disabled={isSubmitting} variant="primary">
          {isSubmitting ? "Sending…" : "Send message →"}
        </Button>
      </div>
    </form>
  );
}
