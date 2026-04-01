import type { Metadata } from "next";
import "./globals.css";
import { siteMeta } from "@/data/portfolio";
import { Providers } from "@/app/providers";

const metadataDescription = `${siteMeta.description.ko} / ${siteMeta.description.en}`;

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
