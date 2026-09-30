"use client";

import { useState } from "react";
import { ChipGroup, FormInput, FormSelect, FormTextarea, SectionHeader } from "@/components/forms/FormField";
import { ErrorBanner, FormContext, FormSuccessState, LeadFormShell } from "@/components/forms/LeadFormShell";

// What actually happens after a solution request — no response time promised.
const REQUEST_NEXT = [
  "We receive your requirements and the context around them.",
  "NairobiX reviews the request against the rest of your business.",
  "We come back with the most appropriate next step — a scoping conversation, a proposal or a better-fitting route.",
];
import { Button } from "@/components/ui/Button";
import { formTrackingPayload, newEventId, trackEvent } from "@/lib/analytics";
import { getLeadSource } from "@/lib/attribution";
import {
  INVESTMENT_OPTIONS as investmentOptions,
  SOLUTION_OPTIONS as solutionOptions,
  TIMELINE_OPTIONS as timelineOptions,
} from "@/lib/forms/options";

const initialState = {
  First_Name: "",
  Last_Name: "",
  Company: "",
  Email: "",
  Phone: "",
  Website: "",
  Solution_Needed: [] as string[],
  Estimated_Investment: "",
  Description: "",
  Desired_Timeline: "",
};

export function RequestSolutionForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleSelection = (value: string) => {
    setFormData((prev) => {
      const current = [...prev.Solution_Needed];
      const next = current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value];

      if (value === "Custom Quote" && next.includes("Custom Quote") && next.length > 1) {
        return { ...prev, Solution_Needed: ["Custom Quote"] };
      }

      if (value !== "Custom Quote" && next.includes("Custom Quote")) {
        return { ...prev, Solution_Needed: next.filter((entry) => entry !== "Custom Quote") };
      }

      return { ...prev, Solution_Needed: next };
    });

    setErrors((prev) => ({ ...prev, Solution_Needed: "" }));
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};
    const requiredFields = ["First_Name", "Last_Name", "Company", "Email", "Phone", "Solution_Needed", "Estimated_Investment", "Description", "Desired_Timeline"];

    for (const field of requiredFields) {
      const value = formData[field as keyof typeof formData];
      if (Array.isArray(value) ? value.length === 0 : !String(value).trim()) {
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

    if (formData.Solution_Needed.includes("Custom Quote") && formData.Solution_Needed.length > 1) {
      nextErrors.Solution_Needed = "'Custom Quote' must be selected on its own if you want a bespoke recommendation.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const eventId = newEventId();
    event.preventDefault();
    setSubmitError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "request-solution",
          ...formData,
          Marketing_Channel: getLeadSource(),
          ...formTrackingPayload(eventId),
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setSubmitError(payload.error || "We couldn't submit your request right now.");
        return;
      }

      trackEvent("generate_lead", { form_type: "request_solution" }, { eventId, metaEvent: "Lead", userData: { email: formData.Email, phone: formData.Phone } });
      setIsSuccess(true);
    } catch (error) {
      console.error("Solution request failed", error);
      setSubmitError("We couldn't submit your request right now. Your information hasn't been lost. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <LeadFormShell
        eyebrow="NAIROBIX · REQUEST A SOLUTION"
        title="Request a Solution"
        description="Share the challenge, the solution you need, and the project direction you're considering."
      >
        <FormSuccessState
          title="Request received."
          description="We have your requirements. NairobiX will review them against the wider business context and identify the appropriate next step."
          details={[
            ["Business", formData.Company],
            ["Solutions", formData.Solution_Needed.join(", ")],
            ["We'll reply to", formData.Email],
          ].filter((row): row is [string, string] => Boolean(row[1]))}
          next={REQUEST_NEXT}
          actionLabel="See how we approach problems"
          actionHref="/case-studies"
        />
      </LeadFormShell>
    );
  }

  return (
    <LeadFormShell
      eyebrow="NAIROBIX · REQUEST A SOLUTION"
      title="Request a Solution"
      description="Already know what you need? Tell us the solution, the context and the direction you're considering, and we'll shape the right next step."
      aside={
        <FormContext
          steps={REQUEST_NEXT}
          alternative={{
            lead: "Not sure which solution fits?",
            label: "Start the 4-minute Growth Assessment",
            href: "/business-growth-audit",
          }}
        />
      }
    >
      <form onSubmit={handleSubmit} className="space-y-10">
        {submitError ? <ErrorBanner message={submitError} /> : null}

        <div>
          <SectionHeader number="01" title="Contact" description="A few details so we can understand who the request is for." />
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
          <SectionHeader number="02" title="Solution" description="Choose the NairobiX solution that best matches your current challenge or opportunity." />
          <ChipGroup
            label="Solution Needed"
            name="Solution_Needed"
            options={solutionOptions}
            selected={formData.Solution_Needed}
            onSelect={toggleSelection}
            error={errors.Solution_Needed}
            helperText="Select one or more areas, or choose a custom quote when you need a tailored recommendation."
          />
        </div>

        <div>
          <SectionHeader number="03" title="Estimated Investment" description="This helps us plan a solution that matches your current business realities and growth stage." />
          <div className="max-w-xl">
            <FormSelect
              label="Estimated Investment"
              name="Estimated_Investment"
              value={formData.Estimated_Investment}
              onChange={handleChange}
              options={investmentOptions.map((option) => ({ label: option, value: option }))}
              required
              error={errors.Estimated_Investment}
            />
          </div>
        </div>

        <div>
          <SectionHeader number="04" title="Project Details" description="Help us understand the problem you want solved and the outcome you’re aiming for." />
          <FormTextarea
            label="Description"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            placeholder="Tell us what you're looking to build, improve, or achieve."
            required
            helperText="Tell us what you're looking to build, improve, or achieve."
            error={errors.Description}
          />
        </div>

        <div>
          <SectionHeader number="05" title="Desired Timeline" description="Share the pace that matches your business and decision-cycle." />
          <div className="max-w-xl">
            <FormSelect
              label="Desired Timeline"
              name="Desired_Timeline"
              value={formData.Desired_Timeline}
              onChange={handleChange}
              options={timelineOptions.map((option) => ({ label: option, value: option }))}
              required
              error={errors.Desired_Timeline}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--text-tertiary)]">We&apos;re focused on the right growth system for your business.</p>
          <Button type="submit" disabled={isSubmitting} variant="primary">
            {isSubmitting ? "Sending Request..." : "Submit Request →"}
          </Button>
        </div>
      </form>
    </LeadFormShell>
  );
}
