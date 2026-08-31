/**
 * Everything about you: name, bio, email, links.
 * Change it here and it updates across the whole site.
 */

/**
 * The real domain, used for the sitemap and for link previews. Set
 * NEXT_PUBLIC_SITE_URL to override it before going live on a different domain.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahsaabri.com";

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
      src: "/media/about/portrait.jpg",
      alt: "Mahsa Abri",
    },
    /**
     * Blank lines separate paragraphs. The same formatting as `posts.ts` works
     * here too (## headings, > quotes, - lists, **bold**, links).
     */
    body: `My artistic journey started with mural painting. I spent many years working on murals, learning how to work with large-scale spaces, color, and different traditional painting techniques. Working directly on walls taught me a lot about how images interact with their surroundings, and it became an important foundation for the way I see and make art today.

Over time, I started exploring other media and visual approaches. I studied Graphic Design for my bachelor's degree and later earned my Master's degree in Illustration from the University of Art in Tehran. That experience changed the way I thought about images. Illustration became more than just making pictures. It became a way for me to explore ideas, tell stories, and build visual worlds.

As I worked on different projects, I also became increasingly interested in art history and visual culture. I started asking questions about where images come from, how they have changed over time, and what memories and stories they carry. This curiosity gradually became an important part of my practice: exploring the relationship between historical visual traditions and contemporary storytelling.

I am especially drawn to mythology, folklore, literature, and the cultural memory of Iran. I see these traditions not simply as things from the past, but as living sources that can still inspire new ways of seeing and telling stories.

This interest has also shaped my work on animation projects, particularly in Visual Development, Concept Art, environment design, and storyboarding. I enjoy finding connections between historical imagery and contemporary visual storytelling, and exploring how old stories and visual languages can take on new forms.

For me, art has never been a straight or predetermined path. It is an ongoing process of learning, experimenting, discovering, and looking at things again from a different perspective.`,
  },

  contact: {
    /** ⚠️ PLACEHOLDER — replace with your own words. */
    intro: "For commissions, freelance work, or anything else, write to me.",
    /**
     * The form sends messages here using Formspree (free).
     * Sign up at formspree.io, make a form, paste its address in.
     * Left empty, the form opens the visitor's email app instead.
     */
    formEndpoint: "",
  },
};

export type Site = typeof site;
