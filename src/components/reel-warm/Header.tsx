"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { site } from "@/content/site";

const NAV = [
  { label: "Work", href: "/reel-warm" },
  { label: "Journal", href: "/reel-warm/blog" },
  { label: "About", href: "/reel-warm/about" },
  { label: "Contact", href: "/reel-warm/contact" },
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
    href === "/reel-warm"
      ? pathname === "/reel-warm" || pathname.startsWith("/reel-warm/work")
      : pathname.startsWith(href);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="pointer-events-auto flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Link href="/reel-warm" className="group flex items-baseline gap-3">
            <span className="text-[15px] font-medium tracking-[-0.02em] text-[#2a251f]">
              {site.name}
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-[#a89a86] transition-colors group-hover:text-[#b4472e] sm:inline">
              {site.role}
            </span>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-9">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                      isActive(item.href)
                        ? "text-[#2a251f]"
                        : "text-[#8a7f70] hover:text-[#2a251f]"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-[#b4472e] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#57503f] md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#f4efe6]/97 px-6 backdrop-blur-lg md:hidden"
          >
            <ul>
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    className="block py-3 text-[2.4rem] font-medium leading-tight tracking-[-0.03em] text-[#2a251f]"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
