// Every tracking integration is configured by environment variable, and every
// one except GA4 is OFF until its ID is set. No IDs are invented here: GA4's
// default is the property this site was already using. See .env.example.

export const TRACKING = {
  /** GA4 measurement ID (already live on the site before this module existed). */
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "G-N6Y84V1D2Z",
  /** Google Tag Manager container (GTM-XXXXXXX). Optional. */
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  /** Google Ads tag (AW-XXXXXXXXX) and one conversion label per key action. */
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "",
  googleAdsLabels: {
    assessment_complete: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_ASSESSMENT || "",
    booking_complete: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_BOOKING || "",
    contact_submit: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_CONTACT || "",
  } as Record<string, string>,
  /** Meta Pixel ID (numeric). The Conversions API also needs META_CAPI_ACCESS_TOKEN (server only). */
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  /** Search Console HTML-tag verification token (content value only). */
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  /** Meta Business domain verification token (content value only). */
  facebookDomainVerification: process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION || "",
};
