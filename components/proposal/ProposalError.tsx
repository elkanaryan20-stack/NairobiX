import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import type { ProposalErrorCode } from "@/lib/proposal-response";

// Copy is deliberately generic per action/deal state — never surfaces a CRM
// id, Zoho error code, or implementation detail (AGENTS brief section 27).
const CONTENT: Record<ProposalErrorCode, { heading: string; body: string }> = {
  invalid_token: {
    heading: "This link isn't valid.",
    body: "We couldn't verify this response link. Please use the link from your original NairobiX Growth Proposal email, or contact us directly.",
  },
  expired_token: {
    heading: "This link has expired.",
    body: "This response link is no longer active. Please contact us and we'll help you move forward with your NairobiX Growth Proposal.",
  },
  invalid_action: {
    heading: "This link isn't valid.",
    body: "We couldn't verify this response link. Please use the link from your original NairobiX Growth Proposal email, or contact us directly.",
  },
  deal_not_found: {
    heading: "We couldn't find this proposal.",
    body: "We weren't able to locate this engagement. Please contact us directly and we'll help you sort it out.",
  },
  wrong_stage: {
    heading: "This proposal is no longer awaiting a response.",
    body: "This proposal has already moved forward. If you believe this is a mistake, please contact us directly.",
  },
  missing_proposal_link: {
    heading: "This proposal isn't ready yet.",
    body: "We're still finalizing this proposal on our end. Please contact us directly and we'll follow up shortly.",
  },
  crm_error: {
    heading: "Something went wrong.",
    body: "We couldn't process your response right now. Please try again in a moment, or contact us directly.",
  },
};

export function ProposalError({ code }: { code: ProposalErrorCode }) {
  const content = CONTENT[code];

  return (
    <section role="alert" className="border-b border-white/10">
      <Container width="narrow" className="py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" aria-hidden="true" />
            NairobiX Growth Proposal
          </div>

          <Heading as="h1" variant="display-lg" className="mt-6">
            {content.heading}
          </Heading>

          <p className="mt-6 text-base leading-7 text-[var(--text-secondary)]">{content.body}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" variant="primary" size="lg">
              Contact Us
            </Button>
            <Button href="/" variant="secondary" size="lg">
              Return to NairobiX
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
