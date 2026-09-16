import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { GrowthSystemVisualization } from "@/components/forms/GrowthSystemVisualization";
import { GrowthReviewTimeline } from "@/components/forms/GrowthReviewTimeline";
import { AssessmentNextSteps } from "@/components/forms/AssessmentNextSteps";

function personalize(firstName: string, companyName: string): string {
  const name = firstName.trim();
  const company = companyName.trim();

  if (name && company) {
    return `Good to have you with us, ${name} — we've received the growth assessment for ${company}.`;
  }
  if (name) {
    return `Good to have you with us, ${name}.`;
  }
  if (company) {
    return `We've received the growth assessment for ${company}.`;
  }
  return "Good to have you with us.";
}

/**
 * Stages Two through Four of the post-submission sequence, plus the CTA
 * gateway and closing brand moment. Rendered in place of the assessment
 * form once the Zoho submission has actually succeeded — see
 * business-growth-audit-form.tsx.
 */
export function AssessmentReceived({
  firstName,
  companyName,
}: {
  firstName: string;
  companyName: string;
}) {
  return (
    <div className="bg-[#0b0b0d] text-white">
      <section
        role="status"
        aria-live="polite"
        className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.14),transparent_40%)]"
      >
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
              Assessment received
            </div>

            <p className="mt-5 text-sm text-[var(--text-tertiary)]">
              Your business information has been successfully submitted to NairobiX.
            </p>

            <Heading as="h1" variant="display-lg" className="mt-6">
              Your growth system is now in motion.
            </Heading>

            <p className="mt-6 text-base leading-7 text-[var(--text-secondary)]">
              {personalize(firstName, companyName)}
            </p>
            <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
              We&apos;ll review your assessment across the areas that influence sustainable business
              growth — from customer acquisition and sales to digital systems, automation and
              operational efficiency.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="base">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
            The NairobiX Growth System
          </p>
          <Heading as="h2" variant="heading-lg" className="mt-4">
            Five connected areas shape how your business grows.
          </Heading>
        </div>
        <div className="mt-12">
          <GrowthSystemVisualization />
        </div>
      </Section>

      <Section tone="surface" border="top">
        <div className="mx-auto max-w-2xl text-center">
          <Heading as="h2" variant="heading-lg">
            What happens next
          </Heading>
        </div>
        <div className="mt-12">
          <GrowthReviewTimeline />
        </div>
      </Section>

      <Section tone="base" border="top">
        <AssessmentNextSteps />
      </Section>

      <Section tone="surface" border="top" spacing="compact">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-xl text-[var(--text-secondary)]">Growth doesn&apos;t happen by accident.</p>
          <p className="mt-1 font-display text-2xl font-medium text-white sm:text-3xl">It is built.</p>
          <div className="mx-auto mt-8 h-px w-12 bg-white/15" aria-hidden="true" />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-white">NairobiX</p>
          <p className="mt-2 text-sm text-[var(--text-tertiary)]">Growth Systems for Ambitious Businesses.</p>
        </div>
      </Section>
    </div>
  );
}
