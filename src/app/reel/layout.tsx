import Link from "next/link";

import { Header } from "@/components/reel/Header";
import { VersionSwitch } from "@/components/VersionSwitch";
import { site } from "@/content/site";

/**
 * Version 2 — "Reel".
 * A dark room. The work is shown one frame at a time, and everything else
 * gets out of the light.
 */
export default function ReelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grain min-h-screen bg-[#0c0c0e] text-white/85 selection:bg-[#e8552f] selection:text-white"
      style={
        {
          "--prose-fg": "rgb(255 255 255 / 0.7)",
          "--prose-muted": "rgb(255 255 255 / 0.4)",
          "--prose-accent": "#ffffff",
          "--prose-rule": "rgb(255 255 255 / 0.16)",
          "--prose-heading-font": "var(--font-sans), sans-serif",
        } as React.CSSProperties
      }
    >
      <Header />
      <main>{children}</main>

      <footer className="border-t border-white/8 px-5 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
            © {new Date().getFullYear()} {site.name}
          </p>
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {site.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-[#e8552f]"
              >
                {social.label}
              </a>
            ))}
            <Link
              href="/reel/contact"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-[#e8552f]"
            >
              {site.email}
            </Link>
          </nav>
        </div>
      </footer>

      <VersionSwitch current="reel" />
    </div>
  );
}
