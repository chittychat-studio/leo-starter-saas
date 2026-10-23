import { site } from "@/config/site";
import { WaitlistForm } from "../waitlist-form";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  const { hero } = site;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-10 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-12 lg:pb-24 lg:pt-24">
        <div className="relative z-10 lg:col-span-7">
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.9rem,8.4vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.035em] lg:w-[54rem]"
          >
            {hero.headline.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span data-hero="line" className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p data-hero="copy" className="mt-7 max-w-[34rem] text-lg leading-relaxed text-ink-soft sm:text-xl">
            {hero.subhead}
          </p>
          <div data-hero="copy" className="mt-9">
            <WaitlistForm source="hero" />
            <p className="text-sm text-ink-faint">
              {hero.note}{" "}
              <a href={hero.secondaryCta.href} className="font-medium text-ink underline decoration-rule hover:decoration-ink">
                {hero.secondaryCta.label}
              </a>
            </p>
          </div>
        </div>

        <div className="relative h-[300px] sm:h-[380px] lg:col-span-5 lg:h-auto lg:min-h-[520px]">
          <div className="absolute inset-y-0 -left-[30%] -right-[45%] lg:-left-[60%]">
            <HeroVisual />
          </div>
          <DraftCard />
        </div>
      </div>
    </section>
  );
}

/** A small, honest preview of what the product produces. Edit the lines in this component. */
function DraftCard() {
  return (
    <figure
      data-hero="card"
      data-ui
      className="absolute bottom-2 right-0 z-10 w-[min(100%,20rem)] rounded-2xl bg-paper-raised/95 p-5 float-card ring-1 ring-rule sm:bottom-6 lg:bottom-16"
    >
      <figcaption className="flex items-center justify-between text-sm text-ink-faint">
        <span className="font-semibold text-ink">Draft for Friday</span>
        <span className="tabular text-xs">Week 42</span>
      </figcaption>
      <ul className="mt-3 space-y-2 text-[0.95rem] leading-snug">
        <li>Shipped the new billing page to all teams.</li>
        <li>Fixed the export bug three customers reported.</li>
        <li className="text-ink-soft">Next week: start the onboarding redesign.</li>
      </ul>
    </figure>
  );
}
