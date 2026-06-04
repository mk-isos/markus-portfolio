import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { links, siteMeta } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Terms of Service | Markus",
  description:
    "Terms of Service for Markus portfolio and content site, including permitted use, external links, content ownership, and disclaimers.",
  alternates: {
    canonical: `${siteMeta.siteUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="TERMS"
      title="Terms of Service"
      description="These terms describe the basic rules for using the Markus portfolio site and the content shared here."
      updatedAt="2026-06-04"
      sections={[
        {
          title: "1. Site Purpose",
          paragraphs: [
            "This website is a personal portfolio and content archive operated by Markus. It introduces projects, experience, activities, writing, and contact channels.",
            "The information on this site is provided for general portfolio, learning, and collaboration purposes.",
          ],
        },
        {
          title: "2. Acceptable Use",
          paragraphs: [
            "Visitors may browse the site, read content, and use contact links for legitimate communication such as hiring, collaboration, networking, or project inquiries.",
          ],
          items: [
            "Do not attempt to disrupt, reverse engineer, scrape abusively, or misuse the site.",
            "Do not use contact channels for spam, impersonation, harassment, or unlawful activity.",
          ],
        },
        {
          title: "3. Content Ownership",
          paragraphs: [
            "Unless otherwise stated, the text, project descriptions, images, and portfolio content on this site belong to Markus or are used with permission.",
            "You may reference this site with proper attribution, but you may not copy, republish, or commercially reuse the content without permission.",
          ],
        },
        {
          title: "4. External Links",
          paragraphs: [
            "This site may link to external platforms including GitHub, Tistory, Instagram, LinkedIn, YouTube, and deployed project demos.",
            "External websites are not controlled by Markus and may have their own terms, policies, and availability conditions.",
          ],
        },
        {
          title: "5. No Professional Advice",
          paragraphs: [
            "Content on this site reflects personal learning, project experience, and technical notes. It should not be considered legal, financial, medical, or professional advice.",
          ],
        },
        {
          title: "6. Changes to These Terms",
          paragraphs: [
            "These terms may be updated as the site evolves. Continued use of the site after updates means you accept the revised terms.",
          ],
        },
        {
          title: "7. Contact",
          paragraphs: [
            `For questions about these Terms of Service, please contact Markus at ${links.email}.`,
          ],
        },
      ]}
    />
  );
}
