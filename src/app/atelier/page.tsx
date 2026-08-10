import { StudioWall } from "@/components/atelier/StudioWall";
import { site } from "@/content/site";
import { work } from "@/content/work";

export const metadata = { title: "Work" };

export default function AtelierHomePage() {
  return (
    <>
      <section className="mx-auto max-w-[1500px] px-5 pb-14 pt-16 sm:px-8 lg:px-10 lg:pb-20 lg:pt-24">
        <h1 className="font-serif text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1] tracking-[-0.02em] text-[#2a251f]">
          {site.name}
        </h1>
        <p className="mt-5 font-serif text-[clamp(1.1rem,2vw,1.5rem)] italic text-[#b4472e]">
          {site.role}
        </p>
      </section>

      <StudioWall projects={work} />
    </>
  );
}
