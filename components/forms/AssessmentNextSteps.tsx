import { Button } from "@/components/ui/Button";
import { BOOKING_URL } from "@/lib/site-data";

/**
 * The CTA gateway into NairobiX's next conversion stage. Reuses the site's
 * existing booking destination (BOOKING_URL) rather than inventing a new
 * one — Book a Consultation is the primary path, Explore NairobiX the
 * secondary path for visitors not ready to book yet.
 */
export function AssessmentNextSteps() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
      <p className="text-sm text-[var(--text-secondary)]">Ready for the next step?</p>
      <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
        <Button href={BOOKING_URL} variant="primary" size="lg" className="w-full sm:w-auto">
          Book a Consultation →
        </Button>
        <Button href="/" variant="secondary" size="lg" className="w-full sm:w-auto">
          Explore NairobiX →
        </Button>
      </div>
    </div>
  );
}
