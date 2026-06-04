import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { links, siteMeta } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Privacy Policy | Markus",
  description:
    "Privacy Policy for Markus portfolio, including analytics, advertising, cookies, and contact information.",
  alternates: {
    canonical: `${siteMeta.siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="PRIVACY"
      title="Privacy Policy"
      description="This page explains how the Markus portfolio site handles basic visitor information, analytics, advertising, cookies, and external links."
      updatedAt="2026-06-04"
      sections={[
        {
          title: "1. Information We Collect",
          paragraphs: [
            "This site is a personal portfolio and content hub. It does not require account registration and does not directly collect sensitive personal information from visitors.",
            "When you contact Markus by email or through external social platforms, the information you choose to provide may be used only to respond to your inquiry or continue the conversation.",
          ],
        },
        {
          title: "2. Analytics",
          paragraphs: [
            "This site uses Google Analytics to understand general traffic patterns, page views, device types, and usage trends. Google Analytics may use cookies or similar technologies to collect aggregated usage data.",
            "The collected analytics data is used to improve site content, navigation, and performance.",
          ],
        },
        {
          title: "3. Advertising and Cookies",
          paragraphs: [
            "This site may use Google AdSense to display advertisements. Google and its partners may use cookies to serve ads based on a user's prior visits to this site or other websites.",
            "Users may opt out of personalized advertising by visiting Google's Ads Settings. Third-party vendors may also use cookies to serve ads based on previous visits.",
          ],
        },
        {
          title: "4. External Links",
          paragraphs: [
            "This site includes links to external services such as GitHub, Tistory, Instagram, LinkedIn, and YouTube. These external services are governed by their own privacy policies and terms.",
            "Markus is not responsible for the privacy practices or content of external websites.",
          ],
        },
        {
          title: "5. Data Retention",
          paragraphs: [
            "This site does not operate a user database. Email conversations and voluntarily provided contact information may be retained only as long as needed for communication, collaboration, or record keeping.",
          ],
        },
        {
          title: "6. Contact",
          paragraphs: [
            `If you have questions about this Privacy Policy, please contact Markus at ${links.email}.`,
          ],
        },
      ]}
    />
  );
}
