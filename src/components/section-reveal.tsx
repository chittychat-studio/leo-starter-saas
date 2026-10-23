"use client";

import { useEffect } from "react";

/**
 * Section transitions: headings marked data-reveal, the feature list and the pricing tiers
 * (data-motion) arrive with CSS transitions as they enter the screen, and the nav link for
 * the section in view is highlighted.
 *
 * The hidden start state only applies under html.motion-ok, which this component sets,
 * so the page reads normally without JavaScript or with reduced motion.
 * Only opacity and transform change: no layout shift.
 */
export function SectionReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;

    const sync = () => root.classList.toggle("motion-ok", !reduce.matches);
    sync();
    reduce.addEventListener("change", sync);

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            reveal.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-reveal], [data-motion]").forEach((el) => reveal.observe(el));

    // Highlight the nav link of the section in view.
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
    const byId = new Map(links.map((a) => [a.getAttribute("href")?.slice(1) ?? "", a]));
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          links.forEach((a) => a.removeAttribute("aria-current"));
          byId.get(e.target.id)?.setAttribute("aria-current", "true");
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    byId.forEach((_, id) => {
      const section = id ? document.getElementById(id) : null;
      if (section) spy.observe(section);
    });

    return () => {
      reveal.disconnect();
      spy.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, []);
  return null;
}
