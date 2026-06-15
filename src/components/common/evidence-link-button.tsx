type EvidenceLinkButtonProps = {
  href?: string;
  label: string;
  className?: string;
};

export function EvidenceLinkButton({
  href,
  label,
  className = "",
}: EvidenceLinkButtonProps) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-white hover:text-zinc-950 dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-950 dark:hover:text-zinc-100 ${className}`}
    >
      {label}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
      >
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    </a>
  );
}
