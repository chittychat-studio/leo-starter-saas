"use client";

import { useEffect } from "react";

/**
 * Cursor-follow glow for cards marked with data-glow.
 * One passive listener for the whole page. It moves the card's .glow-spot child with a
 * transform (no inherited CSS variables, so no style recalculation for the card's children).
 * The glow itself is CSS (.glow-spot in globals.css), shown only on hover-capable fine pointers.
 * Touch screens and reduced motion get no glow and no listener.
 */
export function PointerGlow() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;
    const paint = () => {
      frame = 0;
      if (!last) return;
      const card = (last.target as Element | null)?.closest?.<HTMLElement>("[data-glow]");
      if (!card) return;
      const spot = card.querySelector<HTMLElement>(":scope > .glow-spot");
      if (!spot) return;
      const box = card.getBoundingClientRect();
      spot.style.transform = `translate3d(${last.clientX - box.left}px, ${last.clientY - box.top}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
