import Link from "next/link";

import { Media } from "@/components/Media";
import { formatDate, orderedPosts } from "@/content/posts";

export const metadata = { title: "Journal" };

export default function ReelBlogPage() {
  return (
    <div className="px-5 pb-24 pt-32 sm:px-8 lg:px-10 lg:pt-40">
      <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
        Journal
      </h1>

      <ul className="mt-16">
        {orderedPosts.map((post) => (
          <li key={post.slug} className="border-t border-white/10">
            <Link href={`/reel/blog/${post.slug}`} className="group block py-8 lg:py-10">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_20rem] lg:items-center lg:gap-10">
                <div className="min-w-0">
                  <h2 className="text-[clamp(1.4rem,3vw,2.2rem)] font-medium leading-tight tracking-[-0.03em] text-white/85 transition-colors duration-500 group-hover:text-white">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-white/45">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    {formatDate(post.date)}
                  </p>
                </div>

                {post.cover && (
                  <div className="overflow-hidden opacity-70 transition-opacity duration-700 group-hover:opacity-100">
                    <Media
                      media={post.cover}
                      ratio={16 / 9}
                      sizes="(max-width: 1024px) 100vw, 320px"
                      className="w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
