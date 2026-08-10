/**
 * Shared content types.
 *
 * You don't need to edit this file — it only describes the shape of the data in
 * `work.ts`, `posts.ts` and `site.ts` so your editor can help you.
 */

/** A single picture or video. */
export type Media = {
  /** Path inside the `public` folder, e.g. `/media/thesis/01.jpg`. */
  src: string;
  /** Description for screen readers and search engines. */
  alt: string;
  /** `"video"` for .mp4 files. Leave it out for pictures. */
  kind?: "image" | "video";
  /** For videos: the still shown before it plays. Always include one. */
  poster?: string;
};

/** One project: the poster shown on the landing page, and the work inside it. */
export type Work = {
  /** The URL: `"thesis"` becomes `/work/thesis`. Comes from the folder name. */
  slug: string;
  title: string;
  /** Optional single line under the title. Leave it out and nothing is shown. */
  blurb?: string;
  /** The image on the landing page — the `_poster` file. */
  poster: Media;
  /** Everything inside the project's folder. */
  images: Media[];
};

export type Post = {
  /** The URL: `"painting-fog"` becomes `/blog/painting-fog`. */
  slug: string;
  title: string;
  /** Format: YYYY-MM-DD. Posts sort themselves newest first. */
  date: string;
  /** A one-line teaser for the blog list. */
  excerpt: string;
  /** Optional picture at the top of the post. */
  cover?: Media;
  /** The post itself. See `posts.ts` for the formatting you can use. */
  body: string;
};
