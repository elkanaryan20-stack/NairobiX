"use client";

import { useRef, useState } from "react";
import { FormInput, FormTextarea, SectionHeader } from "@/components/forms/FormField";
import { SingleChoiceCards, MultiChoiceCards } from "@/components/forms/ChoiceCard";
import { ErrorBanner, FormContext, LeadFormShell } from "@/components/forms/LeadFormShell";
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

const initialState = {
  First_Name: "",
  Last_Name: "",
  Applicant_Type: "",
  Organization_Name: "",
  Email: "",
  Phone: "",
  Contribution_Areas: [] as string[],
  Opportunity_Access: [] as string[],
  Relationship_To_Opportunities: [] as string[],
  Qualification_Evidence: "",
  Supporting_Links: "",
};

type FormState = typeof initialState;
type FieldName = keyof FormState;

const STEPS = [
  { title: "About You", description: "Your details" },
  { title: "Contribution", description: "How you can contribute" },
  { title: "Opportunity Access", description: "Your relationships and reach" },
  { title: "Qualification Evidence", description: "Examples and links" },
  { title: "Review", description: "Review your application before submitting." },
] as const;

const STEP_FIELDS: FieldName[][] = [
  ["First_Name", "Last_Name", "Applicant_Type", "Organization_Name", "Email", "Phone"],
  ["Contribution_Areas"],
  ["Opportunity_Access", "Relationship_To_Opportunities"],
  ["Qualification_Evidence", "Supporting_Links"],
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
  "Qualification_Evidence",
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
  const submissionStarted = useRef(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleMulti = (name: "Contribution_Areas" | "Opportunity_Access" | "Relationship_To_Opportunities", value: string) => {
    setFormData((prev) => {
      const current = prev[name];
      const next = current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value];

      return { ...prev, [name]: next };
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
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
    if (fields.includes("Organization_Name") && formData.Applicant_Type === "Organization" && !formData.Organization_Name.trim()) {
      nextErrors.Organization_Name = "Enter your organization name.";
    }
    if (fields.includes("Supporting_Links") && formData.Supporting_Links) {
      const links = formData.Supporting_Links.split(/[\n,]+/).map((link) => link.trim()).filter(Boolean);
      if (links.some((link) => !/^https?:\/\//i.test(link))) {
        nextErrors.Supporting_Links = "Add each link with http:// or https://.";
      }
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
    if (submissionStarted.current) return;
    const allErrors = validateAll();

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      const firstErrorField = STEP_FIELDS.flat().find((field) => allErrors[field]);
      if (firstErrorField) setStep(stepForField(firstErrorField));
      return;
    }

    submissionStarted.current = true;
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
        // Adapt the guided application to the existing Zoho Leads field map.
        Company: formData.Applicant_Type === "Organization"
          ? formData.Organization_Name.trim()
          : `${formData.First_Name} ${formData.Last_Name}`.trim(),
        Partner_Type: formData.Applicant_Type,
        Partnership_Interest: formData.Contribution_Areas,
        Partnership_Motivation: [
          `Opportunity access: ${formData.Opportunity_Access.join(", ")}`,
          `Relationship to opportunities: ${formData.Relationship_To_Opportunities.join(", ")}`,
          `Qualification evidence: ${formData.Qualification_Evidence.trim()}`,
          formData.Supporting_Links.trim() ? `Supporting links: ${formData.Supporting_Links.trim()}` : "",
        ].filter(Boolean).join("\n\n"),
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
        submissionStarted.current = false;
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
      submissionStarted.current = false;
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
        ...(formData.Applicant_Type === "Organization" ? [{ label: "Organization Name", value: formData.Organization_Name }] : []),
        { label: "Email", value: formData.Email },
        { label: "Phone / WhatsApp", value: formData.Phone },
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
      rows: [
        { label: "Opportunity Access", value: formData.Opportunity_Access.join(", ") },
        { label: "Relationship to Potential Opportunities", value: formData.Relationship_To_Opportunities.join(", ") },
      ],
    },
    {
      title: "Qualification Evidence",
      stepIndex: 3,
      rows: [
        { label: "Examples / Qualification Evidence", value: formData.Qualification_Evidence },
        { label: "Supporting links", value: formData.Supporting_Links },
      ],
    },
  ];

  return (
    <LeadFormShell
      eyebrow="NAIROBIX · OPPORTUNITIES NETWORK"
      title="Opportunity Network Application"
      description="A managed network for trusted individuals and organizations who can contribute expertise, services, collaboration or relevant business opportunities. Apply to be considered; every application is reviewed and submission does not mean approval."
      aside={<FormContext steps={[
        "NairobiX reviews your application.",
        "Your contribution and fit are assessed.",
        "Qualified applicants proceed to Participant onboarding.",
        "Approved Participants receive Opportunity Network access.",
      ]} note="Submitting an application does not create a Participant account or grant portal access." />}
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
                  <SectionHeader number="01" title="About you" description="Start with the best way to identify and reach you." />
                  <div className="grid gap-5 md:grid-cols-2">
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
                    <FormInput label="First Name" name="First_Name" value={formData.First_Name} onChange={handleTextChange} required error={errors.First_Name} autoComplete="given-name" />
                    <FormInput label="Last Name" name="Last_Name" value={formData.Last_Name} onChange={handleTextChange} required error={errors.Last_Name} autoComplete="family-name" />
                    {formData.Applicant_Type === "Organization" && <div className="md:col-span-2"><FormInput label="Organization Name" name="Organization_Name" value={formData.Organization_Name} onChange={handleTextChange} required error={errors.Organization_Name} autoComplete="organization" /></div>}
                    <FormInput label="Email" name="Email" type="email" value={formData.Email} onChange={handleTextChange} required error={errors.Email} autoComplete="email" />
                    <FormInput label="Phone / WhatsApp" name="Phone" type="tel" value={formData.Phone} onChange={handleTextChange} required error={errors.Phone} autoComplete="tel" />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <SectionHeader number="02" title="Contribution" description="Where could your experience and capabilities strengthen the Network? Select all that apply." />
                  <MultiChoiceCards
                    label="Contribution Areas"
                    name="Contribution_Areas"
                    options={contributionAreaOptions}
                    selected={formData.Contribution_Areas}
                    onToggle={(value) => toggleMulti("Contribution_Areas", value)}
                    error={errors.Contribution_Areas}
                    required
                  />
                </div>
              )}

              {step === 2 && (
                <div>
                  <SectionHeader number="03" title="Opportunity access" description="Tell us who you can reach and how you are connected. Select all that apply." />
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
                  <div className="mt-8 border-t border-white/10 pt-8">
                    <MultiChoiceCards
                      label="Relationship to Potential Opportunities"
                      name="Relationship_To_Opportunities"
                      options={relationshipOptions}
                      selected={formData.Relationship_To_Opportunities}
                      onToggle={(value) => toggleMulti("Relationship_To_Opportunities", value)}
                      error={errors.Relationship_To_Opportunities}
                      required
                      columns={2}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <SectionHeader number="04" title="Qualification evidence" description="Share concise examples that demonstrate your experience, relationships or ability to contribute." />
                  <FormTextarea
                    label="Examples / Qualification Evidence"
                    name="Qualification_Evidence"
                    value={formData.Qualification_Evidence}
                    onChange={(event) => {
                      setFormData((prev) => ({ ...prev, Qualification_Evidence: event.target.value }));
                      setErrors((prev) => ({ ...prev, Qualification_Evidence: "" }));
                    }}
                    required
                    error={errors.Qualification_Evidence}
                    placeholder="Relevant work, outcomes, services or examples of the opportunities you can support"
                  />
                  <div className="mt-6">
                    <FormTextarea
                      label="Supporting links"
                      name="Supporting_Links"
                      value={formData.Supporting_Links}
                      onChange={(event) => {
                        setFormData((prev) => ({ ...prev, Supporting_Links: event.target.value }));
                        setErrors((prev) => ({ ...prev, Supporting_Links: "" }));
                      }}
                      rows={3}
                      helperText="Optional. Add one link per line."
                      error={errors.Supporting_Links}
                      placeholder="https://your-portfolio.example"
                    />
                  </div>
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
