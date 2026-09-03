import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <Container width="narrow" className="py-20">
          <Eyebrow>Privacy Policy</Eyebrow>
          <Heading as="h1" variant="display-lg" className="mt-4">
            Privacy Policy
          </Heading>
          <div className="mt-8 max-w-[var(--max-width-prose)] space-y-6 text-base leading-8 text-[var(--text-secondary)]">
            <p>NairobiX respects your privacy and is committed to handling your information responsibly. This page is a placeholder to support the site architecture and will be replaced with a formal policy when needed.</p>
            <p>We may collect information you provide through our forms, contact pages, consultation requests and any other direct communication with NairobiX.</p>
            <p>Information is used to respond to enquiries, understand project needs, improve service delivery and maintain a better client experience.</p>
            <p>We do not sell personal information. We may share information with trusted service providers where necessary to deliver the service or where required by law.</p>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
