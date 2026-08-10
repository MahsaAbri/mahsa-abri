"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { site } from "@/content/site";

const NAV = [
  { label: "Work", href: "/atelier" },
  { label: "Journal", href: "/atelier/blog" },
  { label: "About", href: "/atelier/about" },
  { label: "Contact", href: "/atelier/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu whenever the page changes, including on browser back.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    href === "/atelier"
      ? pathname === "/atelier" || pathname.startsWith("/atelier/work")
      : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-[#2a251f]/12 bg-[#f4efe6]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/atelier" className="group">
          <span className="font-serif text-[20px] italic leading-none tracking-[-0.01em] text-[#2a251f] sm:text-[23px]">
            {site.name}
          </span>
          <span className="ml-3 hidden text-[11px] uppercase tracking-[0.2em] text-[#8a7f70] transition-colors group-hover:text-[#b4472e] sm:inline">
            {site.role}
          </span>
        </Link>

        <nav className="hidden sm:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group relative text-[14px] tracking-[0.01em] transition-colors ${
                    isActive(item.href) ? "text-[#b4472e]" : "text-[#57503f] hover:text-[#b4472e]"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#b4472e] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="text-[13px] uppercase tracking-[0.18em] text-[#57503f] sm:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#2a251f]/10 sm:hidden"
          >
            <ul className="px-5 py-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-2.5 font-serif text-2xl ${
                      isActive(item.href) ? "text-[#b4472e]" : "text-[#2a251f]"
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
