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
 *  ADD A VIDEO
 *    Put a `.mp4` in a project folder like any other picture — it gets a number
 *    the same way, and appears in that position. `npm run media` needs `ffmpeg`
 *    installed on your computer to shrink it and make its poster frame.
 *
 *  This file is only for the words: what each project is called, the order they
 *  appear on the landing page, an optional line of description, and (for
 *  Animation) each clip's screen-reader description.
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
  illustration: "Illustrations",
  mural: "Murals",
  sketches: "Sketches & Teaching",
  animation: "Animation",
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
  "illustration",
  "animation",
  "sketches",
  "mural",
];

/**
 * Screen-reader descriptions for individual pictures inside a project, by
 * index — used for the Animation reel, so each clip is announced by its own
 * name rather than a generic "image 3". Leave a project out and its pictures
 * get the generic description.
 */
const CAPTIONS: Record<string, string[]> = {
  animation: [
    "Start Here",
    "Solo Project 1",
    "Solo Project 2",
    "Solo Project 3",
    "Solo Project 4",
    "Solo Project 5",
    "Solo Project 6",
    "Solo Project 7",
    "Solo Project 8",
    "Solo Project 9",
    "Solo Project 10",
    "Solo Project 11",
    "Group Project: BeanSquad",
    "Group Project: Peanut",
  ],
};

/**
 * A longer writeup shown on a project's own page, under its hero. Same
 * formatting as a blog post — see `posts.ts`.
 */
const BODY: Record<string, string> = {
  sketches: `Throughout my drawing and painting classes, I guided students through a range of techniques, walking them step by step through the creative process. I documented much of this through photos and videos and occasionally put together short instructional clips to explain concepts further, help students work through specific challenges, or demonstrate techniques in more depth. My teaching covered a range of mediums: oil painting, soft pastel, charcoal, colored pencil, and watercolor.

This video captures a glimpse of that teaching experience.`,

  "the-parrot-and-the-merchant": `This project is a visual development project for an animation concept based on "The Story of the Merchant and the Parrot," a well-known allegorical story from Rumi's Masnavi, written in the thirteenth century. It follows a caged parrot who receives a message from the free parrots of India and eventually escapes by pretending to be dead. Through this didactic poem, Rumi explores freedom, transformation, and the search for deeper meaning.

Literature has long played an important role in Iranian culture, carrying knowledge, experience, and cultural values through poetry, storytelling, and oral traditions. What interests me about this story is how complex ideas such as freedom are communicated through a simple narrative, using metaphor, character, and transformation. Because of my cultural background, I have always been interested in how stories and poetry preserve ideas across generations, particularly through the long relationship between image and text in Iranian culture and illustrated manuscripts.

I approached this project as a visual research project, exploring how historical stories and cultural traditions can inform contemporary artistic practice. My research included Iranian art and architecture, traditional clothing and jewelry, carpets, everyday objects, courtyard pools, and poshti (traditional cushions and backrests used in Iranian homes). I studied these elements as part of the cultural and visual context of the story rather than simply as decoration.

In my conceptual designs, I combined traditional references with contemporary elements. For example, I imagined the merchant travelling to India by airplane rather than using historical transportation. This contrast allowed me to explore how cultural references can exist within new visual contexts and how stories from the past can be reinterpreted through contemporary images and media.

The designs are not intended to represent one specific historical period or region of Iran. Instead, I brought together references from different cultural and historical contexts to create a diverse visual world. My aim was not to reconstruct the past with complete historical accuracy, but to use research as a foundation for developing a contemporary visual language, incorporating forms, materials, patterns, architectural details, and everyday objects into my interpretation of the story.

Through this project, I became increasingly interested in how traditional cultural elements can continue to exist within contemporary visual culture. More broadly, it reflects my interest in folklore, art history, literature, and visual culture from different parts of the world, and in finding contemporary ways to reinterpret and preserve them while retaining their cultural meaning and emotional depth.`,
};

// ── nothing below here needs editing ────────────────────────────────────────

/** Turns a folder name into a title if one hasn't been set above. */
function titleFor(slug: string, folder: string) {
  return TITLES[slug] ?? folder.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export const work: Work[] = generated
  .map((project): Work => {
    const title = titleFor(project.slug, project.folder);
    const captions = CAPTIONS[project.slug];
    return {
      slug: project.slug,
      title,
      blurb: BLURBS[project.slug],
      body: BODY[project.slug],
      poster: { src: project.poster.src, alt: title },
      images: project.images.map((image, i): Media => ({
        src: image.src,
        alt: captions?.[i] ?? `${title} (image ${i + 1})`,
        kind: image.kind === "video" ? "video" : undefined,
        poster: image.poster,
      })),
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
