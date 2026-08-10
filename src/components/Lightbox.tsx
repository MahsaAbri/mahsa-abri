"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import type { Media as MediaType } from "@/content/types";
import { Media } from "@/components/Media";

/**
 * Full-screen viewer shared by all three designs.
 *
 *   const { open, lightbox } = useLightbox(images);
 *   <button onClick={() => open(3)}>…</button>
 *   {lightbox}
 */
export function useLightbox(items: MediaType[]) {
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);

  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? null : (i + delta + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (index === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);

    // Hold the page still behind the overlay without letting it jump when the
    // scrollbar disappears.
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      window.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [index, close, step]);

  const current = index === null ? null : items[index];

  const lightbox = (
    <AnimatePresence>
      {current && index !== null && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#0b0b0c]/97 backdrop-blur-md"
          onClick={close}
        >
          <div className="flex items-center justify-between px-5 py-4 text-white/70 sm:px-8">
            <span className="font-mono text-[11px] tracking-[0.2em]">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button
              onClick={close}
              aria-label="Close"
              className="-m-2 p-2 text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
            >
              Close ✕
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
            <Arrow side="left" onClick={() => step(-1)} disabled={items.length < 2} />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.995 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="flex max-h-full w-full max-w-6xl items-center justify-center"
              >
                <Media
                  media={current}
                  fit="contain"
                  sizes="(max-width: 768px) 100vw, 90vw"
                  autoPlay
                  controls
                  priority
                  className="max-h-[82vh] w-full"
                />
              </motion.div>
            </AnimatePresence>
            <Arrow side="right" onClick={() => step(1)} disabled={items.length < 2} />
          </div>

          <div className="pb-8" />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return { open, close, lightbox, index };
}

function Arrow({
  side,
  onClick,
  disabled,
}: {
  side: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}) {
  if (disabled) return null;
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "Previous" : "Next"}
      className={`absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/15 p-3 text-white/70 transition-all hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 sm:block ${
        side === "left" ? "left-4" : "right-4"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.5]">
        <path d={side === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} strokeLinecap="round" />
      </svg>
    </button>
  );
}
