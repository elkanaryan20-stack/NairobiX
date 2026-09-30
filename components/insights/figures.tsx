import Image from "next/image";
import type { ReactNode } from "react";
import type { FigureKey } from "@/lib/insights";

// The NairobiX editorial illustration language: near-black panels, thin
// hairlines, mono labels, off-white type and orange used only for the thing
// the figure is about. Every figure is HTML/CSS (not a scaled SVG), so the
// text stays readable at phone width, and each one has a mobile layout.

const LABEL = "font-mono text-[10px] uppercase tracking-[0.2em]";

function Logo({ src, ratio, label }: { src: string; ratio: number; label: string }) {
  const h = 18;
  return (
    <Image
      src={src}
      alt={label}
      width={Math.round(h * ratio)}
      height={h}
      unoptimized
      style={{ width: Math.round(h * ratio), height: h }}
      className="object-contain"
    />
  );
}

const LOGOS = {
  whatsapp: { src: "/images/technology/whatsapp.svg", ratio: 360 / 362, label: "WhatsApp" },
  zoho: { src: "/images/technology/zoho.svg", ratio: 1024 / 450, label: "Zoho" },
  google: { src: "/images/technology/google.svg", ratio: 268 / 274, label: "Google" },
  meta: { src: "/images/technology/meta.svg", ratio: 256 / 171, label: "Meta" },
} as const;

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className={`${LABEL} inline-flex items-center rounded-full border border-white/15 px-2.5 py-1 text-white/60`}>
      {children}
    </span>
  );
}

/* ── 1. Conversion leaks ─────────────────────────────────────────────── */

const STAGES: { name: string; leak?: string }[] = [
  { name: "Capture", leak: "Enquiry never logged" },
  { name: "Respond", leak: "Slow or no first reply" },
  { name: "Qualify" },
  { name: "Follow up", leak: "No rule when a customer goes quiet" },
  { name: "Progress", leak: "Quote sent, never chased" },
  { name: "Close" },
  { name: "Measure", leak: "Outcome not recorded" },
];

function ConversionLeaks() {
  return (
    <div>
      {/* Desktop: a horizontal line of stages with leaks dropping below. */}
      <div className="hidden md:block">
        <div className="relative grid grid-cols-7">
          <span aria-hidden="true" className="absolute left-[7%] right-[7%] top-[7px] h-px bg-white/25" />
          {STAGES.map((stage, i) => (
            <div key={stage.name} className="relative flex flex-col items-center text-center">
              <span
                aria-hidden="true"
                className={`relative z-10 h-[15px] w-[15px] rounded-full border ${
                  stage.leak ? "border-[var(--color-primary)] bg-[var(--section-bg,#0c0c0d)]" : "border-white/40 bg-[#0c0c0d]"
                }`}
              />
              <span className={`${LABEL} mt-3 text-white/45`}>{String(i + 1).padStart(2, "0")}</span>
              <span className="mt-1 text-sm font-medium text-white">{stage.name}</span>
              {stage.leak ? (
                <>
                  <span aria-hidden="true" className="mt-3 h-10 border-l border-dashed border-[var(--color-primary)]/60" />
                  <span className="mt-2 max-w-[9rem] text-xs leading-5 text-[var(--color-primary)]/90">{stage.leak}</span>
                </>
              ) : null}
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
          <span className={`${LABEL} text-white/45`}>Enquiry</span>
          <span className={`${LABEL} text-white/45`}>Revenue →</span>
        </div>
      </div>

      {/* Mobile: a vertical rail. */}
      <ol className="relative space-y-5 pl-8 md:hidden">
        <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-white/25" />
        {STAGES.map((stage, i) => (
          <li key={stage.name} className="relative">
            <span
              aria-hidden="true"
              className={`absolute -left-8 top-1 h-[15px] w-[15px] rounded-full border bg-[#0c0c0d] ${
                stage.leak ? "border-[var(--color-primary)]" : "border-white/40"
              }`}
            />
            <span className={`${LABEL} text-white/45`}>{String(i + 1).padStart(2, "0")}</span>
            <span className="ml-3 text-sm font-medium text-white">{stage.name}</span>
            {stage.leak ? <p className="mt-1 text-xs leading-5 text-[var(--color-primary)]/90">Leak: {stage.leak}</p> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── 2. Response decay (real data, HBR 2011) ─────────────────────────── */

const DECAY = [
  { label: "Contact attempted within 1 hour", value: 100, display: "100" },
  { label: "About an hour later", value: 100 / 7, display: "≈14" },
  { label: "24 hours or later", value: 100 / 60, display: "<2" },
];

const RESPONSES = [
  { label: "Within 1 hour", value: 37, className: "bg-[var(--color-primary)]" },
  { label: "1–24 hours", value: 16, className: "bg-[var(--color-primary)]/55" },
  { label: "Over 24 hours", value: 24, className: "bg-white/30" },
  { label: "Never", value: 23, className: "bg-white/10 [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.12)_0_2px,transparent_2px_6px)]" },
];

function ResponseDecay() {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-12">
      <div>
        <p className={`${LABEL} text-white/55`}>Likelihood of qualifying the lead · index</p>
        <ul className="mt-5 space-y-4">
          {DECAY.map((row, i) => (
            <li key={row.label}>
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-white/80">{row.label}</span>
                <span className={`font-mono ${i === 0 ? "text-[var(--color-primary)]" : "text-white/70"}`}>{row.display}</span>
              </div>
              <div className="mt-2 h-2 bg-white/[0.06]">
                <div
                  className={`h-full ${i === 0 ? "bg-[var(--color-primary)]" : "bg-white/40"}`}
                  style={{ width: `${Math.max(row.value, 1)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className={`${LABEL} text-white/55`}>How audited companies responded</p>
        <div className="mt-5 flex h-8 overflow-hidden" role="img" aria-label="37% within one hour, 16% within 1 to 24 hours, 24% after more than 24 hours, 23% never responded.">
          {RESPONSES.map((r) => (
            <div key={r.label} className={r.className} style={{ width: `${r.value}%` }} />
          ))}
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {RESPONSES.map((r) => (
            <li key={r.label} className="flex items-center gap-2 text-white/75">
              <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 ${r.className}`} />
              {r.label} <span className="ml-auto font-mono text-white">{r.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── 3. WhatsApp customer service window ─────────────────────────────── */

function ServiceWindow() {
  // A 96-hour track. The customer writes at hour 0 and again at hour 20,
  // so the window runs to hour 44; a day-4 follow-up must be a template.
  const pct = (h: number) => `${(h / 96) * 100}%`;
  const markers = [
    { n: 1, at: 0, text: "Customer messages the business. A 24-hour window opens." },
    { n: 2, at: 20, text: "Customer replies at hour 20. The window resets to 24 hours." },
    { n: 3, at: 72, text: "Day-4 follow-up. The window has closed, so only an approved template can be sent." },
  ];
  return (
    <div>
      <div className="relative pt-8">
        <div className="relative h-10">
          <div className="absolute inset-y-0 border-y border-l border-[var(--color-primary)]/60 bg-[var(--color-primary)]/15" style={{ left: 0, width: pct(20) }} />
          <div className="absolute inset-y-0 border-y border-r border-[var(--color-primary)]/60 bg-[var(--color-primary)]/20" style={{ left: pct(20), width: pct(24) }} />
          <div aria-hidden="true" className="absolute inset-y-0 border-l border-dashed border-[var(--color-primary)]" style={{ left: pct(20) }} />
          <div className="absolute inset-y-0 border border-white/15 bg-white/[0.03]" style={{ left: pct(44), right: 0 }} />
          <span className={`${LABEL} absolute left-2 top-1/2 -translate-y-1/2 text-[var(--color-primary)] max-sm:hidden`} style={{ left: pct(1) }}>
            Window open · free-form replies
          </span>
          <span className={`${LABEL} absolute top-1/2 -translate-y-1/2 text-white/45 max-sm:hidden`} style={{ left: pct(47) }}>
            Window closed · templates only
          </span>
          {markers.map((m) => (
            <span
              key={m.n}
              className="absolute -top-8 flex -translate-x-1/2 flex-col items-center"
              style={{ left: m.at === 0 ? "10px" : pct(m.at) }}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/40 bg-[#0c0c0d] font-mono text-[10px] text-white">
                {m.n}
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-white/40" />
            </span>
          ))}
        </div>
        <div className="mt-3 flex justify-between font-mono text-[10px] text-white/45">
          <span>0h</span>
          <span>24h</span>
          <span>48h</span>
          <span>72h</span>
          <span>96h</span>
        </div>
      </div>
      <div className="mt-2 flex gap-4 sm:hidden">
        <span className="flex items-center gap-2 text-xs text-white/70">
          <span aria-hidden="true" className="h-2.5 w-4 border border-[var(--color-primary)]/60 bg-[var(--color-primary)]/15" /> Window open
        </span>
        <span className="flex items-center gap-2 text-xs text-white/70">
          <span aria-hidden="true" className="h-2.5 w-4 border border-white/15 bg-white/[0.03]" /> Templates only
        </span>
      </div>
      <ol className="mt-6 space-y-2 border-t border-white/10 pt-5">
        {markers.map((m) => (
          <li key={m.n} className="flex gap-3 text-sm leading-6 text-white/80">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/30 font-mono text-[10px] text-white">
              {m.n}
            </span>
            {m.text}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── 4. WhatsApp → CRM example architecture ─────────────────────────── */

function Node({ title, detail, logo, accent }: { title: string; detail: string; logo?: ReactNode; accent?: boolean }) {
  return (
    <div className={`relative border bg-[#0f0f11] p-4 ${accent ? "border-[var(--color-primary)]/60" : "border-white/15"}`}>
      {accent ? <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-[var(--color-primary)]" /> : null}
      <div className="flex items-center gap-2.5">
        {logo}
        <span className="text-sm font-medium text-white">{title}</span>
      </div>
      <p className="mt-2 text-xs leading-5 text-white/60">{detail}</p>
    </div>
  );
}

/** Points down when the flow stacks (mobile), right when it runs across. */
function Arrow({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`flex items-center justify-center py-1 text-white/40 md:px-1 md:py-0 ${className}`}>
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </span>
  );
}

function WhatsappCrmArchitecture() {
  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        <Tag>Example architecture</Tag>
        <Tag>Not a standard implementation</Tag>
      </div>
      <div className="grid items-stretch gap-1 md:grid-cols-[1fr_auto_1fr_auto_1.15fr]">
        <Node title="Customer" detail="Messages the business number on WhatsApp." logo={<Logo {...LOGOS.whatsapp} />} />
        <Arrow />
        <Node title="WhatsApp Business Platform" detail="Cloud API, usually through the CRM's integration or a messaging provider." />
        <Arrow />
        <Node
          title="CRM"
          detail="Contact created or matched; conversation logged against it."
          logo={<Logo {...LOGOS.zoho} />}
          accent
        />
        <span aria-hidden="true" className="py-1 text-center text-white/40 md:col-start-5">
          ↓
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Owner + task", "Assigned by rule; reminded if a reply is overdue."],
          ["Approved templates", "Follow-ups outside the 24-hour window, sent with opt-in."],
          ["Reporting", "Enquiries and outcomes by source, stage and owner."],
        ].map(([title, detail]) => (
          <div key={title} className="border-l border-[var(--color-primary)]/50 pl-3">
            <p className="text-sm font-medium text-white">{title}</p>
            <p className="mt-1 text-xs leading-5 text-white/60">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 5. Tool layers: conversation, list, relationship ───────────────── */

function ToolLayers() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="border border-white/12 bg-[#0f0f11] p-4">
        <p className={`${LABEL} text-white/50`}>Conversation · WhatsApp</p>
        <div className="mt-4 space-y-2 text-xs">
          <p className="mr-8 rounded-lg rounded-tl-none bg-white/[0.07] px-3 py-2 text-white/85">Hi, is the 2-bedroom in Kilimani still available?</p>
          <p className="ml-8 rounded-lg rounded-tr-none bg-[#1f3b2c] px-3 py-2 text-white/85">Yes it is! Would you like to view it this week?</p>
          <p className="mr-8 rounded-lg rounded-tl-none bg-white/[0.07] px-3 py-2 text-white/85">Let me check and get back to you</p>
        </div>
        <p className="mt-4 text-xs leading-5 text-white/55">Holds what was said, in order. No owner, no next step.</p>
      </div>
      <div className="border border-white/12 bg-[#0f0f11] p-4">
        <p className={`${LABEL} text-white/50`}>List · Spreadsheet</p>
        <div className="mt-4 overflow-hidden border border-white/10 font-mono text-[10px] text-white/75">
          {[
            ["Name", "Source", "Status"],
            ["Wanjiru", "WhatsApp", "Viewing?"],
            ["Otieno", "Website", "Quote"],
            ["Mwangi", "—", "??"],
          ].map((row, r) => (
            <div key={r} className={`grid grid-cols-3 ${r === 0 ? "bg-white/[0.06] text-white/55" : "border-t border-white/10"}`}>
              {row.map((cell, c) => (
                <span key={c} className="truncate border-l border-white/10 px-1.5 py-1.5 first:border-l-0">{cell}</span>
              ))}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-white/55">Holds rows of facts. Accurate only if everyone updates it.</p>
      </div>
      <div className="relative border border-[var(--color-primary)]/50 bg-[#0f0f11] p-4">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-[var(--color-primary)]" />
        <p className={`${LABEL} text-white/50`}>Relationship · CRM</p>
        <div className="mt-4 space-y-2.5 text-xs">
          <div className="flex justify-between"><span className="text-white/50">Contact</span><span className="text-white">A. Wanjiru</span></div>
          <div className="flex justify-between"><span className="text-white/50">Source</span><span className="text-white">WhatsApp · listing ad</span></div>
          <div className="flex justify-between"><span className="text-white/50">Owner</span><span className="text-white">James K.</span></div>
          <div className="flex items-center justify-between">
            <span className="text-white/50">Stage</span>
            <span className="rounded-full border border-[var(--color-primary)]/50 px-2 py-0.5 text-[var(--color-primary)]">Viewing booked</span>
          </div>
          <div className="flex justify-between"><span className="text-white/50">Next action</span><span className="text-white">Call · Thu 10:00</span></div>
        </div>
        <p className="mt-4 text-xs leading-5 text-white/55">Holds the relationship and where it is in the process.</p>
      </div>
    </div>
  );
}

/* ── 6. Automation matrix ────────────────────────────────────────────── */

function AutomationMatrix() {
  const cells = [
    { title: "Standardise, then automate", tone: "", examples: ["Preparing quotes", "Client onboarding steps"] },
    { title: "Automate first", tone: "accent", examples: ["Logging enquiries", "Assigning leads", "Appointment reminders", "Booking confirmations"] },
    { title: "Leave manual", tone: "muted", examples: ["Partnership negotiations", "Unusual complaints"] },
    { title: "Checklist or light automation", tone: "", examples: ["Monthly report export", "Quarterly data clean-up"] },
  ];
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3">
      <div className="flex items-center">
        <span className={`${LABEL} whitespace-nowrap text-white/55 [writing-mode:vertical-rl] rotate-180`}>Rare ← Frequency → Frequent</span>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-px bg-white/10">
          {cells.map((cell) => (
            <div
              key={cell.title}
              className={`relative min-h-[150px] p-3 sm:p-5 ${
                cell.tone === "accent" ? "bg-[#1a120b]" : cell.tone === "muted" ? "bg-[#0b0b0c]" : "bg-[#0f0f11]"
              }`}
            >
              {cell.tone === "accent" ? <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-[var(--color-primary)]" /> : null}
              <p className={`text-sm font-medium ${cell.tone === "accent" ? "text-[var(--color-primary)]" : cell.tone === "muted" ? "text-white/55" : "text-white"}`}>
                {cell.title}
              </p>
              <ul className="mt-3 space-y-1.5">
                {cell.examples.map((ex) => (
                  <li key={ex} className="text-xs leading-5 text-white/60">— {ex}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={`${LABEL} mt-3 text-center text-white/55`}>Fuzzy ← Rule clarity → Clear</p>
      </div>
    </div>
  );
}

/* ── 7. AI spectrum ──────────────────────────────────────────────────── */

const SPECTRUM = [
  { name: "Rules automation", detail: "Reminders, routing, confirmations", check: "Owner monitors it" },
  { name: "AI-assisted", detail: "Drafts, summaries, suggested categories", check: "A person decides" },
  { name: "AI within boundaries", detail: "Answers from approved content only", check: "Disclosed, with handover" },
  { name: "AI agent", detail: "Plans and acts across tools", check: "Tight limits and review" },
];

function AiSpectrum() {
  return (
    <div>
      <div className="relative grid gap-6 md:grid-cols-4 md:gap-4">
        <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[7px] hidden h-px bg-gradient-to-r from-white/30 to-[var(--color-primary)] md:block" />
        {SPECTRUM.map((s, i) => (
          <div key={s.name} className="relative flex gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
            <span
              aria-hidden="true"
              className="relative z-10 mt-1 h-[15px] w-[15px] shrink-0 rounded-full border bg-[#0c0c0d] md:mt-0"
              style={{ borderColor: `rgba(249,115,22,${0.3 + i * 0.23})` }}
            />
            <div>
              <p className="text-sm font-medium text-white md:mt-4">{s.name}</p>
              <p className="mt-1 text-xs leading-5 text-white/60">{s.detail}</p>
              <p className={`${LABEL} mt-3 text-[var(--color-primary)]/85`}>{s.check}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-2 border-t border-white/10 pt-4 sm:grid-cols-2">
        <p className={`${LABEL} text-white/50`}>Predictable ─── Flexible</p>
        <p className={`${LABEL} text-white/50 sm:text-right`}>Need for a human checkpoint ↑</p>
      </div>
    </div>
  );
}

/* ── 8. Website roles ────────────────────────────────────────────────── */

const ROLES = ["Discovery", "Trust", "Conversion", "Capture", "Qualification", "Handoff", "Measurement"];

function WebsiteRoles() {
  return (
    <div>
      <div className="hidden md:block">
        <div className="grid grid-cols-7">
          {ROLES.map((role, i) => (
            <div key={role} className="relative flex flex-col items-center text-center">
              {i < ROLES.length - 1 ? <span aria-hidden="true" className="absolute left-1/2 right-[-50%] top-[7px] h-px bg-white/25" /> : null}
              <span
                aria-hidden="true"
                className={`relative z-10 h-[15px] w-[15px] rounded-full border bg-[#0c0c0d] ${i < 5 ? "border-white/50" : "border-[var(--color-primary)]"}`}
              />
              <span className={`${LABEL} mt-3 text-white/45`}>{String(i + 1).padStart(2, "0")}</span>
              <span className="mt-1 text-sm font-medium text-white">{role}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-7 gap-3">
          <div className="col-span-5 border-t border-white/30 pt-3 text-center">
            <span className={`${LABEL} text-white/60`}>On the website</span>
          </div>
          <div className="col-span-2 border-t border-[var(--color-primary)]/70 pt-3 text-center">
            <span className={`${LABEL} text-[var(--color-primary)]`}>Depends on connected systems</span>
          </div>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:hidden">
        {[
          { label: "On the website", roles: ROLES.slice(0, 5), start: 0, accent: false },
          { label: "Depends on connected systems", roles: ROLES.slice(5), start: 5, accent: true },
        ].map((group) => (
          <div key={group.label} className={`border-l pl-4 ${group.accent ? "border-[var(--color-primary)]/70" : "border-white/30"}`}>
            <p className={`${LABEL} ${group.accent ? "text-[var(--color-primary)]" : "text-white/60"}`}>{group.label}</p>
            <ol className="mt-3 space-y-2">
              {group.roles.map((role, i) => (
                <li key={role} className="text-sm text-white">
                  <span className="mr-3 font-mono text-[10px] text-white/45">{String(group.start + i + 1).padStart(2, "0")}</span>
                  {role}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 9. Closed loop: marketing → CRM → back to the ad platforms ─────── */

function ClosedLoop() {
  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        <Tag>Example architecture</Tag>
      </div>
      <div className="grid items-stretch gap-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
        <Node
          title="Ad platforms"
          detail="Campaigns optimise toward the conversion you send them."
          logo={
            <span className="flex items-center gap-2">
              <Logo {...LOGOS.google} />
              <Logo {...LOGOS.meta} />
            </span>
          }
        />
        <Arrow />
        <Node title="Website · WhatsApp" detail="Enquiry captured with its source and click or lead ID." />
        <Arrow />
        <Node title="CRM" detail="Stages recorded: qualified, opportunity, won or lost." logo={<Logo {...LOGOS.zoho} />} accent />
        <Arrow />
        <Node title="Customer" detail="A paid sale, attributed to its source." />
      </div>
      {/* The return path. */}
      <div className="relative mt-4 hidden md:block">
        <div className="ml-[12%] mr-[37%] h-8 rounded-b-md border-x border-b border-dashed border-[var(--color-primary)]/70" />
        <span className="absolute left-[12%] top-0 -translate-x-1/2 -translate-y-2 text-[var(--color-primary)]">↑</span>
      </div>
      <div className="mt-3 flex gap-3 border-l border-dashed border-[var(--color-primary)]/70 pl-4 md:mx-[12%] md:border-l-0 md:pl-0 md:text-center">
        <p className="text-xs leading-5 text-white/75 md:mx-auto md:max-w-md">
          <span className="text-[var(--color-primary)]">Outcomes sent back</span> — Google Ads enhanced conversions for leads;
          Meta Conversions API for CRM — so optimisation follows customers, not form fills.
        </p>
      </div>
    </div>
  );
}

const FIGURES: Record<FigureKey, () => ReactNode> = {
  "conversion-leaks": ConversionLeaks,
  "response-decay": ResponseDecay,
  "service-window": ServiceWindow,
  "whatsapp-crm-architecture": WhatsappCrmArchitecture,
  "tool-layers": ToolLayers,
  "automation-matrix": AutomationMatrix,
  "ai-spectrum": AiSpectrum,
  "website-roles": WebsiteRoles,
  "closed-loop": ClosedLoop,
};

export function InsightFigure({ figure, caption, number }: { figure: FigureKey; caption: ReactNode; number: number }) {
  const Figure = FIGURES[figure];
  return (
    <figure className="my-10 sm:-mx-6 lg:-mx-10">
      <div className="border border-white/10 bg-[#0c0c0d] p-5 sm:p-8">
        <Figure />
      </div>
      <figcaption className="mt-3 flex gap-3 px-0 text-sm leading-6 text-[var(--text-tertiary)] sm:px-6 lg:px-10">
        <span className={`${LABEL} mt-1 shrink-0 text-[var(--color-primary)]`}>Fig. {number}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
