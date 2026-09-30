import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { NiaWidget } from "@/components/nia/NiaWidget";
import { JsonLd } from "@/components/JsonLd";
import { AttributionTracker } from "@/components/AttributionTracker";
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

        <AttributionTracker />

        {/* Google tag: GA4 (live) and, when configured, Google Ads. Page views
            come from GA4 enhanced measurement, including client-side navigations. */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING.ga4Id}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${TRACKING.ga4Id}');
            ${TRACKING.googleAdsId ? `if (!navigator.globalPrivacyControl) gtag('config', '${TRACKING.googleAdsId}', { allow_enhanced_conversions: true });` : ""}
          `}
        </Script>

        {/* Google Tag Manager — optional. If enabled, do not also add a GA4
            configuration tag in the container: GA4 is loaded directly above. */}
        {TRACKING.gtmId ? (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${TRACKING.gtmId}');`}
          </Script>
        ) : null}

        {/* Meta Pixel — optional; skipped for visitors sending Global Privacy Control. */}
        {TRACKING.metaPixelId ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`if (!navigator.globalPrivacyControl) {
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${TRACKING.metaPixelId}');
              fbq('track', 'PageView');
            }`}
          </Script>
        ) : null}

        {children}
        <NiaWidget />
      </body>
    </html>
  );
}