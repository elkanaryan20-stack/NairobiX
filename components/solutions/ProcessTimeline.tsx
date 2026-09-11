import { Heading } from "@/components/ui/Heading";

type Stage = { stage: string; description: string };

/** A connected timeline for the 5-stage process — horizontal with a linking line on desktop, vertical on mobile. */
export function ProcessTimeline({ stages }: { stages: Stage[] }) {
  return (
    <ol className="flex flex-col gap-8 lg:flex-row lg:gap-6">
      {stages.map((item, index) => (
        <li key={item.stage} className="relative flex-1 pl-6 lg:pl-0 lg:pt-7">
          <span
            aria-hidden="true"
            className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-[var(--color-primary)] lg:top-0"
          />
          {index < stages.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute left-[3px] top-4 bottom-[-2rem] w-px bg-white/10 lg:left-2 lg:right-0 lg:top-[3px] lg:h-px lg:w-auto lg:bottom-auto"
            />
          ) : null}
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            0{index + 1}
          </div>
          <Heading variant="heading-md" as="h3">
            {item.stage}
          </Heading>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
