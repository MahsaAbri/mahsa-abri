import { Media } from "@/components/Media";
import { Prose } from "@/components/Prose";
import { PageTitle } from "@/components/classic/PageTitle";
import { site } from "@/content/site";

export const metadata = { title: "About" };

export default function ClassicAboutPage() {
  return (
    <>
      <PageTitle>About</PageTitle>

      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Media media={site.about.portrait} sizes="(max-width: 1024px) 100vw, 900px" priority />
      </div>

      <div className="mx-auto max-w-[40rem] px-5 pb-4 pt-16 sm:px-8">
        <Prose text={site.about.body} />
      </div>
    </>
  );
}
