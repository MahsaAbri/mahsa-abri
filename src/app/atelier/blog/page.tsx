import Link from "next/link";

import { Media } from "@/components/Media";
import { formatDate, orderedPosts } from "@/content/posts";

export const metadata = { title: "Journal" };

export default function AtelierBlogPage() {
  const [lead, ...rest] = orderedPosts;

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-14 sm:px-8 lg:px-10 lg:pt-20">
      <header className="border-b border-[#2a251f]/15 pb-10">
        <h1 className="font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.02em] text-[#2a251f]">
          Journal
        </h1>
      </header>

      {/* Lead article */}
      {lead && (
        <Link href={`/atelier/blog/${lead.slug}`} className="group block border-b border-[#2a251f]/15 py-12">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            {lead.cover && (
              <div className="bg-white p-2.5 shadow-[0_2px_10px_rgba(42,37,31,0.08)] transition-shadow duration-500 group-hover:shadow-[0_16px_40px_rgba(42,37,31,0.16)]">
                <div className="overflow-hidden">
                  <Media
                    media={lead.cover}
                    ratio={16 / 10}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                    className="w-full transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
              </div>
            )}
            <div className="lg:pt-4">
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#b4472e]">
                {formatDate(lead.date)}
              </p>
              <h2 className="mt-4 font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.1] text-[#2a251f] transition-colors group-hover:text-[#b4472e]">
                {lead.title}
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-[1.75] text-[#6d6455]">
                {lead.excerpt}
              </p>
              <span className="mt-6 inline-block text-[13px] uppercase tracking-[0.18em] text-[#8a7f70] underline decoration-[#2a251f]/20 underline-offset-4 transition-colors group-hover:text-[#b4472e]">
                Read on
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* The rest, in columns like a contents page */}
      <ul className="grid gap-x-14 gap-y-0 sm:grid-cols-2">
        {rest.map((post) => (
          <li key={post.slug} className="border-b border-[#2a251f]/12">
            <Link href={`/atelier/blog/${post.slug}`} className="group block py-9">
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#a89a86]">
                {formatDate(post.date)}
              </p>
              <h2 className="mt-3 font-serif text-[clamp(1.35rem,2.3vw,1.85rem)] leading-tight text-[#2a251f] transition-colors group-hover:text-[#b4472e]">
                {post.title}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-[#6d6455]">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
