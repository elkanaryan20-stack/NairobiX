import type { Metadata } from "next";

export const SITE_NAME = "NairobiX";
export const SITE_URL = "https://nairobix.com";

export const HOME_TITLE = "NairobiX | Premium Business Growth Systems";
export const HOME_DESCRIPTION =
  "NairobiX helps ambitious businesses grow through digital marketing, CRM, automation, AI, web solutions and scalable growth systems.";

/**
 * A page's own `openGraph` object replaces the root layout's file-convention
 * fallback rather than merging with it, so `opengraph-image.tsx` never gets
 * picked up once a page sets `openGraph.title`/`description`. Every page
 * built via `pageMetadata`/`homeMetadata` re-declares the same OG image here
 * instead, so it's included everywhere.
 */
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "NairobiX — Premium Business Growth Systems",
};

/** Homepage metadata is a special case: its title is already the full, absolute
 * string (not run through the root layout's "%s | NairobiX" template), so it's
 * built separately from `pageMetadata` rather than reusing it. */
export function homeMetadata(): Metadata {
  return {
    title: { absolute: HOME_TITLE },
    description: HOME_DESCRIPTION,
    alternates: { canonical: "/" },
    openGraph: {
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_NAME,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      images: [OG_IMAGE.url],
    },
  };
}

/**
 * Builds a complete, self-contained Metadata object for a route.
 *
 * Next.js merges metadata across the segment tree shallowly, replacing
 * whole top-level keys (e.g. `openGraph`) rather than deep-merging them —
 * so a page that only sets `openGraph.title` silently loses the layout's
 * `siteName`/`type`/`url`. Building the full object per page here avoids
 * that footprint entirely, and keeps `<title>` (templated once by the root
 * layout) and `openGraph.title` (not templated) both correct.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
