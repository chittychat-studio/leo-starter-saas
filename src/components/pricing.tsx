"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { site } from "@/config/site";
import { Check } from "./icons";
import { buttonClass } from "./ui/button";

type Billing = "monthly" | "yearly";

export function Pricing() {
  const { pricing } = site;
  const [billing, setBilling] = useState<Billing>("monthly");
  const priceRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const shown = useRef<number[]>(pricing.tiers.map((t) => t.monthly));

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // Slide the toggle thumb.
      gsap.to(thumbRef.current, {
        xPercent: billing === "yearly" ? 100 : 0,
        duration: reduce ? 0 : 0.45,
        ease: "expo.out",
      });
      // Count each price to its new value so the change is easy to follow.
      pricing.tiers.forEach((tier, i) => {
        const el = priceRefs.current[i];
        if (!el) return;
        const to = billing === "yearly" ? tier.yearly : tier.monthly;
        const state = { v: shown.current[i] };
        gsap.to(state, {
          v: to,
          duration: reduce ? 0 : 0.6,
          ease: "expo.out",
          onUpdate: () => {
            shown.current[i] = state.v;
            el.textContent = String(Math.round(state.v));
          },
        });
      });
    });
    return () => ctx.revert();
  }, [billing, pricing.tiers]);

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="pricing-title" className="max-w-xl font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold">
              {pricing.heading}
            </h2>
            <p className="mt-4 max-w-md text-lg text-ink-soft">{pricing.intro}</p>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <div role="radiogroup" aria-label="Billing period" className="relative grid grid-cols-2 rounded-full bg-paper-sunk p-1">
              <span
                ref={thumbRef}
                aria-hidden="true"
                className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-paper-raised shadow-[0_2px_8px_-2px_rgb(40_25_10/0.25)]"
              />
              {(["monthly", "yearly"] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  role="radio"
                  aria-checked={billing === b}
                  onClick={() => setBilling(b)}
                  className={`relative z-10 min-w-28 rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors ${billing === b ? "text-ink" : "text-ink-faint hover:text-ink-soft"}`}
                >
                  {b}
                </button>
              ))}
            </div>
            <p className="text-sm text-ink-faint">Yearly: {pricing.yearlyNote.toLowerCase()}</p>
          </div>
        </div>

        <ul data-motion="tiers" className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {pricing.tiers.map((tier, i) => {
            const hi = tier.highlighted;
            return (
              <li
                key={tier.name}
                className={`flex flex-col rounded-[1.5rem] p-7 sm:p-8 ${hi ? "bg-panel text-on-panel shadow-[0_30px_60px_-34px_rgb(40_25_10/0.7)] lg:-my-4 lg:py-12" : "border border-rule bg-paper-raised"}`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{tier.name}</h3>
                  {hi && <span className="rounded-full bg-signal px-3 py-1 text-xs font-semibold text-on-signal">Most teams pick this</span>}
                </div>
                <p className={`mt-2 ${hi ? "text-on-panel-soft" : "text-ink-soft"}`}>{tier.summary}</p>

                <p className="mt-8 flex items-baseline gap-1.5">
                  <span className="font-display text-5xl font-extrabold tracking-tight tabular">
                    {pricing.currency}
                    <span ref={(el) => { priceRefs.current[i] = el; }}>{tier.monthly}</span>
                  </span>
                  <span className={hi ? "text-on-panel-soft" : "text-ink-faint"}>
                    {tier.monthly === 0 ? "forever" : "per month"}
                  </span>
                </p>
                <p className={`mt-1 min-h-5 text-sm ${hi ? "text-on-panel-soft" : "text-ink-faint"}`}>
                  {tier.monthly > 0 && billing === "yearly" ? `Billed ${pricing.currency}${tier.yearly * 12} a year` : tier.monthly > 0 ? "Billed monthly" : ""}
                </p>

                <ul className="mt-8 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check className={`mt-1 size-4 shrink-0 ${hi ? "text-signal" : "text-signal-ink"}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a href="#join" className={buttonClass(hi ? "primary" : "ink", "mt-10 w-full")}>
                  {tier.cta}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
