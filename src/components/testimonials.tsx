import { site } from "@/config/site";
import { Marquee } from "./marquee";

export function Testimonials() {
  const { testimonials } = site;
  const [lead, ...rest] = testimonials.items;
  const shortQuotes = testimonials.marquee.map((q) => (
    <figure key={q} className="rounded-full bg-paper-raised px-5 py-2.5 whitespace-nowrap text-ink-soft">
      <blockquote className="inline">{q}</blockquote>
    </figure>
  ));
  return (
    <section aria-labelledby="quotes-title" className="bg-paper-sunk">
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 lg:pt-28">
        <div data-reveal>
          <h2 id="quotes-title" className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold">
            {testimonials.heading}
          </h2>
          <p className="mt-3 text-sm text-ink-faint">{testimonials.disclaimer}</p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <figure className="lg:col-span-7">
            <blockquote className="font-display text-[clamp(1.6rem,3vw,2.3rem)] font-medium leading-[1.2] tracking-[-0.02em]">
              <p>{lead.quote}</p>
            </blockquote>
            <figcaption className="mt-6 text-ink-soft">
              <span className="font-semibold text-ink">{lead.name}</span>, {lead.role}
            </figcaption>
          </figure>
          <div className="grid gap-8 lg:col-span-5 lg:pl-12">
            {rest.map((t, i) => (
              <figure key={i}>
                <blockquote className="text-lg">
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className="mt-3 text-sm text-ink-soft">
                  <span className="font-semibold text-ink">{t.name}</span>, {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
      <div className="pb-24 pt-16 lg:pb-28">
        <Marquee items={shortQuotes} label="More quotes" seconds={48} reverse className="marquee-fade" />
      </div>
    </section>
  );
}
