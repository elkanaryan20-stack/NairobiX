// Business Growth Assessment — content model, branching and CRM mapping.
//
// The Zoho contract is unchanged: the form still submits exactly the fields
// lib/leads.ts validates and maps (same names, same exact picklist values —
// Growth_Goal and Current_Marketing_Channels must match Zoho's configured
// options character-for-character, and Nia's chat tool submits the same
// form type with the same lists).
//
// Every question maps to a Zoho Lead field. Questions with no CRM field are
// not asked (rather than folded into free text); where growth gets stuck
// plus the visitor's own words is composed into Business_Challenge.
//
// Question → CRM mapping (purpose: Q = qualification, C = consultation prep,
// R = reporting/segmentation):
//
//   Growth priority ............ Growth_Goal (picklist)              Q C R  required
//   Where growth gets stuck .... Business_Challenge (text)            Q C    required
//   How customers find you ..... Current_Marketing_Channels (multi)   Q C R  required
//   Company / Industry / Website / City / Country ... same-named fields  required (Website optional)
//   Timeline ................... Desired_Timeline (picklist)          Q      required
//   Investment readiness ....... Investment_Readiness (picklist)      Q      required
//   Trial ad budget (branch) ... Trial_Advertisement_Budget_Readiness Q      optional
//   Anything else .............. Description (visitor text)           C    optional
//   Contact .................... First_Name / Last_Name / Email / Phone      required

import type { ChoiceOption } from "@/components/forms/ChoiceCard";

// ── Growth priority (Growth_Goal) ───────────────────────────────────────
// Values are the existing Zoho picklist values, unchanged; only the
// descriptions are new.
export const GROWTH_PRIORITY_OPTIONS: ChoiceOption[] = [
  { value: "Generate more qualified leads", label: "Generate more qualified leads", description: "More of the right enquiries." },
  { value: "Increase sales and revenue", label: "Increase sales and revenue", description: "Turn more interest into revenue." },
  { value: "Attract more customers", label: "Attract more customers", description: "Reach and win new customers." },
  { value: "Improve online visibility", label: "Improve online visibility", description: "Be found where customers look." },
  { value: "Improve customer follow-up", label: "Improve customer follow-up", description: "Respond faster and more consistently." },
  { value: "Improve customer retention", label: "Improve customer retention", description: "Keep customers coming back." },
  { value: "Automate repetitive processes", label: "Automate repetitive processes", description: "Less manual, repeated work." },
  { value: "Improve digital presence", label: "Improve digital presence", description: "A stronger website and online experience." },
  {
    value: "Build better sales and growth systems",
    label: "Build better sales and growth systems",
    description: "Connect how leads, sales and customers are managed.",
  },
  { value: "I need guidance", label: "I'm not sure yet", description: "Help me identify where to focus." },
];

// ── Where growth gets stuck (Business_Challenge) ────────────────────────
// One option per stage of the NairobiX growth system, phrased as what the
// business experiences — never as a judgement.
export const STUCK_OPTIONS: ChoiceOption[] = [
  { value: "Attract", label: "Not enough of the right people find us", description: "Attract" },
  { value: "Capture", label: "Enquiries come in but aren't captured consistently", description: "Capture" },
  { value: "Qualify", label: "It's hard to tell which enquiries are serious", description: "Qualify" },
  { value: "Nurture", label: "Follow-up is slow or inconsistent", description: "Nurture" },
  { value: "Convert", label: "Interest doesn't turn into sales often enough", description: "Convert" },
  { value: "Deliver", label: "Delivery and customer handling takes a lot of manual work", description: "Deliver" },
  { value: "Retain", label: "Customers don't come back or refer others as often as we'd like", description: "Retain" },
  { value: "Measure", label: "We can't clearly see what's working", description: "Measure" },
];

// ── How customers find the business (Current_Marketing_Channels) ────────
// Values are exactly Zoho's MARKETING_CHANNEL_OPTIONS; only the labels are
// friendlier.
export const NONE_CURRENTLY = "None currently";
export const DISCOVERY_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "WhatsApp Business", label: "WhatsApp" },
  { value: "Facebook / Instagram", label: "Facebook / Instagram" },
  { value: "Google Business Profile", label: "Google Business Profile" },
  { value: "SEO", label: "Google search (SEO)" },
  { value: "Website", label: "Our website" },
  { value: "Paid Advertising", label: "Paid advertising" },
  { value: "Email Marketing", label: "Email marketing" },
  { value: NONE_CURRENTLY, label: "No active marketing yet" },
];

// ── State ───────────────────────────────────────────────────────────────
export const initialAssessment = {
  // Zoho fields
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
  Desired_Timeline: "",
  Investment_Readiness: "",
  Trial_Advertisement_Budget_Readiness: "",
  // Composed into Business_Challenge / Current_Marketing_Channels / Description
  stuckAreas: [] as string[],
  challengeNote: "",
  discovery: [] as string[],
  context: "",
};

export type Assessment = typeof initialAssessment;

// ── Branching ───────────────────────────────────────────────────────────
/** A trial ad budget only makes sense once there is openness to investing. */
export const showsTrialBudget = (a: Assessment) =>
  Boolean(a.Investment_Readiness) && a.Investment_Readiness !== "Not ready to invest";

// ── Screens and stages ──────────────────────────────────────────────────
// Diagnostic first, contact details last: engaging questions build
// commitment before the most personal step, and the assessment reads as
// NairobiX understanding the business rather than collecting details. The
// order is this array — reorder here if the funnel ever needs to.
export const STAGES = ["Growth", "Marketing", "Business", "Priorities", "About you"] as const;

export type ScreenId = "priority" | "stuck" | "reach" | "business" | "priorities" | "contact";

export const SCREENS: Array<{ id: ScreenId; stage: number; part?: string; title: string; why: string }> = [
  {
    id: "priority",
    stage: 0,
    part: "1 of 2",
    title: "What would make the biggest difference to your business right now?",
    why: "This helps us understand where to focus the assessment.",
  },
  {
    id: "stuck",
    stage: 0,
    part: "2 of 2",
    title: "Where is growth getting stuck?",
    why: "Choose the ones that sound familiar. Most businesses pick two or three.",
  },
  {
    id: "reach",
    stage: 1,
    title: "How do customers find you?",
    why: "This helps us understand how opportunities enter the business.",
  },
  {
    id: "business",
    stage: 2,
    title: "Tell us about the business.",
    why: "So the review reflects your industry and market.",
  },
  {
    id: "priorities",
    stage: 3,
    title: "What should the next step look like?",
    why: "This helps us suggest a next step that fits your timing.",
  },
  {
    id: "contact",
    stage: 4,
    title: "Where should we send your next step?",
    why: "Last step. We use these details only to follow up on this assessment.",
  },
];

// ── Validation — human messages ─────────────────────────────────────────
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+()\d\s-]{7,20}$/;
const URL = /^https?:\/\/.+/i;

export function validateScreen(id: ScreenId, a: Assessment): Record<string, string> {
  const e: Record<string, string> = {};
  switch (id) {
    case "priority":
      if (!a.Growth_Goal) e.Growth_Goal = "Choose the one that matters most right now — you can change it later.";
      break;
    case "stuck":
      if (a.stuckAreas.length === 0) e.stuckAreas = "Choose at least one that sounds familiar.";
      break;
    case "reach":
      if (a.discovery.length === 0) e.discovery = "Choose how customers currently find you — pick all that apply.";
      break;
    case "business":
      if (!a.Company.trim()) e.Company = "Please enter your business name.";
      if (!a.Industry) e.Industry = "Choose the closest industry.";
      if (a.Website.trim() && !URL.test(a.Website.trim())) e.Website = "Please include http:// or https:// — or leave this blank.";
      if (!a.City.trim()) e.City = "Please enter the city you operate from.";
      if (!a.Country.trim()) e.Country = "Please enter your country.";
      break;
    case "priorities":
      if (!a.Desired_Timeline) e.Desired_Timeline = "Choose the closest timing.";
      if (!a.Investment_Readiness) e.Investment_Readiness = "Choose the closest description.";
      break;
    case "contact":
      if (!a.First_Name.trim()) e.First_Name = "Please enter your first name.";
      if (!a.Last_Name.trim()) e.Last_Name = "Please enter your last name.";
      if (!a.Email.trim()) e.Email = "We need your email so we can follow up with your assessment.";
      else if (!EMAIL.test(a.Email.trim())) e.Email = "That email doesn't look quite right — please check it.";
      if (!a.Phone.trim()) e.Phone = "Please add a phone or WhatsApp number we can reach you on.";
      else if (!PHONE.test(a.Phone.trim())) e.Phone = "Please check the number — digits, spaces, + and - only.";
      break;
  }
  return e;
}

// ── Composition into the existing Zoho contract ─────────────────────────
const stuckLabel = (v: string) => STUCK_OPTIONS.find((o) => o.value === v)?.label ?? v;
export const discoveryLabel = (v: string) => DISCOVERY_OPTIONS.find((o) => o.value === v)?.label ?? v;
export const priorityLabel = (v: string) => GROWTH_PRIORITY_OPTIONS.find((o) => o.value === v)?.label ?? v;

export function businessChallengeText(a: Assessment): string {
  const areas = a.stuckAreas.map((s) => `${s} — ${stuckLabel(s)}`).join("; ");
  const note = a.challengeNote.trim();
  return note ? `Growth gets stuck at: ${areas}.\n\nIn their words: ${note}` : `Growth gets stuck at: ${areas}.`;
}

/**
 * The /api/leads payload for formType "business-growth-audit" — exactly the
 * fields lib/leads.ts already validates and maps. A branch answer that no
 * longer applies (the trial budget, if investment readiness changed) is
 * left out.
 */
export function toLeadPayload(a: Assessment) {
  return {
    First_Name: a.First_Name.trim(),
    Last_Name: a.Last_Name.trim(),
    Email: a.Email.trim(),
    Phone: a.Phone.trim(),
    Company: a.Company.trim(),
    Industry: a.Industry,
    Website: a.Website.trim(),
    City: a.City.trim(),
    Country: a.Country.trim(),
    Growth_Goal: a.Growth_Goal,
    Business_Challenge: businessChallengeText(a),
    Current_Marketing_Channels: a.discovery,
    Desired_Timeline: a.Desired_Timeline,
    Investment_Readiness: a.Investment_Readiness,
    Trial_Advertisement_Budget_Readiness: showsTrialBudget(a) ? a.Trial_Advertisement_Budget_Readiness : "",
    Description: a.context.trim(),
  };
}
