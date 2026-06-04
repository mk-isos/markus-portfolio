import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { links, siteMeta } from "@/data/portfolio";
import { Providers } from "@/app/providers";

const metadataDescription = `${siteMeta.description.ko} / ${siteMeta.description.en}`;
const googleAnalyticsId = "G-SK3DL1G9QK";
const googleAdsenseClient = "ca-pub-2791911148702020";
const googleSiteVerification = "_lWp7KPNaujVMOdegNUBPPTQAWcoHZGO3GYbU2lO6lM";
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Markus",
    url: siteMeta.siteUrl,
    jobTitle: "Backend & AI Developer",
    description: metadataDescription,
    email: links.email,
    knowsAbout: [
      "Backend Development",
      "Artificial Intelligence",
      "Spring Boot",
      "LLM Applications",
      "Technical Writing",
    ],
    sameAs: [
      links.github,
      links.blog,
      links.instagramMain,
      links.instagramSub,
      links.linkedin,
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Markus Portfolio",
    url: siteMeta.siteUrl,
    inLanguage: ["ko-KR", "en"],
    description: metadataDescription,
    publisher: {
      "@type": "Person",
      name: "Markus",
    },
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.siteUrl),
  title: {
    default: siteMeta.title,
    template: "%s | Markus",
  },
  description: metadataDescription,
  keywords: siteMeta.keywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteMeta.siteUrl,
  },
  openGraph: {
    title: siteMeta.title,
    description: metadataDescription,
    url: siteMeta.siteUrl,
    siteName: "Markus Portfolio",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-cover.svg",
        width: 1200,
        height: 630,
        alt: "Markus Portfolio Open Graph",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: metadataDescription,
    images: ["/og-cover.svg"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: googleSiteVerification,
  },
  other: {
    "google-adsense-account": googleAdsenseClient,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
