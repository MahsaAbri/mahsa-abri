import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Media } from "@/components/Media";
import { Prose } from "@/components/Prose";
import { formatDate, getPost, orderedPosts, posts } from "@/content/posts";
import { mediaInfo } from "@/lib/media";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function ReelWarmPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = orderedPosts.findIndex((p) => p.slug === slug);
  const next = orderedPosts[index + 1];

  return (
    <article>
      <div className="px-5 pt-32 sm:px-8 lg:px-10 lg:pt-40">
        <PostHeading post={post} />

        {/* The cover is shown whole, with the heading above it rather than on it. */}
        {post.cover && (
          <div
            className="mt-12"
            style={{ width: `min(100%, ${(mediaInfo(post.cover).aspect * 62).toFixed(2)}vh)` }}
          >
            <Media media={post.cover} sizes="100vw" priority className="w-full" />
          </div>
        )}
      </div>

      <div className="mx-auto max-w-[44rem] px-5 py-16 sm:px-8 lg:py-24">
        <Prose text={post.body} />
      </div>

      <nav className="border-t border-[#2a251f]/12 px-5 py-14 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Link
            href="/blog"
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8a7f70] transition-colors hover:text-[#b4472e]"
          >
            ← All notes
          </Link>
          {next && (
            <Link href={`/blog/${next.slug}`} className="group text-right">
              <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-[#a89a86]">
                Older
              </span>
              <span className="mt-2 block max-w-md text-[clamp(1.2rem,2.4vw,1.9rem)] font-medium leading-tight tracking-[-0.03em] text-[#3f3930] transition-colors group-hover:text-[#2a251f]">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}

function PostHeading({ post }: { post: NonNullable<ReturnType<typeof getPost>> }) {
  return (
    <>
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#b4472e]">
        {formatDate(post.date)}
      </p>
      <h1 className="mt-4 max-w-4xl text-[clamp(2rem,5.5vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] text-[#2a251f]">
        {post.title}
      </h1>
    </>
  );
}
