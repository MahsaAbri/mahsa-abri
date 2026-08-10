import Link from "next/link";

import { Header } from "@/components/atelier/Header";
import { VersionSwitch } from "@/components/VersionSwitch";
import { site } from "@/content/site";

/**
 * Version 3 — "Atelier".
 * Warm, printed and hand-made: work pinned to a studio wall, project pages
 * laid out like a magazine spread.
 */
export default function AtelierLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="paper-texture min-h-screen bg-[#f4efe6] text-[#3f3930] selection:bg-[#b4472e] selection:text-[#f4efe6]"
      style={
        {
          "--prose-fg": "#3f3930",
          "--prose-muted": "#8a7f70",
          "--prose-accent": "#2a251f",
          "--prose-rule": "rgb(180 71 46 / 0.35)",
          "--prose-heading-font": "var(--font-serif), Georgia, serif",
          "--prose-size": "1.09rem",
          "--prose-leading": "1.8",
        } as React.CSSProperties
      }
    >
      <Header />
      <main>{children}</main>

      <footer className="mt-20 border-t border-[#2a251f]/15">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 px-5 py-14 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div>
            <p className="font-serif text-[26px] italic leading-none text-[#2a251f]">{site.name}</p>
            <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#8a7f70]">
              {site.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {site.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-[#57503f] underline decoration-[#2a251f]/20 underline-offset-4 transition-colors hover:text-[#b4472e]"
              >
                {social.label}
              </a>
            ))}
            <Link
              href="/atelier/contact"
              className="text-[14px] text-[#57503f] underline decoration-[#2a251f]/20 underline-offset-4 transition-colors hover:text-[#b4472e]"
            >
              {site.email}
            </Link>
          </nav>

          <p className="text-[12px] uppercase tracking-[0.18em] text-[#a89a86]">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      <VersionSwitch current="atelier" />
    </div>
  );
}
