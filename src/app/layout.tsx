import type { Metadata } from "next";
import { Barlow_Condensed, Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { Header } from "@/components/reel-warm/Header";
import { site } from "@/content/site";

import "./globals.css";

/*
  Fonts are downloaded at build time and served from this site, so there are no
  requests to Google when someone visits, and no layout shift while they load.
*/
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

/*
  Set NEXT_PUBLIC_SITE_URL to the real domain before going live — it's what
  link previews on social media and in messages are built from.
*/
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahsaabri.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    images: [{ url: "/art/lantern-sea/key-01.jpg", width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    images: ["/art/lantern-sea/key-01.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <body>
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
        </div>
      </body>
    </html>
  );
}
