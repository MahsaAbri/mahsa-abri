import Link from "next/link";

import { Media } from "@/components/Media";
import { work } from "@/content/work";
import { site } from "@/content/site";
import { versions } from "@/lib/versions";

export const metadata = {
  title: `Choose a design — ${site.name}`,
  description: "Three complete designs for the same portfolio. Pick one.",
};

/**
 * The chooser.
 *
 * This page exists only while a design is being picked. Each card is written
 * in its own version's colours and typeface, so the choice can be made partly
 * from this page alone.
 */
export default function ChooserPage() {
  const samples = work.slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <header className="mx-auto max-w-6xl px-6 pb-10 pt-16 sm:pt-24">
        <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-400">
          {site.name} — portfolio
        </p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          Three complete designs. Same work, same words.
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-neutral-500">
          Every version below is a whole site — work, projects, journal, about and contact. They all
          read from the same content files, so choosing one is a matter of taste, not of rebuilding
          anything. Open a few, then tell me which to keep.
        </p>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 lg:grid-cols-3">
        {versions.map((version) => (
          <Link
            key={version.key}
            href={version.base}
            className="group flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10"
          >
            <Preview versionKey={version.key} />

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-[19px] font-semibold tracking-[-0.02em]">{version.name}</h2>
                <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                  {version.base}
                </span>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">{version.blurb}</p>

              <ul className="mt-5 space-y-2 border-t border-black/6 pt-5">
                {version.notes.map((note) => (
                  <li key={note} className="flex gap-2.5 text-[13.5px] leading-snug text-neutral-600">
                    <span
                      aria-hidden
                      className="mt-[0.62em] h-px w-3 shrink-0"
                      style={{ background: version.swatch[1] }}
                    />
                    {note}
                  </li>
                ))}
              </ul>

              <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-neutral-900">
                Open this version
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <section className="border-t border-black/8 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-[13px] uppercase tracking-[0.2em] text-neutral-400">
            The same work, in all three
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {samples.map((project) => (
              <figure key={project.slug}>
                <Media
                  media={project.poster}
                  ratio={16 / 10}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="w-full rounded-lg"
                />
                <figcaption className="mt-3 text-[14px] text-neutral-600">{project.title}</figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-12 max-w-2xl text-[15px] leading-relaxed text-neutral-500">
            Projects come from the folders in{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[13px]">artwork-source/</code> — add a
            folder and its <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[13px]">_poster</code>{" "}
            image, run <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[13px]">npm run media</code>,
            and it appears in all three. See{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[13px]">README.md</code>.
          </p>
        </div>
      </section>
    </div>
  );
}

/** A small abstract mock of each design, drawn in its own colours. */
function Preview({ versionKey }: { versionKey: string }) {
  if (versionKey === "classic") {
    return (
      <div className="flex h-44 flex-col justify-center gap-3 bg-white px-6 py-5">
        <div className="flex items-center justify-between">
          <span className="h-1.5 w-20 rounded-full bg-[#3aa9a4]/60" />
          <span className="h-4 w-4 rounded-full border border-neutral-700/70" />
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1.5 w-6 rounded-full bg-[#3aa9a4]/40" />
            ))}
          </span>
        </div>
        <div className="mx-auto mt-2 h-2 w-40 rounded-full bg-[#3aa9a4]/70" />
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <span className="h-14 rounded-sm bg-neutral-200" />
          <span className="flex h-14 items-center justify-center rounded-sm border border-neutral-200">
            <span className="h-1.5 w-16 rounded-full bg-neutral-400" />
          </span>
        </div>
      </div>
    );
  }

  if (versionKey === "reel") {
    return (
      <div className="flex h-44 flex-col justify-between bg-[#0c0c0e] px-6 py-5">
        <div className="flex items-center justify-between">
          <span className="h-1.5 w-16 rounded-full bg-white/70" />
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1 w-5 rounded-full bg-white/25" />
            ))}
          </span>
        </div>
        <div className="flex items-end gap-2.5">
          <span className="h-20 w-8 shrink-0 rounded-sm bg-white/10" />
          <span className="h-24 flex-1 rounded-sm bg-gradient-to-t from-[#e8552f]/45 to-white/10" />
          <span className="h-24 w-16 shrink-0 rounded-sm bg-white/12" />
        </div>
        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-[#e8552f]" />
          <span className="h-px flex-1 bg-white/15" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-44 flex-col justify-center gap-3 bg-[#f4efe6] px-6 py-5">
      <div className="flex items-center justify-between">
        <span className="h-2 w-20 rounded-full bg-[#2a251f]/60" />
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1 w-5 rounded-full bg-[#b4472e]/40" />
          ))}
        </span>
      </div>
      <div className="relative mt-1 h-24">
        <span className="absolute left-0 top-2 h-16 w-28 -rotate-2 rounded-[2px] bg-white p-1 shadow-md">
          <span className="block h-full w-full bg-neutral-200" />
        </span>
        <span className="absolute right-2 top-0 h-20 w-20 rotate-3 rounded-[2px] bg-white p-1 shadow-md">
          <span className="block h-full w-full bg-[#b4472e]/25" />
        </span>
      </div>
    </div>
  );
}
