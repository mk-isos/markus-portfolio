"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type GalleryModalProps = {
  images?: GalleryImage[];
  title: string;
  triggerLabel: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
  zoomInLabel: string;
  zoomOutLabel: string;
  fallbackMessage: string;
};

export function GalleryModal({
  images,
  title,
  triggerLabel,
  closeLabel,
  previousLabel,
  nextLabel,
  zoomInLabel,
  zoomOutLabel,
  fallbackMessage,
}: GalleryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [imageFailed, setImageFailed] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const imageCount = images?.length ?? 0;
  const activeImage = images?.[activeIndex];

  const resetImageView = (nextIndex = activeIndex) => {
    setActiveIndex(nextIndex);
    setZoom(1);
    setImageFailed(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    resetImageView(0);
  };

  const showPrevious = () => {
    if (imageCount <= 1) return;
    resetImageView((activeIndex - 1 + imageCount) % imageCount);
  };

  const showNext = () => {
    if (imageCount <= 1) return;
    resetImageView((activeIndex + 1) % imageCount);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  });

  if (!images?.length) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          resetImageView(0);
          setIsOpen(true);
        }}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-white hover:text-zinc-950 dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-950 dark:hover:text-zinc-100"
      >
        {triggerLabel}
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
          <path d="M4 16 8.6 11.4a2 2 0 0 1 2.8 0L16 16" />
          <path d="m14 14 1.6-1.6a2 2 0 0 1 2.8 0L20 14" />
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
        </svg>
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-sm md:p-8"
        >
          <div className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 md:px-5">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-zinc-100 md:text-base">
                  {title}
                </h3>
                <p className="mt-0.5 text-xs text-zinc-400">
                  {activeIndex + 1} / {imageCount}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((current) => Math.max(1, current - 0.25))}
                  disabled={zoom === 1}
                  aria-label={zoomOutLabel}
                  title={zoomOutLabel}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-lg text-zinc-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  −
                </button>
                <span className="hidden min-w-12 text-center text-xs font-medium text-zinc-400 sm:inline">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((current) => Math.min(2, current + 0.25))}
                  disabled={zoom === 2}
                  aria-label={zoomInLabel}
                  title={zoomInLabel}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-lg text-zinc-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label={closeLabel}
                  title={closeLabel}
                  className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xl text-zinc-200 transition hover:bg-white/10"
                >
                  ×
                </button>
              </div>
            </div>

            <div
              className="relative min-h-0 flex-1 overflow-auto bg-zinc-900 p-3 md:p-6"
              onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
              onTouchEnd={(event) => {
                if (touchStartX === null) return;
                const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
                const deltaX = touchEndX - touchStartX;
                if (Math.abs(deltaX) > 48) {
                  if (deltaX > 0) showPrevious();
                  else showNext();
                }
                setTouchStartX(null);
              }}
            >
              {imageFailed || !activeImage ? (
                <div className="flex min-h-[50vh] items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-950 p-8 text-center text-sm text-zinc-400">
                  {fallbackMessage}
                </div>
              ) : (
                <div className="flex min-h-full justify-center">
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    width={activeImage.width}
                    height={activeImage.height}
                    sizes="(max-width: 768px) 95vw, 80vw"
                    onError={() => setImageFailed(true)}
                    className="h-auto self-start rounded-lg bg-white shadow-xl"
                    style={{
                      width: `${zoom * 100}%`,
                      maxWidth: zoom === 1 ? `${activeImage.width}px` : "none",
                    }}
                  />
                </div>
              )}

              {imageCount > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label={previousLabel}
                    title={previousLabel}
                    className="absolute left-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-zinc-950/70 text-2xl text-zinc-100 shadow-lg transition hover:bg-zinc-900"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label={nextLabel}
                    title={nextLabel}
                    className="absolute right-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-zinc-950/70 text-2xl text-zinc-100 shadow-lg transition hover:bg-zinc-900"
                  >
                    ›
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
