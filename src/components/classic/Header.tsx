"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { site } from "@/content/site";

const NAV = [
  { label: "Work", href: "/classic" },
  { label: "Blog", href: "/classic/blog" },
  { label: "About", href: "/classic/about" },
  { label: "Contact", href: "/classic/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the page changes, including on browser back.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  const isActive = (href: string) =>
    href === "/classic" ? pathname === "/classic" || pathname.startsWith("/classic/work") : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/92 backdrop-blur-md transition-[border-color,box-shadow] duration-500 ${
        scrolled ? "border-b border-black/[0.07]" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-5 sm:px-8 lg:px-12">
        <Link
          href="/classic"
          className="justify-self-start font-condensed text-[13px] font-medium uppercase tracking-[0.24em] text-[#3aa9a4] transition-colors hover:text-[#2c8480] sm:text-[15px] sm:tracking-[0.3em]"
        >
          {site.name}
          <span className="hidden sm:inline"> — Design Portfolio</span>
        </Link>

        <Monogram />

        <nav className="hidden justify-self-end lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative font-condensed text-[17px] tracking-[0.04em] transition-colors ${
                    isActive(item.href)
                      ? "text-neutral-800"
                      : "text-[#3aa9a4] hover:text-neutral-800"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="classic-nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-neutral-800"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="justify-self-end lg:hidden"
        >
          <span className="flex h-5 w-6 flex-col justify-center gap-[5px]">
            <span
              className={`block h-px w-full bg-neutral-700 transition-transform duration-300 ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-full bg-neutral-700 transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-black/[0.06] lg:hidden"
          >
            <ul className="px-5 py-4 sm:px-8">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-3 font-condensed text-2xl tracking-[0.06em] ${
                      isActive(item.href) ? "text-neutral-800" : "text-[#3aa9a4]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/** The small mark in the centre of the header, echoing the reference site. */
function Monogram() {
  const initials = site.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link href="/classic" aria-label={site.name} className="group justify-self-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800/80 transition-colors duration-500 group-hover:border-[#3aa9a4]">
        <span className="font-condensed text-[15px] tracking-[0.08em] text-neutral-800 transition-colors duration-500 group-hover:text-[#3aa9a4]">
          {initials}
        </span>
      </span>
    </Link>
  );
}
