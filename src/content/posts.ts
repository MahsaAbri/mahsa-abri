import type { Post } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE BLOG
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  ⚠️ The three posts below are PLACEHOLDER writing, here so the blog isn't
 *  empty while the site is being reviewed. Replace them with your own.
 *
 *  To write a post, copy a block and change the words. Posts sort themselves
 *  newest-first from the date, so you can paste a new one anywhere.
 *
 *  FORMATTING INSIDE `body`
 *  Leave a blank line between paragraphs. At the start of a line:
 *
 *     ## A heading
 *     > A pulled-out quote
 *     - A bullet point
 *     ![description of the picture](/media/thesis/1.jpg)
 *     ---                                (a divider line)
 *
 *  Inside a paragraph: **bold**, *italic*, [link text](https://example.com).
 *  That's the whole list.
 */

export const posts: Post[] = [
  {
    slug: "starting-rough",
    title: "Starting rough",
    date: "2026-07-18",
    excerpt: "Why the first hour of a drawing should look nothing like the last one.",
    cover: {
      src: "/media/concept-art/study-01-copy.jpg",
      alt: "A loose study",
    },
    body: `Every piece I'm happy with started as something I wouldn't show anyone.

The temptation is to go straight at the finished image — good paper, careful lines, the version you already have in your head. It produces exactly one idea, and by the time you've spent four hours on it you're committed to it whether it's working or not.

## Small, fast, and a lot of them

So I start with thumbnails. Small enough that a whole composition takes a minute, and loose enough that throwing one away costs nothing.

Most of them are bad, and that's the point — you have to spend the obvious ideas before you get to the ones you didn't know you had.

> The rough isn't a worse version of the final. It's where the decisions actually happen.

Only when one of them keeps pulling my eye back do I scale it up, and only then does anything get careful.`,
  },

  {
    slug: "light-first",
    title: "Light first, everything else after",
    date: "2026-05-02",
    excerpt: "Deciding where the light comes from before deciding what's in the frame.",
    cover: {
      src: "/media/the-parrot-and-the-merchant/01.jpg",
      alt: "An illustrated scene",
    },
    body: `I've stopped starting with objects. Where the light comes from, how strong it is and what colour it is decides nearly everything else — so it may as well be the first decision rather than the last.

Once the light is fixed, a lot of questions answer themselves. Where the eye goes. Which shapes are allowed to be complicated and which have to stay simple. What time of day it feels like, and therefore what the picture is about.

## A useful test

Squint at it. If the thing you want people to look at isn't the brightest or the darkest shape in the frame, it isn't going to work, and no amount of detail will rescue it.

![An environment painting](/media/concept-art/forest-copy.jpg)

The detail is the easy part. It's the last five percent, and it only ever helps a picture that already reads.`,
  },

  {
    slug: "drawing-from-life",
    title: "Drawing from life, even when the work isn't",
    date: "2026-02-14",
    excerpt: "Invented worlds are built out of things you've actually looked at.",
    body: `Almost nothing I paint exists. That's exactly why I draw things that do.

You can't invent convincingly from memory alone — you end up drawing the *idea* of a tree rather than a tree. Half an hour in front of a real one gives you the things you'd never have thought to make up: the way a branch thickens where it leaves the trunk, how much of it is dead, how little of it is symmetrical.

## What I take from it

- How things are built, not how they look
- What weight looks like — how a heavy thing sits differently to a light one
- Wear, damage and repair, which is where most of the character is

> Reference isn't copying. It's the vocabulary you invent with.

---

None of it appears directly. It just means that when I'm making something up, I'm making it out of things I've actually seen.`,
  },
];

/** Newest first. */
export const orderedPosts: Post[] = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
