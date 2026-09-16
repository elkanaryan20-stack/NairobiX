import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { GrowthReviewTimeline, type GrowthReviewStep } from "@/components/forms/GrowthReviewTimeline";
import { BrandSignature } from "@/components/shared/BrandSignature";

const NEXT_STEPS: GrowthReviewStep[] = [
  {
    number: "01",
    title: "Session Confirmed",
    description: "Your NairobiX Growth Session is scheduled.",
    complete: true,
  },
  {
    number: "02",
    title: "Context",
    description: "We'll use the information you've shared to understand the areas you want to address.",
    complete: false,
  },
  {
    number: "03",
    title: "Growth Conversation",
    description: "We'll focus on your business, current constraints and practical opportunities.",
    complete: false,
  },
];

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-[var(--text-tertiary)]">{label}</span>
      <span className="text-right font-medium text-white">{value}</span>
    </div>
  );
}

/**
 * The consultation's equivalent of AssessmentReceived — reached once the
 * real Zoho Bookings appointment has actually been created (see
 * BookingFlow's handleConfirm). Shares the assessment confirmation's
 * typography, spacing and node-timeline grammar, but is about reserving a
 * conversation rather than initiating a review — no Assessment/Booking ID,
 * no "Add to Calendar", a single CTA.
 */
export function GrowthSessionConfirmed({
  formattedDate,
  formattedTime,
  email,
  discussionTopic,
}: {
  formattedDate: string;
  formattedTime: string;
  email: string;
  discussionTopic: string;
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
              NairobiX Growth Session
            </div>

            <Heading as="h1" variant="display-lg" className="mt-6">
              Your session is confirmed.
            </Heading>

            <p className="mt-6 text-base leading-7 text-[var(--text-secondary)]">
              We&apos;re looking forward to the conversation.
            </p>
            <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
              A focused conversation about your business, its current constraints and the systems
              that can support its next stage of growth.
            </p>

            <Card variant="surface" className="mx-auto mt-10 max-w-md space-y-4 p-6 text-left text-sm sm:p-8">
              <SummaryRow label="Date" value={formattedDate} />
              <SummaryRow label="Time" value={formattedTime} />
              <SummaryRow label="Duration" value="30 minutes" />
              <SummaryRow label="Timezone" value="EAT · East Africa Time" />
            </Card>

            <p className="mx-auto mt-8 max-w-md text-sm leading-6 text-[var(--text-tertiary)]">
              A confirmation has been sent to {email}. Our team will reach out shortly before your
              session to confirm the meeting link.
            </p>
          </div>
        </Container>
      </section>

      {discussionTopic ? (
        <Section tone="base">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
              Your conversation focus
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 px-4 py-2 text-sm font-medium text-white">
              {discussionTopic}
            </div>
            <p className="mt-6 text-sm leading-6 text-[var(--text-secondary)]">
              We&apos;ll use this to keep the conversation focused from the first minute.
            </p>
          </div>
        </Section>
      ) : null}

      <Section tone="surface" border="top">
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
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <Button href="/" variant="primary" size="lg">
            Explore NairobiX →
          </Button>
        </div>
      </Section>

      <BrandSignature />
    </div>
  );
}
