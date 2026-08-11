/**
 * The designs.
 *
 * Each one is a complete, independent site living under its own folder in
 * `src/app/`. They all read the same content from `src/content/`, so a change
 * to a project or a blog post shows up in all of them at once.
 *
 * Once a design is chosen: set `base` below to "/", move that folder's files up
 * into `src/app/`, and delete the others. Nothing else depends on them.
 */

export type VersionKey = "classic" | "reel" | "reel-warm" | "atelier";

export type Version = {
  key: VersionKey;
  /** URL prefix, e.g. "/classic". */
  base: string;
  name: string;
  /** One line describing the feel, shown on the chooser page. */
  blurb: string;
  /** Longer description for the chooser page. */
  notes: string[];
  /** Two colours used to preview the design on the chooser page. */
  swatch: [string, string];
};

export const versions: Version[] = [
  {
    key: "classic",
    base: "/classic",
    name: "Gallery",
    blurb: "The faithful one — close to your professor's site.",
    notes: [
      "White, quiet, and completely out of the artwork's way",
      "Hovering a piece fades it out and leaves its title behind",
      "Two-column grid, centred letter-spaced headings",
    ],
    swatch: ["#ffffff", "#3aa9a4"],
  },
  {
    key: "reel",
    base: "/reel",
    name: "Reel",
    blurb: "Cinematic. Dark room, one frame at a time.",
    notes: [
      "Full-bleed horizontal gallery you scroll sideways through",
      "Nothing on screen but the work and its name",
      "Project pages open on a full-width frame",
    ],
    swatch: ["#0c0c0e", "#e8552f"],
  },
  {
    key: "reel-warm",
    base: "/reel-warm",
    name: "Reel Warm",
    blurb: "The Reel, printed on warm paper instead of film.",
    notes: [
      "Exactly the Reel layout — sideways gallery, same motion",
      "Atelier's colours: paper, ink and terracotta",
      "Titles wash into the paper rather than sitting on shade",
    ],
    swatch: ["#f4efe6", "#b4472e"],
  },
  {
    key: "atelier",
    base: "/atelier",
    name: "Atelier",
    blurb: "Warm and editorial — a working studio wall.",
    notes: [
      "Pinned collage of work, slightly askew, on paper",
      "Serif type, warm paper, generous margins",
      "Project pages read like a printed folio",
    ],
    swatch: ["#f4efe6", "#b4472e"],
  },
];

export function getVersion(key: VersionKey): Version {
  const found = versions.find((v) => v.key === key);
  if (!found) throw new Error(`Unknown version: ${key}`);
  return found;
}

/** Build a link inside a version, e.g. href("classic", "/work/ashfall"). */
export function href(key: VersionKey, path = "") {
  const base = getVersion(key).base;
  return path === "/" || path === "" ? base : `${base}${path}`;
}
