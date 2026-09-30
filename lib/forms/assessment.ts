// Business Growth Assessment — content model, branching and CRM mapping.
//
// The Zoho contract is unchanged: the form still submits exactly the fields
// lib/leads.ts validates and maps (same names, same exact picklist values —
// Growth_Goal and Current_Marketing_Channels must match Zoho's configured
// options character-for-character, and Nia's chat tool submits the same
// form type with the same lists).
//
// The diagnostic questions below have no dedicated Zoho fields, by design
// (no new CRM fields): their answers are composed into two existing
// free-text fields so the reviewer sees the whole diagnosis on the Lead:
//
//   Business_Challenge  ← where growth gets stuck + the visitor's own words
//   Description         ← the visitor's context + a labelled diagnostic block
//
// Question → CRM mapping (purpose: Q = qualification, C = consultation prep,
// R = reporting/segmentation):
//
//   Growth priority ............ Growth_Goal (picklist)              Q C R  required
//   Where growth gets stuck .... Business_Challenge (text)            Q C    required
//   How customers find you ..... Current_Marketing_Channels (multi)   Q C R  required
//   Where enquiries arrive ..... Description › diagnostic block         C    required
//   Monthly enquiries .......... Description › diagnostic block       Q C    required
//   Tracking prospects ......... Description › diagnostic block       Q C    required
//   CRM usage (if a CRM) ....... Description › diagnostic block         C    branch
//   After an enquiry ........... Description › diagnostic block         C    branch
//   Repetitive work ............ Description › diagnostic block         C    branch
//   Knowing what works ......... Description › diagnostic block         C    required
//   Business stage ............. Description › diagnostic block       Q   R  required
//   Company / Industry / Website / City / Country ... same-named fields  required (Website optional)
//   Timeline ................... Desired_Timeline (picklist)          Q      required
//   Investment readiness ....... Investment_Readiness (picklist)      Q      required
//   Trial ad budget (branch) ... Trial_Advertisement_Budget_Readiness Q      optional
//   Anything else .............. Description (visitor text, first)      C    optional
//   Contact .................... First_Name / Last_Name / Email / Phone      required

import type { ChoiceOption } from "@/components/forms/ChoiceCard";

// ── Growth priority (Growth_Goal) ───────────────────────────────────────
// Values are the existing Zoho picklist values, unchanged; only the
// descriptions are new. Each maps to a branch family used below.
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

type Family = "acquisition" | "conversion" | "retention" | "operations" | "guidance";

const PRIORITY_FAMILY: Record<string, Family> = {
  "Generate more qualified leads": "acquisition",
  "Attract more customers": "acquisition",
  "Improve online visibility": "acquisition",
  "Improve digital presence": "acquisition",
  "Increase sales and revenue": "conversion",
  "Improve customer follow-up": "conversion",
  "Build better sales and growth systems": "conversion",
  "Improve customer retention": "retention",
  "Automate repetitive processes": "operations",
  "I need guidance": "guidance",
};

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
// Zoho values are the existing MARKETING_CHANNEL_OPTIONS, unchanged. The
// labels are friendlier, and "Referrals & word of mouth" is added because it
// is how many Nairobi businesses actually grow — it is not a Zoho value, so
// it is recorded in the diagnostic block instead (see toLeadPayload).
export const REFERRALS = "Referrals & word of mouth";
export const NONE_CURRENTLY = "None currently";
export const DISCOVERY_OPTIONS: Array<{ value: string; label: string }> = [
  { value: REFERRALS, label: "Referrals & word of mouth" },
  { value: "WhatsApp Business", label: "WhatsApp" },
  { value: "Facebook / Instagram", label: "Facebook / Instagram" },
  { value: "Google Business Profile", label: "Google Business Profile" },
  { value: "SEO", label: "Google search (SEO)" },
  { value: "Website", label: "Our website" },
  { value: "Paid Advertising", label: "Paid advertising" },
  { value: "Email Marketing", label: "Email marketing" },
  { value: NONE_CURRENTLY, label: "No active marketing yet" },
];

export const ENQUIRY_CHANNEL_OPTIONS = [
  "WhatsApp",
  "Phone calls",
  "Website forms",
  "Social media messages",
  "Email",
  "Walk-ins / in person",
];

export const MONTHLY_ENQUIRY_OPTIONS = ["Fewer than 20", "20–100", "100–500", "500+", "Not sure"];

export const TRACKING_OPTIONS: ChoiceOption[] = [
  { value: "A CRM system", label: "A CRM system", description: "Software built to track customers and sales conversations." },
  { value: "Spreadsheets", label: "Spreadsheets" },
  { value: "WhatsApp chats and phone contacts", label: "WhatsApp chats and phone contacts" },
  { value: "Notebooks or memory", label: "Notebooks or memory" },
  { value: "A mix of these", label: "A mix of these" },
];

export const CRM_USAGE_OPTIONS = ["Most of it", "Some of it", "It's set up but rarely used"];

export const FOLLOW_UP_OPTIONS: ChoiceOption[] = [
  { value: "We respond manually when someone is available", label: "We respond manually when someone is available" },
  { value: "A set process that someone follows", label: "A set process that someone follows" },
  { value: "Follow-up is automated", label: "Follow-up is automated", description: "Through a CRM or messaging tool." },
  { value: "It depends on who receives the enquiry", label: "It depends on who receives the enquiry" },
  { value: "There isn't a consistent process yet", label: "There isn't a consistent process yet" },
];

export const REPETITIVE_WORK_OPTIONS = [
  "Answering the same questions",
  "Chasing follow-ups",
  "Quotes and invoices",
  "Updating records",
  "Scheduling and bookings",
  "Compiling reports",
];

export const REPORTING_OPTIONS: ChoiceOption[] = [
  { value: "A dashboard or CRM reports", label: "A dashboard or CRM reports" },
  { value: "Spreadsheets", label: "Spreadsheets" },
  { value: "Manual reports when needed", label: "Manual reports when needed" },
  { value: "Mostly experience and intuition", label: "Mostly experience and intuition" },
  { value: "We don't track it consistently yet", label: "We don't track it consistently yet" },
];

export const BUSINESS_STAGE_OPTIONS = ["Starting out", "Growing", "Established", "Scaling"];

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
  // Diagnostic (composed into Business_Challenge / Description)
  stuckAreas: [] as string[],
  challengeNote: "",
  discovery: [] as string[],
  enquiryChannels: [] as string[],
  monthlyEnquiries: "",
  tracking: "",
  crmUsage: "",
  followUp: "",
  repetitiveWork: [] as string[],
  reporting: "",
  businessStage: "",
  context: "",
};

export type Assessment = typeof initialAssessment;

// ── Branching — lightweight, for relevance, never a decision tree ────────
const family = (a: Assessment): Family | undefined => PRIORITY_FAMILY[a.Growth_Goal];

/** CRM depth only matters if they have one. */
export const showsCrmUsage = (a: Assessment) => a.tracking === "A CRM system";

/** Follow-up matters when conversion is the goal or the stuck point. */
export const showsFollowUp = (a: Assessment) =>
  ["conversion", "retention", "guidance"].includes(family(a) ?? "") ||
  a.stuckAreas.some((s) => ["Capture", "Qualify", "Nurture", "Convert"].includes(s));

/** Repetitive work matters when automation is the goal or delivery is stuck. */
export const showsRepetitiveWork = (a: Assessment) =>
  family(a) === "operations" || a.stuckAreas.some((s) => ["Deliver", "Measure"].includes(s));

/** A trial ad budget only makes sense once there is openness to investing. */
export const showsTrialBudget = (a: Assessment) =>
  Boolean(a.Investment_Readiness) && a.Investment_Readiness !== "Not ready to invest";

// ── Screens and stages ──────────────────────────────────────────────────
// Diagnostic first, contact details last: engaging questions build
// commitment before the most personal step, and the assessment reads as
// NairobiX understanding the business rather than collecting details. The
// order is this array — reorder here if the funnel ever needs to.
export const STAGES = ["Growth", "Systems", "Business", "Priorities", "About you"] as const;

export type ScreenId = "priority" | "stuck" | "reach" | "operate" | "business" | "priorities" | "contact";

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
    part: "1 of 2",
    title: "How do customers reach you?",
    why: "This helps us understand how opportunities enter the business.",
  },
  {
    id: "operate",
    stage: 1,
    part: "2 of 2",
    title: "How does the business currently operate?",
    why: "There are no right answers — this shows how opportunities move through your business today.",
  },
  {
    id: "business",
    stage: 2,
    title: "Tell us about the business.",
    why: "So the review reflects your industry and stage.",
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
      if (a.enquiryChannels.length === 0) e.enquiryChannels = "Choose where enquiries usually arrive.";
      if (!a.monthlyEnquiries) e.monthlyEnquiries = "A rough range is fine — or choose “Not sure”.";
      break;
    case "operate":
      if (!a.tracking) e.tracking = "Choose the closest description.";
      if (showsCrmUsage(a) && !a.crmUsage) e.crmUsage = "Choose the closest description.";
      if (showsFollowUp(a) && !a.followUp) e.followUp = "Choose the closest description.";
      if (showsRepetitiveWork(a) && a.repetitiveWork.length === 0) e.repetitiveWork = "Choose at least one.";
      if (!a.reporting) e.reporting = "Choose the closest description.";
      break;
    case "business":
      if (!a.Company.trim()) e.Company = "Please enter your business name.";
      if (!a.Industry) e.Industry = "Choose the closest industry.";
      if (!a.businessStage) e.businessStage = "Choose the closest stage.";
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
const discoveryLabel = (v: string) => DISCOVERY_OPTIONS.find((o) => o.value === v)?.label ?? v;
export const priorityLabel = (v: string) => GROWTH_PRIORITY_OPTIONS.find((o) => o.value === v)?.label ?? v;

/** Human-readable summary rows (used by the review screen and the payload). */
export function diagnosticRows(a: Assessment): Array<{ label: string; value: string }> {
  const rows = [
    { label: "Business stage", value: a.businessStage },
    { label: "Customers find the business through", value: a.discovery.map(discoveryLabel).join(", ") },
    { label: "Enquiries arrive via", value: a.enquiryChannels.join(", ") },
    { label: "New enquiries per month", value: a.monthlyEnquiries },
    { label: "Prospects and customers are tracked in", value: a.tracking },
  ];
  if (showsCrmUsage(a)) rows.push({ label: "Sales process run through the CRM", value: a.crmUsage });
  if (showsFollowUp(a)) rows.push({ label: "After an enquiry", value: a.followUp });
  if (showsRepetitiveWork(a)) rows.push({ label: "Repetitive work", value: a.repetitiveWork.join(", ") });
  rows.push({ label: "Knows what's working through", value: a.reporting });
  return rows;
}

export function businessChallengeText(a: Assessment): string {
  const areas = a.stuckAreas.map((s) => `${s} — ${stuckLabel(s)}`).join("; ");
  const note = a.challengeNote.trim();
  return note ? `Growth gets stuck at: ${areas}.\n\nIn their words: ${note}` : `Growth gets stuck at: ${areas}.`;
}

/**
 * The /api/leads payload for formType "business-growth-audit" — exactly the
 * fields lib/leads.ts already validates and maps. Branch answers that no
 * longer apply (e.g. the visitor changed their priority) are left out.
 */
export function toLeadPayload(a: Assessment) {
  const zohoChannels = a.discovery.filter((v) => v !== REFERRALS);
  // A referral-only business has no active marketing channel, which is
  // exactly what Zoho's "None currently" records.
  const channels = zohoChannels.length > 0 ? zohoChannels : [NONE_CURRENTLY];

  const block = diagnosticRows(a)
    .filter((r) => r.value)
    .map((r) => `${r.label}: ${r.value}`)
    .join("\n");
  const context = a.context.trim();
  const description = `${context ? `${context}\n\n` : ""}— Growth Assessment diagnostic —\n${block}`;

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
    Current_Marketing_Channels: channels,
    Desired_Timeline: a.Desired_Timeline,
    Investment_Readiness: a.Investment_Readiness,
    Trial_Advertisement_Budget_Readiness: showsTrialBudget(a) ? a.Trial_Advertisement_Budget_Readiness : "",
    Description: description,
  };
}
