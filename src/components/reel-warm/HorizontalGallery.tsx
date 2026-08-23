"use client";

import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Media } from "@/components/Media";
import { site } from "@/content/site";
import type { Work } from "@/content/types";
import { mediaInfo } from "@/lib/media";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * The landing gallery: one long sideways track of frames.
 *
 * Scrolling down moves the reel across. It's driven by ordinary page scroll
 * rather than a hijacked wheel event, so trackpads, touch, keyboard and the
 * scrollbar all behave the way people expect.
 *
 * Every frame is the same height and takes its width from the artwork's own
 * proportions, so nothing is cropped.
 *
 * Below the large breakpoint it becomes a plain vertical list — sideways
 * scrolling on a phone is a nuisance, not a feature.
 */
export function HorizontalGallery({ projects }: { projects: Work[] }) {
  const isWide = useMediaQuery("(min-width: 1024px)");
  return isWide ? <Reel projects={projects} /> : <Stack projects={projects} />;
}

/** Frame height, in viewport units. Width follows from each picture's shape. */
const FRAME_VH = 60;

/**
 * What's shown in a project's frame. Animation's poster is just a still, so
 * its own first clip plays instead — every other project shows its poster.
 */
function tileMedia(project: Work) {
  const first = project.images[0];
  return project.slug === "animation" && first?.kind === "video" ? first : project.poster;
}

function Reel({ projects }: { projects: Work[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // How far the track has to travel: its full width, less one screen.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [projects.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 220, damping: 40, mass: 0.4 });
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const progressWidth = useTransform(progress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);

  return (
    <section ref={sectionRef} style={{ height: `${projects.length * 78 + 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center gap-[5vw] pl-[8vw] pr-[14vw]"
        >
          <TitleCard />

          {/*
            The title sits under the frame, never on it — the artwork is shown
            whole, with nothing washed over it.
          */}
          {projects.map((project, i) => {
            const media = tileMedia(project);
            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block shrink-0"
                style={{ width: `${FRAME_VH * mediaInfo(media).aspect}vh` }}
              >
                <div
                  className="relative overflow-hidden bg-[#2a251f]/[0.05]"
                  style={{ height: `${FRAME_VH}vh` }}
                >
                  <Media
                    media={media}
                    fill
                    sizes="60vw"
                    priority={i < 2}
                    autoPlayInView={media.kind === "video"}
                    className="transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                </div>

                <h2 className="mt-5 text-[clamp(1.1rem,1.6vw,1.5rem)] font-medium leading-tight tracking-[-0.02em] text-[#2a251f]">
                  {project.title}
                </h2>
              </Link>
            );
          })}

          <EndCard />
        </motion.div>

        {/* Progress rail. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-8 pb-6 lg:px-10">
          <div className="flex items-center gap-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#a89a86]">
              Scroll
            </span>
            <div className="relative h-px flex-1 bg-[#2a251f]/15">
              <motion.div
                style={{ width: progressWidth }}
                className="absolute inset-y-0 left-0 bg-[#b4472e]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TitleCard() {
  return (
    <div className="flex shrink-0 flex-col justify-center pr-[4vw]" style={{ height: `${FRAME_VH}vh` }}>
      <h1 className="text-[clamp(3rem,5.6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-[#2a251f]">
        {site.name}
      </h1>
      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.24em] text-[#b4472e]">
        {site.role}
      </p>
    </div>
  );
}

function EndCard() {
  return (
    <div className="flex w-[24vw] shrink-0 flex-col justify-center" style={{ height: `${FRAME_VH}vh` }}>
      <Link
        href="/contact"
        className="group inline-block text-[clamp(1.8rem,2.6vw,2.6rem)] font-semibold leading-tight tracking-[-0.035em] text-[#2a251f]"
      >
        Get in touch
        <span className="mt-2 block h-px w-full origin-left scale-x-0 bg-[#b4472e] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
      </Link>
    </div>
  );
}

/** The phone and tablet version: a straightforward vertical run of frames. */
function Stack({ projects }: { projects: Work[] }) {
  return (
    <div className="px-5 pb-24 pt-28 sm:px-8">
      <h1 className="text-[clamp(2.4rem,10vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#2a251f]">
        {site.name}
      </h1>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[#b4472e]">
        {site.role}
      </p>

      <div className="mt-14 space-y-12">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={`/work/${project.slug}`} className="group block">
              <div className="overflow-hidden">
                <Media
                  media={tileMedia(project)}
                  sizes="100vw"
                  priority={i === 0}
                  autoPlayInView={tileMedia(project).kind === "video"}
                  className="w-full"
                />
              </div>
              <h2 className="mt-4 text-2xl font-medium tracking-[-0.02em] text-[#2a251f]">
                {project.title}
              </h2>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
