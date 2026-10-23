"use client";

import { useEffect, useRef, useState } from "react";
import { site, type StoryScreen } from "@/config/site";

/**
 * Pinned product story. On wide screens the product window stays in place (CSS sticky)
 * while the steps scroll past; the step nearest the middle of the screen picks which
 * screen is shown. Plain IntersectionObserver, no animation library, no scroll hijacking.
 * On phones each step shows its own screen inline. Reduced motion: screens swap instantly.
 */
export function HowItWorks() {
  const { how } = site;
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const steps = stepRefs.current.filter((s): s is HTMLLIElement => !!s);
    if (!("IntersectionObserver" in window) || !steps.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how" aria-labelledby="how-title" className="scroll-mt-20 bg-panel text-on-panel">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-28">
        <div data-reveal>
          <h2 id="how-title" className="max-w-2xl font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold">
            {how.heading}
          </h2>
          <p className="mt-4 max-w-lg text-lg text-on-panel-soft">{how.intro}</p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* The pinned product window (wide screens). Decorative: the same words are in the steps. */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[calc(50vh-11rem)]" aria-hidden="true">
              <div className="relative h-[20rem]">
                {how.steps.map((step, i) => (
                  <Screen key={step.title} screen={step.screen} active={i === active} />
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                {how.steps.map((step, i) => (
                  <span
                    key={step.title}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-signal" : "bg-on-panel/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <ol className="lg:col-span-6">
            {how.steps.map((step, i) => (
              <li
                key={step.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-step={i}
                className={`story-step py-8 lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center lg:py-0 ${i === active ? "is-active" : ""}`}
              >
                <h3 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold tracking-tight">{step.title}</h3>
                <p className="mt-3 max-w-[38ch] text-lg text-on-panel-soft">{step.body}</p>
                <div className="relative mt-8 h-[19rem] lg:hidden" aria-hidden="true">
                  <Screen screen={step.screen} active />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Screen({ screen, active }: { screen: StoryScreen; active: boolean }) {
  return (
    <figure
      data-ui
      className={`story-screen absolute inset-0 m-0 flex flex-col rounded-[1.5rem] bg-paper-raised p-6 text-ink shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] ring-1 ring-rule ${active ? "is-active" : ""}`}
    >
      <div className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-rule" />
        <span className="size-2.5 rounded-full bg-rule" />
        <span className="size-2.5 rounded-full bg-rule" />

      </div>
      <figcaption className="mt-6 flex items-baseline justify-between gap-4">
        <span className="font-display text-2xl font-bold tracking-tight">{screen.title}</span>
        <span className="rounded-full bg-signal-wash px-3 py-1 text-xs font-semibold text-signal-ink">{screen.status}</span>
      </figcaption>
      <ul className="mt-6 grid gap-3">
        {screen.lines.map((line, i) => (
          <li
            key={line}
            className="story-line flex items-center gap-3 rounded-xl border border-rule bg-paper px-4 py-3"
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className="size-2 shrink-0 rounded-full bg-signal" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
