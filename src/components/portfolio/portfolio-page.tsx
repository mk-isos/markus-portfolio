"use client";

import Image from "next/image";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import {
  aboutParagraphs,
  activities,
  awards,
  certifications,
  contentCategories,
  contentItems,
  education,
  experiences,
  focusAreas,
  galleryIntroLines,
  galleryItems,
  hero,
  links,
  navigationItems,
  projects,
  resume,
  sectionCopy,
  stackGroups,
  timeline,
  uiCopy,
  type ContentCategoryId,
  type LocalizedText,
  type NavigationId,
} from "@/data/portfolio";
import { useSitePreferences } from "@/components/portfolio/site-preferences-context";

const OBSERVED_SECTION_IDS: NavigationId[] = [
  "about",
  "projects",
  "experience",
  "content",
  "resume",
  "contact",
];

function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const isExternal = href.startsWith("http");
  const isEmail = href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  if (isEmail) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "default",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "default" | "inverted";
}) {
  const eyebrowClass =
    tone === "inverted" ? "text-zinc-400" : "text-zinc-500 dark:text-zinc-500";
  const titleClass =
    tone === "inverted"
      ? "text-zinc-50"
      : "text-zinc-950 dark:text-zinc-100";
  const descriptionClass =
    tone === "inverted"
      ? "text-zinc-300"
      : "text-zinc-600 dark:text-zinc-400";

  return (
    <header className="mb-12 max-w-3xl">
      <p className={`text-xs font-semibold tracking-[0.22em] ${eyebrowClass}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-semibold tracking-tight md:text-5xl ${titleClass}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${descriptionClass}`}>
          {description}
        </p>
      ) : null}
    </header>
  );
}

function ThemeButton({
  theme,
  onToggle,
  label,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-10 items-center rounded-full border border-zinc-200 bg-white/80 px-4 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
      aria-label={label}
      title={label}
    >
      <span className="mr-2 text-base" aria-hidden>
        {theme === "dark" ? "☾" : "◐"}
      </span>
      {label}
    </button>
  );
}

export function PortfolioPage() {
  const { language, setLanguage, theme, toggleTheme } = useSitePreferences();
  const t = (value: LocalizedText) => value[language];

  const [activeSection, setActiveSection] = useState<NavigationId>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<ContentCategoryId>("life-tools");
  const [expandedProjectName, setExpandedProjectName] = useState<string | null>(
    null,
  );
  const deferredCategory = useDeferredValue(activeCategory);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const sections = OBSERVED_SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id as NavigationId);
        }
      },
      {
        rootMargin: "-38% 0px -52% 0px",
        threshold: [0.2, 0.35, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const filteredContent = useMemo(
    () => contentItems.filter((item) => item.categoryId === deferredCategory),
    [deferredCategory],
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[200] focus:rounded-full focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t(uiCopy.skipToContent)}
      </a>

      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-zinc-50/82 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/75">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-10">
          <a href="#hero" className="font-[family-name:var(--font-display)] text-xl">
            Markus
          </a>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label={t(uiCopy.navAria)}
          >
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeSection === item.id
                    ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {t(item.label)}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <div
              className="inline-flex h-10 items-center rounded-full border border-zinc-200 bg-white/80 p-1 dark:border-zinc-700 dark:bg-zinc-900/70"
              role="group"
              aria-label={t(uiCopy.languageAria)}
            >
              <button
                type="button"
                onClick={() => setLanguage("ko")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  language === "ko"
                    ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {uiCopy.languageKo}
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  language === "en"
                    ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {uiCopy.languageEn}
              </button>
            </div>
            <ThemeButton
              theme={theme}
              onToggle={toggleTheme}
              label={theme === "dark" ? t(uiCopy.themeDark) : t(uiCopy.themeLight)}
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-full border border-zinc-300 bg-white/80 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100 lg:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {t(uiCopy.menuButton)}
          </button>
        </div>

        {mobileMenuOpen ? (
          <div
            id="mobile-menu"
            className="border-t border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden"
          >
            <nav aria-label={t(uiCopy.mobileNavAria)} className="grid gap-2">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                    activeSection === item.id
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : "bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  }`}
                >
                  {t(item.label)}
                </a>
              ))}
            </nav>

            <div className="mt-3 grid gap-2">
              <div className="inline-flex rounded-xl border border-zinc-200 bg-white/80 p-1 dark:border-zinc-700 dark:bg-zinc-900/70">
                <button
                  type="button"
                  onClick={() => setLanguage("ko")}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    language === "ko"
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  KR
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    language === "en"
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  EN
                </button>
              </div>
              <ThemeButton
                theme={theme}
                onToggle={toggleTheme}
                label={
                  theme === "dark" ? t(uiCopy.themeDark) : t(uiCopy.themeLight)
                }
              />
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section id="hero" className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:px-10 md:pb-28 md:pt-28">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
            <div className="text-center lg:text-left">
              <p className="mx-auto inline-flex rounded-full border border-zinc-300/80 bg-zinc-100/80 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 lg:mx-0">
                {t(uiCopy.heroBadge)}
              </p>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100 md:text-7xl">
                {hero.name}
              </h1>
              <p className="mt-3 text-2xl font-medium text-zinc-700 dark:text-zinc-300 md:text-4xl">
                {t(hero.role)}
              </p>
              <p className="mt-8 text-2xl font-semibold tracking-tight text-[var(--accent)] md:text-3xl">
                {t(hero.slogan)}
              </p>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-xl">
                {t(hero.intro)}
              </p>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg">
                {t(hero.summary)}
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
                <a
                  href="#resume"
                  className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-50 transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                >
                  {t(uiCopy.resumeButton)}
                </a>
                <ExternalLink
                  href={links.github}
                  className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
                >
                  {t(uiCopy.githubButton)}
                </ExternalLink>
                <a
                  href="#contact"
                  className="rounded-full border border-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white dark:hover:text-zinc-950"
                >
                  {t(uiCopy.contactButton)}
                </a>
              </div>
            </div>

            <aside className="mx-auto w-full max-w-[320px] md:max-w-[360px] lg:mx-0 lg:max-w-[420px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                <Image
                  src="/profile.jpeg"
                  alt="Markus profile image"
                  fill
                  priority
                  sizes="(max-width: 767px) 320px, (max-width: 1023px) 360px, 420px"
                  className="object-cover object-center"
                />
              </div>
            </aside>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-6 py-28 md:px-10">
          <SectionHeading
            eyebrow={t(sectionCopy.about.eyebrow)}
            title={t(sectionCopy.about.title)}
            description={t(sectionCopy.about.description)}
          />
          <div className="grid gap-7 lg:grid-cols-[1.4fr_1fr]">
            <article className="rounded-3xl border border-zinc-200 bg-white/90 p-8 dark:border-zinc-800 dark:bg-zinc-900/80">
              <div className="space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph.ko}>{t(paragraph)}</p>
                ))}
              </div>
            </article>
            <aside className="rounded-3xl border border-zinc-200 bg-zinc-100/80 p-8 dark:border-zinc-800 dark:bg-zinc-900/60">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Focus Areas
              </h3>
              <ul className="mt-4 grid gap-2.5">
                {focusAreas.map((area) => (
                  <li
                    key={area.ko}
                    className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
                  >
                    {t(area)}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="border-y border-zinc-200/80 bg-zinc-100/45 py-28 dark:border-zinc-800 dark:bg-zinc-950/60">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <SectionHeading
              eyebrow={t(sectionCopy.stack.eyebrow)}
              title={t(sectionCopy.stack.title)}
              description={t(sectionCopy.stack.description)}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {stackGroups.map((group) => (
                <article
                  key={group.title.ko}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-center gap-2.5">
                    <span aria-hidden>{group.icon}</span>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                      {t(group.title)}
                    </h3>
                  </div>
                  <div className="mt-4 space-y-3">
                    {group.sections.map((section) => (
                      <div
                        key={`${group.title.ko}-${section.level}-${section.description.ko}`}
                        className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950"
                      >
                        {(() => {
                          const levelLabel = t(uiCopy.stackLevel[section.level]);
                          const descriptionLabel = t(section.description).trim();
                          const headerLabel = descriptionLabel
                            ? `${levelLabel} · ${descriptionLabel}`
                            : levelLabel;

                          return (
                            <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                              {headerLabel}
                            </p>
                          );
                        })()}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {section.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                section.level === "Learning"
                                  ? "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                                  : "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-6 py-28 md:px-10">
          <SectionHeading
            eyebrow={t(sectionCopy.projects.eyebrow)}
            title={t(sectionCopy.projects.title)}
            description={t(sectionCopy.projects.description)}
          />
          <div className="space-y-6">
            {projects.map((project) => (
              <article
                key={project.name}
                className="rounded-3xl border border-zinc-200 bg-white/90 p-8 dark:border-zinc-800 dark:bg-zinc-900/80"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedProjectName((prev) =>
                      prev === project.name ? null : project.name,
                    )
                  }
                  className="w-full text-left"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-100">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {t(project.oneLiner)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
                        {t(project.status)}
                      </span>
                      <span className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                        {expandedProjectName === project.name
                          ? t(uiCopy.projectDetailClose)
                          : t(uiCopy.projectDetailOpen)}
                      </span>
                    </div>
                  </div>
                </button>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    ...(project.techStack.backend ?? []),
                    ...(project.techStack.ai ?? []),
                    ...(project.techStack.frontend ?? []),
                    ...(project.techStack.infra ?? []),
                    ...(project.techStack.tools ?? []),
                  ].map((tech) => (
                    <span
                      key={`${project.name}-${tech}`}
                      className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {expandedProjectName === project.name ? (
                  <div className="mt-7 space-y-7 border-t border-zinc-200 pt-7 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
                    <section>
                      <h4 className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                        {t(uiCopy.projectOverview)}
                      </h4>
                      <p className="mt-2">{t(project.overview)}</p>
                    </section>

                    <section>
                      <h4 className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                        {t(uiCopy.projectRole)}
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {project.role.map((item) => (
                          <li key={`${project.name}-role-${item.ko}`}>{t(item)}</li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h4 className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                        {t(uiCopy.projectFeatures)}
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {project.features.map((item) => (
                          <li key={`${project.name}-feature-${item.ko}`}>{t(item)}</li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h4 className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                        {t(uiCopy.projectTechStack)}
                      </h4>
                      <div className="mt-3 grid gap-3 md:grid-cols-2">
                        {(project.techStack.backend?.length ?? 0) > 0 ? (
                          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                            <p className="text-xs font-semibold text-zinc-500">
                              {t(uiCopy.projectTechBackend)}
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5">
                              {project.techStack.backend?.map((item) => (
                                <li key={`${project.name}-backend-${item}`}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {(project.techStack.ai?.length ?? 0) > 0 ? (
                          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                            <p className="text-xs font-semibold text-zinc-500">
                              {t(uiCopy.projectTechAi)}
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5">
                              {project.techStack.ai?.map((item) => (
                                <li key={`${project.name}-ai-${item}`}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {(project.techStack.frontend?.length ?? 0) > 0 ? (
                          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                            <p className="text-xs font-semibold text-zinc-500">
                              {t(uiCopy.projectTechFrontend)}
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5">
                              {project.techStack.frontend?.map((item) => (
                                <li key={`${project.name}-frontend-${item}`}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {(project.techStack.infra?.length ?? 0) > 0 ? (
                          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                            <p className="text-xs font-semibold text-zinc-500">
                              {t(uiCopy.projectTechInfra)}
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5">
                              {project.techStack.infra?.map((item) => (
                                <li key={`${project.name}-infra-${item}`}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {(project.techStack.tools?.length ?? 0) > 0 ? (
                          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                            <p className="text-xs font-semibold text-zinc-500">
                              {t(uiCopy.projectTechTools)}
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5">
                              {project.techStack.tools?.map((item) => (
                                <li key={`${project.name}-tool-${item}`}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </section>

                    <section>
                      <h4 className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                        {t(uiCopy.projectContributions)}
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {project.contributions.map((item) => (
                          <li key={`${project.name}-contribution-${item.ko}`}>
                            {t(item)}
                          </li>
                        ))}
                      </ul>
                    </section>

                    {(project.troubleshooting.length ?? 0) > 0 ? (
                      <section>
                        <h4 className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                          {t(uiCopy.projectTroubleshooting)}
                        </h4>
                        <div className="mt-3 space-y-4">
                          {project.troubleshooting.map((item) => (
                            <article
                              key={`${project.name}-trouble-${item.title.ko}`}
                              className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950"
                            >
                              <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                {t(item.title)}
                              </h5>
                              <p className="mt-2">
                                <span className="font-semibold">
                                  {t(uiCopy.troubleshootingProblem)}:{" "}
                                </span>
                                {t(item.problem)}
                              </p>
                              <div className="mt-2">
                                <p className="font-semibold">
                                  {t(uiCopy.troubleshootingSolution)}:
                                </p>
                                <ul className="mt-1 list-disc space-y-1 pl-5">
                                  {item.solution.map((line) => (
                                    <li
                                      key={`${project.name}-solution-${item.title.ko}-${line.ko}`}
                                    >
                                      {t(line)}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="mt-2">
                                <p className="font-semibold">
                                  {t(uiCopy.troubleshootingResult)}:
                                </p>
                                <ul className="mt-1 list-disc space-y-1 pl-5">
                                  {item.result.map((line) => (
                                    <li
                                      key={`${project.name}-result-${item.title.ko}-${line.ko}`}
                                    >
                                      {t(line)}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>
                    ) : null}

                    <section>
                      <h4 className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                        {t(uiCopy.projectAchievement)}
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {project.achievement.map((item) => (
                          <li key={`${project.name}-achievement-${item.ko}`}>{t(item)}</li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h4 className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                        {t(uiCopy.projectLearning)}
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {project.learnings.map((item) => (
                          <li key={`${project.name}-learning-${item.ko}`}>{t(item)}</li>
                        ))}
                      </ul>
                    </section>
                  </div>
                ) : null}

                <div className="mt-7 flex flex-wrap gap-3">
                  <ExternalLink
                    href={project.githubUrl}
                    className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
                  >
                    GitHub
                  </ExternalLink>
                  {project.demoUrl ? (
                    <ExternalLink
                      href={project.demoUrl}
                      className="rounded-full border border-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white dark:hover:text-zinc-950"
                    >
                      Demo
                    </ExternalLink>
                  ) : (
                    <span className="rounded-full border border-zinc-200 bg-zinc-100 px-5 py-2 text-sm font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
                      {t(uiCopy.demoPreparing)}
                    </span>
                  )}
                  {project.reportUrl ? (
                    <a
                      href={project.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white dark:hover:text-zinc-950"
                    >
                      {t(uiCopy.projectReport)}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="border-y border-zinc-200/80 bg-zinc-100/45 py-28 dark:border-zinc-800 dark:bg-zinc-950/60"
        >
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <SectionHeading
              eyebrow={t(sectionCopy.experience.eyebrow)}
              title={t(sectionCopy.experience.title)}
              description={t(sectionCopy.experience.description)}
            />
            <div className="space-y-4">
              {experiences.map((item) => (
                <article
                  key={`${item.title}-${item.period}`}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">{item.period}</p>
                    </div>
                    <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
                      {t(item.position)}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {t(item.description)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-28 md:px-10">
          <SectionHeading
            eyebrow={t(sectionCopy.activities.eyebrow)}
            title={t(sectionCopy.activities.title)}
            description={t(sectionCopy.activities.description)}
          />
          <ul className="grid gap-3 md:grid-cols-2">
            {activities.map((activity) => (
              <li
                key={activity.ko}
                className="rounded-2xl border border-zinc-200 bg-white/90 px-5 py-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300"
              >
                {t(activity)}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-y border-zinc-200/80 bg-zinc-100/45 py-28 dark:border-zinc-800 dark:bg-zinc-950/60">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <SectionHeading
              eyebrow={t(sectionCopy.education.eyebrow)}
              title={t(sectionCopy.education.title)}
              description={t(sectionCopy.education.description)}
            />
            <div className="relative">
              <div className="absolute left-3 top-0 h-full w-px bg-zinc-300 dark:bg-zinc-700" />
              <ol className="space-y-5">
                {education.map((item) => (
                  <li key={`${item.school}-${item.period}`} className="relative pl-11">
                    <span className="absolute left-0 top-2 h-6 w-6 rounded-full border-4 border-zinc-50 bg-zinc-900 shadow dark:border-zinc-950 dark:bg-zinc-100" />
                    <article className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.school}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">{item.period}</p>
                      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                        {item.location}
                      </p>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-28 md:px-10">
          <SectionHeading
            eyebrow={t(sectionCopy.certifications.eyebrow)}
            title={t(sectionCopy.certifications.title)}
            description={t(sectionCopy.certifications.description)}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((certification) => (
              <article
                key={certification.name.ko}
                className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {t(certification.name)}
                </h3>
                {(certification.issuer || certification.date) && (
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {[certification.issuer, certification.date].filter(Boolean).join(" · ")}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-28 md:px-10">
          <SectionHeading
            eyebrow={t(sectionCopy.awards.eyebrow)}
            title={t(sectionCopy.awards.title)}
            description={t(sectionCopy.awards.description)}
          />
          <div className="space-y-4">
            {awards.map((award) => (
              <article
                key={`${award.date}-${award.title.ko}`}
                className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {t(award.title)}
                  </h3>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {award.date}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {t(award.detail)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="content"
          className="border-y border-zinc-200/80 bg-zinc-100/45 py-28 dark:border-zinc-800 dark:bg-zinc-950/60"
        >
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <SectionHeading
              eyebrow={t(sectionCopy.content.eyebrow)}
              title={t(sectionCopy.content.title)}
              description={t(sectionCopy.content.description)}
            />
            <div className="flex flex-wrap gap-2.5">
              {contentCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    startTransition(() => {
                      setActiveCategory(category.id);
                    })
                  }
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeCategory === category.id
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : "border border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
                  }`}
                >
                  {t(category.label)}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              {isPending ? t(uiCopy.contentLoading) : t(uiCopy.contentHint)}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {filteredContent.map((item) => (
                <article
                  key={`${item.categoryId}-${item.title.ko}`}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                    {t(
                      contentCategories.find(
                        (category) => category.id === item.categoryId,
                      )!.label,
                    )}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {t(item.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {t(item.description)}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs text-zinc-500">
                      {item.source} · {item.date}
                    </span>
                    <ExternalLink
                      href={item.href}
                      className="text-sm font-semibold text-[var(--accent)] transition hover:text-[var(--accent-strong)]"
                    >
                      {t(uiCopy.readMore)}
                    </ExternalLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-28 md:px-10">
          <SectionHeading
            eyebrow={t(sectionCopy.timeline.eyebrow)}
            title={t(sectionCopy.timeline.title)}
            description={t(sectionCopy.timeline.description)}
          />
          <div className="relative">
            <div className="absolute left-3 top-0 h-full w-px bg-zinc-300 dark:bg-zinc-700" />
            <ol className="space-y-5">
              {timeline.map((item) => (
                <li key={`${item.year}-${item.title.ko}`} className="relative pl-11">
                  <span className="absolute left-0 top-2 h-6 w-6 rounded-full border-4 border-zinc-50 bg-zinc-900 shadow dark:border-zinc-950 dark:bg-zinc-100" />
                  <article className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                    <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                      {item.year}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {t(item.title)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {t(item.description)}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-zinc-200/80 bg-zinc-100/45 py-28 dark:border-zinc-800 dark:bg-zinc-950/60">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <SectionHeading
              eyebrow={t(sectionCopy.gallery.eyebrow)}
              title={t(sectionCopy.gallery.title)}
              description={t(sectionCopy.gallery.description)}
            />
            <div className="mb-12 max-w-3xl space-y-2">
              {galleryIntroLines.map((line, index) => (
                <p
                  key={line.ko}
                  className={`leading-relaxed ${
                    index === 0
                      ? "text-lg font-medium text-zinc-900 dark:text-zinc-100"
                      : "text-base text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {t(line)}
                </p>
              ))}
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {galleryItems.map((item, index) => (
                <article
                  key={item.title.ko}
                  className="gallery-float overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                  style={{ animationDelay: `${index * 1.2}s` }}
                >
                  <div className="relative h-52 w-full">
                    <Image
                      src={item.image}
                      alt={t(item.title)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {t(item.title)}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {t(item.caption)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="resume" className="mx-auto max-w-6xl px-6 py-28 md:px-10">
          <SectionHeading
            eyebrow={t(sectionCopy.resume.eyebrow)}
            title={t(sectionCopy.resume.title)}
            description={t(sectionCopy.resume.description)}
          />
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <article className="rounded-3xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm text-zinc-500">{t(uiCopy.lastUpdated)}</p>
              <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {t(resume.updatedAt)}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {t(uiCopy.resumePreparing)}
              </p>
              {resume.isReady ? (
                <a
                  href={resume.filePath}
                  download
                  className="mt-7 inline-flex rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-zinc-50 transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                >
                  {t(uiCopy.downloadPdf)}
                </a>
              ) : (
                <span className="mt-7 inline-flex rounded-full border border-zinc-200 bg-zinc-100 px-5 py-2 text-sm font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-500">
                  {t(uiCopy.pdfPending)}
                </span>
              )}
            </article>

            <article className="rounded-3xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              {resume.isReady ? (
                <object
                  data={resume.filePath}
                  type="application/pdf"
                  className="h-[560px] w-full rounded-2xl border border-zinc-200 dark:border-zinc-800"
                >
                  <a
                    href={resume.filePath}
                    className="inline-flex rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                  >
                    {t(uiCopy.openOnMobile)}
                  </a>
                </object>
              ) : (
                <div className="flex h-[340px] items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-950">
                  <p className="max-w-md whitespace-pre-line text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {t(uiCopy.resumePlaceholder)}
                  </p>
                </div>
              )}
            </article>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-zinc-200 bg-zinc-950 py-28 text-zinc-100 dark:border-zinc-800"
        >
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <SectionHeading
              eyebrow={t(sectionCopy.contact.eyebrow)}
              title={t(sectionCopy.contact.title)}
              description={t(sectionCopy.contact.description)}
              tone="inverted"
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ExternalLink
                href={`mailto:${links.email}`}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-600"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                  Email
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-100">{links.email}</p>
              </ExternalLink>
              <ExternalLink
                href={links.github}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-600"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                  GitHub
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-100">
                  github.com/mk-isos
                </p>
              </ExternalLink>
              <ExternalLink
                href={links.blog}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-600"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                  Blog
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-100">
                  mkisos.tistory.com
                </p>
              </ExternalLink>
              <ExternalLink
                href={links.instagramMain}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-600"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                  Instagram
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-100">@markus_isos</p>
              </ExternalLink>
              <ExternalLink
                href={links.instagramSub}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-600"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                  Instagram (Sub)
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-100">@mk_isos</p>
              </ExternalLink>
              {links.linkedin ? (
                <ExternalLink
                  href={links.linkedin}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-600"
                >
                  <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                    LinkedIn
                  </p>
                  <p className="mt-2 text-sm font-medium text-zinc-100">
                    linkedin.com/in/mkisos
                  </p>
                </ExternalLink>
              ) : (
                <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/80 p-5">
                  <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                    LinkedIn
                  </p>
                  <p className="mt-2 text-sm font-medium text-zinc-300">
                    {t(uiCopy.linkedinPending)}
                  </p>
                </div>
              )}
            </div>
            <p className="mt-12 text-sm text-zinc-500">
              © {new Date().getFullYear()} Markus. {t(uiCopy.footer)}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
