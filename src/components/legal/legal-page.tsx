import Link from "next/link";
import { links } from "@/data/portfolio";

type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

export function LegalPage({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
}) {
  return (
    <main className="min-h-screen px-6 py-12 text-zinc-900 dark:text-zinc-100 md:px-10">
      <div className="mx-auto max-w-3xl">
        <header className="border-b border-zinc-200 pb-10 dark:border-zinc-800">
          <Link
            href="/"
            className="text-sm font-semibold text-zinc-500 transition hover:text-[var(--accent)]"
          >
            Markus
          </Link>
          <p className="mt-12 text-xs font-semibold tracking-[0.18em] text-[var(--accent)]">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
          <p className="mt-4 text-sm text-zinc-500">Last updated: {updatedAt}</p>
        </header>

        <div className="space-y-10 py-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-100">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <footer className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-zinc-200 py-8 text-sm text-zinc-500 dark:border-zinc-800">
          <Link href="/#about" className="transition hover:text-[var(--accent)]">
            About
          </Link>
          <Link href="/#contact" className="transition hover:text-[var(--accent)]">
            Contact
          </Link>
          <Link href="/privacy" className="transition hover:text-[var(--accent)]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-[var(--accent)]">
            Terms of Service
          </Link>
          <a
            href={`mailto:${links.email}`}
            className="transition hover:text-[var(--accent)]"
          >
            {links.email}
          </a>
        </footer>
      </div>
    </main>
  );
}
