"use client";

import { useMemo, useState } from "react";
import { ChipGroup, FormInput, FormSelect, FormTextarea, SectionHeader } from "@/components/forms/FormField";
import { ErrorBanner, FormSuccessState, LeadFormShell } from "@/components/forms/LeadFormShell";

const marketingOptions = [
  "Facebook / Instagram",
  "Google Business Profile",
  "Website",
  "WhatsApp Business",
  "Paid Advertising",
  "Email Marketing",
  "SEO",
  "None currently",
];

const industryOptions = [
  "Retail & E-commerce",
  "Professional Services",
  "Real Estate",
  "Healthcare",
  "Education",
  "Hospitality",
  "Beauty & Wellness",
  "Finance",
  "Construction",
  "Manufacturing",
];

const growthGoalOptions = [
  "Generate more qualified leads",
  "Increase sales and revenue",
  "Attract more customers",
  "Improve online visibility",
  "Improve customer follow-up",
  "Improve customer retention",
  "Automate repetitive processes",
  "Improve digital presence",
  "Build better sales and growth systems",
  "I need guidance",
];

const timelineOptions = [
  "Immediately",
  "Within 2–4 weeks",
  "Within 1–3 months",
  "Exploring options",
];

const budgetOptions = [
  "Comfortable with recommended budget",
  "Wants to understand budget first",
  "Not currently",
];

const initialState = {
  First_Name: "",
  Last_Name: "",
  Company: "",
  Industry: "",
  Email: "",
  Phone: "",
  Website: "",
  City: "",
  Country: "",
  Growth_Goal: "",
  Business_Challenge: "",
  Current_Marketing_Channels: [] as string[],
  Desired_Timeline: "",
  Trial_Advertisement_Budget_Readiness: "",
};

export function BusinessGrowthAuditForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedChannels = useMemo(() => formData.Current_Marketing_Channels, [formData.Current_Marketing_Channels]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleSelection = (name: "Current_Marketing_Channels", value: string) => {
    setFormData((prev) => {
      const current = [...(prev[name] as string[])];
      const next = current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value];

      if (value === "None currently" && next.includes("None currently") && next.length > 1) {
        return { ...prev, [name]: ["None currently"] };
      }

      if (value !== "None currently" && next.includes("None currently")) {
        return { ...prev, [name]: next.filter((entry) => entry !== "None currently") };
      }

      return { ...prev, [name]: next };
    });

    setErrors((prev) => ({ ...prev, Current_Marketing_Channels: "" }));
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    const requiredFields = [
      "First_Name",
      "Last_Name",
      "Company",
      "Industry",
      "Email",
      "Phone",
      "City",
      "Country",
      "Growth_Goal",
      "Business_Challenge",
      "Desired_Timeline",
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
      nextErrors.Phone = "Please use a valid phone number.";
    }

    if (formData.Website && !/^https?:\/\//i.test(formData.Website)) {
      nextErrors.Website = "Please include http:// or https://.";
    }

    if (formData.Current_Marketing_Channels.length === 0) {
      nextErrors.Current_Marketing_Channels = "Please select at least one option.";
    }

    if (
      formData.Current_Marketing_Channels.includes("None currently") &&
      formData.Current_Marketing_Channels.length > 1
    ) {
      nextErrors.Current_Marketing_Channels = "'None currently' must be selected on its own.";
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
          formType: "business-growth-audit",
          ...formData,
          Current_Marketing_Channels: formData.Current_Marketing_Channels,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setSubmitError(payload.error || "We couldn't submit your request right now.");
        return;
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Assessment submission failed", error);
      setSubmitError("We couldn't submit your request right now. Your information hasn't been lost. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <LeadFormShell
        icon="A"
        eyebrow="GROWTH ASSESSMENT"
        title="Business Growth Assessment"
        description="A premium review of your business opportunities, bottlenecks and growth priorities."
      >
        <FormSuccessState
          title="Thank you — your Growth Assessment has been received."
          description="Your information is now with the NairobiX team. We'll review it and identify the areas where we can create the greatest growth opportunity."
          actionLabel="Return to NairobiX"
          actionHref="/"
        />
      </LeadFormShell>
    );
  }

  return (
    <LeadFormShell
      icon="A"
      eyebrow="GROWTH ASSESSMENT"
      title="Business Growth Assessment"
      description="Tell us about your business, growth challenges and current marketing so we can identify the right next step."
    >
      <form onSubmit={handleSubmit} className="space-y-10">
        {submitError ? <ErrorBanner message={submitError} /> : null}

        <div>
          <SectionHeader number="01" title="About Your Business" description="A clear picture of your business helps us understand the right opportunities and priorities." />
          <div className="grid gap-5 md:grid-cols-2">
            <FormInput label="First Name" name="First_Name" value={formData.First_Name} onChange={handleChange} required error={errors.First_Name} />
            <FormInput label="Last Name" name="Last_Name" value={formData.Last_Name} onChange={handleChange} required error={errors.Last_Name} />
            <FormInput label="Business Name" name="Company" value={formData.Company} onChange={handleChange} required error={errors.Company} />
            <FormSelect label="Industry" name="Industry" value={formData.Industry} onChange={handleChange} options={industryOptions.map((option) => ({ label: option, value: option }))} required error={errors.Industry} />
            <FormInput label="Email" name="Email" type="email" value={formData.Email} onChange={handleChange} placeholder="you@example.com" required error={errors.Email} />
            <FormInput label="Phone / WhatsApp" name="Phone" type="tel" value={formData.Phone} onChange={handleChange} placeholder="+254..." required error={errors.Phone} />
            <FormInput label="Website / Online Presence" name="Website" type="url" value={formData.Website} onChange={handleChange} placeholder="https://" error={errors.Website} />
            <FormInput label="City" name="City" value={formData.City} onChange={handleChange} required error={errors.City} />
            <div className="md:col-span-2">
              <FormInput label="Country / Region" name="Country" value={formData.Country} onChange={handleChange} required error={errors.Country} />
            </div>
          </div>
        </div>

        <div>
          <SectionHeader number="02" title="Growth Priorities" description="This helps us determine where your business needs the greatest strategic impact." />
          <div className="space-y-8">
            <div className="rounded-[24px] border border-white/10 bg-[#111214] p-4 sm:p-5">
              <h3 className="mb-4 text-base font-medium text-white">Growth Goal</h3>
              <div className="flex flex-wrap gap-2.5">
                {growthGoalOptions.map((option) => {
                  const active = formData.Growth_Goal === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, Growth_Goal: option }));
                        setErrors((prev) => ({ ...prev, Growth_Goal: "" }));
                      }}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        active
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white"
                          : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {errors.Growth_Goal ? <p className="mt-2 text-sm text-red-300">{errors.Growth_Goal}</p> : null}
            </div>

            <FormTextarea
              label="Business Challenge"
              name="Business_Challenge"
              value={formData.Business_Challenge}
              onChange={handleChange}
              placeholder="Tell us what's currently making growth difficult..."
              required
              helperText="Tell us what's currently making growth difficult — leads, sales, visibility, follow-up, retention, operations, or something else."
              error={errors.Business_Challenge}
            />
          </div>
        </div>

        <div>
          <SectionHeader number="03" title="Current Marketing" description="Understanding your current channels helps us identify the fastest route to better growth." />
          <ChipGroup
            label="Current Marketing Channels"
            name="Current_Marketing_Channels"
            options={marketingOptions}
            selected={selectedChannels}
            onSelect={(value) => toggleSelection("Current_Marketing_Channels", value)}
            error={errors.Current_Marketing_Channels}
            helperText="Select the channels you currently use. 'None currently' is mutually exclusive with every other option."
          />
        </div>

        <div>
          <SectionHeader number="04" title="Readiness" description="This helps us shape the right growth plan and timeline for your business." />
          <div className="grid gap-5 md:grid-cols-2">
            <FormSelect
              label="Desired Timeline"
              name="Desired_Timeline"
              value={formData.Desired_Timeline}
              onChange={handleChange}
              options={timelineOptions.map((option) => ({ label: option, value: option }))}
              required
              error={errors.Desired_Timeline}
            />
            <FormSelect
              label="Trial Advertisement Budget Readiness"
              name="Trial_Advertisement_Budget_Readiness"
              value={formData.Trial_Advertisement_Budget_Readiness}
              onChange={handleChange}
              options={budgetOptions.map((option) => ({ label: option, value: option }))}
              error={errors.Trial_Advertisement_Budget_Readiness}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">Your information is secure and only used for NairobiX review.</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ea6a16] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting Assessment..." : "Submit Growth Assessment →"}
          </button>
        </div>
      </form>
    </LeadFormShell>
  );
}
