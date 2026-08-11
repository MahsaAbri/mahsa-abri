import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { Header } from "@/components/reel-warm/Header";
import { site, siteUrl } from "@/content/site";

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

const defaultImage = { url: "/media/concept-art_poster.jpg", width: 2400, height: 1191 };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  keywords: [site.name, site.role, "concept art", "illustration", "visual development"],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    images: [defaultImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    images: [defaultImage.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#f4efe6",
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
