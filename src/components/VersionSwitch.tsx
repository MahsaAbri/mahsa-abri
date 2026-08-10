"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { versions, type VersionKey } from "@/lib/versions";

/**
 * A small floating control for flipping between the three designs while
 * reviewing. It keeps you on the same page — /classic/about becomes
 * /atelier/about — so the versions are easy to compare like for like.
 *
 * Delete this component (and its use in the three layouts) once a design is
 * chosen. It is not part of any of them.
 */
export function VersionSwitch({ current }: { current: VersionKey }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  // Everything after the version prefix, so we can land on the matching page.
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <div className="fixed bottom-4 right-4 z-[90] print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2 w-64 overflow-hidden rounded-xl border border-black/10 bg-white/95 p-1.5 shadow-2xl shadow-black/20 backdrop-blur-xl"
          >
            <p className="px-2.5 pb-1.5 pt-1 text-[10px] uppercase tracking-[0.16em] text-neutral-400">
              Design version
            </p>
            {versions.map((v) => (
              <Link
                key={v.key}
                href={`${v.base}${rest}`}
                onClick={() => setOpen(false)}
                className={`flex items-start gap-2.5 rounded-lg px-2.5 py-2 transition-colors ${
                  v.key === current ? "bg-neutral-100" : "hover:bg-neutral-50"
                }`}
              >
                <span
                  aria-hidden
                  className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-black/10"
                  style={{
                    background: `linear-gradient(135deg, ${v.swatch[0]} 50%, ${v.swatch[1]} 50%)`,
                  }}
                />
                <span className="min-w-0">
                  <span className="block text-[13px] font-medium text-neutral-900">{v.name}</span>
                  <span className="block text-[11px] leading-snug text-neutral-500">{v.blurb}</span>
                </span>
              </Link>
            ))}
            <div className="mt-1 flex items-center justify-between border-t border-black/5 px-2.5 pb-0.5 pt-1.5">
              <Link
                href="/"
                className="text-[11px] text-neutral-500 underline-offset-2 hover:text-neutral-900 hover:underline"
              >
                Compare all three
              </Link>
              <button
                onClick={() => setHidden(true)}
                className="text-[11px] text-neutral-400 hover:text-neutral-900"
              >
                Hide
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-black/10 bg-white/90 py-2 pl-2.5 pr-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-700 shadow-lg shadow-black/10 backdrop-blur-xl transition-transform hover:scale-[1.03] active:scale-100"
      >
        <span
          aria-hidden
          className="h-3.5 w-3.5 rounded-full border border-black/10"
          style={{
            background: `linear-gradient(135deg, ${
              versions.find((v) => v.key === current)?.swatch[0]
            } 50%, ${versions.find((v) => v.key === current)?.swatch[1]} 50%)`,
          }}
        />
        {versions.find((v) => v.key === current)?.name}
      </button>
    </div>
  );
}
