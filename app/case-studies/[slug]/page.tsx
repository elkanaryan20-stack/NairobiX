import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_SOLUTIONS, CASE_STUDIES, INDUSTRIES } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";
import { ScenarioHero } from "@/components/solutions/ScenarioHero";
import { ScenarioSection } from "@/components/solutions/ScenarioSection";
import { ProblemFlow } from "@/components/solutions/ProblemFlow";
import { SystemFlow } from "@/components/solutions/SystemFlow";
import { ProcessTimeline } from "@/components/solutions/ProcessTimeline";
import { PortalPreview } from "@/components/solutions/PortalPreview";
import { OutcomeMetrics } from "@/components/solutions/OutcomeMetrics";
import { SectionRail } from "@/components/solutions/SectionRail";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const study = CASE_STUDIES.find((item) => item.slug === slug);
    if (!study) {
      return pageMetadata({
        title: "Scenario",
        description: "Illustrative growth system scenario by NairobiX.",
        path: `/case-studies/${slug}`,
      });
    }

    return pageMetadata({
      title: study.title,
      description: study.description,
      path: `/case-studies/${slug}`,
    });
  });
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  const industry = INDUSTRIES.find((item) => item.caseStudySlug === study.slug);
  const primarySolution = ALL_SOLUTIONS.find((item) => item.id === study.primarySolutionId);
  const otherRelatedSolutions = ALL_SOLUTIONS.filter(
    (item) => industry?.relevantSolutionIds.includes(item.id) && item.id !== primarySolution?.id
  );

  const railSections = [
    { id: "context", label: "Context" },
    { id: "problem", label: "Problem" },
    ...(industry ? [{ id: "requirements", label: "Requirements" }] : []),
    ...(primarySolution ? [{ id: "system", label: "System" }] : []),
    ...(primarySolution ? [{ id: "how-it-works", label: "How It Works" }] : []),
    ...(primarySolution ? [{ id: "experience", label: "Experience" }] : []),
    ...(industry ? [{ id: "outcomes", label: "Outcomes" }] : []),
    { id: "why-it-matters", label: "Why It Matters" },
    { id: "related", label: "Related Solution" },
  ];

  return (
    <>
      <JsonLd
        data={webPageJsonLd({ name: study.title, description: study.description, path: `/case-studies/${study.slug}` })}
      />
      <SiteHeader />
      <SectionRail sections={railSections} />
      <main className="bg-[#0b0b0d] text-white">
        {/* Hero */}
        <ScenarioHero
          label={study.label}
          title={study.title}
          description={`An illustrative look at how a connected growth system could transform ${study.label.toLowerCase()} operations and customer experience — not documented results from a named client.`}
          image={study.image}
          imageAlt={study.imageAlt}
        />

        {/* 01 Business Context */}
        <ScenarioSection id="context" number="01" eyebrow="Business Context" title={study.label} border="none">
          <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">{study.businessContext}</p>
        </ScenarioSection>

        {/* 02 The Growth Problem */}
        <ScenarioSection id="problem" number="02" eyebrow="The Growth Problem" title="What's actually broken." tone="surface">
          <ProblemFlow steps={study.growthProblemFlow} />
        </ScenarioSection>

        {/* 03 What the Business Needs */}
        {industry ? (
          <ScenarioSection id="requirements" number="03" eyebrow="What The Business Needs" title="Translating the problem into requirements.">
            <div className="grid gap-4 sm:grid-cols-2">
              {industry.opportunities.map((point, index) => (
                <div key={point} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <span className="text-xs font-semibold text-[var(--color-primary)]">0{index + 1}</span>
                  <p className="mt-2 text-base leading-7 text-white">{point}</p>
                </div>
              ))}
            </div>
          </ScenarioSection>
        ) : null}

        {/* 04 NairobiX System */}
        {primarySolution ? (
          <ScenarioSection id="system" number="04" eyebrow="The NairobiX System" title="The connected system proposed." tone="surface">
            <p className="mb-10 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
              Built around {primarySolution.title} — the same system detailed on the{" "}
              <span className="text-white">{primarySolution.title}</span> solution page, applied to this scenario.
            </p>
            <SystemFlow nodes={primarySolution.systemFlow} />
          </ScenarioSection>
        ) : null}

        {/* 05 How It Works */}
        {primarySolution ? (
          <ScenarioSection id="how-it-works" number="05" eyebrow="How It Works" title="Discover, design, implement, integrate, optimize.">
            <ProcessTimeline stages={primarySolution.process} />
          </ScenarioSection>
        ) : null}

        {/* 06 Client Experience */}
        {primarySolution ? (
          <ScenarioSection id="experience" number="06" eyebrow="Client Experience" title="How the business would see it." tone="surface">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <p className="text-base leading-7 text-[var(--text-secondary)]">
                {industry?.approach ?? "The business gets a single, shared view of the system — not a set of disconnected tools and inboxes."}
              </p>
              <PortalPreview preview={primarySolution.portalPreview} />
            </div>
          </ScenarioSection>
        ) : null}

        {/* 07 Expected Outcomes */}
        {industry ? (
          <ScenarioSection id="outcomes" number="07" eyebrow="Expected Outcomes" title="Illustrative, directional outcomes.">
            <OutcomeMetrics metrics={study.outcomeMetrics} outcomes={industry.outcomes} />
          </ScenarioSection>
        ) : null}

        {/* 08 Why This System Matters */}
        <ScenarioSection id="why-it-matters" number="08" eyebrow="Why This System Matters" title="The strategic read." tone="surface">
          <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">{study.whyItMatters}</p>
        </ScenarioSection>

        {/* 09 Related Solution */}
        <ScenarioSection id="related" number="09" eyebrow="Related Solution" title="Explore the system behind this scenario.">
          <div className="flex flex-wrap gap-3">
            {primarySolution ? (
              <Button href={`/solutions/${primarySolution.id}`} variant="primary" size="md">
                Explore {primarySolution.title} →
              </Button>
            ) : null}
            {otherRelatedSolutions.map((solution) => (
              <Button key={solution.id} href={`/solutions/${solution.id}`} variant="secondary" size="md">
                Explore {solution.title} →
              </Button>
            ))}
            {industry ? (
              <Button href={`/industries/${industry.slug}`} variant="secondary" size="md">
                {industry.name} Industry →
              </Button>
            ) : null}
          </div>
        </ScenarioSection>

        <div className="border-t border-white/10 bg-[#111214]">
          <Container className="py-20 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow className="justify-center">NEXT STEP</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">
                Build a Similar Growth System
              </Heading>
              <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
                If this challenge sounds familiar, we can map the right growth system for your
                business and identify the most valuable opportunities to act on.
              </p>
              <Button href="/business-growth-audit" variant="primary" className="mt-8">
                Get Your Growth Assessment →
              </Button>
            </div>
          </Container>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
