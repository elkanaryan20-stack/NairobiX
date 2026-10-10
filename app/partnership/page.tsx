import type { Metadata } from "next";
import { ArrowRight, Check, Network } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Faq } from "@/components/faq";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { Reveal } from "@/components/ui/Reveal";
import { WORKSPACE_FEATURES } from "@/lib/site-data";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/structured-data";
import { OPPORTUNITY_ACCESS_OPTIONS } from "@/lib/forms/options";

const TITLE = "Opportunity Network";
const DESCRIPTION =
  "A curated network of individuals and organizations whose capabilities, expertise, relationships and opportunities can contribute to stronger business outcomes.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/partnership" });

const NEEDS_FLOW = ["Business need", "Capability", "Expertise", "Relationship", "Opportunity", "Outcome"];
const OPPORTUNITY_FLOW = ["Capability", "Requirement", "Relevance", "Matching", "Opportunity"];

const PARTICIPANT_TYPES = [
  { title: "Business consultants", detail: "Advisory and business improvement capability." },
  { title: "Marketing agencies", detail: "Marketing expertise and service delivery." },
  { title: "Business centres and service providers", detail: "Business relationships and defined services." },
  { title: "Organizations", detail: "A named applicant and capabilities relevant to business requirements." },
];

const CONTRIBUTIONS = [
  { title: "Generate opportunities", detail: "Introduce relevant business opportunities to NairobiX." },
  { title: "Provide expertise", detail: "Contribute specialist knowledge, perspective or industry experience." },
  { title: "Provide services", detail: "Bring defined capabilities or delivery capacity to relevant work." },
  { title: "Collaborate on projects", detail: "Work with NairobiX on projects that are reviewed and approved." },
];

const NETWORK_STEPS = [
  { number: "01", title: "Apply", detail: "Individuals and organizations share their capability, relationships and relevant examples." },
  { number: "02", title: "Review", detail: "NairobiX reviews the application and the information provided." },
  { number: "03", title: "Qualification", detail: "Contribution, opportunity access and evidence are assessed against current requirements." },
  { number: "04", title: "Approval and onboarding", detail: "Only qualified and approved applicants proceed to Participant onboarding." },
  { number: "05", title: "Network access", detail: "After onboarding, approved Participants receive the appropriate Workspace access." },
  { number: "06", title: "Relevant opportunities", detail: "Participants may be considered when capability and requirements are relevant." },
  { number: "07", title: "Collaboration", detail: "Any referral, assignment or project collaboration follows its own review and agreement." },
];

const PARTICIPANT_VALUE = [
  { title: "Capability in context", detail: "Describe what you can contribute so it can be considered against a real requirement." },
  { title: "A broader working ecosystem", detail: "Bring expertise and relationships into a network built around connected growth systems." },
  { title: "Structured participation", detail: "Use a managed application, qualification and onboarding process to establish how you may contribute." },
  { title: "Room for collaboration", detail: "Explore relevant ways to work together when an opportunity, capability and requirement align." },
];

const GOOD_FIT = [
  "You bring a specialist capability, service or relevant expertise.",
  "You can contribute to business opportunities or projects.",
  "You have meaningful professional or industry relationships.",
  "You represent an organization that can support relevant requirements.",
  "You are open to a structured qualification and participation process.",
];

const NOT_A_FIT = [
  "You are applying only for a job or employment placement.",
  "You expect automatic Participant approval or Portal access.",
  "You require guaranteed referrals, assignments, projects or income.",
  "You cannot describe a relevant capability, relationship or contribution.",
];

const FAQS = [
  {
    question: "What is the NairobiX Opportunity Network?",
    answer:
      "It is a managed network of qualified individuals and organizations whose capabilities, expertise, relationships and opportunities may contribute to business work around the growth systems NairobiX builds.",
  },
  {
    question: "Who can apply?",
    answer:
      "Individuals and organizations can apply. The application asks about contribution areas, opportunity access, relationships and qualification evidence so NairobiX can assess fit.",
  },
  {
    question: "Is there a fee to apply?",
    answer:
      "The current public Network information does not specify an application fee. Contact NairobiX for current terms if you need clarification before applying.",
  },
  {
    question: "What happens after I apply?",
    answer:
      "NairobiX reviews the application and assesses qualification. Applicants who qualify and are approved proceed to Participant onboarding. Approved Participants receive Network access after onboarding.",
  },
  {
    question: "Does an application guarantee approval or opportunities?",
    answer:
      "No. Submission is not approval, and Participant status does not guarantee a referral, opportunity, assignment, project, client or commercial outcome.",
  },
  {
    question: "How are Participants matched to opportunities?",
    answer:
      "NairobiX considers whether a Participant's capability is relevant to an opportunity's requirements. Matching indicates relevance for consideration; it does not itself create an assignment. Any assignment or collaboration needs its own review and agreement.",
  },
  {
    question: "When do Participants receive Workspace access?",
    answer:
      "Portal access follows qualification, approval and Participant onboarding. Submitting an application does not create a Participant account or grant access.",
  },
  {
    question: "Can an organization participate?",
    answer:
      "Yes. The application supports both Individual and Organization applicants. An organization provides a named applicant and its organization details as part of the qualification process.",
  },
];

function FlowRail({ items, label }: { items: string[]; label: string }) {
  return (
    <div className="relative" role="group" aria-label={label}>
      <span aria-hidden="true" className="absolute bottom-4 left-[5px] top-2 w-px bg-white/15 md:bottom-auto md:left-0 md:right-0 md:top-[5px] md:h-px md:w-auto" />
      <ol className={`grid gap-5 md:gap-4 ${items.length === 5 ? "md:grid-cols-5" : "md:grid-cols-6"}`}>
        {items.map((item, index) => (
          <li key={item} className="relative min-w-0 pl-7 md:pl-0 md:pt-7">
            <span aria-hidden="true" className={`absolute left-0 top-1.5 h-3 w-3 rounded-full border bg-[var(--section-bg)] md:left-0 md:top-0 ${index === items.length - 1 ? "border-[var(--color-primary)]" : "border-white/30"}`} />
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{String(index + 1).padStart(2, "0")}</span>
            <span className="mt-2 block font-display text-lg font-medium leading-6 tracking-tight text-white sm:text-xl">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function NetworkModel() {
  return (
    <figure className="relative overflow-hidden rounded-xl border border-white/10 bg-[#090a0b] p-5 sm:p-7 lg:p-8" aria-labelledby="network-model-title">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <figcaption id="network-model-title" className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">A connected opportunity system</figcaption>
        <Network className="h-4 w-4 text-[var(--color-primary)]" aria-hidden="true" />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center md:gap-3">
        <div className="border-l border-white/15 pl-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Participant capability</p>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li>Expertise</li>
            <li>Services</li>
            <li>Relationships</li>
          </ul>
        </div>
        <ArrowRight className="hidden h-4 w-4 text-white/30 md:block" aria-hidden="true" />
        <div className="border border-white/12 bg-white/[0.025] p-4 sm:p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">NairobiX</p>
          <p className="mt-2 font-display text-xl font-medium tracking-tight text-white">Growth systems</p>
          <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">Strategy · acquisition · sales · technology</p>
        </div>
        <ArrowRight className="hidden h-4 w-4 text-[var(--color-primary)] md:block" aria-hidden="true" />
        <div className="border-l border-[var(--color-primary)]/70 pl-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-primary)]">Relevant opportunity</p>
          <p className="mt-3 text-sm leading-6 text-white/85">Capability considered against a business requirement.</p>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4 text-xs leading-5 text-[var(--text-tertiary)]">
        <span className="h-px w-6 bg-[var(--color-primary)]" aria-hidden="true" />
        <span>Illustrative relationship. A match is not an assignment.</span>
      </div>
    </figure>
  );
}

export default function PartnershipPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/partnership" })} />
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        {/* 01 — Hero */}
        <section className="border-b border-white/10 bg-[#08090a]">
          <Container className="py-14 sm:py-18 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-20">
              <Reveal>
                <div className="max-w-2xl">
                  <Eyebrow>OPPORTUNITY NETWORK</Eyebrow>
                  <Heading as="h1" variant="display-lg" className="mt-5 text-balance">
                    Where capability, relationships and opportunity connect.
                  </Heading>
                  <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
                    NairobiX builds connected growth systems for businesses. The Opportunity Network brings together
                    qualified people and organizations whose expertise, services and relationships may strengthen the
                    work around those systems.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button href="/partner" variant="primary" className="min-h-12">Apply to the Opportunity Network →</Button>
                    <Button href="#network" variant="secondary" className="min-h-12">Understand the Network ↓</Button>
                  </div>
                  <p className="mt-5 text-xs leading-5 text-[var(--text-tertiary)]">A managed network. Applications are reviewed; participation is by qualification and approval.</p>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <NetworkModel />
              </Reveal>
            </div>
          </Container>
        </section>

        {/* 02 — Why */}
        <Section tone="warmth" spacing="default">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
            <Reveal>
              <Eyebrow>WHY THE NETWORK EXISTS</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">Good opportunities rarely exist in isolation.</Heading>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                A business need may call for a capability, specialist expertise, a trusted relationship or a different
                perspective before it can move forward. NairobiX builds the growth system around the need; the Network
                extends the capabilities and relationships that may be relevant to it.
              </p>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <div className="mt-12 border-y border-white/10 py-7 sm:mt-16 sm:py-9">
              <FlowRail items={NEEDS_FLOW} label="Business need to outcome: business need, capability, expertise, relationship, opportunity, outcome" />
            </div>
          </Reveal>
        </Section>

        {/* 03 — Definition */}
        <Section tone="core" border="top" id="network" className="scroll-mt-[72px]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <Eyebrow>WHAT THE NETWORK IS</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">The Opportunity Network extends the system.</Heading>
              <p className="mt-6 text-base leading-7 text-[var(--text-secondary)]">
                It is a curated, managed ecosystem of qualified Participants whose capabilities and relationships can
                contribute to relevant opportunities connected to NairobiX growth systems.
              </p>
              <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                It is not a public directory, marketplace, job board or open affiliate program. Application, Participant
                qualification, opportunity matching and assignment are separate stages.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <dl className="divide-y divide-white/10 border-y border-white/10">
                <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-primary)]">Applicant</dt>
                  <dd className="text-sm leading-6 text-[var(--text-secondary)]">A person or organization whose application is under review. Applying does not make someone a Participant.</dd>
                </div>
                <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-primary)]">Opportunity Network Participant</dt>
                  <dd className="text-sm leading-6 text-[var(--text-secondary)]">An applicant who is qualified, approved and onboarded into the Opportunity Network.</dd>
                </div>
                <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-primary)]">Opportunity</dt>
                  <dd className="text-sm leading-6 text-[var(--text-secondary)]">A business requirement or potential engagement that may call for relevant capability.</dd>
                </div>
                <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-primary)]">Partnership</dt>
                  <dd className="text-sm leading-6 text-[var(--text-secondary)]">A possible form of collaboration. It is not created automatically by an application or a match.</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </Section>

        {/* 04 — Who */}
        <Section tone="surface" border="top">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal>
              <Eyebrow>WHO CAN PARTICIPATE</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">Capability matters more than a title.</Heading>
              <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                Individuals and organizations may apply. The Network is relevant to people and teams with a clear way to
                contribute to business needs, delivery or relationships.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {PARTICIPANT_TYPES.map((type, index) => (
                  <li key={type.title} className="grid gap-2 py-4 sm:grid-cols-[2.5rem_minmax(10rem,0.8fr)_1.2fr] sm:items-baseline sm:gap-4 sm:py-5">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-primary)]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-base font-medium text-white">{type.title}</span>
                    <span className="text-sm leading-6 text-[var(--text-tertiary)]">{type.detail}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">These are examples, not a closed list. Qualification is assessed individually against relevant needs.</p>
            </Reveal>
          </div>
        </Section>

        {/* 05 — Contribution */}
        <Section tone="blueprint" border="top">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
              <div>
                <Eyebrow>CONTRIBUTION AREAS</Eyebrow>
                <Heading as="h2" variant="display-md" className="mt-4">Bring a capability the work can use.</Heading>
              </div>
              <p className="max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                The application asks what you can contribute. Select one or more areas and support them with relevant
                examples, experience or links.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 grid border-y border-white/10 sm:grid-cols-2 sm:divide-x sm:divide-white/10">
              {CONTRIBUTIONS.map((item, index) => (
                <article key={item.title} className={`py-6 sm:px-6 lg:py-7 ${index > 1 ? "border-t border-white/10" : ""} ${index % 2 === 0 ? "sm:pl-0" : ""} ${index % 2 === 1 ? "sm:pr-0" : ""}`}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)]">0{index + 1}</p>
                  <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-white">{item.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">{item.detail}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* 06 — Opportunity access */}
        <Section tone="technical" border="top">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start lg:gap-16">
            <Reveal>
              <Eyebrow>OPPORTUNITY ACCESS</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">Relevance comes before participation.</Heading>
              <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                A Participant may be considered when their capability aligns with a requirement. Matching helps identify
                relevance; NairobiX reviews the fit before any next step.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="border-y border-white/10 py-7 sm:py-9">
                <FlowRail items={OPPORTUNITY_FLOW} label="Opportunity relevance sequence: capability, requirement, relevance, matching, opportunity" />
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="border-l border-[var(--color-primary)] pl-4">
                  <p className="text-sm font-semibold text-white">Matching ≠ Assignment</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-tertiary)]">A match signals possible relevance. It does not reserve work, assign a Participant or create an engagement.</p>
                </div>
                <div className="border-l border-white/20 pl-4">
                  <p className="text-sm font-semibold text-white">Referral ≠ guarantee</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-tertiary)]">Referrals and opportunities depend on fit and review. None are guaranteed by application or participation.</p>
                </div>
              </div>
              <div className="mt-7 border-l border-white/15 pl-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Access areas captured in the application</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{OPPORTUNITY_ACCESS_OPTIONS.join(" · ")}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">These describe who an applicant may reach; each opportunity is still reviewed for relevance.</p>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* 07 — How it works */}
        <Section tone="flow" border="top" id="how-it-works" className="scroll-mt-[72px]">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>HOW THE NETWORK WORKS</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">A managed path from application to collaboration.</Heading>
              <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">The gate is deliberate: qualification and approval come before Participant onboarding and Portal access.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ol className="mt-10 grid border-y border-white/10 sm:grid-cols-2 sm:divide-x sm:divide-white/10 lg:grid-cols-4">
              {NETWORK_STEPS.map((step, index) => (
                <li key={step.number} className={`relative py-5 sm:px-5 sm:py-6 lg:min-h-44 ${index > 1 ? "border-t border-white/10 sm:border-t-0" : ""} ${index > 3 ? "lg:border-t lg:border-white/10" : ""} ${index % 2 === 0 ? "sm:pl-0 lg:pl-5" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-mono ${index < 4 ? "border-[var(--color-primary)]/70 text-[var(--color-primary)]" : "border-white/20 text-white/60"}`}>{step.number}</span>
                    <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="mt-3 pl-10 text-sm leading-6 text-[var(--text-tertiary)]">{step.detail}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-6 flex items-start gap-3 text-sm leading-6 text-[var(--text-secondary)]">
              <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
              <p>Application submission alone does not make someone a Participant, create an assignment or grant Portal entitlement.</p>
            </div>
          </Reveal>
        </Section>

        {/* 08 — Participant experience */}
        <Section tone="interface" border="top">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
            <Reveal>
              <Eyebrow>PARTICIPANT EXPERIENCE</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">A shared workspace for the work around the network.</Heading>
              <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                After approval and onboarding, active Network Participants receive access to the NairobiX Network
                Workspace. It keeps project communication and updates connected to the work.
              </p>
              <p className="mt-4 text-sm leading-6 text-[var(--text-tertiary)]">Workspace access is an entitlement after approval and onboarding, not part of the application.</p>
            </Reveal>
            <Reveal delay={120}>
              <div className="border-y border-white/10">
                {WORKSPACE_FEATURES.map((feature, index) => (
                  <div key={feature.id} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--color-primary)]">0{index + 1}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--text-tertiary)]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* 09 — Why participate */}
        <Section tone="business" border="top">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-14">
              <div>
                <Eyebrow>WHY PARTICIPATE</Eyebrow>
                <Heading as="h2" variant="display-md" className="mt-4">A clearer context for contribution.</Heading>
              </div>
              <p className="max-w-xl text-base leading-7 text-[var(--text-secondary)]">
                Participation creates a structured way for NairobiX to understand a capability and consider it where it
                is relevant. The value is in fit and contribution, not a promise of work.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
              {PARTICIPANT_VALUE.map((item, index) => (
                <li key={item.title} className="border-t border-white/15 py-5 lg:py-6">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--color-primary)]">0{index + 1}</span>
                  <h3 className="mt-3 text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-tertiary)]">{item.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">These are possible participation benefits, not guaranteed commercial outcomes.</p>
          </Reveal>
        </Section>

        {/* 10 — Qualification */}
        <Section tone="graphite" border="top">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>WHO SHOULD APPLY</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">Apply when you can point to a relevant contribution.</Heading>
              <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">The application is for individuals and organizations with something specific to bring into a managed business network.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-9 grid gap-10 border-t border-white/10 pt-7 md:grid-cols-2 md:gap-14">
              <div>
                <h3 className="text-sm font-semibold text-white">The Network may be relevant if you…</h3>
                <ul className="mt-5 space-y-3">
                  {GOOD_FIT.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]"><Check className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />{item}</li>)}
                </ul>
              </div>
              <div className="md:border-l md:border-white/10 md:pl-10">
                <h3 className="text-sm font-semibold text-white">It may not be the right path if you…</h3>
                <ul className="mt-5 space-y-3">
                  {NOT_A_FIT.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--text-tertiary)]"><span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-white/35" />{item}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* 11 — Application bridge */}
        <Section tone="focus" border="top" spacing="lead">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
              <div className="max-w-3xl">
                <Eyebrow>THE APPLICATION</Eyebrow>
                <Heading as="h2" variant="display-md" className="mt-4">Think you can contribute to the Network?</Heading>
                <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
                  The application captures who you are, how you can contribute, the opportunities and relationships you
                  can access, and examples that support your qualification. NairobiX reviews each submission.
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">Applying does not mean approval or immediate Participant or Portal access.</p>
              </div>
              <Button href="/partner" variant="primary" className="min-h-12 justify-self-start lg:justify-self-end">Apply to the Opportunity Network →</Button>
            </div>
          </Reveal>
        </Section>

        {/* 12 — FAQ */}
        <Section tone="core" border="top" id="faq" className="scroll-mt-[72px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-16">
            <Reveal>
              <Eyebrow>QUESTIONS, ANSWERED</Eyebrow>
              <Heading as="h2" variant="display-md" className="mt-4">Before you apply.</Heading>
              <p className="mt-5 text-sm leading-6 text-[var(--text-tertiary)]">The Network is reviewed and managed by NairobiX. If your question is not covered, start a conversation with the team.</p>
              <Button href="/contact" variant="secondary" className="mt-6">Talk to NairobiX →</Button>
            </Reveal>
            <Reveal delay={120}>
              <Faq items={FAQS} single />
            </Reveal>
          </div>
        </Section>

        {/* 13 — Final CTA */}
        <CTASection
          tone="deep"
          eyebrow="OPPORTUNITY NETWORK"
          title="Bring your capability into a stronger network."
          description="NairobiX is looking for relevant capability, expertise, relationships and opportunity—not simply more contacts. Tell us what you can contribute and let the qualification process determine fit."
          detail={<p className="mt-7 text-xs leading-5 text-[var(--text-tertiary)]">An application is the start of a review, not a promise of approval, referral or assignment.</p>}
        >
          <Button href="/partner" variant="primary" className="min-h-12">Apply to the Opportunity Network →</Button>
          <Button href="/contact" variant="secondary" className="min-h-12">Talk to NairobiX →</Button>
        </CTASection>
      </main>
      <SiteFooter />
    </>
  );
}
