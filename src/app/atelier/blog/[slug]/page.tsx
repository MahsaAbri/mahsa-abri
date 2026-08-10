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

export default async function AtelierPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = orderedPosts.findIndex((p) => p.slug === slug);
  const next = orderedPosts[index + 1];

  return (
    <article className="mx-auto max-w-[1400px] px-5 pt-10 sm:px-8 lg:px-10">
      <Link
        href="/atelier/blog"
        className="text-[13px] uppercase tracking-[0.18em] text-[#8a7f70] transition-colors hover:text-[#b4472e]"
      >
        ← Journal
      </Link>

      <header className="mx-auto max-w-3xl pb-10 pt-12 text-center lg:pt-16">
        <p className="text-[12px] uppercase tracking-[0.22em] text-[#b4472e]">
          {formatDate(post.date)}
        </p>
        <h1 className="mt-5 font-serif text-[clamp(2rem,5vw,3.6rem)] leading-[1.06] tracking-[-0.015em] text-[#2a251f]">
          {post.title}
        </h1>
      </header>

      {post.cover && (
        <div className="mx-auto max-w-4xl bg-white p-3 shadow-[0_2px_14px_rgba(42,37,31,0.09)]">
          <Media media={post.cover} sizes="(max-width: 1024px) 100vw, 900px" priority className="w-full" />
        </div>
      )}

      <div className="mx-auto max-w-[40rem] py-14 lg:py-20">
        <Prose text={post.body} />
      </div>

      {next && (
        <nav className="border-t border-[#2a251f]/15 py-12 text-center">
          <p className="text-[12px] uppercase tracking-[0.22em] text-[#a89a86]">Previously</p>
          <Link
            href={`/atelier/blog/${next.slug}`}
            className="mt-3 inline-block font-serif text-[clamp(1.4rem,3vw,2.2rem)] leading-tight text-[#2a251f] transition-colors hover:text-[#b4472e]"
          >
            {next.title}
          </Link>
        </nav>
      )}
    </article>
  );
}
