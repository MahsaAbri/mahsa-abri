import { Header } from "@/components/reel-warm/Header";
import { VersionSwitch } from "@/components/VersionSwitch";

/**
 * Version 4 — "Reel Warm".
 * The Reel design exactly — sideways gallery, full-bleed frames, the same
 * motion — repainted in the Atelier palette: warm paper, ink and terracotta
 * instead of the dark room.
 *
 * There is deliberately no footer: nothing follows the work at the end of a
 * scroll. The email and links live on the Contact page.
 */
export default function ReelWarmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grain paper-texture min-h-screen bg-[#f4efe6] text-[#3f3930] selection:bg-[#b4472e] selection:text-[#f4efe6]"
      style={
        {
          "--prose-fg": "#3f3930",
          "--prose-muted": "#8a7f70",
          "--prose-accent": "#2a251f",
          "--prose-rule": "rgb(180 71 46 / 0.35)",
          "--prose-heading-font": "var(--font-sans), sans-serif",
        } as React.CSSProperties
      }
    >
      <Header />
      <main>{children}</main>

      <VersionSwitch current="reel-warm" />
    </div>
  );
}
