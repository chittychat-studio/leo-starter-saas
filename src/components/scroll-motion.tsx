"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * All page choreography in one place.
 *
 * - Hero: the one authored moment. Headline lines rise out of their masks, then the copy,
 *   then the draft card settles in front of the signal field.
 * - Features: the list arrives as a list (a short capped stagger).
 * - How it works: the track fills as you scroll, tying the steps to your reading position.
 * - Pricing: tiers unmask from the bottom edge.
 *
 * Content is visible by default. GSAP only sets start states once it has loaded, and the
 * reduced motion path skips spatial movement entirely.
 */
export function ScrollMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ease = "expo.out";

      const intro = gsap.timeline({ defaults: { ease } });
      intro
        .from("[data-hero='line']", { yPercent: 105, duration: 1.1, stagger: 0.12 })
        .from("[data-hero='copy']", { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.1 }, "-=0.75")
        .from("[data-hero='visual']", { autoAlpha: 0, filter: "blur(12px)", duration: 1.4 }, "-=1.0")
        .from("[data-hero='card']", { autoAlpha: 0, y: 26, rotate: -1.5, duration: 1.0 }, "-=1.0");

      gsap.utils.toArray<HTMLElement>("[data-motion='list']").forEach((list) => {
        gsap.from(list.children, {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease,
          stagger: { each: 0.06, amount: 0.3 },
          scrollTrigger: { trigger: list, start: "top 82%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-motion='steps']").forEach((steps) => {
        const track = steps.querySelector("[data-motion='track']");
        const vertical = window.matchMedia("(max-width: 767px)").matches;
        if (track) {
          gsap.fromTo(
            track,
            vertical ? { scaleY: 0 } : { scaleX: 0 },
            {
              ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
              ease: "none",
              scrollTrigger: { trigger: steps, start: "top 75%", end: "bottom 55%", scrub: 0.6 },
            },
          );
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-motion='tiers']").forEach((tiers) => {
        gsap.from(tiers.children, {
          clipPath: "inset(0 0 100% 0 round 24px)",
          y: 30,
          duration: 1.0,
          ease,
          stagger: 0.1,
          clearProps: "clipPath",
          scrollTrigger: { trigger: tiers, start: "top 80%", once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
