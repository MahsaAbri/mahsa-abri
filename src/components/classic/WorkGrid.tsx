"use client";

import Link from "next/link";
import { motion } from "motion/react";

import type { Work } from "@/content/types";
import { Media } from "@/components/Media";

/**
 * The landing gallery.
 *
 * Hovering a piece dissolves the poster away and leaves its name behind. On
 * touch screens, where there is no hover, the name sits underneath instead.
 *
 * Posters keep their own proportions rather than being cropped to a common
 * shape — the artwork decides how tall its space is.
 */
export function WorkGrid({ projects }: { projects: Work[] }) {
  return (
    // Two columns that flow, rather than a strict grid — posters are all
    // different shapes, and a fixed row height would leave holes between them.
    <div className="mx-auto max-w-[1600px] columns-1 gap-8 px-5 sm:px-8 lg:columns-2 lg:gap-10 lg:px-12">
      {projects.map((project, i) => (
        <motion.article
          key={project.slug}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 break-inside-avoid lg:mb-16"
        >
          <Link href={`/classic/work/${project.slug}`} className="group block">
            <div className="relative overflow-hidden bg-neutral-50">
              <Media
                media={project.poster}
                sizes="(max-width: 1024px) 100vw, 46vw"
                priority={i < 2}
                className="w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />

              {/* The name that replaces the image on hover. */}
              <div className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-white px-10 text-center opacity-0 transition-opacity duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 lg:flex">
                <h2 className="font-condensed text-[clamp(1.6rem,2.8vw,2.6rem)] font-normal leading-[1.2] text-neutral-700">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Always visible on touch screens. */}
            <h2 className="mt-4 font-condensed text-2xl leading-tight text-neutral-700 lg:hidden">
              {project.title}
            </h2>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
