import { site } from "@/config/site";

export function HowItWorks() {
  const { how } = site;
  return (
    <section id="how" aria-labelledby="how-title" className="scroll-mt-20 bg-panel text-on-panel">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-28">
        <h2 id="how-title" className="max-w-2xl font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold">
          {how.heading}
        </h2>

        <div data-motion="steps" className="relative mt-14">
          {/* The track fills as you scroll through the steps. */}
          <div aria-hidden="true" className="absolute left-[11px] top-3 bottom-3 w-px bg-on-panel/20 md:left-0 md:right-0 md:top-[11px] md:bottom-auto md:h-px md:w-auto">
            <div data-motion="track" className="h-full w-full origin-top bg-signal md:origin-left" />
          </div>
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {how.steps.map((step) => (
              <li key={step.title} className="relative pl-10 md:pl-0 md:pt-10">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0.5 grid size-[23px] place-items-center rounded-full border border-on-panel/30 bg-panel md:top-0"
                >
                  <span className="size-2 rounded-full bg-signal" />
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight">{step.title}</h3>
                <p className="mt-3 max-w-[34ch] text-on-panel-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
