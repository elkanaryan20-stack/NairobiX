import type { UIFragment } from "@/lib/case-studies";

// Interface fragments: small, honest renderings of what each part of a
// designed system would look like to the people using it. They are
// deliberately partial — a fragment, not a fake product screenshot — and the
// report fragment never shows numbers, only the shape of the view.

const MONO = "font-mono text-[10px] uppercase tracking-[0.18em]";
const FRAME = "overflow-hidden rounded-lg border border-white/12 bg-[#0e0f11] shadow-[0_18px_50px_rgba(0,0,0,0.45)]";

function Landing({ f }: { f: Extract<UIFragment, { kind: "landing" }> }) {
  return (
    <div className={FRAME}>
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <span aria-hidden="true" className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        </span>
        <span className="truncate rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-white/50">{f.url}</span>
      </div>
      <div className="px-4 py-4">
        <p className={`${MONO} text-[var(--color-primary)]`}>{f.eyebrow}</p>
        <p className="mt-2 font-display text-lg leading-snug text-white">{f.headline}</p>
        <p className="mt-2 text-xs leading-5 text-white/55">{f.body}</p>
        <span className="mt-3 inline-flex rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-[11px] font-semibold text-black">{f.cta} →</span>
      </div>
    </div>
  );
}

function Chat({ f }: { f: Extract<UIFragment, { kind: "chat" }> }) {
  return (
    <div className={FRAME}>
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-3 py-2">
        <span aria-hidden="true" className="h-5 w-5 rounded-full bg-[#1f3b2c]" />
        <span className="text-[11px] font-medium text-white/80">{f.contact}</span>
      </div>
      <div className="space-y-2 px-3 py-3">
        {f.messages.map((m, i) => (
          <div key={i} className={m.from === "customer" ? "mr-6" : "ml-6"}>
            <p
              className={`rounded-lg px-3 py-2 text-xs leading-5 text-white/85 ${
                m.from === "customer" ? "rounded-tl-none bg-white/[0.07]" : "rounded-tr-none bg-[#1f3b2c]"
              }`}
            >
              {m.text}
            </p>
            {m.tag ? <p className={`mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/40 ${m.from === "business" ? "text-right" : ""}`}>{m.tag}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function Record({ f }: { f: Extract<UIFragment, { kind: "record" }> }) {
  return (
    <div className={`${FRAME} relative`}>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-[var(--color-primary)]" />
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="truncate text-xs font-medium text-white">{f.title}</span>
        <span className="shrink-0 rounded-full border border-[var(--color-primary)]/50 px-2 py-0.5 text-[10px] text-[var(--color-primary)]">{f.stage}</span>
      </div>
      <dl className="space-y-2 px-4 py-3 text-[11px]">
        {f.rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="text-white/45">{k}</dt>
            <dd className="text-right text-white/85">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Task({ f }: { f: Extract<UIFragment, { kind: "task" }> }) {
  return (
    <div className={`${FRAME} flex gap-3 px-4 py-3`}>
      <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--color-primary)]/60 text-[10px] text-[var(--color-primary)]">
        !
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-white">{f.title}</p>
        <p className="mt-0.5 font-mono text-[10px] text-white/45">{f.meta}</p>
        <p className="mt-2 text-[11px] leading-5 text-white/65">{f.body}</p>
      </div>
    </div>
  );
}

function Pipeline({ f }: { f: Extract<UIFragment, { kind: "pipeline" }> }) {
  return (
    <div className={FRAME}>
      <p className={`${MONO} border-b border-white/10 px-4 py-2.5 text-white/50`}>{f.title}</p>
      <div className="grid gap-px bg-white/[0.06]" style={{ gridTemplateColumns: `repeat(${f.columns.length}, minmax(0, 1fr))` }}>
        {f.columns.map((col) => (
          <div key={col.name} className="bg-[#0e0f11] p-2.5">
            <p className={`text-[10px] font-medium ${col.active ? "text-[var(--color-primary)]" : "text-white/55"}`}>{col.name}</p>
            <div className="mt-2 space-y-1.5">
              {col.cards.map((card) => (
                <p
                  key={card}
                  className={`rounded border px-2 py-1.5 text-[10px] leading-4 ${
                    col.active ? "border-[var(--color-primary)]/50 bg-[var(--color-primary)]/[0.08] text-white" : "border-white/10 text-white/70"
                  }`}
                >
                  {card}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Report({ f }: { f: Extract<UIFragment, { kind: "report" }> }) {
  return (
    <div className={FRAME}>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <p className={`${MONO} truncate text-white/50`}>{f.title}</p>
      </div>
      <ul className="space-y-2.5 px-4 py-3">
        {f.rows.map((r) => (
          <li key={r.label}>
            <p className="text-[11px] text-white/75">{r.label}</p>
            <div className="mt-1 h-1.5 bg-white/[0.06]">
              <div className="h-full bg-white/35" style={{ width: `${r.share * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="border-t border-white/10 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">Illustrative layout — not data</p>
    </div>
  );
}

function Assistant({ f }: { f: Extract<UIFragment, { kind: "assistant" }> }) {
  return (
    <div className={FRAME}>
      <div className="border-b border-white/10 px-4 py-3">
        <p className={`${MONO} text-white/45`}>Patient asks</p>
        <p className="mt-1.5 text-xs leading-5 text-white/85">{f.question}</p>
      </div>
      <div className="px-4 py-3">
        <p className={`${MONO} text-[var(--color-primary)]`}>{f.status}</p>
        <p className="mt-1.5 text-xs leading-5 text-white/85">{f.draft}</p>
        <p className="mt-2.5 border-l border-white/20 pl-2 font-mono text-[10px] leading-4 text-white/45">{f.source}</p>
      </div>
    </div>
  );
}

function Quote({ f }: { f: Extract<UIFragment, { kind: "quote" }> }) {
  return (
    <div className={`${FRAME} bg-[#f3f0ea]`}>
      <div className="border-b border-black/10 px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c2410c]">Quote</p>
        <p className="mt-1 font-display text-sm text-[#141414]">{f.title}</p>
      </div>
      <dl className="space-y-1.5 px-4 py-3 text-[11px]">
        {f.lines.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-dashed border-black/10 pb-1.5 last:border-0">
            <dt className="text-black/60">{k}</dt>
            <dd className="text-right font-medium text-[#141414]">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="bg-black/[0.04] px-4 py-2 font-mono text-[10px] text-black/55">{f.status}</p>
    </div>
  );
}

function Storefront({ f }: { f: Extract<UIFragment, { kind: "storefront" }> }) {
  return (
    <div className={FRAME}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className={`${MONO} text-white/45`}>Product page · mobile</span>
        <span aria-hidden="true" className="flex gap-1">
          <span className="h-1.5 w-4 rounded-full bg-white/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        </span>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs font-medium text-white">{f.product}</p>
        <p className="mt-0.5 text-[11px] text-white/50">{f.detail}</p>
        <p className="mt-2 font-mono text-xs text-white">{f.price}</p>
        <span className="mt-2.5 flex rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-[11px] font-semibold text-black">Add to cart</span>
        <ul className="mt-2.5 space-y-1">
          {f.notes.map((n) => (
            <li key={n} className="flex gap-1.5 text-[10px] leading-4 text-white/65">
              <span aria-hidden="true" className="text-[var(--color-primary)]">✓</span>
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Fragment({ fragment }: { fragment: UIFragment }) {
  switch (fragment.kind) {
    case "landing":
      return <Landing f={fragment} />;
    case "chat":
      return <Chat f={fragment} />;
    case "record":
      return <Record f={fragment} />;
    case "task":
      return <Task f={fragment} />;
    case "pipeline":
      return <Pipeline f={fragment} />;
    case "report":
      return <Report f={fragment} />;
    case "assistant":
      return <Assistant f={fragment} />;
    case "quote":
      return <Quote f={fragment} />;
    case "storefront":
      return <Storefront f={fragment} />;
  }
}
