import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { GrowthReviewTimeline, type GrowthReviewStep } from "@/components/forms/GrowthReviewTimeline";
import { BrandSignature } from "@/components/shared/BrandSignature";

const NEXT_STEPS: GrowthReviewStep[] = [
  {
    number: "01",
    title: "Review",
    description: "We review the information you've provided.",
    complete: true,
  },
  {
    number: "02",
    title: "Qualification",
    description: "We assess your potential contribution against current Network requirements.",
    complete: false,
  },
  {
    number: "03",
    title: "Next Step",
    description: "If your application progresses, we'll provide instructions for the next stage.",
    complete: false,
  },
];

/**
 * Mirrors AssessmentReceived.tsx's structure for the Opportunity Network
 * application — rendered once the submission has actually succeeded (see
 * growth-partner-form.tsx). Deliberately does not display Application ID/
 * CRM ID (brief section 15) or imply guaranteed admission.
 */
export function OpportunityApplicationReceived({ firstName }: { firstName: string }) {
  const name = firstName.trim();

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
              Application received
            </div>

            <Heading as="h1" variant="display-lg" className="mt-6">
              Application received.
            </Heading>

            <p className="mt-6 text-base leading-7 text-[var(--text-secondary)]">
              {name ? `Thank you, ${name}. ` : ""}Your application has been successfully submitted to the NairobiX
              Opportunity Network.
            </p>
            <p className="mt-4 text-sm text-[var(--text-tertiary)]">
              Application does not guarantee admission. Network participation does not guarantee referrals,
              assignments, projects, clients, revenue or other commercial outcomes.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <Heading as="h2" variant="heading-lg">
            What happens next
          </Heading>
        </div>
        <div className="mt-12">
          <GrowthReviewTimeline steps={NEXT_STEPS} />
        </div>
      </Section>

      <Section tone="base" border="top">
        <div className="mx-auto max-w-2xl text-center">
          <Button href="/" variant="primary" size="lg">
            Return to NairobiX
          </Button>
        </div>
      </Section>

      <BrandSignature />
    </div>
  );
}
