import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AtelierProject } from "@/components/atelier/AtelierProject";
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

export default async function AtelierProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getWork(slug);
  if (!project) notFound();

  return <AtelierProject project={project} next={nextWork(slug)} />;
}
