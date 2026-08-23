import { Media } from "@/components/Media";
import { Prose } from "@/components/Prose";
import { site } from "@/content/site";

export const metadata = {
  title: "About Me",
  description: site.tagline,
  alternates: { canonical: "/about" },
};

export default function ReelWarmAboutPage() {
  return (
    <div className="px-5 pb-16 pt-28 sm:px-8 lg:px-10 lg:pt-28">
      <h1 className="text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[#2a251f]">
        About Me
      </h1>

      <div className="mt-10 lg:grid lg:grid-cols-[300px_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Media
            media={site.about.portrait}
            ratio={3 / 4}
            sizes="(max-width: 1024px) 100vw, 300px"
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
