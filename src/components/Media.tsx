"use client";

import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";

import type { Media as MediaType } from "@/content/types";
import { mediaInfo } from "@/lib/media";

type Props = {
  media: MediaType;
  /**
   * Force a shape (width ÷ height), e.g. 16 / 9 for a uniform grid.
   * Leave it out to use the file's own proportions.
   */
  ratio?: number;
  /**
   * Stretch to fill the parent element instead of using the picture's own
   * shape. The parent needs `position: relative` and a height of its own.
   */
  fill?: boolean;
  /** How the picture fills its box when `ratio` crops it. */
  fit?: "cover" | "contain";
  /** Responsive size hint. Getting this right is most of image performance. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Plays the video while the pointer is over it. Ignored for images. */
  playOnHover?: boolean;
  /** Plays the video immediately and keeps it looping — for the lightbox. */
  autoPlay?: boolean;
  /** Shows native controls. Lightbox only. */
  controls?: boolean;
};

export function Media({
  media,
  ratio,
  fill = false,
  fit = "cover",
  sizes = "100vw",
  priority = false,
  className = "",
  playOnHover = false,
  autoPlay = false,
  controls = false,
}: Props) {
  const info = mediaInfo(media);
  const aspect = ratio ?? info.aspect;

  return (
    <div
      className={`overflow-hidden ${fill ? "absolute inset-0" : "relative"} ${className}`}
      style={fill ? undefined : { aspectRatio: `${aspect}` }}
    >
      {info.isVideo ? (
        <VideoLayer
          media={media}
          fit={fit}
          playOnHover={playOnHover}
          autoPlay={autoPlay}
          controls={controls}
        />
      ) : (
        <NextImage
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={info.blurDataURL ? "blur" : "empty"}
          blurDataURL={info.blurDataURL}
          className={fit === "cover" ? "object-cover" : "object-contain"}
        />
      )}
    </div>
  );
}

function VideoLayer({
  media,
  fit,
  playOnHover,
  autoPlay,
  controls,
}: {
  media: MediaType;
  fit: "cover" | "contain";
  playOnHover: boolean;
  autoPlay: boolean;
  controls: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  // Hover play has to be driven by hand: `autoPlay` can't be toggled, and
  // play() rejects if the element is torn down mid-promise.
  useEffect(() => {
    const el = ref.current;
    if (!el || !autoPlay) return;
    el.play().catch(() => {});
  }, [autoPlay]);

  const start = () => {
    if (!playOnHover) return;
    ref.current?.play().catch(() => {});
  };
  const stop = () => {
    if (!playOnHover) return;
    const el = ref.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  return (
    <div className="absolute inset-0" onPointerEnter={start} onPointerLeave={stop}>
      <video
        ref={ref}
        src={media.src}
        poster={media.poster}
        muted
        loop
        playsInline
        controls={controls}
        preload="metadata"
        aria-label={media.alt}
        onLoadedData={() => setReady(true)}
        className={`h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"}`}
      />
      {!controls && (
        <span
          aria-hidden
          className={`pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-opacity duration-300 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <svg viewBox="0 0 10 12" className="h-2.5 w-2.5 fill-current">
            <path d="M0 0v12l10-6z" />
          </svg>
          Video
        </span>
      )}
    </div>
  );
}
