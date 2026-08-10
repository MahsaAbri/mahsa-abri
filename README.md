# Mahsa Abri — Portfolio

Three complete designs for the same portfolio. They all read from the same
artwork and the same words, so the work only needs adding once.

| Version     | URL        | Feel                                                                                             |
| ----------- | ---------- | ------------------------------------------------------------------------------------------------ |
| **Gallery** | `/classic` | White and quiet, close to the reference site. Hovering a piece fades it out and leaves its title. |
| **Reel**    | `/reel`    | Cinematic. A dark room and a sideways gallery.                                                    |
| **Atelier** | `/atelier` | Warm and printed. Work pinned to a studio wall.                                                   |

Open `/` to compare all three.

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

That's it — the project appears in all three versions. The command shrinks every
picture to a sensible size for the web, measures it so pages don't jump about
while loading, and makes the soft blur that shows while an image arrives. Your
originals are never touched.

It skips anything it has already done, so adding one picture takes a second.
Use `npm run media -- --force` to redo the lot.

**To reorder the pictures inside a project**, put numbers at the front of the
filenames: `01-…`, `02-…`.

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

⚠️ **The About text and the three blog posts are placeholder writing** — they're
there so the pages aren't empty while the design is being chosen. Replace them
with your own before the site goes live. They're marked in the files.

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

Nothing on the site uses video yet, but it's supported. Put an `.mp4` in a
project folder and it will be picked up like any other file — it plays quietly
when hovered in a gallery, and with sound and controls when opened full screen.
Keep clips under about 10 MB; for anything longer, put it on Vimeo and link to
it from a blog post.

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

## Choosing one version

Once a design is picked the other two are deleted and nothing else changes:

1. Move the contents of `src/app/<chosen>/` up into `src/app/`, replacing the
   chooser page at `src/app/page.tsx`.
2. Delete the other two folders in `src/app/` and `src/components/`, and
   `src/components/VersionSwitch.tsx` (plus the line using it in the layout).
3. Change that version's internal links from `/classic/…` to `/…`.

Ask me and I'll do it — it's a few minutes of mechanical work.

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
