"use client";

import { motion } from "motion/react";

/**
 * The big centred heading. The wide letter-spacing is the single most
 * recognisable thing about the reference site, so it's the thing to get right.
 */
export function PageTitle({
  children,
  sub,
  align = "center",
}: {
  children: string;
  sub?: string;
  align?: "center" | "left";
}) {
  const words = children.split(" ");

  return (
    <div className={`px-5 pb-14 pt-20 sm:px-8 sm:pb-20 sm:pt-28 ${align === "center" ? "text-center" : ""}`}>
      <h1
        className={`font-condensed text-[clamp(2rem,5.2vw,3.75rem)] font-light leading-[1.15] tracking-[0.34em] text-[#3aa9a4] ${
          align === "center" ? "" : "tracking-[0.22em]"
        }`}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {word}
            {i < words.length - 1 && <span className="inline-block w-[0.34em]" />}
          </motion.span>
        ))}
      </h1>

      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: words.length * 0.07 + 0.1 }}
          className={`mx-auto mt-7 max-w-xl font-condensed text-[17px] leading-relaxed tracking-[0.03em] text-neutral-500 ${
            align === "center" ? "" : "mx-0"
          }`}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
