import Link from "next/link";

import { versions } from "@/lib/versions";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 px-6 text-center text-neutral-900">
      <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-400">404</p>
      <h1 className="mt-5 max-w-lg text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-tight tracking-[-0.03em]">
        There&apos;s nothing drawn here yet.
      </h1>
      <p className="mt-4 max-w-md text-[16px] leading-relaxed text-neutral-500">
        That page doesn&apos;t exist. Try one of the three versions of the site instead.
      </p>

      <nav className="mt-9 flex flex-wrap items-center justify-center gap-3">
        {versions.map((version) => (
          <Link
            key={version.key}
            href={version.base}
            className="flex items-center gap-2.5 rounded-full border border-black/10 bg-white px-5 py-2.5 text-[14px] transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span
              aria-hidden
              className="h-3.5 w-3.5 rounded-full border border-black/10"
              style={{
                background: `linear-gradient(135deg, ${version.swatch[0]} 50%, ${version.swatch[1]} 50%)`,
              }}
            />
            {version.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
