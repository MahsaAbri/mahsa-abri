"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Media } from "@/components/Media";
import { useLightbox } from "@/components/Lightbox";
import type { Work } from "@/content/types";

export function AtelierProject({ project, next }: { project: Work; next: Work }) {
  const { open, lightbox } = useLightbox(project.images);

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <div className="pt-10">
          <Link
            href="/atelier"
            className="text-[13px] uppercase tracking-[0.18em] text-[#8a7f70] transition-colors hover:text-[#b4472e]"
          >
            ← Back to the wall
          </Link>
        </div>

        <header className="border-b border-[#2a251f]/15 pb-10 pt-10 lg:pt-14">
          <h1 className="max-w-4xl font-serif text-[clamp(2.4rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.02em] text-[#2a251f]">
            {project.title}
          </h1>
          {project.blurb && (
            <p className="mt-5 max-w-2xl font-serif text-[clamp(1.05rem,1.8vw,1.35rem)] italic text-[#6d6455]">
              {project.blurb}
            </p>
          )}
        </header>

        {/* The work, in a loose column flow so nothing gets cropped. */}
        <div className="columns-1 gap-7 py-14 sm:columns-2 lg:columns-3 lg:gap-9 lg:py-20">
          {project.images.map((media, index) => (
            <motion.figure
              key={media.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7 break-inside-avoid lg:mb-9"
            >
              <button
                onClick={() => open(index)}
                aria-label={`Open ${media.alt}`}
                className="group block w-full cursor-zoom-in"
              >
                <div className="bg-white p-2 shadow-[0_2px_8px_rgba(42,37,31,0.07)] transition-shadow duration-500 group-hover:shadow-[0_14px_36px_rgba(42,37,31,0.16)] sm:p-2.5">
                  <div className="overflow-hidden">
                    <Media
                      media={media}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      playOnHover
                      priority={index < 3}
                      className="w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </button>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Turn the page */}
      <nav className="border-t border-[#2a251f]/15">
        <Link href={`/atelier/work/${next.slug}`} className="group block">
          <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_20rem] lg:px-10">
            <div>
              <p className="text-[12px] uppercase tracking-[0.22em] text-[#a89a86]">Next</p>
              <p className="mt-3 font-serif text-[clamp(1.8rem,4vw,3rem)] leading-tight text-[#2a251f] transition-colors group-hover:text-[#b4472e]">
                {next.title}
              </p>
            </div>
            <div className="bg-white p-2 shadow-[0_2px_10px_rgba(42,37,31,0.08)] transition-transform duration-500 group-hover:-rotate-1">
              <Media media={next.poster} ratio={16 / 10} sizes="320px" className="w-full" />
            </div>
          </div>
        </Link>
      </nav>

      {lightbox}
    </>
  );
}
