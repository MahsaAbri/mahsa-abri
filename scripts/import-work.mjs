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
 *
 * ── FOLDERS WITHOUT A POSTER ─────────────────────────────────────────────────
 *
 * A folder with no matching poster isn't treated as a project — it won't show
 * up as work on the landing page. Its pictures are still optimised, though, so
 * you can point to one by hand from `site.ts` (the About picture) or `posts.ts`
 * (a blog cover) — see `src/content/assets.generated.json` for their addresses.
 *
 * ── VIDEO ───────────────────────────────────────────────────────────────────
 *
 * A `.mp4` inside a project folder is treated the same as a picture — it gets
 * a number like any other file, and appears in that position in the gallery.
 * It's compressed and given a poster frame (the still shown before it plays),
 * which is what needs `ffmpeg` installed on the machine running this script.
 */

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "media");
const dataFile = path.join(root, "src", "content", "work.generated.json");
const assetsFile = path.join(root, "src", "content", "assets.generated.json");
const cacheFile = path.join(root, "node_modules", ".cache", "artwork-import.json");
const force = process.argv.includes("--force");

/** Where to look for the original artwork, in order of preference. */
const SOURCE_DIRS = [path.join(root, "artwork-source"), path.join(root, "public", "web")];
const sourceDir = SOURCE_DIRS.find((dir) => existsSync(dir));

/** The longest edge any picture is saved at. Plenty for a full-screen view. */
const MAX_EDGE = 2400;
const QUALITY = 80;

const IMAGE = /\.(jpe?g|png|webp|avif|tiff?|heic|heif|gif)$/i;
/** Video clips — compressed and given a poster frame, same as a picture gets shrunk. */
const VIDEO = /\.(mp4|mov|webm)$/i;
const isMedia = (name) => IMAGE.test(name) || VIDEO.test(name);

/** The longest edge a video is scaled to. Keeps clips small enough to commit. */
const VIDEO_MAX_EDGE = 1280;
/** Bumped when the transcode settings change, so old cached clips get redone. */
const VIDEO_SETTINGS = "crf26-1280";

if (!sourceDir) {
  console.error(
    `No artwork found. Create an "artwork-source" folder in the project root and put your project folders inside it.`
  );
  process.exit(1);
}

async function hasAnyVideo(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (await hasAnyVideo(path.join(dir, entry.name))) return true;
    } else if (VIDEO.test(entry.name)) {
      return true;
    }
  }
  return false;
}

if (await hasAnyVideo(sourceDir)) {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
  } catch {
    console.error(
      `There's a video in "artwork-source/", but "ffmpeg" isn't installed — it's needed to compress clips and make their poster frames.\n` +
        `Install it with "brew install ffmpeg" (Mac) and run this again.`
    );
    process.exit(1);
  }
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

/**
 * Compresses one video clip and gives it a poster frame — the still shown
 * before it plays, and what the page uses to know the clip's shape before it
 * loads. Requires `ffmpeg` on the machine running `npm run media`.
 */
async function optimiseVideo(sourcePath, destRelative, posterRelative) {
  const info = await stat(sourcePath);
  const key = `${sourcePath}:${info.mtimeMs}:${info.size}:${VIDEO_SETTINGS}:video`;
  const destPath = path.join(outDir, destRelative);

  if (cache[key] && existsSync(destPath) && existsSync(path.join(outDir, posterRelative))) {
    nextCache[key] = cache[key];
    reused++;
    return cache[key];
  }

  await mkdir(path.dirname(destPath), { recursive: true });

  const framePath = path.join(tmpdir(), `frame-${shortHash(sourcePath)}-${Date.now()}.jpg`);
  try {
    execFileSync(
      "ffmpeg",
      ["-y", "-ss", "1", "-i", sourcePath, "-frames:v", "1", "-q:v", "2", framePath],
      { stdio: "pipe" }
    );
  } catch {
    // Very short clips have nothing at 1s — fall back to the first frame.
    execFileSync("ffmpeg", ["-y", "-i", sourcePath, "-frames:v", "1", "-q:v", "2", framePath], {
      stdio: "pipe",
    });
  }
  const poster = await optimise(framePath, posterRelative);
  await rm(framePath, { force: true });

  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      sourcePath,
      "-vf",
      `scale='min(${VIDEO_MAX_EDGE},iw)':-2`,
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "26",
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-movflags",
      "+faststart",
      destPath,
    ],
    { stdio: "pipe" }
  );

  const record = {
    src: `/media/${destRelative.split(path.sep).join("/")}`,
    kind: "video",
    poster: poster.src,
    width: poster.width,
    height: poster.height,
    blurDataURL: poster.blurDataURL,
  };

  nextCache[key] = record;
  converted++;
  if (converted % 10 === 0) process.stdout.write(".");
  return record;
}

/**
 * Optimises every picture (and video) in a folder under `public/media/<slug>/`,
 * giving each a short, unique name. `taken` reserves names that already mean
 * something else in this folder (the poster, chiefly), so a picture inside
 * can never overwrite it.
 */
async function optimiseFolder(dir, names, slug, taken = new Set()) {
  const used = new Set(taken);
  const produced = new Set([...taken].map((name) => `${name}.jpg`));
  const images = [];
  for (const name of names) {
    const base = path.parse(name).name;
    let stemOut = slugify(base) || `image-${shortHash(base)}`;
    if (used.has(stemOut)) stemOut = `${stemOut}-${shortHash(name)}`;
    used.add(stemOut);

    if (VIDEO.test(name)) {
      produced.add(`${stemOut}.mp4`);
      produced.add(`${stemOut}-poster.jpg`);
      images.push(
        await optimiseVideo(
          path.join(dir, name),
          path.join(slug, `${stemOut}.mp4`),
          path.join(slug, `${stemOut}-poster.jpg`)
        )
      );
      continue;
    }

    produced.add(`${stemOut}.jpg`);
    images.push(await optimise(path.join(dir, name), path.join(slug, `${stemOut}.jpg`)));
  }
  return { images, produced };
}

const entries = await readdir(sourceDir, { withFileTypes: true });
const folders = entries.filter((e) => e.isDirectory()).sort((a, b) => naturally(a.name, b.name));
const files = entries.filter((e) => e.isFile());

const projects = [];
const assets = {};
const warnings = [];
const notes = [];
/** slug → the filenames this run wrote, so anything else can be swept away. */
const producedBySlug = new Map();

for (const folder of folders) {
  const slug = slugify(folder.name);
  const stem = posterStem(folder.name);

  const posterFile = files.find((f) => IMAGE.test(f.name) && path.parse(f.name).name === stem);

  const contents = (await readdir(path.join(sourceDir, folder.name), { withFileTypes: true }))
    .filter((f) => f.isFile() && isMedia(f.name))
    .map((f) => f.name)
    // A copy of the landing-page picture kept inside the folder — call it
    // "poster" or "nini_mina_poster" — isn't a second piece of work.
    .filter((name) => {
      const base = path.parse(name).name.toLowerCase();
      return base !== "poster" && base !== stem;
    })
    .sort(naturally);

  if (contents.length === 0) {
    warnings.push(`"${folder.name}" has no pictures inside it — skipped.`);
    continue;
  }

  if (!posterFile) {
    // No poster, so this isn't a project — just optimise what's here for use
    // by hand elsewhere on the site.
    const { images, produced } = await optimiseFolder(
      path.join(sourceDir, folder.name),
      contents,
      slug
    );
    assets[slug] = images;
    producedBySlug.set(slug, produced);
    notes.push(
      `"${folder.name}" has no poster, so it isn't a project — its ${images.length} picture(s) are ready to use directly (see assets.generated.json).`
    );
    continue;
  }

  const poster = await optimise(path.join(sourceDir, posterFile.name), path.join(slug, "poster.jpg"));

  // Posters are shown large on the landing page, so a small one is very visible.
  if (Math.max(poster.width, poster.height) < 1400) {
    warnings.push(
      `"${posterFile.name}" is only ${poster.width}×${poster.height} — it will look soft on the landing page. Replace it with a bigger version if you have one.`
    );
  }

  // "poster" is taken by the landing-page picture, so a file called
  // "Poster.png" inside the folder can't be allowed to overwrite it.
  const { images, produced } = await optimiseFolder(
    path.join(sourceDir, folder.name),
    contents,
    slug,
    new Set(["poster"])
  );

  producedBySlug.set(slug, produced);
  projects.push({ slug, folder: folder.name, poster, images });
}

// Drop optimised copies whose original has gone away — whole projects and
// asset folders that were deleted, and single pictures removed from one that
// stayed.
if (existsSync(outDir)) {
  const live = new Set([...projects.map((p) => p.slug), ...Object.keys(assets)]);
  let sweptFiles = 0;

  for (const stale of await readdir(outDir, { withFileTypes: true })) {
    if (!stale.isDirectory()) continue;

    if (!live.has(stale.name)) {
      await rm(path.join(outDir, stale.name), { recursive: true, force: true });
      warnings.push(`Removed "public/media/${stale.name}" — no longer in ${path.basename(sourceDir)}.`);
      continue;
    }

    const keep = producedBySlug.get(stale.name);
    const dir = path.join(outDir, stale.name);
    for (const file of await readdir(dir, { withFileTypes: true })) {
      if (!file.isFile() || keep.has(file.name)) continue;
      await rm(path.join(dir, file.name), { force: true });
      sweptFiles++;
    }
  }

  if (sweptFiles > 0) {
    warnings.push(`Removed ${sweptFiles} optimised picture(s) whose original is no longer in a project folder.`);
  }
}

await mkdir(path.dirname(dataFile), { recursive: true });
await writeFile(dataFile, `${JSON.stringify(projects, null, 2)}\n`);
await writeFile(assetsFile, `${JSON.stringify(assets, null, 2)}\n`);

await mkdir(path.dirname(cacheFile), { recursive: true });
await writeFile(cacheFile, JSON.stringify(nextCache));

const total = projects.reduce((n, p) => n + p.images.length + 1, 0);
const assetTotal = Object.values(assets).reduce((n, images) => n + images.length, 0);
console.log(
  `\n${projects.length} projects, ${total} images — ${converted} optimised, ${reused} unchanged.` +
    (assetTotal > 0 ? ` Plus ${assetTotal} picture(s) in non-project folders.` : "")
);
for (const note of notes) console.log(`  · ${note}`);
for (const warning of warnings) console.log(`  ! ${warning}`);
