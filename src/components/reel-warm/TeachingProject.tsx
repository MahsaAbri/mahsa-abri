"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Media } from "@/components/Media";
import { useLightbox } from "@/components/Lightbox";
import { Prose } from "@/components/Prose";
import type { Media as MediaType, Work } from "@/content/types";
import { mediaInfo } from "@/lib/media";

/**
 * The one project page with its own layout: a video up top, its writeup
 * beside it, and the rest of the pictures in the usual grid underneath.
 * Everything else about it (the "next" footer, the lightbox) matches every
 * other project page.
 */
function frameWidth(media: MediaType, maxHeightVh: number) {
  return `min(100%, ${(mediaInfo(media).aspect * maxHeightVh).toFixed(2)}vh)`;
}

/**
 * How tall the teaching video is allowed to get, as a percentage of the
 * screen's height — the video is portrait, so on a wide screen it would
 * otherwise grow tall enough to need scrolling to see all of it. Raise this
 * number for a bigger video, lower it for a smaller one.
 */
const TEACHING_VIDEO_MAX_HEIGHT_VH = 55;

export function TeachingProject({ project, next }: { project: Work; next: Work }) {
  const video = project.images.find((media) => media.kind === "video");
  const gallery = project.images.filter((media) => media.kind !== "video");
  const { open, lightbox } = useLightbox(gallery);

  return (
    <>
      {/* Hero: the teaching video, with its writeup beside it */}
      <div className="px-5 pt-28 sm:px-8 lg:px-10 lg:pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[#2a251f]"
        >
          {project.title}
        </motion.h1>

        <div className="mt-10 lg:flex lg:items-start lg:justify-center lg:gap-14">
          {video && (
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="overflow-hidden bg-[#2a251f]/[0.05] lg:flex-shrink-0"
              style={{ width: frameWidth(video, TEACHING_VIDEO_MAX_HEIGHT_VH) }}
            >
              <Media
                media={video}
                sizes="(max-width: 1024px) 100vw, 60vw"
                controls
                autoPlay
                priority
                className="w-full"
              />
            </motion.div>
          )}

          {project.body && (
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="mt-10 max-w-prose lg:mt-0"
            >
              <Prose text={project.body} />
            </motion.div>
          )}
        </div>
      </div>

      {/* The rest of the pictures */}
      <div className="columns-1 gap-5 px-5 py-16 sm:px-8 md:columns-2 lg:columns-3 lg:gap-7 lg:px-10 lg:py-24">
        {gallery.map((media, index) => (
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
              <div className="relative overflow-hidden bg-[#2a251f]/[0.05]">
                <Media
                  media={media}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  playOnHover
                  priority={index < 3}
                  className="w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                />
              </div>
            </button>
          </motion.figure>
        ))}
      </div>

      {/* Next */}
      <div className="border-t border-[#2a251f]/12 px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <Link href={`/work/${next.slug}`} className="group block">
          <div className="mx-auto" style={{ width: frameWidth(next.poster, 45) }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#b4472e]">
              Next
            </span>
            <h2 className="mb-8 mt-3 text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-none tracking-[-0.04em] text-[#2a251f]">
              {next.title}
              <span className="mt-3 block h-px w-full origin-left scale-x-0 bg-[#b4472e] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </h2>

            <div className="overflow-hidden">
              <Media
                media={next.poster}
                sizes="100vw"
                className="w-full transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </Link>
      </div>

      {lightbox}
    </>
  );
}
