import Link from "next/link";

import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-28 border-t border-black/[0.07] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-condensed text-[13px] uppercase tracking-[0.24em] text-[#3aa9a4]">
          {site.name}
        </p>

        <nav className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {site.socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-condensed text-[15px] text-neutral-500 transition-colors hover:text-[#3aa9a4]"
            >
              {social.label}
            </a>
          ))}
          <Link
            href="/classic/contact"
            className="font-condensed text-[15px] text-neutral-500 transition-colors hover:text-[#3aa9a4]"
          >
            {site.email}
          </Link>
        </nav>

        <p className="font-condensed text-[13px] tracking-[0.08em] text-neutral-400">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
