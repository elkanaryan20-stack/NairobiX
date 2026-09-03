import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0b0b0d] text-white">
        <Container width="narrow" className="py-20">
          <Eyebrow>Terms</Eyebrow>
          <Heading as="h1" variant="display-lg" className="mt-4">
            Terms &amp; Conditions
          </Heading>
          <div className="mt-8 max-w-[var(--max-width-prose)] space-y-6 text-base leading-8 text-[var(--text-secondary)]">
            <p>This page is a placeholder to support the site architecture and will be replaced with a formal Terms &amp; Conditions document when required.</p>
            <p>By using this website, you agree to interact with NairobiX in a professional and lawful manner. All engagement details and project scope must be confirmed through direct communication and formal agreements.</p>
            <p>NairobiX may update these terms or the content of the site over time. Use of the site is subject to local laws and business practices.</p>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
