import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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
    <div className="bg-[#0b0b0d] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.14),transparent_40%)]">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
                {icon}
              </span>
              {eyebrow}
            </div>
            <Heading as="h1" variant="display-lg">
              {title}
            </Heading>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">{description}</p>
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <Card variant="outline" className="p-5 sm:p-8 lg:p-10">
          {children}
        </Card>
      </Container>
    </div>
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
    <div className="mx-auto max-w-2xl rounded-[var(--radius-card)] border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-2xl text-emerald-300">
        ✓
      </div>
      <Heading as="h2" variant="heading-lg">
        {title}
      </Heading>
      <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">{description}</p>
      <Button href={actionHref} variant="primary" className="mt-6">
        {actionLabel}
      </Button>
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
