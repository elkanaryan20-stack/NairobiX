import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import type { ProposalAction } from "@/lib/proposal-response";

const CONTENT: Record<ProposalAction, { status: string; heading: string; body: string }> = {
  proceed: {
    status: "Response received",
    heading: "Response received.",
    body: "Thank you. We've received your response to the NairobiX Growth Proposal. Our team will guide you through the next steps, including the appropriate commercial and agreement process.",
  },
  discuss: {
    status: "Request received",
    heading: "Let's continue the conversation.",
    body: "We've received your request to discuss the proposal. A NairobiX representative will follow up to continue the conversation and address any questions regarding the recommended solution, scope, investment, or next steps.",
  },
  changes: {
    status: "Request received",
    heading: "Request received.",
    body: "We've received your request to review the proposal. Our team will review the requested changes and follow up with you regarding the next step.",
  },
};

export function ProposalConfirmation({
  action,
  isDuplicate,
}: {
  action: ProposalAction;
  isDuplicate: boolean;
}) {
  const content = CONTENT[action];

  return (
    <section
      role="status"
      aria-live="polite"
      className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.14),transparent_40%)]"
    >
      <Container width="narrow" className="py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
            {content.status}
          </div>

          {isDuplicate ? (
            <p className="mt-5 text-sm text-[var(--text-tertiary)]">
              We&apos;ve already received this response — here&apos;s your confirmation again.
            </p>
          ) : null}

          <Heading as="h1" variant="display-lg" className="mt-6">
            {content.heading}
          </Heading>

          <p className="mt-6 text-base leading-7 text-[var(--text-secondary)]">{content.body}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/" variant="primary" size="lg">
              Return to NairobiX
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
