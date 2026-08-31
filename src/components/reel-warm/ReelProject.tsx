"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Media } from "@/components/Media";
import { useLightbox } from "@/components/Lightbox";
import { Prose } from "@/components/Prose";
import type { Media as MediaType, Work } from "@/content/types";
import { mediaInfo } from "@/lib/media";

/**
 * Nothing is ever laid over a picture here, and nothing is cropped: each one is
 * shown whole, as wide as it can be without growing taller than the screen.
 * Titles sit on the paper above or below the work.
 */
function frameWidth(media: MediaType, maxHeightVh: number) {
  return `min(100%, ${(mediaInfo(media).aspect * maxHeightVh).toFixed(2)}vh)`;
}

export function ReelWarmProject({ project, next }: { project: Work; next: Work }) {
  // The Animation reel plays each clip as it scrolls into view, rather than
  // making visitors hover to see anything but a still frame.
  const autoplayVideos = project.slug === "animation";

  // Animation opens with its first clip playing, rather than a still frame
  // grabbed from it — so that clip is the hero, not also repeated below.
  const heroVideo = autoplayVideos ? project.images[0] : undefined;
  const heroMedia = heroVideo ?? project.poster;
  const gridImages = heroVideo ? project.images.slice(1) : project.images;

  const { open, lightbox } = useLightbox(gridImages);

  return (
    <>
      {/* Hero */}
      <div className="px-5 pt-28 sm:px-8 lg:px-10 lg:pt-32">
        {/* The picture itself is never animated in — it is the page. */}
        <div className="mx-auto" style={{ width: frameWidth(heroMedia, 72) }}>
          <Media
            media={heroMedia}
            sizes="100vw"
            priority
            autoPlay={!!heroVideo}
            controls={!!heroVideo}
            className="w-full"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mx-auto mt-10"
          style={{ width: frameWidth(heroMedia, 72) }}
        >
          <h1 className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[#2a251f]">
            {project.title}
          </h1>
          {project.blurb && (
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#57503f]">
              {project.blurb}
            </p>
          )}
        </motion.div>
      </div>

      {project.body && (
        <div className="mx-auto max-w-[44rem] px-5 py-16 sm:px-8 lg:py-24">
          <Prose text={project.body} />
        </div>
      )}

      {/* The work */}
      <div className="columns-1 gap-5 px-5 py-16 sm:px-8 md:columns-2 lg:columns-3 lg:gap-7 lg:px-10 lg:py-24">
        {gridImages.map((media, index) => (
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
                  playOnHover={!autoplayVideos}
                  autoPlayInView={autoplayVideos}
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
