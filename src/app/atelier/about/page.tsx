import { Media } from "@/components/Media";
import { Prose } from "@/components/Prose";
import { site } from "@/content/site";

export const metadata = { title: "About" };

export default function AtelierAboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-14 sm:px-8 lg:px-10 lg:pt-20">
      <header className="border-b border-[#2a251f]/15 pb-10">
        <h1 className="font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.02em] text-[#2a251f]">
          About
        </h1>
      </header>

      <div className="grid gap-12 py-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <figure className="bg-white p-3 shadow-[0_2px_14px_rgba(42,37,31,0.09)]">
            <Media
              media={site.about.portrait}
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
              className="w-full"
            />
          </figure>
        </div>

        <Prose text={site.about.body} />
      </div>
    </div>
  );
}
