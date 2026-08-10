"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Media } from "@/components/Media";
import { useLightbox } from "@/components/Lightbox";
import type { Work } from "@/content/types";

export function ReelProject({ project, next }: { project: Work; next: Work }) {
  const { open, lightbox } = useLightbox(project.images);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <>
      {/* Hero */}
      <div ref={heroRef} className="relative h-[80vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Media media={project.poster} fill sizes="100vw" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-[#0c0c0e]/35" />

        <div className="absolute inset-x-0 bottom-0 px-5 pb-14 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <h1 className="max-w-5xl text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white">
              {project.title}
            </h1>
            {project.blurb && (
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/60">
                {project.blurb}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* The work */}
      <div className="columns-1 gap-5 px-5 py-16 sm:px-8 md:columns-2 lg:columns-3 lg:gap-7 lg:px-10 lg:py-24">
        {project.images.map((media, index) => (
          <motion.figure
            key={media.src}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 break-inside-avoid lg:mb-7"
          >
            <button
              onClick={() => open(index)}
              aria-label={`Open ${media.alt}`}
              className="group block w-full cursor-zoom-in"
            >
              <div className="relative overflow-hidden bg-white/[0.03]">
                <Media
                  media={media}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  playOnHover
                  priority={index < 3}
                  className="w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                />
                <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-white/15" />
              </div>
            </button>
          </motion.figure>
        ))}
      </div>

      {/* Next */}
      <Link href={`/reel/work/${next.slug}`} className="group relative block h-[55vh] overflow-hidden">
        <Media
          media={next.poster}
          fill
          sizes="100vw"
          className="transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#0c0c0e]/70 transition-colors duration-700 group-hover:bg-[#0c0c0e]/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#e8552f]">
            Next
          </span>
          <span className="mt-4 px-6 text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] text-white">
            {next.title}
          </span>
        </div>
      </Link>

      {lightbox}
    </>
  );
}
