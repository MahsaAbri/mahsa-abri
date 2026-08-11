import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReelWarmProject } from "@/components/reel-warm/ReelProject";
import { getWork, nextWork, work } from "@/content/work";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return work.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getWork(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.blurb,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { images: [project.poster.src] },
    twitter: { images: [project.poster.src] },
  };
}

export default async function ReelWarmProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getWork(slug);
  if (!project) notFound();

  return <ReelWarmProject project={project} next={nextWork(slug)} />;
}
