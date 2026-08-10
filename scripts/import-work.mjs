/**
 * Turns the folders of original artwork into web-ready images.
 *
 *   npm run media
 *
 * ── HOW IT WORKS ────────────────────────────────────────────────────────────
 *
 * Put your work in `artwork-source/`, one folder per project:
 *
 *     artwork-source/
 *       Nini Mina/                  ← the pictures inside this project
 *         painting-01.jpg
 *         painting-02.jpg
 *       nini_mina_poster.jpg        ← the single image shown on the landing page
 *
 * The poster is matched to its folder by name: the folder "Nini Mina" looks for
 * `nini_mina_poster.*` (lowercase, spaces become underscores). Any file type
 * works — jpg, png, heic, tif.
 *
 * Running `npm run media` then:
 *   • shrinks every picture to a sensible size for the web and strips the
 *     camera data out of it — an 80 MB photo becomes a few hundred KB with no
 *     visible difference on screen
 *   • records each one's shape, so pages don't jump about while loading
 *   • saves a tiny blurred copy that shows instantly and fades into the real one
 *   • writes the result to `src/content/work.generated.json`
 *
 * The originals are never modified, and never uploaded — only the optimised
 * copies in `public/media/` go to the website.
 *
 * Images already processed are skipped, so re-running after adding one new
 * picture takes a second. Use `npm run media -- --force` to redo everything.
 */

import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "media");
const dataFile = path.join(root, "src", "content", "work.generated.json");
const cacheFile = path.join(root, "node_modules", ".cache", "artwork-import.json");
const force = process.argv.includes("--force");

/** Where to look for the original artwork, in order of preference. */
const SOURCE_DIRS = [path.join(root, "artwork-source"), path.join(root, "public", "web")];
const sourceDir = SOURCE_DIRS.find((dir) => existsSync(dir));

/** The longest edge any picture is saved at. Plenty for a full-screen view. */
const MAX_EDGE = 2400;
const QUALITY = 80;

const IMAGE = /\.(jpe?g|png|webp|avif|tiff?|heic|heif|gif)$/i;

if (!sourceDir) {
  console.error(
    `No artwork found. Create an "artwork-source" folder in the project root and put your project folders inside it.`
  );
  process.exit(1);
}

// ── helpers ─────────────────────────────────────────────────────────────────

/** "The Parrot and the Merchant" → "the-parrot-and-the-merchant" (used in URLs). */
function slugify(name) {
  return name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** "Nini Mina" → "nini_mina_poster", the naming used for poster files. */
function posterStem(folderName) {
  return `${folderName.toLowerCase().replace(/\s+/g, "_")}_poster`;
}

/** A short stable id, for filenames that slugify to nothing (e.g. Persian). */
function shortHash(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

/** Sorts "img2" before "img10", the way a person would. */
const naturally = new Intl.Collator("en", { numeric: true, sensitivity: "base" }).compare;

async function loadCache() {
  if (force) return {};
  try {
    return JSON.parse(await readFile(cacheFile, "utf8"));
  } catch {
    return {};
  }
}

// ── the work ────────────────────────────────────────────────────────────────

const cache = await loadCache();
const nextCache = {};
let converted = 0;
let reused = 0;

/**
 * Optimises one picture and returns everything the site needs to display it.
 * Unchanged files are read straight back out of the cache.
 */
async function optimise(sourcePath, destRelative) {
  const info = await stat(sourcePath);
  const key = `${sourcePath}:${info.mtimeMs}:${info.size}:${MAX_EDGE}:${QUALITY}`;
  const destPath = path.join(outDir, destRelative);

  if (cache[key] && existsSync(destPath)) {
    nextCache[key] = cache[key];
    reused++;
    return cache[key];
  }

  await mkdir(path.dirname(destPath), { recursive: true });

  const image = sharp(sourcePath, { failOn: "none" })
    // Honour the camera's rotation flag, then drop it — otherwise phone photos
    // come out on their side.
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true });

  const { width, height } = await image
    .clone()
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toFile(destPath);

  const blur = await sharp(destPath).resize(20, null, { fit: "inside" }).jpeg({ quality: 45 }).toBuffer();

  const record = {
    src: `/media/${destRelative.split(path.sep).join("/")}`,
    width,
    height,
    blurDataURL: `data:image/jpeg;base64,${blur.toString("base64")}`,
  };

  nextCache[key] = record;
  converted++;
  if (converted % 10 === 0) process.stdout.write(".");
  return record;
}

const entries = await readdir(sourceDir, { withFileTypes: true });
const folders = entries.filter((e) => e.isDirectory()).sort((a, b) => naturally(a.name, b.name));
const files = entries.filter((e) => e.isFile());

const projects = [];
const warnings = [];

for (const folder of folders) {
  const slug = slugify(folder.name);
  const stem = posterStem(folder.name);

  const posterFile = files.find((f) => IMAGE.test(f.name) && path.parse(f.name).name === stem);
  if (!posterFile) {
    warnings.push(
      `"${folder.name}" has no poster — add a file called "${stem}.jpg" next to the folder, or the project is skipped.`
    );
    continue;
  }

  const contents = (await readdir(path.join(sourceDir, folder.name), { withFileTypes: true }))
    .filter((f) => f.isFile() && IMAGE.test(f.name))
    .map((f) => f.name)
    .sort(naturally);

  if (contents.length === 0) {
    warnings.push(`"${folder.name}" has no pictures inside it — skipped.`);
    continue;
  }

  const poster = await optimise(path.join(sourceDir, posterFile.name), path.join(slug, "poster.jpg"));

  // Posters are shown large on the landing page, so a small one is very visible.
  if (Math.max(poster.width, poster.height) < 1400) {
    warnings.push(
      `"${posterFile.name}" is only ${poster.width}×${poster.height} — it will look soft on the landing page. Replace it with a bigger version if you have one.`
    );
  }

  const used = new Set();
  const images = [];
  for (const name of contents) {
    const base = path.parse(name).name;
    let stemOut = slugify(base) || `image-${shortHash(base)}`;
    if (used.has(stemOut)) stemOut = `${stemOut}-${shortHash(name)}`;
    used.add(stemOut);

    images.push(await optimise(path.join(sourceDir, folder.name, name), path.join(slug, `${stemOut}.jpg`)));
  }

  projects.push({ slug, folder: folder.name, poster, images });
}

// Drop optimised folders whose source project has gone away.
if (existsSync(outDir)) {
  const live = new Set(projects.map((p) => p.slug));
  for (const stale of await readdir(outDir, { withFileTypes: true })) {
    if (stale.isDirectory() && !live.has(stale.name)) {
      await rm(path.join(outDir, stale.name), { recursive: true, force: true });
      warnings.push(`Removed "public/media/${stale.name}" — no longer in ${path.basename(sourceDir)}.`);
    }
  }
}

await mkdir(path.dirname(dataFile), { recursive: true });
await writeFile(dataFile, `${JSON.stringify(projects, null, 2)}\n`);

await mkdir(path.dirname(cacheFile), { recursive: true });
await writeFile(cacheFile, JSON.stringify(nextCache));

const total = projects.reduce((n, p) => n + p.images.length + 1, 0);
console.log(
  `\n${projects.length} projects, ${total} images — ${converted} optimised, ${reused} unchanged.`
);
for (const warning of warnings) console.log(`  ! ${warning}`);
