import Link from "next/link";

import { Media } from "@/components/Media";
import { PageTitle } from "@/components/classic/PageTitle";
import { formatDate, orderedPosts } from "@/content/posts";

export const metadata = { title: "Blog" };

export default function ClassicBlogPage() {
  return (
    <>
      <PageTitle>Journal</PageTitle>

      <div className="mx-auto max-w-3xl px-5 pb-8 sm:px-8">
        <ul>
          {orderedPosts.map((post) => (
            <li key={post.slug} className="border-t border-black/[0.08] first:border-t-0">
              <Link
                href={`/classic/blog/${post.slug}`}
                className="group flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:gap-8"
              >
                {post.cover && (
                  <div className="w-full shrink-0 overflow-hidden bg-neutral-50 sm:w-56">
                    <Media
                      media={post.cover}
                      ratio={4 / 3}
                      sizes="(max-width: 640px) 100vw, 224px"
                      className="w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="font-condensed text-[12px] uppercase tracking-[0.26em] text-[#3aa9a4]">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="mt-3 font-condensed text-[clamp(1.5rem,2.6vw,2rem)] font-normal leading-[1.2] text-neutral-700 transition-colors group-hover:text-[#3aa9a4]">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[16px] leading-[1.7] text-neutral-500">{post.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
