"use client";

import { useState } from "react";
import { ChipGroup, FormInput, FormSelect, FormTextarea, SectionHeader } from "@/components/forms/FormField";
import { ErrorBanner, FormSuccessState, LeadFormShell } from "@/components/forms/LeadFormShell";

const solutionOptions = [
  "Digital Marketing",
  "CRM & Sales Systems",
  "Business Automation",
  "AI Solutions",
  "Web & Digital Solutions",
  "Growth Strategy & Analytics",
  "Custom Quote",
];

const investmentOptions = [
  "Under KSh 25,000",
  "KSh 25,000 – 50,000",
  "KSh 50,000 – 100,000",
  "KSh 100,000+",
];

const timelineOptions = [
  "Immediately",
  "Within 2–4 weeks",
  "Within 1–3 months",
  "Exploring options",
];

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
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setSubmitError(payload.error || "We couldn't submit your request right now.");
        return;
      }

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
        icon="S"
        eyebrow="REQUEST A SOLUTION"
        title="Request a Solution"
        description="Share the challenge, the solution you need, and the project direction you're considering."
      >
        <FormSuccessState
          title="Your solution request has been received."
          description="We'll review your requirements and determine the best next step for your business."
          actionLabel="Return to NairobiX"
          actionHref="/"
        />
      </LeadFormShell>
    );
  }

  return (
    <LeadFormShell
      icon="S"
      eyebrow="REQUEST A SOLUTION"
      title="Request a Solution"
      description="Tell us what you need and we’ll help you identify the right NairobiX solution for your business growth goals."
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
          <p className="text-sm text-slate-400">We’re focused on the right growth system for your business.</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ea6a16] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending Request..." : "Submit Request →"}
          </button>
        </div>
      </form>
    </LeadFormShell>
  );
}
