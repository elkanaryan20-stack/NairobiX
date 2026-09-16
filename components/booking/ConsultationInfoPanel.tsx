import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

const DISCUSSION_POINTS = [
  {
    title: "Your current growth priority",
    text: "What you're trying to move forward right now, in your own terms.",
  },
  {
    title: "The biggest constraint",
    text: "What's actually holding growth back — not just where it shows up.",
  },
  {
    title: "Acquisition and sales process",
    text: "How customers find you today, and what happens after they do.",
  },
  {
    title: "Where systems could help",
    text: "Automation, CRM, AI or digital systems — only where they'd genuinely move things forward.",
  },
  {
    title: "The next practical step",
    text: "A clear, specific recommendation you can act on — not a sales pitch.",
  },
];

/**
 * "What we'll discuss" — an editorial numbered list matching the site's
 * existing convention (see GROWTH_APPROACH / ENGAGEMENT_PROCESS on the
 * homepage), not a card grid. Sets expectations before the calendar so the
 * booking feels like reserving a specific conversation, not an appointment.
 */
export function ConsultationInfoPanel() {
  return (
    <div>
      <div className="max-w-2xl">
        <Eyebrow>WHAT WE&apos;LL DISCUSS</Eyebrow>
        <Heading variant="display-md" className="mt-4">
          Thirty minutes, used deliberately.
        </Heading>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {DISCUSSION_POINTS.map((point, index) => (
          <div
            key={point.title}
            className={
              index > 0
                ? "border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0"
                : ""
            }
          >
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
              0{index + 1}
            </div>
            <p className="text-base font-medium text-white">{point.title}</p>
            <p className="mt-2.5 text-sm leading-6 text-[var(--text-secondary)]">{point.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
