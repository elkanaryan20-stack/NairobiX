import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nairobixgrowth.com"),
  title: {
    default: "NairobiX | Premium Business Growth Partner",
    template: "%s | NairobiX",
  },
  description:
    "NairobiX helps ambitious businesses grow through connected strategy, digital marketing, CRM, automation, AI and digital systems.",
  keywords: [
    "NairobiX",
    "business growth partner",
    "digital marketing Kenya",
    "CRM systems",
    "automation",
    "AI solutions",
    "growth strategy"
  ],
  openGraph: {
    title: "NairobiX | Premium Business Growth Partner",
    description:
      "Intelligent growth systems for ambitious businesses in Kenya and beyond.",
    url: "https://nairobixgrowth.com",
    siteName: "NairobiX",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/NairobiX-removebg-preview.png",
    shortcut: "/images/NairobiX-removebg-preview.png",
    apple: "/images/NairobiX-removebg-preview.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0b0d] text-white">
        <Script src="https://cdn.botpress.cloud/webchat/v3.7/inject.js" strategy="beforeInteractive" />
        <Script src="https://files.bpcontent.cloud/2026/08/01/07/20260801073051-LCOLD5TC.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
