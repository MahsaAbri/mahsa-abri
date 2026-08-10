"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Media } from "@/components/Media";
import type { Work } from "@/content/types";

/**
 * The landing gallery: work pinned up on a studio wall.
 *
 * Every piece sits at a slight angle, held by a strip of tape. Hovering one
 * straightens it and lifts it off the wall — the conceit is that you're looking
 * at physical paper, so the interaction should feel like touching it.
 *
 * The arrangement repeats every six pieces, which keeps it deliberate-looking
 * however many projects there are.
 */
const ARRANGEMENT = [
  { span: "lg:col-span-7 lg:col-start-1", top: "lg:mt-0", tilt: -1.1 },
  { span: "lg:col-span-4 lg:col-start-9", top: "lg:mt-24", tilt: 1.5 },
  { span: "lg:col-span-5 lg:col-start-2", top: "lg:mt-20", tilt: 0.9 },
  { span: "lg:col-span-6 lg:col-start-7", top: "lg:mt-2", tilt: -1.4 },
  { span: "lg:col-span-6 lg:col-start-1", top: "lg:mt-16", tilt: 1.2 },
  { span: "lg:col-span-5 lg:col-start-8", top: "lg:mt-6", tilt: -0.8 },
];

export function StudioWall({ projects }: { projects: Work[] }) {
  return (
    <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-5 pb-10 sm:px-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-24 lg:px-10">
      {projects.map((project, i) => {
        const spot = ARRANGEMENT[i % ARRANGEMENT.length];
        return (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 34, rotate: spot.tilt * 2.2 }}
            whileInView={{ opacity: 1, y: 0, rotate: spot.tilt }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, y: -8, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            className={`${spot.span} ${spot.top} group relative`}
          >
            {/* Tape. */}
            <span
              aria-hidden
              className="absolute -top-3 left-1/2 z-10 h-7 w-24 -translate-x-1/2 -rotate-2 bg-[#e6dcc8]/75 shadow-[0_1px_2px_rgba(42,37,31,0.12)] transition-transform duration-500 group-hover:-rotate-3"
            />

            <Link href={`/atelier/work/${project.slug}`} className="block">
              <div className="bg-white p-2.5 shadow-[0_2px_10px_rgba(42,37,31,0.08)] transition-shadow duration-500 group-hover:shadow-[0_18px_44px_rgba(42,37,31,0.18)] sm:p-3">
                <div className="overflow-hidden">
                  <Media
                    media={project.poster}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority={i < 2}
                    className="w-full transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>

                {/* The label under the picture, like a gallery caption. */}
                <h2 className="px-1 pb-1 pt-3.5 font-serif text-[clamp(1.15rem,1.7vw,1.6rem)] leading-tight text-[#2a251f] transition-colors duration-500 group-hover:text-[#b4472e]">
                  {project.title}
                </h2>
              </div>
            </Link>
          </motion.article>
        );
      })}
    </div>
  );
}
