import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";
import { posts } from "@/content/posts";
import { work } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/about", "/blog", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
  }));

  const workRoutes: MetadataRoute.Sitemap = work.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  return [...staticRoutes, ...workRoutes, ...postRoutes];
}
