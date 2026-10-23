"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { site } from "@/config/site";
import { Check } from "./icons";

/**
 * Interactive product tour: the WAI-ARIA tabs pattern.
 * Arrow keys, Home and End move between tabs; the panel cross-fades (CSS only).
 * Without JavaScript the first tab's content is shown.
 */
export function FeatureTabs() {
  const { tour } = site;
  const [current, setCurrent] = useState(0);
  const [instant, setInstant] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number, focus = false) {
    const n = tour.tabs.length;
    const next = (i + n) % n;
    // Keyboard-driven switches are instant; a click gets the short cross-fade.
    setInstant(focus);
    setCurrent(next);
    if (focus) tabRefs.current[next]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = {
      ArrowRight: current + 1,
      ArrowDown: current + 1,
      ArrowLeft: current - 1,
      ArrowUp: current - 1,
      Home: 0,
      End: tour.tabs.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  }

  return (
    <section id="tour" aria-labelledby="tour-title" className="scroll-mt-20" data-instant={instant || undefined}>
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-28">
        <div data-reveal className="max-w-2xl">
          <h2 id="tour-title" className="font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold">
            {tour.heading}
          </h2>
          <p className="mt-4 text-lg text-ink-soft">{tour.intro}</p>
        </div>

        <div
          role="tablist"
          aria-label={tour.heading}
          onKeyDown={onKeyDown}
          className="mt-10 inline-flex flex-wrap gap-1 rounded-full bg-paper-sunk p-1"
        >
          {tour.tabs.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-controls={`panel-${tab.id}`}
              tabIndex={i === current ? 0 : -1}
              onClick={() => select(i)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-[background-color,color,box-shadow] duration-300 ${
                i === current
                  ? "bg-ink text-paper"
                  : "text-ink-faint hover:text-ink-soft"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative mt-10 grid">
          {tour.tabs.map((tab, i) => (
            <div
              key={tab.id}
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              tabIndex={0}
              hidden={i !== current}
              className="tour-panel grid gap-10 [grid-area:1/1] lg:grid-cols-12 lg:items-center"
            >
              <div className="lg:col-span-5">
                <h3 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold tracking-tight">{tab.title}</h3>
                <p className="mt-4 max-w-[42ch] text-lg text-ink-soft">{tab.body}</p>
                <ul className="mt-6 space-y-3">
                  {tab.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <Check className="mt-1 size-4 shrink-0 text-signal-ink" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <figure data-glow className="glow-card m-0 rounded-[1.5rem] bg-paper-sunk p-6 lg:col-span-7">
                <span className="glow-spot" aria-hidden="true" />
                <figcaption className="flex items-center justify-between text-sm text-ink-faint">
                  <span className="font-semibold text-ink">{tab.preview.caption}</span>
                  <span className="text-xs">Preview</span>
                </figcaption>
                <dl className="mt-5 grid gap-2">
                  {tab.preview.rows.map((r, j) => (
                    <div
                      key={r.label}
                      className="tour-row flex items-center justify-between gap-4 rounded-xl bg-paper-raised px-4 py-3.5"
                      style={{ "--i": j } as React.CSSProperties}
                    >
                      <dt>{r.label}</dt>
                      <dd className="tabular m-0 text-sm font-semibold text-signal-ink">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
