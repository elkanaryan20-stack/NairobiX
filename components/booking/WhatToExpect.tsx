import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

/**
 * "What to expect" — the message that NairobiX prepares before the
 * conversation. `fromAssessment` is only ever true when the visitor arrived
 * via the Growth Assessment's own "Book a Consultation" link (see
 * AssessmentNextSteps, which appends ?ref=assessment) — the one signal this
 * page actually has. Absent that, the copy stays honest about not assuming
 * an assessment exists, while still explaining that whatever is shared in
 * this booking form is used to prepare for the call.
 */
export function WhatToExpect({ fromAssessment }: { fromAssessment: boolean }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
      <div>
        <Eyebrow>WHAT TO EXPECT</Eyebrow>
        <Heading variant="display-md" className="mt-4">
          This isn&apos;t a generic sales call.
        </Heading>
      </div>
      <div className="space-y-5 text-base leading-7 text-[var(--text-secondary)]">
        {fromAssessment ? (
          <p>
            We&apos;ll use the information from your Growth Assessment and this booking to understand
            your business context before recommending a path forward.
          </p>
        ) : (
          <p>
            We&apos;ll use what you share in this booking form to understand your business context
            before the conversation. If you&apos;ve also completed a Growth Assessment, we&apos;ll bring
            that into the same review.
          </p>
        )}
        <p>
          NairobiX prepares before the conversation — so the thirty minutes go toward your business,
          not an introduction.
        </p>
      </div>
    </div>
  );
}
