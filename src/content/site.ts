/**
 * Everything about you: name, bio, email, links.
 * Change it here and it updates across the whole site.
 */

export const site = {
  name: "Mahsa Abri",
  /** The line under your name. Keep it short. */
  role: "Concept Artist",
  /** Used for the browser tab and for link previews when the site is shared. */
  tagline: "Concept art, illustration and visual development.",

  email: "Zeinab.Abri@UTDallas.edu",
  /** Leave as "" to hide it. */
  location: "",

  /** Delete any line you don't use. */
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/mahsaabri74/" },
    { label: "ArtStation", href: "https://www.artstation.com/mahsaabri" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mahsa-abri/" },
  ],

  about: {
    /** The picture on the About page. Any image from `public/media/`. */
    portrait: {
      src: "/media/concept-art/environment-copy2.jpg",
      alt: "Environment concept painting",
    },
    /**
     * ⚠️ PLACEHOLDER — replace this with your own words.
     *
     * Blank lines separate paragraphs. The same formatting as `posts.ts` works
     * here too (## headings, > quotes, - lists, **bold**, links).
     */
    body: `I'm a concept artist and illustrator. I work on environments, characters and visual development — the early part of a project, where a story is still deciding what it looks like.

I paint, and I draw from life whenever I can. Most of what ends up here started as something much rougher.

Available for freelance and commission work.`,
  },

  contact: {
    /** ⚠️ PLACEHOLDER — replace with your own words. */
    intro: "For commissions, freelance work, or anything else — write to me.",
    /**
     * The form sends messages here using Formspree (free).
     * Sign up at formspree.io, make a form, paste its address in.
     * Left empty, the form opens the visitor's email app instead.
     */
    formEndpoint: "",
  },
};

export type Site = typeof site;
