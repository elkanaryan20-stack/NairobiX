"use client";

import { useState } from "react";
import { FormInput, FormTextarea, SectionHeader } from "@/components/forms/FormField";
import { ErrorBanner, FormSuccessState, LeadFormShell } from "@/components/forms/LeadFormShell";

const initialState = {
  First_Name: "",
  Last_Name: "",
  Company: "",
  Email: "",
  Phone: "",
  Website: "",
  Description: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};
    const requiredFields = ["First_Name", "Last_Name", "Company", "Email", "Phone", "Description"];

    for (const field of requiredFields) {
      const value = formData[field as keyof typeof formData];
      if (!String(value).trim()) {
        nextErrors[field] = "This field is required.";
      }
    }

    if (formData.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      nextErrors.Email = "Please use a valid email address.";
    }

    if (formData.Phone && !/^[+()\d\s-]{7,20}$/.test(formData.Phone)) {
      nextErrors.Phone = "Please use a valid phone or WhatsApp number.";
    }

    if (formData.Website && !/^https?:\/\//i.test(formData.Website)) {
      nextErrors.Website = "Please include http:// or https://.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "contact",
          ...formData,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setSubmitError(payload.error || "We couldn't submit your message right now.");
        return;
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Contact submission failed", error);
      setSubmitError("We couldn't submit your message right now. Your information hasn't been lost. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <LeadFormShell
        icon="C"
        eyebrow="CONTACT"
        title="Contact NairobiX"
        description="We’d love to hear about your goals, challenges and the next step you’re considering."
      >
        <FormSuccessState
          title="Thank you for reaching out to NairobiX."
          description="We've received your message and will get back to you shortly."
          actionLabel="Return to NairobiX"
          actionHref="/"
        />
      </LeadFormShell>
    );
  }

  return (
    <LeadFormShell
      icon="C"
      eyebrow="CONTACT"
      title="Contact NairobiX"
      description="Tell us a little about your business, your challenge, or the growth opportunity you want to explore."
    >
      <form onSubmit={handleSubmit} className="space-y-10">
        {submitError ? <ErrorBanner message={submitError} /> : null}

        <div>
          <SectionHeader number="01" title="Your Details" description="We use these to understand who is reaching out and how we can help." />
          <div className="grid gap-5 md:grid-cols-2">
            <FormInput label="First Name" name="First_Name" value={formData.First_Name} onChange={handleChange} required error={errors.First_Name} />
            <FormInput label="Last Name" name="Last_Name" value={formData.Last_Name} onChange={handleChange} required error={errors.Last_Name} />
            <FormInput label="Company" name="Company" value={formData.Company} onChange={handleChange} required error={errors.Company} />
            <FormInput label="Email" name="Email" type="email" value={formData.Email} onChange={handleChange} required error={errors.Email} />
            <FormInput label="Phone / WhatsApp" name="Phone" type="tel" value={formData.Phone} onChange={handleChange} required error={errors.Phone} />
            <FormInput label="Website / Online Presence" name="Website" type="url" value={formData.Website} onChange={handleChange} error={errors.Website} />
          </div>
        </div>

        <div>
          <SectionHeader number="02" title="Message" description="Share the context, challenge, or outcome you want to explore." />
          <FormTextarea
            label="Message / Additional Information"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            placeholder="Tell us about your business, goals, and the support you're looking for."
            required
            error={errors.Description}
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">We aim to reply quickly and thoughtfully.</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ea6a16] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending Message..." : "Send Message →"}
          </button>
        </div>
      </form>
    </LeadFormShell>
  );
}
