"use client";

import { useEffect, useState } from "react";

/**
 * Reports whether a CSS media query matches right now.
 *
 * Starts as `false` on the server and on the very first client render, so
 * layouts that branch on it should treat `false` as the mobile/simple case.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
}
