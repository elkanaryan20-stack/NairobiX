import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";

/**
 * The shared hero for every scenario/case-study detail page: an editorial
 * split so the title and context are visible immediately, with a controlled
 * (not full-bleed, not full-viewport) image supporting the story rather than
 * dominating the page before "01 Business Context" even starts.
 */
export function ScenarioHero({
  label,
  title,
  description,
  image,
  imageAlt,
}: {
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="border-b border-white/10">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div>
            <Eyebrow>{label} · Illustrative Scenario</Eyebrow>
            <Heading as="h1" variant="display-lg" className="mt-4">
              {title}
            </Heading>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">{description}</p>
          </div>
          <ImageFrame src={image} alt={imageAlt} aspect="wide" preload sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
      </Container>
    </section>
  );
}
