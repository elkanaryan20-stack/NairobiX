"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { FormInput, FormTextarea } from "@/components/forms/FormField";
import { ChipSelect, MultiChoiceCards, SegmentedControl, SingleChoiceCards } from "@/components/forms/ChoiceCard";
import { ReviewSummary } from "@/components/forms/ReviewSummary";
import type { ReviewSection } from "@/components/forms/ReviewSummary";
import { ErrorBanner } from "@/components/forms/LeadFormShell";
import { AssessmentSubmissionTransition } from "@/components/forms/AssessmentSubmissionTransition";
import { AssessmentReceived } from "@/components/forms/AssessmentReceived";
import { Button } from "@/components/ui/Button";
import { formTrackingPayload, newEventId, trackEvent, trackOnce } from "@/lib/analytics";
import { getLeadSource } from "@/lib/attribution";
import { wait, prefersReducedMotion } from "@/lib/motion";
import {
  BUDGET_READINESS_OPTIONS,
  INDUSTRY_OPTIONS,
  INVESTMENT_READINESS_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/forms/options";
import {
  BUSINESS_STAGE_OPTIONS,
  CRM_USAGE_OPTIONS,
  DISCOVERY_OPTIONS,
  ENQUIRY_CHANNEL_OPTIONS,
  FOLLOW_UP_OPTIONS,
  GROWTH_PRIORITY_OPTIONS,
  MONTHLY_ENQUIRY_OPTIONS,
  NONE_CURRENTLY,
  REFERRALS,
  REPETITIVE_WORK_OPTIONS,
  REPORTING_OPTIONS,
  SCREENS,
  STAGES,
  STUCK_OPTIONS,
  TRACKING_OPTIONS,
  diagnosticRows,
  initialAssessment,
  priorityLabel,
  showsCrmUsage,
  showsFollowUp,
  showsRepetitiveWork,
  showsTrialBudget,
  toLeadPayload,
  validateScreen,
} from "@/lib/forms/assessment";
import type { Assessment, ScreenId } from "@/lib/forms/assessment";

const STORAGE_KEY = "nairobix:growth-assessment:v2";
const REVIEW = SCREENS.length; // index of the review screen, after the last question screen

type Phase = "form" | "submitting" | "transition" | "success";
type ArrayField = "stuckAreas" | "discovery" | "enquiryChannels" | "repetitiveWork";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The Business Growth Assessment — a short diagnostic conversation rather
 * than a contact form. One meaningful group per screen, five named stages,
 * back navigation that never loses answers, lightweight branching for
 * relevance, and a review before submitting. Content, branching and the
 * CRM mapping live in lib/forms/assessment.ts; the submission contract with
 * /api/leads (and Zoho behind it) is unchanged.
 */
export function BusinessGrowthAuditForm() {
  const [screen, setScreen] = useState(0);
  const [data, setData] = useState<Assessment>(initialAssessment);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [phase, setPhase] = useState<Phase>("form");
  const [restored, setRestored] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const hasNavigated = useRef(false);

  // Restore an in-progress assessment from this browser session. Scheduled
  // after mount (not read during render) so server and client render the
  // same first screen; cancelled on cleanup so StrictMode's double-invoke
  // restores once.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as { data?: Partial<Assessment>; screen?: number };
          if (parsed.data) setData({ ...initialAssessment, ...parsed.data });
          if (typeof parsed.screen === "number" && parsed.screen > 0 && parsed.screen <= REVIEW) setScreen(parsed.screen);
        }
      } catch {
        // Storage unavailable (private mode etc.) — start fresh.
      }
      setRestored(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!restored || phase === "success") return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ data, screen }));
    } catch {
      // Non-essential.
    }
  }, [data, screen, restored, phase]);

  // On every screen change after the first: bring the question into view
  // and move focus to it, so keyboard and screen-reader users land on the
  // new question rather than a stale button.
  useEffect(() => {
    if (!hasNavigated.current) return;
    topRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    headingRef.current?.focus({ preventScroll: true });
  }, [screen]);

  const set = <K extends keyof Assessment>(field: K, value: Assessment[K]) => {
    trackOnce("assessment_start", { form_type: "business_growth_audit" });
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field as string] ? { ...prev, [field]: "" } : prev));
  };

  const onInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    set(event.target.name as keyof Assessment, event.target.value as never);

  const toggle = (field: ArrayField, value: string) => {
    trackOnce("assessment_start", { form_type: "business_growth_audit" });
    setData((prev) => {
      const current = prev[field];
      let next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      if (field === "discovery") {
        // "No active marketing yet" can sit alongside referrals, but not
        // alongside an active channel (mirrors the server's rule).
        if (value === NONE_CURRENTLY && next.includes(NONE_CURRENTLY)) next = next.filter((v) => v === NONE_CURRENTLY || v === REFERRALS);
        else if (value !== NONE_CURRENTLY && value !== REFERRALS) next = next.filter((v) => v !== NONE_CURRENTLY);
      }
      return { ...prev, [field]: next };
    });
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  };

  const go = (target: number) => {
    hasNavigated.current = true;
    setSubmitError("");
    setScreen(target);
  };

  const next = () => {
    const found = validateScreen(SCREENS[screen].id, data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Take the visitor to the first thing that needs attention.
      requestAnimationFrame(() => {
        const first = document.querySelector<HTMLElement>("[aria-invalid='true'], [data-has-error='true']");
        first?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
        if (first instanceof HTMLInputElement || first instanceof HTMLTextAreaElement) first.focus({ preventScroll: true });
      });
      return;
    }
    go(screen + 1);
  };

  const back = () => go(Math.max(0, screen - 1));

  const handleSubmit = async () => {
    const eventId = newEventId();
    // Defensive: re-check every screen before sending.
    for (let i = 0; i < SCREENS.length; i++) {
      const found = validateScreen(SCREENS[i].id, data);
      if (Object.keys(found).length > 0) {
        setErrors(found);
        go(i);
        return;
      }
    }

    setSubmitError("");
    setPhase("submitting");
    const reduceMotion = prefersReducedMotion();

    // The real request starts immediately; the transition only ever waits
    // on it, never simulates work.
    const submission = fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "business-growth-audit",
        ...toLeadPayload(data),
        Marketing_Channel: getLeadSource(),
        ...formTrackingPayload(eventId),
      }),
    }).then(async (response) => ({ ok: response.ok, payload: await response.json() }));

    await wait(reduceMotion ? 0 : 450);
    setPhase("transition");
    const start = Date.now();

    try {
      const { ok, payload } = await submission;
      if (!ok || !payload.success) {
        setSubmitError(payload.error || "We couldn't submit your assessment right now. Your answers are still here — please try again.");
        setPhase("form");
        return;
      }
      const elapsed = Date.now() - start;
      const minTransitionMs = reduceMotion ? 0 : 900;
      if (elapsed < minTransitionMs) await wait(minTransitionMs - elapsed);

      trackEvent(
        "assessment_complete",
        { form_type: "business_growth_audit", growth_priority: data.Growth_Goal, timeline: data.Desired_Timeline },
        { eventId, userData: { email: data.Email, phone: data.Phone } },
      );
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // Non-essential.
      }
      setPhase("success");
    } catch (error) {
      console.error("Assessment submission failed", error);
      setSubmitError("We couldn't submit your assessment right now. Your answers are still here — please try again.");
      setPhase("form");
    }
  };

  if (phase === "success") {
    return (
      <AssessmentReceived
        firstName={data.First_Name}
        companyName={data.Company}
        email={data.Email}
        priority={data.Growth_Goal}
        timeline={data.Desired_Timeline}
      />
    );
  }

  const isReview = screen === REVIEW;
  const current = isReview ? null : SCREENS[screen];
  const stageIndex = isReview ? STAGES.length : current!.stage;
  const locked = phase === "submitting";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-28 lg:pt-16">
      <Intro />
      <div className="mt-10 border-t border-white/10 pt-10 lg:mt-12 lg:pt-12">
    <div ref={topRef} className="scroll-mt-24 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
      <StageRail stageIndex={stageIndex} />

      <div className="min-w-0">
        <StageBar stageIndex={stageIndex} />
        <p aria-live="polite" className="sr-only">
          {isReview ? "Review your answers" : `Stage ${stageIndex + 1} of ${STAGES.length}: ${STAGES[stageIndex]}`}
        </p>

        {phase === "transition" ? (
          <AssessmentSubmissionTransition />
        ) : (
          <div key={screen} className="animate-step-fade">
            <div className="mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-primary)]">
                {isReview ? "Review" : `Stage ${pad(stageIndex + 1)} · ${STAGES[stageIndex]}${current!.part ? ` · ${current!.part}` : ""}`}
              </p>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="mt-4 font-display text-2xl font-medium leading-snug tracking-tight text-white focus:outline-none sm:text-[2rem]"
              >
                {isReview ? "Your assessment" : current!.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--text-tertiary)]">
                {isReview
                  ? "Check your answers before sending. Your responses help NairobiX identify the areas worth reviewing."
                  : current!.why}
              </p>
            </div>

            {submitError ? <ErrorBanner message={submitError} /> : null}

            <fieldset disabled={locked} className="m-0 min-w-0 space-y-9 border-0 p-0">
              {isReview ? (
                <ReviewSummary sections={reviewSections(data)} onEdit={(index) => go(index)} />
              ) : (
                <Screen id={current!.id} data={data} errors={errors} set={set} toggle={toggle} onInput={onInput} />
              )}
            </fieldset>

            <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              {screen > 0 ? (
                <button
                  type="button"
                  onClick={back}
                  disabled={locked}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-white disabled:opacity-50"
                >
                  <span aria-hidden="true">←</span> Back
                </button>
              ) : (
                <p className="text-xs leading-5 text-[var(--text-tertiary)]">About 4 minutes · No obligation</p>
              )}

              {isReview ? (
                <Button key="submit" type="button" onClick={handleSubmit} disabled={locked} variant="primary">
                  {locked ? "Submitting…" : "Submit assessment →"}
                </Button>
              ) : (
                <Button key="continue" type="button" onClick={next} variant="primary">
                  {screen === REVIEW - 1 ? "Review answers →" : "Continue →"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
      </div>
    </div>
  );
}

/** What a cold visitor needs before starting: what, why, effort, what next. */
function Intro() {
  return (
    <div className="max-w-2xl lg:ml-[calc(220px+4rem)]">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">Business Growth Assessment</p>
      <h1 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
        Let&apos;s understand how your business grows.
      </h1>
      <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
        A short diagnostic of how your business attracts, converts and serves customers — so NairobiX can identify
        what&apos;s worth reviewing and the most practical next step.
      </p>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
        <li>About 4 minutes</li>
        <li>Five short stages</li>
        <li>No obligation</li>
        <li>Reviewed by the NairobiX team</li>
      </ul>
    </div>
  );
}

// ── Screens ─────────────────────────────────────────────────────────────

type ScreenProps = {
  id: ScreenId;
  data: Assessment;
  errors: Record<string, string>;
  set: <K extends keyof Assessment>(field: K, value: Assessment[K]) => void;
  toggle: (field: ArrayField, value: string) => void;
  onInput: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function Screen({ id, data, errors, set, toggle, onInput }: ScreenProps) {
  const errorFlag = (field: string) => ({ "data-has-error": errors[field] ? "true" : undefined });

  switch (id) {
    case "priority":
      return (
        <div {...errorFlag("Growth_Goal")}>
          <SingleChoiceCards
            label="Choose the one that matters most"
            name="Growth_Goal"
            options={GROWTH_PRIORITY_OPTIONS}
            value={data.Growth_Goal}
            onSelect={(v) => set("Growth_Goal", v)}
            error={errors.Growth_Goal}
          />
        </div>
      );

    case "stuck":
      return (
        <>
          <div {...errorFlag("stuckAreas")}>
            <MultiChoiceCards
              label="Select all that apply"
              name="stuckAreas"
              options={STUCK_OPTIONS}
              selected={data.stuckAreas}
              onToggle={(v) => toggle("stuckAreas", v)}
              error={errors.stuckAreas}
            />
          </div>
          <FormTextarea
            label="Anything you'd add in your own words? (optional)"
            name="challengeNote"
            value={data.challengeNote}
            onChange={onInput}
            rows={3}
            placeholder="e.g. We get plenty of WhatsApp enquiries, but many never hear back."
          />
        </>
      );

    case "reach":
      return (
        <>
          <div {...errorFlag("discovery")}>
            <ChipSelect
              label="How do customers currently find the business?"
              name="discovery"
              options={DISCOVERY_OPTIONS}
              selected={data.discovery}
              onToggle={(v) => toggle("discovery", v)}
              error={errors.discovery}
              helperText="Select all that apply."
            />
          </div>
          <div {...errorFlag("enquiryChannels")}>
            <ChipSelect
              label="Where do enquiries usually arrive?"
              name="enquiryChannels"
              options={ENQUIRY_CHANNEL_OPTIONS}
              selected={data.enquiryChannels}
              onToggle={(v) => toggle("enquiryChannels", v)}
              error={errors.enquiryChannels}
              helperText="Select all that apply."
            />
          </div>
          <div {...errorFlag("monthlyEnquiries")}>
            <SegmentedControl
              label="Roughly how many new enquiries do you get in a typical month?"
              name="monthlyEnquiries"
              options={MONTHLY_ENQUIRY_OPTIONS}
              value={data.monthlyEnquiries}
              onSelect={(v) => set("monthlyEnquiries", v)}
              error={errors.monthlyEnquiries}
            />
          </div>
        </>
      );

    case "operate":
      return (
        <>
          <div {...errorFlag("tracking")}>
            <SingleChoiceCards
              label="How does your team keep track of prospects and customers?"
              name="tracking"
              options={TRACKING_OPTIONS}
              value={data.tracking}
              onSelect={(v) => set("tracking", v)}
              error={errors.tracking}
            />
          </div>
          {showsCrmUsage(data) ? (
            <div {...errorFlag("crmUsage")} className="animate-step-fade">
              <SegmentedControl
                label="How much of your sales process runs through it?"
                name="crmUsage"
                options={CRM_USAGE_OPTIONS}
                value={data.crmUsage}
                onSelect={(v) => set("crmUsage", v)}
                error={errors.crmUsage}
              />
            </div>
          ) : null}
          {showsFollowUp(data) ? (
            <div {...errorFlag("followUp")}>
              <SingleChoiceCards
                label="What usually happens after someone makes an enquiry?"
                name="followUp"
                options={FOLLOW_UP_OPTIONS}
                value={data.followUp}
                onSelect={(v) => set("followUp", v)}
                error={errors.followUp}
              />
            </div>
          ) : null}
          {showsRepetitiveWork(data) ? (
            <div {...errorFlag("repetitiveWork")}>
              <ChipSelect
                label="Where does your team spend the most repetitive time?"
                name="repetitiveWork"
                options={REPETITIVE_WORK_OPTIONS}
                selected={data.repetitiveWork}
                onToggle={(v) => toggle("repetitiveWork", v)}
                error={errors.repetitiveWork}
                helperText="Select all that apply."
              />
            </div>
          ) : null}
          <div {...errorFlag("reporting")}>
            <SingleChoiceCards
              label="How does the business know what's working?"
              name="reporting"
              options={REPORTING_OPTIONS}
              value={data.reporting}
              onSelect={(v) => set("reporting", v)}
              error={errors.reporting}
            />
          </div>
        </>
      );

    case "business":
      return (
        <>
          <FormInput
            label="Business name"
            name="Company"
            value={data.Company}
            onChange={onInput}
            required
            autoComplete="organization"
            error={errors.Company}
          />
          <div {...errorFlag("Industry")}>
            <SingleChoiceCards
              label="Industry"
              name="Industry"
              options={INDUSTRY_OPTIONS}
              value={data.Industry}
              onSelect={(v) => set("Industry", v)}
              required
              error={errors.Industry}
              columns={3}
            />
          </div>
          <div {...errorFlag("businessStage")}>
            <SegmentedControl
              label="Where is the business today?"
              name="businessStage"
              options={BUSINESS_STAGE_OPTIONS}
              value={data.businessStage}
              onSelect={(v) => set("businessStage", v)}
              required
              error={errors.businessStage}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormInput
              label="City"
              name="City"
              value={data.City}
              onChange={onInput}
              required
              autoComplete="address-level2"
              error={errors.City}
            />
            <FormInput
              label="Country"
              name="Country"
              value={data.Country}
              onChange={onInput}
              required
              autoComplete="country-name"
              error={errors.Country}
            />
          </div>
          <FormInput
            label="Website (optional)"
            name="Website"
            type="url"
            inputMode="url"
            value={data.Website}
            onChange={onInput}
            placeholder="https://"
            autoComplete="url"
            error={errors.Website}
          />
        </>
      );

    case "priorities":
      return (
        <>
          <div {...errorFlag("Desired_Timeline")}>
            <SegmentedControl
              label="When would you like to start improving this?"
              name="Desired_Timeline"
              options={TIMELINE_OPTIONS}
              value={data.Desired_Timeline}
              onSelect={(v) => set("Desired_Timeline", v)}
              required
              error={errors.Desired_Timeline}
            />
          </div>
          <div {...errorFlag("Investment_Readiness")}>
            <SingleChoiceCards
              label="Which best describes where you are on investing in growth?"
              name="Investment_Readiness"
              options={INVESTMENT_READINESS_OPTIONS}
              value={data.Investment_Readiness}
              onSelect={(v) => set("Investment_Readiness", v)}
              required
              error={errors.Investment_Readiness}
            />
          </div>
          {showsTrialBudget(data) ? (
            <SegmentedControl
              label="Would you consider a small trial advertising budget? (optional)"
              name="Trial_Advertisement_Budget_Readiness"
              options={BUDGET_READINESS_OPTIONS}
              value={data.Trial_Advertisement_Budget_Readiness}
              onSelect={(v) => set("Trial_Advertisement_Budget_Readiness", v)}
            />
          ) : null}
          <FormTextarea
            label="What should NairobiX understand before reviewing your business? (optional)"
            name="context"
            value={data.context}
            onChange={onInput}
            rows={4}
            placeholder="Anything about your goals, customers or current setup that would help."
          />
        </>
      );

    case "contact":
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label="First name" name="First_Name" value={data.First_Name} onChange={onInput} required autoComplete="given-name" error={errors.First_Name} />
          <FormInput label="Last name" name="Last_Name" value={data.Last_Name} onChange={onInput} required autoComplete="family-name" error={errors.Last_Name} />
          <FormInput
            label="Email"
            name="Email"
            type="email"
            inputMode="email"
            value={data.Email}
            onChange={onInput}
            placeholder="you@business.com"
            required
            autoComplete="email"
            error={errors.Email}
          />
          <FormInput
            label="Phone / WhatsApp"
            name="Phone"
            type="tel"
            inputMode="tel"
            value={data.Phone}
            onChange={onInput}
            placeholder="+254…"
            required
            autoComplete="tel"
            error={errors.Phone}
          />
        </div>
      );
  }
}

// ── Review ──────────────────────────────────────────────────────────────

function reviewSections(a: Assessment): ReviewSection[] {
  const screenIndex = (id: ScreenId) => SCREENS.findIndex((s) => s.id === id);
  const rows = diagnosticRows(a);
  const pick = (labels: string[]) => rows.filter((r) => labels.includes(r.label));
  return [
    {
      title: "Growth",
      stepIndex: screenIndex("priority"),
      rows: [
        { label: "Primary priority", value: priorityLabel(a.Growth_Goal) },
        { label: "Where growth gets stuck", value: a.stuckAreas.map((s) => STUCK_OPTIONS.find((o) => o.value === s)?.label ?? s).join("; ") },
      ],
    },
    {
      title: "Systems",
      stepIndex: screenIndex("reach"),
      rows: pick([
        "Customers find the business through",
        "Enquiries arrive via",
        "New enquiries per month",
        "Prospects and customers are tracked in",
        "Sales process run through the CRM",
        "After an enquiry",
        "Repetitive work",
        "Knows what's working through",
      ]),
    },
    {
      title: "Business",
      stepIndex: screenIndex("business"),
      rows: [
        { label: "Business", value: a.Company },
        { label: "Industry", value: a.Industry },
        { label: "Stage", value: a.businessStage },
        { label: "Location", value: [a.City, a.Country].filter(Boolean).join(", ") },
        { label: "Website", value: a.Website },
      ],
    },
    {
      title: "Priorities",
      stepIndex: screenIndex("priorities"),
      rows: [
        { label: "Timing", value: a.Desired_Timeline },
        { label: "Investment", value: a.Investment_Readiness },
        ...(showsTrialBudget(a) && a.Trial_Advertisement_Budget_Readiness
          ? [{ label: "Trial advertising budget", value: a.Trial_Advertisement_Budget_Readiness }]
          : []),
        { label: "Context", value: a.context },
      ],
    },
    {
      title: "About you",
      stepIndex: screenIndex("contact"),
      rows: [
        { label: "Name", value: [a.First_Name, a.Last_Name].filter(Boolean).join(" ") },
        { label: "Email", value: a.Email },
        { label: "Phone", value: a.Phone },
      ],
    },
  ];
}

// ── Progress ────────────────────────────────────────────────────────────

/** Desktop: the five named stages as a quiet vertical system line. */
function StageRail({ stageIndex }: { stageIndex: number }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Your assessment</p>
        <ol aria-label="Assessment progress" className="relative mt-6">
          <span aria-hidden="true" className="absolute bottom-3 left-[3.5px] top-3 w-px bg-white/12" />
          {STAGES.map((stage, index) => {
            const done = index < stageIndex;
            const active = index === stageIndex;
            return (
              <li key={stage} aria-current={active ? "step" : undefined} className="relative flex items-center gap-4 py-2.5">
                <span
                  aria-hidden="true"
                  className={`relative z-10 h-2 w-2 flex-none rounded-full border ${
                    active
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                      : done
                        ? "border-[var(--color-primary)]/60 bg-[var(--section-bg)]"
                        : "border-white/30 bg-[var(--section-bg)]"
                  }`}
                />
                <span className={`font-mono text-[10px] tracking-[0.2em] ${active ? "text-[var(--color-primary)]" : "text-white/35"}`}>
                  {pad(index + 1)}
                </span>
                <span
                  className={`text-sm transition-colors duration-300 ${
                    active ? "font-semibold text-white" : done ? "text-white/45" : "text-white/60"
                  }`}
                >
                  {stage}
                  {done ? <span className="sr-only"> (completed)</span> : null}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs leading-6 text-[var(--text-tertiary)]">
          <p className="text-white/70">About 4 minutes</p>
          <p>Five short stages. Go back at any time — nothing is lost.</p>
          <p className="mt-4 text-white/70">After you submit</p>
          <p>NairobiX reviews your responses and comes back with clear priorities and a proposed next step.</p>
        </div>
      </div>
    </aside>
  );
}

/** Mobile and tablet: the same stages as a compact labelled bar. */
function StageBar({ stageIndex }: { stageIndex: number }) {
  return (
    <div className="mb-8 lg:hidden">
      <ol aria-label="Assessment progress" className="grid grid-cols-5 gap-1.5">
        {STAGES.map((stage, index) => {
          const done = index < stageIndex;
          const active = index === stageIndex;
          return (
            <li key={stage} aria-current={active ? "step" : undefined}>
              <span
                aria-hidden="true"
                className={`block h-[3px] rounded-full ${active ? "bg-[var(--color-primary)]" : done ? "bg-[var(--color-primary)]/45" : "bg-white/12"}`}
              />
              <span
                className={`mt-2 block truncate font-mono text-[10px] uppercase tracking-[0.06em] ${
                  active ? "text-white" : "text-white/40"
                }`}
              >
                {stage}
                {done ? <span className="sr-only"> (completed)</span> : null}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
