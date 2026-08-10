import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReelProject } from "@/components/reel/ReelProject";
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

export default async function ReelProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getWork(slug);
  if (!project) notFound();

  return <ReelProject project={project} next={nextWork(slug)} />;
}
