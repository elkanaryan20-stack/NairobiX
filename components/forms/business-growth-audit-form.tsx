"use client";

import { useMemo, useState } from "react";
import {
  ChipGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  SectionHeader,
} from "@/components/forms/FormField";
import { ErrorBanner, LeadFormShell } from "@/components/forms/LeadFormShell";
import { AssessmentSubmissionTransition } from "@/components/forms/AssessmentSubmissionTransition";
import { AssessmentReceived } from "@/components/forms/AssessmentReceived";
import { Button } from "@/components/ui/Button";
import { trackConversion } from "@/lib/analytics";
import { getLeadSource } from "@/lib/attribution";
import { wait, prefersReducedMotion } from "@/lib/motion";
import {
  BUDGET_READINESS_OPTIONS as budgetOptions,
  GROWTH_GOAL_OPTIONS as growthGoalOptions,
  INDUSTRY_OPTIONS as industryOptions,
  INVESTMENT_READINESS_OPTIONS as investmentReadinessOptions,
  MARKETING_CHANNEL_OPTIONS as marketingOptions,
  TIMELINE_OPTIONS as timelineOptions,
} from "@/lib/forms/options";

const initialState = {
  First_Name: "",
  Last_Name: "",
  Email: "",
  Phone: "",
  Company: "",
  Industry: "",
  Website: "",
  City: "",
  Country: "",
  Growth_Goal: "",
  Business_Challenge: "",
  Current_Marketing_Channels: [] as string[],
  Investment_Readiness: "",
  Trial_Advertisement_Budget_Readiness: "",
  Desired_Timeline: "",
  Description: "",
};

type FormState = typeof initialState;
type FieldName = keyof FormState;

const STEPS = [
  { title: "About You", description: "Who we're speaking with." },
  { title: "About Your Business", description: "Where and what industry you operate in." },
  { title: "Your Growth", description: "What you're trying to achieve." },
  { title: "Growth Readiness", description: "Your investment, budget and timeline readiness." },
  { title: "Final Details", description: "Anything else that helps us prepare your assessment." },
] as const;

const STEP_FIELDS: FieldName[][] = [
  ["First_Name", "Last_Name", "Email", "Phone"],
  ["Company", "Industry", "Website", "City", "Country"],
  ["Growth_Goal", "Business_Challenge", "Current_Marketing_Channels"],
  ["Investment_Readiness", "Trial_Advertisement_Budget_Readiness", "Desired_Timeline"],
  ["Description"],
];

const REQUIRED_FIELDS: FieldName[] = [
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
  "Investment_Readiness",
];

function stepForField(field: string): number {
  const index = STEP_FIELDS.findIndex((fields) => fields.includes(field as FieldName));
  return index === -1 ? 0 : index;
}

/**
 * "submitting": the request is in flight but we're still showing the form,
 * with the submit button in its brief processing state (section 4 of the
 * brief) before handing off to the full-screen connection sequence.
 * "transition": AssessmentSubmissionTransition is shown — gated on the real
 * API response, never a fixed timer alone (see handleSubmit).
 */
type Phase = "form" | "submitting" | "transition" | "success";

export function BusinessGrowthAuditForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [phase, setPhase] = useState<Phase>("form");

  const selectedChannels = useMemo(
    () => formData.Current_Marketing_Channels,
    [formData.Current_Marketing_Channels]
  );

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const toggleSelection = (
    name: "Current_Marketing_Channels",
    value: string
  ) => {
    setFormData((prev) => {
      const current = [...prev[name]];

      const next = current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value];

      if (
        value === "None currently" &&
        next.includes("None currently") &&
        next.length > 1
      ) {
        return {
          ...prev,
          [name]: ["None currently"],
        };
      }

      if (
        value !== "None currently" &&
        next.includes("None currently")
      ) {
        return {
          ...prev,
          [name]: next.filter(
            (entry) => entry !== "None currently"
          ),
        };
      }

      return {
        ...prev,
        [name]: next,
      };
    });

    setErrors((prev) => ({
      ...prev,
      Current_Marketing_Channels: "",
    }));
  };

  const validateFields = (fields: FieldName[]) => {
    const nextErrors: Record<string, string> = {};

    for (const field of fields) {
      if (!REQUIRED_FIELDS.includes(field) && field !== "Current_Marketing_Channels") continue;

      const value = formData[field];

      if (field === "Current_Marketing_Channels") {
        if (value.length === 0) {
          nextErrors[field] = "Please select at least one option.";
        } else if (value.includes("None currently") && value.length > 1) {
          nextErrors[field] = "'None currently' must be selected on its own.";
        }
        continue;
      }

      if (Array.isArray(value) ? value.length === 0 : !String(value).trim()) {
        nextErrors[field] = "This field is required.";
      }
    }

    if (fields.includes("Email") && formData.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      nextErrors.Email = "Please use a valid email address.";
    }

    if (fields.includes("Phone") && formData.Phone && !/^[+()\d\s-]{7,20}$/.test(formData.Phone)) {
      nextErrors.Phone = "Please use a valid phone number.";
    }

    if (fields.includes("Website") && formData.Website && !/^https?:\/\//i.test(formData.Website)) {
      nextErrors.Website = "Please include http:// or https://.";
    }

    return nextErrors;
  };

  const validateStep = (stepIndex: number) => {
    const nextErrors = validateFields(STEP_FIELDS[stepIndex]);
    setErrors((prev) => ({ ...prev, ...nextErrors, ...Object.fromEntries(STEP_FIELDS[stepIndex].map((f) => [f, nextErrors[f] ?? ""])) }));
    return Object.keys(nextErrors).length === 0;
  };

  const validateAll = () => {
    const nextErrors = validateFields(STEP_FIELDS.flat());
    setErrors(nextErrors);
    return nextErrors;
  };

  const goToNextStep = () => {
    if (!validateStep(step)) return;
    setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const goToPreviousStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSubmitError("");

    const allErrors = validateAll();

    if (Object.keys(allErrors).length > 0) {
      const firstErrorField = STEP_FIELDS.flat().find((field) => allErrors[field]);
      if (firstErrorField) setStep(stepForField(firstErrorField));
      return;
    }

    setPhase("submitting");

    const reduceMotion = prefersReducedMotion();
    const buttonHoldMs = reduceMotion ? 0 : 450;
    const minTransitionMs = reduceMotion ? 0 : 900;

    // Kick off the real request immediately so the button's brief processing
    // state and the full-screen transition never add latency of their own —
    // they only ever wait on this promise, never simulate it.
    const submission = fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "business-growth-audit",
        ...formData,
        Current_Marketing_Channels: formData.Current_Marketing_Channels,
        Marketing_Channel: getLeadSource(),
      }),
    }).then(async (response) => ({
      ok: response.ok,
      payload: await response.json(),
    }));

    await wait(buttonHoldMs);
    setPhase("transition");

    const start = Date.now();

    try {
      const { ok, payload } = await submission;

      if (!ok || !payload.success) {
        setSubmitError(
          payload.error ||
            "We couldn't submit your request right now."
        );
        setPhase("form");
        return;
      }

      const elapsed = Date.now() - start;
      if (elapsed < minTransitionMs) {
        await wait(minTransitionMs - elapsed);
      }

      trackConversion("generate_lead", {
        form_type: "business_growth_audit",
      });

      if (
        typeof window !== "undefined" &&
        typeof window.gtag === "function"
      ) {
        window.gtag("event", "growth_assessment_submitted", {
          event_category: "lead",
          event_label: "Business Growth Assessment",
        });
      }

      setPhase("success");
    } catch (error) {
      console.error(
        "Assessment submission failed",
        error
      );

      setSubmitError(
        "We couldn't submit your request right now. Your information hasn't been lost. Please try again."
      );
      setPhase("form");
    }
  };

  if (phase === "success") {
    return (
      <AssessmentReceived
        firstName={formData.First_Name}
        companyName={formData.Company}
      />
    );
  }

  const isLastStep = step === STEPS.length - 1;
  const isLocked = phase === "submitting";

  return (
    <LeadFormShell
      icon="A"
      eyebrow="GROWTH ASSESSMENT"
      title="Business Growth Assessment"
      description="A short, five-step assessment of your business, growth challenges and current marketing so we can identify the right next step."
    >
      {phase === "transition" ? (
        <AssessmentSubmissionTransition />
      ) : (
        <>
          <StepProgress step={step} />

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-10"
            aria-busy={isLocked}
          >
            {submitError ? (
              <ErrorBanner message={submitError} />
            ) : null}

            <fieldset disabled={isLocked} className="m-0 min-w-0 space-y-10 border-0 p-0">

        {step === 0 && (
          <div>
            <SectionHeader
              number={`0${step + 1}`}
              title={STEPS[0].title}
              description="A clear picture of who we're speaking with."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <FormInput
                label="First Name"
                name="First_Name"
                value={formData.First_Name}
                onChange={handleChange}
                required
                error={errors.First_Name}
              />

              <FormInput
                label="Last Name"
                name="Last_Name"
                value={formData.Last_Name}
                onChange={handleChange}
                required
                error={errors.Last_Name}
              />

              <FormInput
                label="Email"
                name="Email"
                type="email"
                value={formData.Email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                error={errors.Email}
              />

              <FormInput
                label="Phone / WhatsApp"
                name="Phone"
                type="tel"
                value={formData.Phone}
                onChange={handleChange}
                placeholder="+254..."
                required
                error={errors.Phone}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <SectionHeader
              number={`0${step + 1}`}
              title={STEPS[1].title}
              description="A clear picture of your business helps us understand the right opportunities and priorities."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <FormInput
                  label="Business Name"
                  name="Company"
                  value={formData.Company}
                  onChange={handleChange}
                  required
                  error={errors.Company}
                />
              </div>

              <FormSelect
                label="Industry"
                name="Industry"
                value={formData.Industry}
                onChange={handleChange}
                options={industryOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                required
                error={errors.Industry}
              />

              <FormInput
                label="Website / Online Presence"
                name="Website"
                type="url"
                value={formData.Website}
                onChange={handleChange}
                placeholder="https://"
                error={errors.Website}
              />

              <FormInput
                label="City"
                name="City"
                value={formData.City}
                onChange={handleChange}
                required
                error={errors.City}
              />

              <FormInput
                label="Country / Region"
                name="Country"
                value={formData.Country}
                onChange={handleChange}
                required
                error={errors.Country}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <SectionHeader
              number={`0${step + 1}`}
              title={STEPS[2].title}
              description="This helps us determine where your business needs the greatest strategic impact."
            />

            <div className="space-y-8">
              <div className="rounded-[24px] border border-white/10 bg-[#111214] p-4 sm:p-5">
                <h3 className="mb-4 text-base font-medium text-white">
                  Growth Goal
                </h3>

                <div className="flex flex-wrap gap-2.5">
                  {growthGoalOptions.map((option) => {
                    const active =
                      formData.Growth_Goal === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            Growth_Goal: option,
                          }));

                          setErrors((prev) => ({
                            ...prev,
                            Growth_Goal: "",
                          }));
                        }}
                        className={`rounded-full border px-4 py-3 text-sm transition ${
                          active
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white"
                            : "border-white/10 bg-white/[0.02] text-[var(--text-secondary)] hover:border-white/20"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {errors.Growth_Goal ? (
                  <p className="mt-2 text-sm text-red-300">
                    {errors.Growth_Goal}
                  </p>
                ) : null}
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

              <ChipGroup
                label="Current Marketing Channels"
                name="Current_Marketing_Channels"
                options={marketingOptions}
                selected={selectedChannels}
                onSelect={(value) =>
                  toggleSelection(
                    "Current_Marketing_Channels",
                    value
                  )
                }
                error={errors.Current_Marketing_Channels}
                helperText="Select the channels you currently use. 'None currently' is mutually exclusive with every other option."
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <SectionHeader
              number={`0${step + 1}`}
              title={STEPS[3].title}
              description="This helps us shape the right growth plan, offer and timeline for your business."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <FormSelect
                  label="Investment Readiness"
                  name="Investment_Readiness"
                  value={formData.Investment_Readiness}
                  onChange={handleChange}
                  options={investmentReadinessOptions.map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  required
                  error={errors.Investment_Readiness}
                />
              </div>

              <FormSelect
                label="Trial Advertisement Budget Readiness"
                name="Trial_Advertisement_Budget_Readiness"
                value={
                  formData.Trial_Advertisement_Budget_Readiness
                }
                onChange={handleChange}
                options={budgetOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                error={
                  errors.Trial_Advertisement_Budget_Readiness
                }
              />

              <FormSelect
                label="Desired Timeline"
                name="Desired_Timeline"
                value={formData.Desired_Timeline}
                onChange={handleChange}
                options={timelineOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                required
                error={errors.Desired_Timeline}
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <SectionHeader
              number={`0${step + 1}`}
              title={STEPS[4].title}
              description="Anything else you'd like us to know before we prepare your assessment."
            />

            <FormTextarea
              label="Description / Additional Information"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              placeholder="Share any other context about your business, goals or growth priorities (optional)."
              error={errors.Description}
            />
          </div>
        )}

            </fieldset>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  disabled={isLocked}
                  className="text-sm font-medium text-[var(--text-secondary)] hover:text-white disabled:opacity-50"
                >
                  ← Back
                </button>
              ) : (
                <p className="text-sm text-[var(--text-tertiary)]">
                  Your information is secure and only used for
                  NairobiX review.
                </p>
              )}

              {isLastStep ? (
                <Button
                  key="submit"
                  type="submit"
                  disabled={isLocked}
                  variant="primary"
                >
                  {isLocked ? (
                    <span className="inline-flex items-center gap-2">
                      Submitting Assessment
                      <span className="inline-flex gap-0.5" aria-hidden="true">
                        <span className="h-1 w-1 animate-pulse rounded-full bg-current" style={{ animationDelay: "0ms" }} />
                        <span className="h-1 w-1 animate-pulse rounded-full bg-current" style={{ animationDelay: "150ms" }} />
                        <span className="h-1 w-1 animate-pulse rounded-full bg-current" style={{ animationDelay: "300ms" }} />
                      </span>
                    </span>
                  ) : (
                    "Submit Growth Assessment →"
                  )}
                </Button>
              ) : (
                <Button
                  key="continue"
                  type="button"
                  onClick={goToNextStep}
                  variant="primary"
                >
                  Continue →
                </Button>
              )}
            </div>
          </form>
        </>
      )}
    </LeadFormShell>
  );
}

function StepProgress({ step }: { step: number }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
        Step {step + 1} of {STEPS.length}
      </p>
      <p aria-live="polite" className="sr-only">
        Step {step + 1} of {STEPS.length}: {STEPS[step].title}
      </p>
      <ol className="mt-3 flex items-center gap-2" aria-label="Growth Assessment progress">
        {STEPS.map((item, index) => {
          const isActive = index === step;
          const isDone = index < step;
          return (
            <li key={item.title} className="flex flex-1 items-center gap-2 last:flex-none">
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
                {item.title}
              </span>
              {index < STEPS.length - 1 && <span className="h-px flex-1 bg-white/10" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
