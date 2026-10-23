/**
 * Page motion built only on browser features: the Web Animations API (element.animate),
 * requestAnimationFrame and CSS transitions. No animation library.
 *
 *   pageMotion()             the hero intro; returns a cleanup
 *   tweenNumber(...)         count a number to a new value (pricing toggle)
 *   slideX(el, percent)      move an element sideways (pricing toggle thumb)
 *
 * Section entrances (feature list, pricing tiers, headings) are CSS transitions started by
 * SectionReveal; the pinned story, marquees, tabs and card glow are CSS and small components.
 * Everything respects prefers-reduced-motion, and content is visible if scripts fail.
 */

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

function reduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function canAnimate() {
  return typeof Element !== "undefined" && "animate" in Element.prototype;
}

/** The hero's one authored moment. fill "backwards" only holds the start frame during a delay. */
export function pageMotion(): () => void {
  if (!canAnimate() || reduced()) return () => {};
  const running: Animation[] = [];
  const play = (el: Element | null, frames: Keyframe[], opts: KeyframeAnimationOptions) => {
    if (el) running.push(el.animate(frames, { easing: EASE_OUT, fill: "backwards", ...opts }));
  };
  const all = (sel: string) => Array.from(document.querySelectorAll(sel));

  all("[data-hero='line']").forEach((el, i) =>
    play(el, [{ transform: "translateY(105%)" }, { transform: "none" }], { duration: 1000, delay: i * 120 }),
  );
  all("[data-hero='copy']").forEach((el, i) =>
    play(el, [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], { duration: 700, delay: 350 + i * 90 }),
  );
  play(document.querySelector("[data-hero='visual']"), [{ opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0)" }], {
    duration: 1100,
    delay: 250,
  });
  play(
    document.querySelector("[data-hero='card']"),
    [{ opacity: 0, transform: "translateY(22px) rotate(-1.5deg)" }, { opacity: 1, transform: "none" }],
    { duration: 800, delay: 500 },
  );

  return () => running.forEach((a) => a.cancel());
}

/** Count from one number to another with an exponential ease-out. Returns a stop function. */
export function tweenNumber(from: number, to: number, onUpdate: (v: number) => void): () => void {
  if (reduced() || from === to) {
    onUpdate(to);
    return () => {};
  }
  const start = performance.now();
  const duration = 600;
  let raf = 0;
  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
    onUpdate(from + (to - from) * eased);
    if (t < 1) raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

/**
 * Slide an element sideways by a percentage of its own width. A CSS transition, so a quick
 * second click retargets from wherever the thumb is instead of restarting.
 */
export function slideX(el: HTMLElement | null, percent: number): () => void {
  if (!el) return () => {};
  el.style.transition = reduced() ? "none" : `transform 260ms ${EASE_OUT}`;
  el.style.transform = `translateX(${percent}%)`;
  return () => {};
}
