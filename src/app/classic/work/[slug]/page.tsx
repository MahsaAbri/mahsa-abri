import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectGallery } from "@/components/classic/ProjectGallery";
import { getWork, nextWork, work } from "@/content/work";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return work.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getWork(slug);
  if (!project) return {};
  return { title: project.title, description: project.blurb };
}

export default async function ClassicProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getWork(slug);
  if (!project) notFound();

  const next = nextWork(slug);

  return (
    <>
      <div className="px-5 pb-4 pt-16 sm:px-8 sm:pt-24 lg:px-12">
        <Link
          href="/classic"
          className="font-condensed text-[13px] uppercase tracking-[0.24em] text-neutral-400 transition-colors hover:text-[#3aa9a4]"
        >
          ← Work
        </Link>
      </div>

      <header className="mx-auto max-w-3xl px-5 pb-14 pt-8 text-center sm:px-8 sm:pb-20">
        <h1 className="font-condensed text-[clamp(1.9rem,4.4vw,3.25rem)] font-light leading-[1.18] tracking-[0.16em] text-[#3aa9a4]">
          {project.title}
        </h1>
        {project.blurb && (
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.7] text-neutral-500">
            {project.blurb}
          </p>
        )}
      </header>

      <ProjectGallery project={project} />

      <nav className="mt-24 border-t border-black/[0.07]">
        <Link href={`/classic/work/${next.slug}`} className="group block px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1600px] text-center">
            <span className="font-condensed text-[12px] uppercase tracking-[0.3em] text-neutral-400">
              Next
            </span>
            <p className="mt-4 font-condensed text-[clamp(1.6rem,3.4vw,2.6rem)] font-light tracking-[0.14em] text-[#3aa9a4] transition-colors group-hover:text-neutral-700">
              {next.title}
            </p>
          </div>
        </Link>
      </nav>
    </>
  );
}
