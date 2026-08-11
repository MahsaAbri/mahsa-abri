import generated from "./work.generated.json";
import type { Media, Work } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  YOUR WORK
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  The projects themselves come from your folders of artwork. To add, remove or
 *  change a project you don't edit code — you move files around:
 *
 *  ADD A PROJECT
 *    1. Make a folder in `artwork-source/` and put the pictures in it.
 *    2. Next to it (not inside), add the picture for the landing page, named
 *       after the folder with `_poster` on the end:
 *         artwork-source/Sketches/…            ← the pictures
 *         artwork-source/sketches_poster.jpg   ← the landing page image
 *    3. Run `npm run media`.
 *
 *  REORDER THE PICTURES INSIDE A PROJECT
 *    They appear in filename order. Run `npm run number` once and every picture
 *    is renamed 01, 02, 03…; after that, moving one is just renaming it —
 *    make it `01` to put it first, then run `npm run media` again.
 *
 *  This file is only for the words: what each project is called, the order they
 *  appear on the landing page, and an optional line of description.
 */

/**
 * What each project is called on the website.
 *
 * The key is the folder name turned into a web address — lowercase, spaces
 * become dashes. If you add a project and don't list it here, its folder name
 * is used as the title, so this is optional.
 */
const TITLES: Record<string, string> = {
  "concept-art": "Concept Art",
  "the-parrot-and-the-merchant": "The Parrot and the Merchant",
  "nini-mina": "Nini Mina",
  thesis: "Thesis",
  illustration: "Illustration",
  mural: "Mural",
  sketches: "Sketches",
};

/**
 * An optional single line shown under a project's title.
 *
 * Leave a project out and nothing is shown, which is usually the better
 * choice — the work speaks first. Add one like this:
 *
 *   "nini-mina": "Environment and layout design for an animated short.",
 */
const BLURBS: Record<string, string> = {};

/**
 * The order projects appear on the landing page.
 * Anything not listed here goes at the end, alphabetically.
 */
const ORDER = [
  "concept-art",
  "the-parrot-and-the-merchant",
  "nini-mina",
  "thesis",
  "illustration",
  "mural",
  "sketches",
];

// ── nothing below here needs editing ────────────────────────────────────────

/** Turns a folder name into a title if one hasn't been set above. */
function titleFor(slug: string, folder: string) {
  return TITLES[slug] ?? folder.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export const work: Work[] = generated
  .map((project): Work => {
    const title = titleFor(project.slug, project.folder);
    return {
      slug: project.slug,
      title,
      blurb: BLURBS[project.slug],
      poster: { src: project.poster.src, alt: title },
      images: project.images.map(
        (image, i): Media => ({ src: image.src, alt: `${title} — image ${i + 1}` })
      ),
    };
  })
  .sort((a, b) => {
    const ai = ORDER.indexOf(a.slug);
    const bi = ORDER.indexOf(b.slug);
    if (ai === -1 && bi === -1) return a.title.localeCompare(b.title);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

export function getWork(slug: string): Work | undefined {
  return work.find((project) => project.slug === slug);
}

/** The project after this one, wrapping around — for the "next" link. */
export function nextWork(slug: string): Work {
  const i = work.findIndex((project) => project.slug === slug);
  return work[(i + 1) % work.length];
}
