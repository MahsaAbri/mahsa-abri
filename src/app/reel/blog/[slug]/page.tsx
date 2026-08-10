import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Media } from "@/components/Media";
import { Prose } from "@/components/Prose";
import { formatDate, getPost, orderedPosts, posts } from "@/content/posts";

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

export default async function ReelPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = orderedPosts.findIndex((p) => p.slug === slug);
  const next = orderedPosts[index + 1];

  return (
    <article>
      {post.cover ? (
        <div className="relative h-[62vh] overflow-hidden">
          <Media media={post.cover} fill sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/40 to-[#0c0c0e]/50" />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-12 sm:px-8 lg:px-10">
            <PostHeading post={post} />
          </div>
        </div>
      ) : (
        <div className="px-5 pb-4 pt-36 sm:px-8 lg:px-10">
          <PostHeading post={post} />
        </div>
      )}

      <div className="mx-auto max-w-[44rem] px-5 py-16 sm:px-8 lg:py-24">
        <Prose text={post.body} />
      </div>

      <nav className="border-t border-white/10 px-5 py-14 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Link
            href="/reel/blog"
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40 transition-colors hover:text-[#e8552f]"
          >
            ← All notes
          </Link>
          {next && (
            <Link href={`/reel/blog/${next.slug}`} className="group text-right">
              <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">
                Older
              </span>
              <span className="mt-2 block max-w-md text-[clamp(1.2rem,2.4vw,1.9rem)] font-medium leading-tight tracking-[-0.03em] text-white/80 transition-colors group-hover:text-white">
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
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#e8552f]">
        {formatDate(post.date)}
      </p>
      <h1 className="mt-4 max-w-4xl text-[clamp(2rem,5.5vw,4rem)] font-semibold leading-[1] tracking-[-0.04em] text-white">
        {post.title}
      </h1>
    </>
  );
}
