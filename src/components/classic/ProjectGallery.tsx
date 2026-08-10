"use client";

import { motion } from "motion/react";

import type { Work } from "@/content/types";
import { Media } from "@/components/Media";
import { useLightbox } from "@/components/Lightbox";

export function ProjectGallery({ project }: { project: Work }) {
  const { open, lightbox } = useLightbox(project.images);

  return (
    <>
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* CSS columns flow pictures of mixed proportions without cropping them. */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 lg:gap-8">
          {project.images.map((media, index) => (
            <motion.figure
              key={media.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 break-inside-avoid lg:mb-8"
            >
              <button
                onClick={() => open(index)}
                className="group block w-full cursor-zoom-in"
                aria-label={`Open ${media.alt}`}
              >
                <div className="overflow-hidden bg-neutral-50">
                  <Media
                    media={media}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    playOnHover
                    priority={index < 3}
                    className="w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>
              </button>
            </motion.figure>
          ))}
        </div>
      </div>
      {lightbox}
    </>
  );
}
