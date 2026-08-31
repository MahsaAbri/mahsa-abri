import assetsGenerated from "@/content/assets.generated.json";
import generated from "@/content/work.generated.json";
import type { Media } from "@/content/types";

/**
 * Every optimised picture, by path, with the measurements taken by
 * `npm run media`. Knowing an image's shape before it loads is what stops the
 * page jumping about, and the tiny blurred copy is what shows in the meantime.
 *
 * Pictures from project folders (`work.generated.json`) and from folders with
 * no poster (`assets.generated.json` — the About picture, a blog cover…) are
 * both included, so either kind can be measured the same way.
 */
type Measured = { src: string; width: number; height: number; blurDataURL?: string; poster?: string };

/**
 * A video's own entry carries its poster frame's width/height, but under the
 * video's `src` — also index it under the poster's own path, since that's
 * what a video looks itself up by (see `mediaInfo` below).
 */
function keysFor(image: Measured): Array<readonly [string, Measured]> {
  return image.poster ? [[image.src, image], [image.poster, image]] : [[image.src, image]];
}

const measurements = new Map<string, Measured>([
  ...generated.flatMap((project) => [project.poster, ...project.images].flatMap(keysFor)),
  ...Object.values(assetsGenerated).flatMap((images) => images.flatMap(keysFor)),
]);

/** Used for anything not yet measured, so a missing entry never breaks a page. */
const FALLBACK_ASPECT = 3 / 2;

export type MediaInfo = {
  isVideo: boolean;
  /** width ÷ height */
  aspect: number;
  blurDataURL?: string;
};

export function mediaInfo(media: Media): MediaInfo {
  const isVideo = media.kind === "video" || /\.(mp4|webm)$/i.test(media.src);

  if (isVideo) {
    // A video's shape comes from its poster, which has been measured.
    const poster = media.poster ? measurements.get(media.poster) : undefined;
    return {
      isVideo: true,
      aspect: poster ? poster.width / poster.height : 16 / 9,
      blurDataURL: poster?.blurDataURL,
    };
  }

  const entry = measurements.get(media.src);
  if (!entry) return { isVideo: false, aspect: FALLBACK_ASPECT };

  return {
    isVideo: false,
    aspect: entry.width / entry.height,
    blurDataURL: entry.blurDataURL,
  };
}

/** True when a picture is noticeably wider than tall — used to lay out grids. */
export function isLandscape(media: Media) {
  return mediaInfo(media).aspect >= 1.15;
}

/** A processed video's own poster frame, found by its `.mp4`/`.webm` path — for embedding one in a blog post, where there's no `Media` object to carry it explicitly. */
export function posterFor(src: string): string | undefined {
  return measurements.get(src)?.poster;
}
