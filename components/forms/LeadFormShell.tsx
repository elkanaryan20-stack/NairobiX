import type { ReactNode } from "react";

export function LeadFormShell({
  icon,
  eyebrow,
  title,
  description,
  children,
}: {
  icon: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-[#0b0b0d] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),transparent_40%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">{icon}</span>
              {eyebrow}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-5 sm:p-8 lg:p-10">{children}</div>
      </section>
    </main>
  );
}

export function FormSuccessState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}) {
  return (
    <div className="mx-auto max-w-2xl rounded-[28px] border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-2xl text-emerald-300">✓</div>
      <h2 className="text-3xl font-semibold text-white">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
      <a
        href={actionHref}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ea6a16]"
      >
        {actionLabel}
      </a>
    </div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="mb-6 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
      {message}
    </div>
  );
}
