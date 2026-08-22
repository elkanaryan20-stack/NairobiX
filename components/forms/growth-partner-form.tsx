"use client";

import { useState } from "react";
import { ChipGroup, FormInput, FormSelect, FormTextarea, SectionHeader } from "@/components/forms/FormField";
import { ErrorBanner, FormSuccessState, LeadFormShell } from "@/components/forms/LeadFormShell";

const partnerTypeOptions = [
  "Business Consultant",
  "Marketing Agency",
  "Business Centre",
  "Cyber Cafe / ICT Centre",
  "Printing / Branding Centre",
];

const partnershipInterestOptions = [
  "Refer Businesses to NairobiX",
  "Offer NairobiX Solutions to Your Clients",
  "Collaborate on Client Projects",
  "White-Label NairobiX Solutions",
  "Strategic Business Partnership",
  "Explore a Custom Partnership",
];

const initialState = {
  First_Name: "",
  Last_Name: "",
  Company: "",
  Email: "",
  Phone: "",
  Website: "",
  City: "",
  Country: "",
  Partner_Type: "",
  Partnership_Interest: [] as string[],
  Partnership_Motivation: "",
};

export function GrowthPartnerForm() {
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
      const current = [...prev.Partnership_Interest];
      const next = current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value];

      return { ...prev, Partnership_Interest: next };
    });
    setErrors((prev) => ({ ...prev, Partnership_Interest: "" }));
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};
    const requiredFields = [
      "First_Name",
      "Last_Name",
      "Company",
      "Email",
      "Phone",
      "City",
      "Country",
      "Partner_Type",
      "Partnership_Interest",
      "Partnership_Motivation",
    ];

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
          formType: "partner",
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
      console.error("Partner application failed", error);
      setSubmitError("We couldn't submit your request right now. Your information hasn't been lost. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <LeadFormShell
        icon="P"
        eyebrow="GROWTH PARTNER"
        title="Growth Partner Application"
        description="Partner with NairobiX to create value for businesses and long-term growth opportunities."
      >
        <FormSuccessState
          title="Your Growth Partner application has been received."
          description="Our team will review your application and follow up with the next steps."
          actionLabel="Return to NairobiX"
          actionHref="/"
        />
      </LeadFormShell>
    );
  }

  return (
    <LeadFormShell
      icon="P"
      eyebrow="GROWTH PARTNER"
      title="Growth Partner Application"
      description="Join the NairobiX Growth Partner Network and help businesses access strategic growth solutions and long-term value."
    >
      <form onSubmit={handleSubmit} className="space-y-10">
        {submitError ? <ErrorBanner message={submitError} /> : null}

        <div>
          <SectionHeader number="01" title="Contact Details" description="Tell us a little about the person and business behind the application." />
          <div className="grid gap-5 md:grid-cols-2">
            <FormInput label="First Name" name="First_Name" value={formData.First_Name} onChange={handleChange} required error={errors.First_Name} />
            <FormInput label="Last Name" name="Last_Name" value={formData.Last_Name} onChange={handleChange} required error={errors.Last_Name} />
            <FormInput label="Company" name="Company" value={formData.Company} onChange={handleChange} required error={errors.Company} />
            <FormInput label="Email" name="Email" type="email" value={formData.Email} onChange={handleChange} required error={errors.Email} />
            <FormInput label="Phone / WhatsApp" name="Phone" type="tel" value={formData.Phone} onChange={handleChange} required error={errors.Phone} />
            <FormInput label="Website / Online Presence" name="Website" type="url" value={formData.Website} onChange={handleChange} error={errors.Website} />
            <FormInput label="City" name="City" value={formData.City} onChange={handleChange} required error={errors.City} />
            <FormInput label="Country" name="Country" value={formData.Country} onChange={handleChange} required error={errors.Country} />
          </div>
        </div>

        <div>
          <SectionHeader number="02" title="Partnership Profile" description="We want to understand how you work with businesses and what kind of value you can bring to the partnership." />
          <div className="grid gap-5 md:grid-cols-2">
            <FormSelect
              label="Partner Type"
              name="Partner_Type"
              value={formData.Partner_Type}
              onChange={handleChange}
              options={partnerTypeOptions.map((option) => ({ label: option, value: option }))}
              required
              error={errors.Partner_Type}
            />
            <div className="md:col-span-2">
              <ChipGroup
                label="Partnership Interest"
                name="Partnership_Interest"
                options={partnershipInterestOptions}
                selected={formData.Partnership_Interest}
                onSelect={toggleSelection}
                error={errors.Partnership_Interest}
                helperText="Select the areas you’d like to explore with NairobiX."
              />
            </div>
          </div>

          <div className="mt-6">
            <FormTextarea
              label="Partnership Motivation"
              name="Partnership_Motivation"
              value={formData.Partnership_Motivation}
              onChange={handleChange}
              placeholder="Tell us about the businesses or clients you work with, what you bring, and why a partnership with NairobiX would create value."
              required
              helperText="Tell us about the businesses or clients you work with, what you bring to the partnership, and why you believe working with NairobiX would create value."
              error={errors.Partnership_Motivation}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">We review every application with a strategic lens.</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ea6a16] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting Application..." : "Submit Application →"}
          </button>
        </div>
      </form>
    </LeadFormShell>
  );
}
