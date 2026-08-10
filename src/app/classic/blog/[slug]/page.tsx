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

export default async function ClassicPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = orderedPosts.findIndex((p) => p.slug === slug);
  const next = orderedPosts[index + 1];

  return (
    <article>
      <div className="px-5 pt-16 sm:px-8 sm:pt-24 lg:px-12">
        <Link
          href="/classic/blog"
          className="font-condensed text-[13px] uppercase tracking-[0.24em] text-neutral-400 transition-colors hover:text-[#3aa9a4]"
        >
          ← Journal
        </Link>
      </div>

      <header className="mx-auto max-w-3xl px-5 pb-14 pt-10 text-center sm:px-8">
        <p className="font-condensed text-[12px] uppercase tracking-[0.28em] text-[#3aa9a4]">
          {formatDate(post.date)}
        </p>
        <h1 className="mt-6 font-condensed text-[clamp(1.9rem,4.2vw,3rem)] font-light leading-[1.18] tracking-[0.06em] text-neutral-700">
          {post.title}
        </h1>
      </header>

      {post.cover && (
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Media media={post.cover} sizes="(max-width: 1024px) 100vw, 1024px" priority />
        </div>
      )}

      <div className="mx-auto max-w-[42rem] px-5 pt-14 sm:px-8">
        <Prose text={post.body} />
      </div>

      {next && (
        <nav className="mt-24 border-t border-black/[0.07]">
          <Link href={`/classic/blog/${next.slug}`} className="group block px-5 py-14 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="font-condensed text-[12px] uppercase tracking-[0.3em] text-neutral-400">
                Older
              </span>
              <p className="mt-4 font-condensed text-[clamp(1.4rem,2.8vw,2rem)] font-light text-neutral-600 transition-colors group-hover:text-[#3aa9a4]">
                {next.title}
              </p>
            </div>
          </Link>
        </nav>
      )}
    </article>
  );
}
