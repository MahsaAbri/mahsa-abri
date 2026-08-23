# Mahsa Abri — Portfolio

The Reel Warm design: a sideways gallery in warm paper, ink and terracotta.
Every picture is shown whole — nothing cropped, nothing written over the art.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run media        # process the artwork — run after adding pictures
npm run build        # production build
```

---

## Adding work

**Projects are folders.** There's no list to maintain — the site reads them
straight off disk.

```
artwork-source/
  Nini Mina/                  ← the pictures shown when the project is opened
    01-bedroom.jpg
    02-living-room.jpg
  nini_mina_poster.jpg        ← the single picture shown on the landing page
```

The poster sits **next to** the folder, not inside it, and is named after the
folder with `_poster` on the end — lowercase, spaces become underscores. Any
file type works: jpg, png, heic, tif.

Then:

```bash
npm run media
```

That's it — the project appears on the site. The command shrinks every
picture to a sensible size for the web, measures it so pages don't jump about
while loading, and makes the soft blur that shows while an image arrives. Your
originals are never touched.

It skips anything it has already done, so adding one picture takes a second.
Use `npm run media -- --force` to redo the lot.

### Changing the order of the pictures inside a project

Pictures appear in **filename order**. To make that easy to control, number them
once:

```bash
npm run number              # renames every picture to 01, 02, 03…
npm run number -- Sketches  # or just one project
npm run number -- --dry     # show what it would rename, change nothing
```

After that, moving a picture is just renaming it: make the one you want first
`01.jpg`, or slot a new picture between 02 and 03 by calling it `02b.jpg`. Run
`npm run number` again to tidy the numbers back up, then:

```bash
npm run media
```

The renaming happens to your originals in `artwork-source/`, never to anything
else, and two pictures can never overwrite each other while it runs.

**To rename a project or change the order on the landing page**, edit
`src/content/work.ts` — it's short and commented.

### A note on the Thesis poster

`thesis_poster.png` is only 596 × 612, much smaller than the others, so it looks
soft at full width. Replace it with a larger version when you have one — the
import will warn you about any poster like this.

---

## The words

Three files, all commented:

| File       | What's in it                                        |
| ---------- | --------------------------------------------------- |
| `site.ts`  | Your name, the line under it, bio, email, links      |
| `work.ts`  | Project titles, their order, optional one-line notes |
| `posts.ts` | Blog posts                                          |

⚠️ **The About text and the three blog posts are placeholder writing** — replace
them with your own before the site goes live. They're marked in the files.

### Writing a blog post

Copy a block in `posts.ts`. Leave a blank line between paragraphs. At the start
of a line you can use:

```
## A heading
> A pulled-out quote
- A bullet point
![description of the picture](/media/thesis/1.jpg)
---                                  (a divider)
```

Inside a paragraph: `**bold**`, `*italic*`, `[link text](https://example.com)`.
That's the whole list.

### Making the contact form send email

By default the form opens the visitor's email app with their message filled in.
To have messages arrive in your inbox instead, make a free form at
[formspree.io](https://formspree.io) and paste its address into
`contact.formEndpoint` in `site.ts`.

### Video

Put an `.mp4` in a project folder and it's picked up like any other file —
numbered the same way, appearing in that position in the gallery. It plays
quietly when hovered, and with sound and controls when opened full screen or
used as a project's hero (see Animation, and Sketches & Teaching).

`npm run media` shrinks it and makes its poster frame automatically, the same
way it shrinks a picture — but doing that needs
[`ffmpeg`](https://ffmpeg.org) installed on your computer
(`brew install ffmpeg` on a Mac). Without it, the command will tell you what's
missing rather than fail quietly.

---

## Where the files live

- `artwork-source/` — **your originals.** Roughly 900 MB, so they're deliberately
  kept out of version control. Keep a backup of this folder somewhere else; you
  need it to re-run `npm run media`, but not to run or deploy the site.
- `public/media/` — the optimised copies the website actually uses (48 MB).
  These _are_ committed.
- `src/content/work.generated.json` — written by `npm run media`. Don't edit it
  by hand.

---

## Deploying

Any host works; the simplest is [Vercel](https://vercel.com):

```bash
npx vercel
```

Push to the repository and it redeploys itself.

## Built with

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion.
Fonts are downloaded at build time and served from the site, so visitors make no
third-party requests.
