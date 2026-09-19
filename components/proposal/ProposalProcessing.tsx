import { Container } from "@/components/ui/Container";

/**
 * Loading state shown while the response POST is in flight — see
 * ProposalResponseClient. A single restrained state (no multi-stage
 * sequence like AssessmentSubmissionTransition) since this is a much
 * shorter operation than a full assessment submission.
 */
export function ProposalProcessing() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.14),transparent_40%)]"
    >
      <Container width="narrow" className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
            NairobiX Growth Proposal
          </p>

          <h1 className="mt-6 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
            Processing your response
          </h1>

          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
            Please wait while we securely update your NairobiX engagement.
          </p>

          <span className="mt-10 inline-flex gap-1.5" aria-hidden="true">
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-primary)]"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-primary)]"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-primary)]"
              style={{ animationDelay: "300ms" }}
            />
          </span>
        </div>
      </Container>
    </div>
  );
}
