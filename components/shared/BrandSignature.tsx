import { Section } from "@/components/ui/Section";

/**
 * The closing brand moment shared by the Assessment and Consultation
 * confirmation experiences (see AssessmentReceived / GrowthSessionConfirmed).
 * Identical on purpose — this is NairobiX's signature, not page-specific copy.
 */
export function BrandSignature() {
  return (
    <Section tone="surface" border="top" spacing="compact">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-xl text-[var(--text-secondary)]">Growth doesn&apos;t happen by accident.</p>
        <p className="mt-1 font-display text-2xl font-medium text-white sm:text-3xl">It is built.</p>
        <div className="mx-auto mt-8 h-px w-12 bg-white/15" aria-hidden="true" />
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-white">NairobiX</p>
        <p className="mt-2 text-sm text-[var(--text-tertiary)]">Growth Systems for Ambitious Businesses.</p>
      </div>
    </Section>
  );
}
