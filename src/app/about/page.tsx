import { Media } from "@/components/Media";
import { Prose } from "@/components/Prose";
import { site } from "@/content/site";

export const metadata = {
  title: "About",
  description: site.tagline,
  alternates: { canonical: "/about" },
};

export default function ReelWarmAboutPage() {
  return (
    <div className="px-5 pb-24 pt-32 sm:px-8 lg:px-10 lg:pt-40">
      <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[#2a251f]">
        About
      </h1>

      <div className="mt-16 lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Media
            media={site.about.portrait}
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
            className="w-full"
          />
        </div>

        <div className="mt-14 lg:mt-0">
          <Prose text={site.about.body} />
        </div>
      </div>
    </div>
  );
}
