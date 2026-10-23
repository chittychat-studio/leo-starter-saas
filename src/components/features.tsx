import { site } from "@/config/site";
import { Icon } from "./icons";

export function Features() {
  const { features } = site;
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="features-title" className="font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold">
              {features.heading}
            </h2>
            <p className="mt-5 max-w-sm text-lg text-ink-soft">{features.intro}</p>
          </div>
        </div>

        <ul data-motion="list" className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {features.items.map((f) => (
            <li key={f.title} className="border-t border-rule py-7">
              <Icon name={f.icon} className="size-7 text-signal-ink" />
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{f.title}</h3>
              <p className="mt-2 max-w-[38ch] text-ink-soft">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
