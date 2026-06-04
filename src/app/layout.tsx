import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { siteMeta } from "@/data/portfolio";
import { Providers } from "@/app/providers";

const metadataDescription = `${siteMeta.description.ko} / ${siteMeta.description.en}`;
const googleAnalyticsId = "G-SK3DL1G9QK";
const googleAdsenseClient = "ca-pub-2791911148702020";
const googleSiteVerification = "psECK4pKSJH-r6w_GzfHAKcW0dDCm44NMbk8Lfx5zag";

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.siteUrl),
  title: {
    default: siteMeta.title,
    template: "%s | Markus",
  },
  description: metadataDescription,
  keywords: siteMeta.keywords,
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
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  verification: {
    google: googleSiteVerification,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
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
      <Script
        async
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsenseClient}`}
        strategy="afterInteractive"
      />
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
