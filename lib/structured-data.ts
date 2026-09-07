import { SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/site-data";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const LOGO_URL = `${SITE_URL}/images/NairobiX-logo.png`;

/** Sitewide identity — rendered once in the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    sameAs: SOCIAL_LINKS.filter((link) => link.icon !== "whatsapp").map((link) => link.href),
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        contactType: "customer service",
      },
    ],
  };
}

/** Sitewide site descriptor — rendered once in the root layout. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

/** Lightweight per-page descriptor mirroring that page's own metadata. */
export function webPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/** Service catalog for /solutions, built from the site's own solution categories. */
export function serviceListJsonLd(
  categories: { items: { title: string; description: string; href: string }[] }[]
) {
  const services = categories.flatMap((category) => category.items);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: `${SITE_URL}${service.href}`,
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: "Kenya",
      },
    })),
  };
}
