import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { GRAIN_DATA_URI } from "@/components/ui/ImageFrame";
import { Fragment } from "@/components/case-studies/fragments";
import { CONCEPT_DISCLOSURE, GROWTH_STAGES, type CaseStudy, type TechKey } from "@/lib/case-studies";
import { BOOKING_URL, TECHNOLOGY_PREVIEW } from "@/lib/site-data";

export const MONO = "font-mono text-[10px] uppercase tracking-[0.2em]";
const pad = (n: number) => String(n).padStart(2, "0");

/* ── Shared ─────────────────────────────────────────────────────────── */

export function SectionHead({
  number,
  label,
  title,
  intro,
  id,
}: {
  number: number;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className={`${MONO} flex items-center gap-3 text-[var(--color-primary)]`}>
        <span>{pad(number)}</span>
        <span aria-hidden="true" className="h-px w-6 bg-[var(--color-primary)]/60" />
        <span>{label}</span>
      </p>
      <h2 id={id} className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {intro ? <div className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">{intro}</div> : null}
    </div>
  );
}

export function ConceptDisclosure({ className = "" }: { className?: string }) {
  return (
    <aside className={`flex gap-3 border-l-2 border-[var(--color-primary)] bg-white/[0.03] py-3 pl-4 pr-5 ${className}`}>
      <div>
        <p className={`${MONO} text-[var(--color-primary)]`}>Concept case study</p>
        <p className="mt-1.5 text-sm leading-6 text-white/70">{CONCEPT_DISCLOSURE}</p>
      </div>
    </aside>
  );
}

/** A slim, contextual call to action between sections. */
export function InlineCTA({ lead, primary, secondary = "Book a Consultation" }: { lead: string; primary: string; secondary?: string }) {
  return (
    <div className="flex flex-col gap-5 border-y border-white/10 py-7 lg:flex-row lg:items-center lg:justify-between">
      <p className="max-w-xl font-display text-xl leading-snug text-white">{lead}</p>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
        <Button href="/business-growth-audit" variant="primary" size="md">
          {`${primary} →`}
        </Button>
        <Button href={BOOKING_URL} variant="secondary" size="md">
          {`${secondary} →`}
        </Button>
      </div>
    </div>
  );
}

/* ── 02 Context ─────────────────────────────────────────────────────── */

export function ContextSection({ c }: { c: CaseStudy }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
      <div className="space-y-5 text-[17px] leading-8 text-white/80">
        {c.context.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="grid gap-8 pt-6 sm:grid-cols-2">
          <div>
            <p className={`${MONO} text-white/50`}>What already works</p>
            <ul className="mt-4 space-y-2.5">
              {c.context.works.map((w) => (
                <li key={w} className="flex gap-3 text-[15px] leading-6 text-white/80">
                  <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`${MONO} text-white/50`}>What the team manages by hand</p>
            <ul className="mt-4 space-y-2.5">
              {c.context.manual.map((m) => (
                <li key={m} className="flex gap-3 text-[15px] leading-6 text-white/80">
                  <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full border border-[var(--color-primary)]" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <aside className="self-start border border-white/10 bg-black/20 lg:sticky lg:top-28">
        <div className="border-b border-white/10 px-6 py-4">
          <p className={`${MONO} text-white/55`}>Representative business profile</p>
          <p className="mt-1 text-xs text-white/40">Illustrative assumptions — not a real client</p>
        </div>
        <dl className="divide-y divide-white/10">
          {c.context.assumptions.map((a) => (
            <div key={a.label} className="px-6 py-4">
              <dt className={`${MONO} text-white/45`}>{a.label}</dt>
              <dd className="mt-1.5 text-[15px] leading-6 text-white/85">{a.value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}

/* ── 03 Problem: the layer map ──────────────────────────────────────── */

export function ProblemMap({ c }: { c: CaseStudy }) {
  return (
    <ol className="relative mt-12">
      {c.problemLayers.map((layer, i) => (
        <li key={layer.layer} className="relative grid gap-3 pb-9 pl-10 last:pb-0 md:grid-cols-[10rem_minmax(0,1.3fr)_minmax(0,1fr)] md:gap-8 md:pl-12">
          {/* The node, and a connector that breaks before the next layer */}
          <span aria-hidden="true" className="absolute left-[5px] top-1.5 h-[11px] w-[11px] rounded-full border border-white/50 bg-[var(--section-bg)]" />
          {i < c.problemLayers.length - 1 ? (
            <span aria-hidden="true" className="absolute bottom-3 left-[10px] top-6 flex flex-col">
              <span className="block h-[45%] w-px bg-white/25" />
              <span className="mt-auto block h-[20%] w-px border-l border-dashed border-[var(--color-primary)]/60" />
            </span>
          ) : null}
          <p className={`${MONO} pt-1 text-white/60`}>{layer.layer}</p>
          <p className="text-[16px] leading-7 text-white/85">{layer.issue}</p>
          <p className="text-[15px] leading-7 text-[var(--color-primary)]/90">
            <span aria-hidden="true">→ </span>
            {layer.effect}
          </p>
        </li>
      ))}
    </ol>
  );
}

/* ── 04 Opportunity: the growth path ────────────────────────────────── */

export function GrowthPath({ focus }: { focus: CaseStudy["opportunity"]["focus"] }) {
  return (
    <div className="mt-12">
      <ol className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
        {GROWTH_STAGES.map((stage, i) => {
          const on = focus.includes(stage);
          return (
            <li key={stage} className="relative pr-3">
              {i < GROWTH_STAGES.length - 1 ? (
                <span aria-hidden="true" className="absolute left-4 right-0 top-[7px] hidden h-px bg-white/20 lg:block" />
              ) : null}
              <span
                aria-hidden="true"
                className={`relative z-10 block h-[15px] w-[15px] rounded-full border ${
                  on ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-white/35 bg-[var(--section-bg)]"
                }`}
              />
              <p className={`${MONO} mt-3 text-white/40`}>{pad(i + 1)}</p>
              <p className={`mt-1 text-sm font-medium ${on ? "text-white" : "text-white/50"}`}>
                {stage}
                {on ? <span className="sr-only"> (focus of this engagement)</span> : null}
              </p>
            </li>
          );
        })}
      </ol>
      <p className="mt-8 flex items-center gap-2 text-sm text-white/55">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />
        Where this engagement concentrates first, within the NairobiX growth system.
      </p>
    </div>
  );
}

/* ── 06 Before / after ──────────────────────────────────────────────── */

// Loose, disconnected positions for the "before" cluster (desktop).
const SCATTER = [
  "left-[4%] top-[6%]",
  "right-[6%] top-[14%]",
  "left-[22%] top-[36%]",
  "right-[2%] top-[52%]",
  "left-[2%] top-[66%]",
  "right-[20%] top-[82%]",
];

export function BeforeAfter({ c }: { c: CaseStudy }) {
  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-2">
      <div className="border border-white/10 bg-black/25 p-6 sm:p-8">
        <p className={`${MONO} text-white/55`}>Before · current operating pattern</p>
        <div className="relative mt-6 hidden h-[340px] sm:block">
          {c.beforeAfter.before.map((item, i) => (
            <span
              key={item}
              className={`absolute ${SCATTER[i % SCATTER.length]} max-w-[48%] rounded border border-dashed border-white/25 bg-[#0c0c0d] px-3 py-2 text-[13px] leading-5 text-white/70`}
            >
              {item}
            </span>
          ))}
        </div>
        <ul className="mt-6 flex flex-wrap gap-2 sm:hidden">
          {c.beforeAfter.before.map((item) => (
            <li key={item} className="rounded border border-dashed border-white/25 px-3 py-2 text-[13px] text-white/70">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-white/10 pt-4 text-sm leading-6 text-white/60">{c.beforeAfter.beforeNote}</p>
      </div>
      <div className="relative border border-[var(--color-primary)]/40 bg-[#0d0b09] p-6 sm:p-8">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-[var(--color-primary)]" />
        <p className={`${MONO} text-[var(--color-primary)]`}>After · designed future-state system</p>
        <ol className="relative mt-6 space-y-2">
          <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-[var(--color-primary)]/50" />
          {c.beforeAfter.after.map((item, i) => (
            <li key={item} className="relative flex items-center gap-4 pl-0">
              <span aria-hidden="true" className="relative z-10 h-[11px] w-[11px] shrink-0 rounded-full border border-[var(--color-primary)] bg-[#0d0b09]" />
              <span className="font-mono text-[10px] text-white/40">{pad(i + 1)}</span>
              <span className="text-[15px] text-white/90">{item}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 border-t border-white/10 pt-4 text-sm leading-6 text-white/60">{c.beforeAfter.afterNote}</p>
      </div>
      <p className="text-sm text-white/45 lg:col-span-2">
        An architectural comparison of operating patterns — not a record of measured results.
      </p>
    </div>
  );
}

/* ── 07 Customer journey ────────────────────────────────────────────── */

export function Journey({ c }: { c: CaseStudy }) {
  return (
    <div className="mt-12">
      <div className="hidden border-b border-white/10 pb-3 md:grid md:grid-cols-[9rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[9rem_minmax(0,1fr)_minmax(0,1fr)_300px]">
        <span />
        <p className={`${MONO} text-white/50`}>What the customer experiences</p>
        <p className={`${MONO} text-white/50`}>What happens in the system</p>
        <span className="hidden lg:block" />
      </div>
      <ol>
        {c.journey.map((step, i) => (
          <li
            key={step.stage}
            className={`grid gap-4 border-b border-white/10 py-7 md:grid-cols-[9rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[9rem_minmax(0,1fr)_minmax(0,1fr)_300px] ${
              step.exception ? "relative bg-[var(--color-primary)]/[0.04]" : ""
            }`}
          >
            {step.exception ? <span aria-hidden="true" className="absolute inset-y-0 -left-4 w-[2px] bg-[var(--color-primary)]" /> : null}
            <div>
              <p className={`${MONO} text-[var(--color-primary)]`}>{pad(i + 1)}</p>
              <p className="mt-1.5 font-display text-xl font-medium text-white">{step.stage}</p>
              {step.exception ? <p className={`${MONO} mt-2 text-[var(--color-primary)]/80`}>Exception path</p> : null}
            </div>
            <div>
              <p className={`${MONO} mb-1.5 text-white/40 md:hidden`}>Customer</p>
              <p className="text-[15px] leading-7 text-white/85">{step.customer}</p>
            </div>
            <div>
              <p className={`${MONO} mb-1.5 text-white/40 md:hidden`}>System</p>
              <p className="text-[15px] leading-7 text-white/65">{step.business}</p>
            </div>
            {step.fragment ? (
              <div className="md:col-span-3 md:max-w-sm lg:col-span-1 lg:max-w-none">
                <Fragment fragment={step.fragment} />
              </div>
            ) : (
              <span className="hidden lg:block" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── 08 Technology ──────────────────────────────────────────────────── */

const TECH_LOGO: Record<TechKey, { logo: string; ratio: number }> = Object.fromEntries(
  TECHNOLOGY_PREVIEW.map((t) => [t.logo.split("/").pop()!.replace(".svg", ""), { logo: t.logo, ratio: t.ratio }]),
) as Record<TechKey, { logo: string; ratio: number }>;

function TechLogo({ techKey, size = 22 }: { techKey: TechKey; size?: number }) {
  const logo = TECH_LOGO[techKey];
  if (!logo) return null;
  return (
    <Image
      src={logo.logo}
      alt=""
      width={Math.round(size * logo.ratio)}
      height={size}
      unoptimized
      style={{ width: Math.round(size * logo.ratio), height: size }}
      className="object-contain"
    />
  );
}

/** The proposed stack as capability → technology pairs, in a single strip. */
export function StackStrip({ c, compact = false }: { c: CaseStudy; compact?: boolean }) {
  return (
    <ul className={`flex flex-wrap ${compact ? "gap-2" : "gap-3"}`} aria-label="Proposed technology stack">
      {c.technology.items.map((item) => (
        <li
          key={item.name}
          className={`flex items-center gap-2.5 rounded-md border border-white/10 bg-white/[0.02] ${compact ? "px-2.5 py-1.5" : "px-3.5 py-2.5"}`}
        >
          <span className="flex items-center gap-1.5">
            {item.keys.map((k) => (
              <TechLogo key={k} techKey={k} size={compact ? 14 : 18} />
            ))}
          </span>
          <span className={`${MONO} text-white/55`}>{item.capability}</span>
          <span className="sr-only">: {item.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function TechnologyLayer({ c }: { c: CaseStudy }) {
  return (
    <div className="mt-12">
      <div className="grid gap-8 border border-white/10 bg-black/20 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-center">
        <div>
          <p className={`${MONO} text-[var(--color-primary)]`}>Proposed stack · example architecture</p>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Each technology fills a capability the system design called for. Remove the requirement, and the tool goes with it.
          </p>
        </div>
        <StackStrip c={c} />
      </div>
      <ol className="mt-10 flex flex-wrap items-center gap-3 text-sm" aria-label="Order of decisions">
        {["Business requirement", "System design", "Technology"].map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span className={`rounded-full border px-4 py-2 ${i === 2 ? "border-[var(--color-primary)]/60 text-white" : "border-white/15 text-white/60"}`}>
              {step}
            </span>
            {i < 2 ? <span aria-hidden="true" className="text-white/35">→</span> : null}
          </li>
        ))}
      </ol>
      <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
        {c.technology.items.map((item) => (
          <li key={item.name} className="grid gap-4 py-7 md:grid-cols-[14rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-8">
            <div>
              <p className={`${MONO} text-[var(--color-primary)]`}>{item.capability}</p>
              <div className="mt-3 flex items-center gap-3">
                {item.keys.map((key) => (
                  <TechLogo key={key} techKey={key} />
                ))}
              </div>
              <p className="mt-3 font-medium text-white">{item.name}</p>
              <p className={`${MONO} mt-2 leading-5 text-white/45`}>{item.layer}</p>
            </div>
            <div>
              <p className={`${MONO} text-white/45`}>Role</p>
              <p className="mt-1.5 text-[15px] leading-7 text-white/85">{item.role}</p>
            </div>
            <div>
              <p className={`${MONO} text-white/45`}>Why it fits</p>
              <p className="mt-1.5 text-[15px] leading-7 text-white/65">{item.reason}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-5 max-w-3xl text-sm leading-6 text-white/50">
        Illustrative technology choices for this concept scenario. They are not a record of a client implementation,
        imply no partnership with any vendor, and are not the only suitable stack.
      </p>
    </div>
  );
}

/* ── 10 Designed outcomes ───────────────────────────────────────────── */

export function Outcomes({ c }: { c: CaseStudy }) {
  return (
    <div className="mt-12">
      <ul className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {c.outcomes.map((o, i) => (
          <li key={o.title} className="bg-[var(--section-bg)] p-6">
            <p className={`${MONO} text-[var(--color-primary)]`}>{pad(i + 1)}</p>
            <p className="mt-3 font-medium text-white">{o.title}</p>
            <p className="mt-2 text-sm leading-6 text-white/60">{o.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-white/45">Design objectives the system is built around — not measured client results.</p>
    </div>
  );
}

/* ── 11 Measurement framework ───────────────────────────────────────── */

export function MeasurementFramework({ c }: { c: CaseStudy }) {
  return (
    <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
      {c.measurement.map((group) => (
        <div key={group.group} className="bg-[var(--section-bg)] p-6">
          <p className={`${MONO} text-[var(--color-primary)]`}>{group.group}</p>
          <dl className="mt-5 space-y-4">
            {group.metrics.map((m) => (
              <div key={m.name}>
                <dt className="text-sm font-medium text-white">{m.name}</dt>
                <dd className="mt-1 text-[13px] leading-5 text-white/55">{m.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

/* ── 12 Human layer ─────────────────────────────────────────────────── */

export function HumanLayer({ c }: { c: CaseStudy }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-image)] bg-white/[0.03] max-lg:aspect-[16/10]">
        <Image src={c.human.image} alt={c.human.imageAlt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover grayscale-[25%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }} />
        <p className="absolute bottom-5 left-5 right-5 font-display text-2xl leading-snug text-white">
          Technology <span className="text-white/50">supports</span> people <span className="text-white/50">who make</span>{" "}
          <span className="text-[var(--color-primary)]">decisions</span>.
        </p>
      </div>
      <div>
        <p className="text-lg leading-8 text-[var(--text-secondary)]">{c.human.intro}</p>
        <div className="mt-10">
          <p className={`${MONO} text-white/50`}>What the system does</p>
          <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {c.human.assists.map((a) => (
              <li key={a.system} className="py-3.5 text-[15px] leading-7 text-white/75">
                <span className="font-medium text-white">{a.system}</span> {a.does}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10">
          <p className={`${MONO} text-[var(--color-primary)]`}>What the team decides</p>
          <ul className="mt-4 space-y-3">
            {c.human.decisions.map((d) => (
              <li key={d} className="flex gap-3 text-[16px] leading-7 text-white/90">
                <span aria-hidden="true" className="mt-[11px] h-px w-4 shrink-0 bg-[var(--color-primary)]" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── 13 What we would build ─────────────────────────────────────────── */

export function BuildComponents({ c }: { c: CaseStudy }) {
  return (
    <div className="mt-12">
      <ol className="relative grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {c.build.map((b, i) => (
          <li key={b.component} className={`relative bg-[var(--section-bg)] p-6 sm:p-7 ${b.later ? "opacity-70" : ""}`}>
            {!b.later ? <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[var(--color-primary)]/40" /> : null}
            <div className="flex items-baseline justify-between gap-3">
              <p className={`${MONO} ${b.later ? "text-white/45" : "text-[var(--color-primary)]"}`}>{pad(i + 1)}</p>
              {b.later ? <p className={`${MONO} text-white/45`}>Later phase</p> : null}
            </div>
            <p className="mt-3 font-display text-xl font-medium text-white">{b.component}</p>
            <p className="mt-2 text-sm leading-6 text-white/65">{b.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-5 max-w-3xl text-sm leading-6 text-white/50">
        Components of one system, built in stages and connected to each other — not a list of separate services.
      </p>
    </div>
  );
}

/* ── Related thinking ───────────────────────────────────────────────── */

export function RelatedThinking({ items }: { items: { slug: string; title: string; category: string }[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className={`${MONO} text-white/50`}>Related thinking</p>
      <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
        {items.map((a) => (
          <li key={a.slug}>
            <Link href={`/insights/${a.slug}`} className="group flex items-baseline justify-between gap-6 py-4">
              <span>
                <span className={`${MONO} mr-3 text-[var(--color-primary)]`}>{a.category}</span>
                <span className="text-[15px] text-white/85 group-hover:text-white">{a.title}</span>
              </span>
              <span aria-hidden="true" className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-primary)]">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
