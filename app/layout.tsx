import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { NiaWidget } from "@/components/nia/NiaWidget";
import { JsonLd } from "@/components/JsonLd";
import { AttributionTracker } from "@/components/AttributionTracker";
import { CookieConsent } from "@/components/privacy/CookieConsent";
import { SITE_URL, HOME_TITLE, HOME_DESCRIPTION } from "@/lib/seo";
import { TRACKING } from "@/lib/tracking-config";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s | NairobiX",
  },
  description: HOME_DESCRIPTION,
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    siteName: "NairobiX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  alternates: {
    canonical: "/",
  },
  // Ownership verification tags — rendered only when their tokens are configured.
  verification: TRACKING.googleSiteVerification ? { google: TRACKING.googleSiteVerification } : undefined,
  other: TRACKING.facebookDomainVerification ? { "facebook-domain-verification": TRACKING.facebookDomainVerification } : undefined,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0b0d] text-white">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={localBusinessJsonLd()} />

        <CookieConsent />
        <AttributionTracker />

        {children}
        <NiaWidget />
      </body>
    </html>
  );
}
