/**
 * Renames the pictures inside each project folder to 01, 02, 03 … so their
 * order on the website is just their number.
 *
 *   npm run number                 # every project
 *   npm run number -- Sketches     # one project
 *   npm run number -- --dry        # show what it would do, change nothing
 *
 * ── WHY ─────────────────────────────────────────────────────────────────────
 *
 * Pictures appear in filename order. Once they're numbered, moving one is a
 * rename: make the picture you want first `01`, and run `npm run media` again.
 * Half-numbers work too — call something `02b.jpg` to slot it between 02 and
 * 03, then run this to tidy the numbering back up.
 *
 * Files are renamed in two passes, so nothing is ever overwritten by a file
 * taking its place. Extensions are kept as they are.
 *
 * A few pictures are named directly in `site.ts` and `posts.ts` — the About
 * portrait, the picture at the top of a blog post. Renaming would leave those
 * pointing at nothing, so this script rewrites them to the new names as it
 * goes, and says which lines it changed.
 */

import { existsSync } from "node:fs";
import { readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sourceDir = path.join(root, "artwork-source");
const dataFile = path.join(root, "src", "content", "work.generated.json");
/** The files allowed to name a picture directly. */
const CONTENT_FILES = ["site.ts", "posts.ts"].map((f) => path.join(root, "src", "content", f));

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const only = args.filter((a) => !a.startsWith("--"));

/** The same list `npm run media` reads, so the two agree on what a picture is. */
const IMAGE = /\.(jpe?g|png|webp|avif|tiff?|heic|heif|gif)$/i;

/** Sorts "img2" before "img10", the way a person would. */
const naturally = new Intl.Collator("en", { numeric: true, sensitivity: "base" }).compare;

if (!existsSync(sourceDir)) {
  console.error(`No "artwork-source" folder found at ${sourceDir}.`);
  process.exit(1);
}

/*
  `npm run media` writes down every optimised picture in the order it read the
  folder — the same order this script numbers them in. That listing is what
  lets us say "this old web address becomes that one" without guessing.
*/
let generated = [];
try {
  generated = JSON.parse(await readFile(dataFile, "utf8"));
} catch {
  console.error(`Couldn't read ${path.relative(root, dataFile)}. Run "npm run media" first.`);
  process.exit(1);
}
const generatedByFolder = new Map(generated.map((project) => [project.folder, project]));

const entries = await readdir(sourceDir, { withFileTypes: true });
const chosen = (name) => only.length === 0 || only.some((n) => n.toLowerCase() === name.toLowerCase());

const folders = entries
  .filter((e) => e.isDirectory() && chosen(e.name))
  .sort((a, b) => naturally(a.name, b.name));

if (only.length > 0 && folders.length === 0) {
  console.error(`No folder called "${only.join('", "')}" in artwork-source/.`);
  process.exit(1);
}

let renamed = 0;
let already = 0;
/** Old web address → new one, for the pictures named in site.ts / posts.ts. */
const rewrites = new Map();

for (const folder of folders) {
  const project = generatedByFolder.get(folder.name);
  if (!project) {
    console.log(`${folder.name} — not a project (no poster), so its order doesn't matter here — skipped`);
    continue;
  }

  const dir = path.join(sourceDir, folder.name);
  // A copy of the landing-page picture kept inside the folder isn't part of
  // the run of pictures, so it keeps its name — same rule as `npm run media`.
  const posterStem = `${folder.name.toLowerCase().replace(/\s+/g, "_")}_poster`;
  const files = (await readdir(dir, { withFileTypes: true }))
    .filter((f) => f.isFile() && IMAGE.test(f.name))
    .map((f) => f.name)
    .filter((name) => {
      const base = path.parse(name).name.toLowerCase();
      return base !== "poster" && base !== posterStem;
    })
    .sort(naturally);

  if (files.length === 0) continue;

  // Wide enough for the biggest folder: 9 pictures → "1", 90 → "01".
  const width = String(files.length).length;
  const plan = files.map((name, i) => ({
    from: name,
    to: `${String(i + 1).padStart(width, "0")}${path.extname(name).toLowerCase()}`,
    /** What the website will call it once `npm run media` has run again. */
    newSrc: `/media/${project.slug}/${String(i + 1).padStart(width, "0")}.jpg`,
    oldSrc: project.images[i]?.src,
  }));

  if (files.length !== project.images.length) {
    console.log(
      `${folder.name} — pictures have been added or removed since the last "npm run media", so this folder is skipped. Run "npm run media" first.`
    );
    continue;
  }

  for (const move of plan) {
    if (move.oldSrc && move.oldSrc !== move.newSrc) rewrites.set(move.oldSrc, move.newSrc);
  }

  const moves = plan.filter((move) => move.from !== move.to);
  already += files.length - moves.length;

  if (moves.length === 0) {
    console.log(`${folder.name} — already numbered (${files.length})`);
    continue;
  }

  console.log(`${folder.name} — ${moves.length} of ${files.length} to rename`);
  for (const move of moves) console.log(`    ${move.from}  →  ${move.to}`);

  if (dry) continue;

  // Pass one: park everything under a name nothing else can want. Pass two:
  // put it back as its number. Without this, renaming "2.jpg" to "1.jpg"
  // would destroy the picture already called "1.jpg".
  for (const move of moves) {
    await rename(path.join(dir, move.from), path.join(dir, `~tmp~${move.to}`));
  }
  for (const move of moves) {
    await rename(path.join(dir, `~tmp~${move.to}`), path.join(dir, move.to));
  }
  renamed += moves.length;
}

// ── keep the handful of hand-written picture names working ──────────────────

const mentioned = [];
for (const file of CONTENT_FILES) {
  if (!existsSync(file)) continue;
  const before = await readFile(file, "utf8");
  let after = before;

  for (const [oldSrc, newSrc] of rewrites) {
    if (!after.includes(oldSrc)) continue;
    after = after.split(oldSrc).join(newSrc);
    mentioned.push(`${path.basename(file)}: ${oldSrc} → ${newSrc}`);
  }

  if (after !== before && !dry) await writeFile(file, after);
}

if (mentioned.length > 0) {
  console.log(`\n${dry ? "Would update" : "Updated"} the pictures named in your words files:`);
  for (const line of mentioned) console.log(`    ${line}`);
}

if (dry) {
  console.log(`\nNothing changed — this was a dry run. Drop "--dry" to do it.`);
} else {
  console.log(`\n${renamed} renamed, ${already} already numbered.`);
  if (renamed > 0) console.log(`Now run "npm run media" to rebuild the website's copies.`);
}
