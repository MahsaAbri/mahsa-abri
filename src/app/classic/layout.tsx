import { Footer } from "@/components/classic/Footer";
import { Header } from "@/components/classic/Header";
import { VersionSwitch } from "@/components/VersionSwitch";

/**
 * Version 1 — "Gallery".
 * A close reading of the reference site: white, quiet, letter-spaced, and
 * entirely deferential to the artwork.
 */
export default function ClassicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-white text-neutral-800"
      style={
        {
          "--prose-fg": "#3d3d42",
          "--prose-muted": "#8a8a91",
          "--prose-accent": "#26262a",
          "--prose-rule": "rgb(58 169 164 / 0.35)",
          "--prose-heading-font": "var(--font-condensed), sans-serif",
        } as React.CSSProperties
      }
    >
      <Header />
      <main>{children}</main>
      <Footer />
      <VersionSwitch current="classic" />
    </div>
  );
}
