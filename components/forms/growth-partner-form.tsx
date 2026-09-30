"use client";

import { useState } from "react";
import { FormInput, SectionHeader } from "@/components/forms/FormField";
import { SingleChoiceCards, MultiChoiceCards } from "@/components/forms/ChoiceCard";
import { ErrorBanner, LeadFormShell } from "@/components/forms/LeadFormShell";
import { ReviewSummary, type ReviewSection } from "@/components/forms/ReviewSummary";
import { OpportunityApplicationTransition } from "@/components/forms/OpportunityApplicationTransition";
import { OpportunityApplicationReceived } from "@/components/forms/OpportunityApplicationReceived";
import { Button } from "@/components/ui/Button";
import { formTrackingPayload, newEventId, trackConversion } from "@/lib/analytics";
import { getLeadSource } from "@/lib/attribution";
import { wait, prefersReducedMotion } from "@/lib/motion";
import {
  APPLICANT_TYPE_OPTIONS as applicantTypeOptions,
  CONTRIBUTION_AREA_OPTIONS as contributionAreaOptions,
  OPPORTUNITY_ACCESS_OPTIONS as opportunityAccessOptions,
  RELATIONSHIP_TO_OPPORTUNITIES_OPTIONS as relationshipOptions,
} from "@/lib/forms/options";

// One short conditional follow-up per contribution area (brief section 13) —
// contextual application information only, not a modeled CRM field.
const CONTRIBUTION_FOLLOW_UPS: Record<string, string> = {
  "Generate Opportunities": "What types of opportunities can you identify or introduce?",
  "Provide Expertise": "What area of expertise can you contribute?",
  "Provide Services": "What services or capabilities can you provide?",
  "Collaborate on Projects": "What types of projects or engagements can you support?",
};

const initialState = {
  First_Name: "",
  Last_Name: "",
  Applicant_Type: "",
  Email: "",
  Phone: "",
  Website: "",
  Contribution_Areas: [] as string[],
  Contribution_Details: {} as Record<string, string>,
  Opportunity_Access: [] as string[],
  Relationship_To_Opportunities: [] as string[],
};

type FormState = typeof initialState;
type FieldName = keyof FormState;

const STEPS = [
  { title: "About You", description: "Tell us about yourself." },
  { title: "Contribution", description: "How would you contribute to NairobiX?" },
  { title: "Opportunity Access", description: "Who do you have access to?" },
  { title: "Relationships", description: "How are you connected to these opportunities?" },
  { title: "Review", description: "Review your application before submitting." },
] as const;

const STEP_FIELDS: FieldName[][] = [
  ["First_Name", "Last_Name", "Applicant_Type", "Email", "Phone", "Website"],
  ["Contribution_Areas"],
  ["Opportunity_Access"],
  ["Relationship_To_Opportunities"],
  [],
];

const REQUIRED_FIELDS: FieldName[] = [
  "First_Name",
  "Last_Name",
  "Applicant_Type",
  "Email",
  "Phone",
  "Contribution_Areas",
  "Opportunity_Access",
  "Relationship_To_Opportunities",
];

function stepForField(field: string): number {
  const index = STEP_FIELDS.findIndex((fields) => fields.includes(field as FieldName));
  return index === -1 ? 0 : index;
}

/**
 * Mirrors business-growth-audit-form.tsx's phase state machine —
 * "transition" (OpportunityApplicationTransition) is gated on the real
 * /api/leads response, never a fixed timer alone.
 */
type Phase = "form" | "submitting" | "transition" | "success";

export function GrowthPartnerForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [phase, setPhase] = useState<Phase>("form");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleMulti = (name: "Contribution_Areas" | "Opportunity_Access" | "Relationship_To_Opportunities", value: string) => {
    setFormData((prev) => {
      const current = prev[name];
      const next = current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value];

      // Dropping a contribution area also drops its follow-up answer so
      // stale text can't be submitted for a no-longer-selected area.
      const nextDetails =
        name === "Contribution_Areas" && !next.includes(value)
          ? Object.fromEntries(Object.entries(prev.Contribution_Details).filter(([key]) => key !== value))
          : prev.Contribution_Details;

      return { ...prev, [name]: next, Contribution_Details: nextDetails };
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const setContributionDetail = (area: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      Contribution_Details: { ...prev.Contribution_Details, [area]: value },
    }));
  };

  const validateFields = (fields: FieldName[]) => {
    const nextErrors: Record<string, string> = {};

    for (const field of fields) {
      if (!REQUIRED_FIELDS.includes(field)) continue;
      const value = formData[field];

      if (field === "Contribution_Areas" && Array.isArray(value) && value.length === 0) {
        nextErrors[field] = "Select at least one contribution area.";
        continue;
      }
      if (field === "Opportunity_Access" && Array.isArray(value) && value.length === 0) {
        nextErrors[field] = "Select at least one opportunity access type.";
        continue;
      }
      if (field === "Relationship_To_Opportunities" && Array.isArray(value) && value.length === 0) {
        nextErrors[field] = "Select at least one relationship type.";
        continue;
      }

      if (typeof value === "string" && !value.trim()) {
        nextErrors[field] = "This field is required.";
      }
    }

    if (fields.includes("Email") && formData.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      nextErrors.Email = "Enter a valid email address.";
    }
    if (fields.includes("Phone") && formData.Phone && !/^[+()\d\s-]{7,20}$/.test(formData.Phone)) {
      nextErrors.Phone = "Enter a valid phone or WhatsApp number.";
    }
    if (fields.includes("Website") && formData.Website && !/^https?:\/\//i.test(formData.Website)) {
      nextErrors.Website = "Include http:// or https://.";
    }

    return nextErrors;
  };

  const validateStep = (stepIndex: number) => {
    const nextErrors = validateFields(STEP_FIELDS[stepIndex]);
    setErrors((prev) => ({
      ...prev,
      ...Object.fromEntries(STEP_FIELDS[stepIndex].map((f) => [f, nextErrors[f] ?? ""])),
    }));
    return Object.keys(nextErrors).length === 0;
  };

  const validateAll = () => validateFields(STEP_FIELDS.flat());

  const goToNextStep = () => {
    if (!validateStep(step)) return;
    setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const goToPreviousStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setSubmitError("");
    const allErrors = validateAll();

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      const firstErrorField = STEP_FIELDS.flat().find((field) => allErrors[field]);
      if (firstErrorField) setStep(stepForField(firstErrorField));
      return;
    }

    setPhase("submitting");

    const reduceMotion = prefersReducedMotion();
    const buttonHoldMs = reduceMotion ? 0 : 450;
    const minTransitionMs = reduceMotion ? 0 : 900;

    const submission = fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "partner",
        ...formData,
        Marketing_Channel: getLeadSource(),
        Attribution: formTrackingPayload(newEventId()).Attribution,
      }),
    }).then(async (response) => ({ ok: response.ok, payload: await response.json() }));

    await wait(buttonHoldMs);
    setPhase("transition");

    const start = Date.now();

    try {
      const { ok, payload } = await submission;

      if (!ok || !payload.success) {
        setSubmitError(payload.error || "Something prevented your application from being submitted. Please review the highlighted information and try again.");
        setPhase("form");
        return;
      }

      const elapsed = Date.now() - start;
      if (elapsed < minTransitionMs) await wait(minTransitionMs - elapsed);

      trackConversion("generate_lead", { form_type: "partner" });
      setPhase("success");
    } catch (error) {
      console.error("Network application failed", error);
      setSubmitError("We couldn't complete your submission right now. Your information has not been submitted. Please try again.");
      setPhase("form");
    }
  };

  if (phase === "success") {
    return <OpportunityApplicationReceived firstName={formData.First_Name} />;
  }

  const isLastStep = step === STEPS.length - 1;
  const isLocked = phase === "submitting";

  const reviewSections: ReviewSection[] = [
    {
      title: "About You",
      stepIndex: 0,
      rows: [
        { label: "Name", value: `${formData.First_Name} ${formData.Last_Name}`.trim() },
        { label: "Applicant Type", value: formData.Applicant_Type },
        { label: "Email", value: formData.Email },
        { label: "Phone", value: formData.Phone },
        { label: "Website", value: formData.Website },
      ],
    },
    {
      title: "Contribution",
      stepIndex: 1,
      rows: [{ label: "Contribution Areas", value: formData.Contribution_Areas.join(", ") }],
    },
    {
      title: "Opportunity Access",
      stepIndex: 2,
      rows: [{ label: "Access", value: formData.Opportunity_Access.join(", ") }],
    },
    {
      title: "Relationships",
      stepIndex: 3,
      rows: [{ label: "Relationship", value: formData.Relationship_To_Opportunities.join(", ") }],
    },
  ];

  return (
    <LeadFormShell
      eyebrow="NAIROBIX · OPPORTUNITIES NETWORK"
      title="Network Application"
      description="Join the NairobiX Opportunities Network and help businesses access strategic growth solutions and long-term value."
    >
      {phase === "transition" ? (
        <OpportunityApplicationTransition />
      ) : (
        <>
          <StepProgress step={step} />

          <div className="mt-8 space-y-10" aria-busy={isLocked}>
            {submitError ? <ErrorBanner message={submitError} /> : null}

            <fieldset disabled={isLocked} className="m-0 min-w-0 space-y-10 border-0 p-0">
              {step === 0 && (
                <div>
                  <SectionHeader number="01" title="Tell us about yourself." />
                  <div className="grid gap-5 md:grid-cols-2">
                    <FormInput label="First Name" name="First_Name" value={formData.First_Name} onChange={handleTextChange} required error={errors.First_Name} />
                    <FormInput label="Last Name" name="Last_Name" value={formData.Last_Name} onChange={handleTextChange} required error={errors.Last_Name} />
                    <div className="md:col-span-2">
                      <SingleChoiceCards
                        label="Applicant Type"
                        name="Applicant_Type"
                        value={formData.Applicant_Type}
                        onSelect={(value) => {
                          setFormData((prev) => ({ ...prev, Applicant_Type: value }));
                          setErrors((prev) => ({ ...prev, Applicant_Type: "" }));
                        }}
                        options={applicantTypeOptions}
                        required
                        error={errors.Applicant_Type}
                        columns={2}
                      />
                    </div>
                    <FormInput label="Email" name="Email" type="email" value={formData.Email} onChange={handleTextChange} required error={errors.Email} />
                    <FormInput label="Phone / WhatsApp" name="Phone" type="tel" value={formData.Phone} onChange={handleTextChange} required error={errors.Phone} />
                    <div className="md:col-span-2">
                      <FormInput label="Website" name="Website" type="url" value={formData.Website} onChange={handleTextChange} placeholder="https:// (optional)" error={errors.Website} />
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <SectionHeader number="02" title="How would you contribute to NairobiX?" description="Select all that apply." />
                  <MultiChoiceCards
                    label="Contribution Areas"
                    name="Contribution_Areas"
                    options={contributionAreaOptions}
                    selected={formData.Contribution_Areas}
                    onToggle={(value) => toggleMulti("Contribution_Areas", value)}
                    error={errors.Contribution_Areas}
                    required
                  />

                  {formData.Contribution_Areas.length > 0 ? (
                    <div className="mt-8 space-y-5 border-t border-white/10 pt-8">
                      {formData.Contribution_Areas.map((area) =>
                        CONTRIBUTION_FOLLOW_UPS[area] ? (
                          <FormInput
                            key={area}
                            label={CONTRIBUTION_FOLLOW_UPS[area]}
                            name={`detail-${area}`}
                            value={formData.Contribution_Details[area] ?? ""}
                            onChange={(event) => setContributionDetail(area, event.target.value)}
                          />
                        ) : null
                      )}
                    </div>
                  ) : null}
                </div>
              )}

              {step === 2 && (
                <div>
                  <SectionHeader number="03" title="Who do you have access to?" description="Select the types of people, businesses or networks you legitimately interact with." />
                  <MultiChoiceCards
                    label="Opportunity Access"
                    name="Opportunity_Access"
                    options={opportunityAccessOptions}
                    selected={formData.Opportunity_Access}
                    onToggle={(value) => toggleMulti("Opportunity_Access", value)}
                    error={errors.Opportunity_Access}
                    required
                    columns={2}
                  />
                </div>
              )}

              {step === 3 && (
                <div>
                  <SectionHeader number="04" title="How are you connected to these opportunities?" />
                  <MultiChoiceCards
                    label="Relationship to Opportunities"
                    name="Relationship_To_Opportunities"
                    options={relationshipOptions}
                    selected={formData.Relationship_To_Opportunities}
                    onToggle={(value) => toggleMulti("Relationship_To_Opportunities", value)}
                    error={errors.Relationship_To_Opportunities}
                    required
                    columns={2}
                  />
                </div>
              )}

              {step === 4 && (
                <div>
                  <SectionHeader number="05" title="Review your application" />
                  <ReviewSummary sections={reviewSections} onEdit={setStep} />
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
                <p className="text-sm text-[var(--text-tertiary)]">We review every application with a strategic lens.</p>
              )}

              {isLastStep ? (
                <Button type="button" onClick={handleSubmit} disabled={isLocked} variant="primary">
                  {isLocked ? (
                    <span className="inline-flex items-center gap-2">
                      Submitting Application
                      <span className="inline-flex gap-0.5" aria-hidden="true">
                        <span className="h-1 w-1 animate-pulse rounded-full bg-current" style={{ animationDelay: "0ms" }} />
                        <span className="h-1 w-1 animate-pulse rounded-full bg-current" style={{ animationDelay: "150ms" }} />
                        <span className="h-1 w-1 animate-pulse rounded-full bg-current" style={{ animationDelay: "300ms" }} />
                      </span>
                    </span>
                  ) : (
                    "Submit Application →"
                  )}
                </Button>
              ) : (
                <Button type="button" onClick={goToNextStep} variant="primary">
                  Continue →
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </LeadFormShell>
  );
}

function StepProgress({ step }: { step: number }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{STEPS[step].title}</p>
      <p aria-live="polite" className="sr-only">
        Step {step + 1} of {STEPS.length}: {STEPS[step].title}
      </p>
      <ol className="mt-3 flex items-center gap-2" aria-label="Network application progress">
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
              <span className={`hidden text-xs font-medium sm:inline ${isActive ? "text-white" : "text-[var(--text-tertiary)]"}`}>{item.title}</span>
              {index < STEPS.length - 1 && <span className="h-px flex-1 bg-white/10" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
