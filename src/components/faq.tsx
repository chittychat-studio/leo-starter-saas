import { site } from "@/config/site";

/** Native details/summary: keyboard friendly and works with JavaScript turned off. */
export function Faq() {
  const { faq } = site;
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:py-32">
        <h2 id="faq-title" className="font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold lg:col-span-4">
          {faq.heading}
        </h2>
        <div className="grid gap-2 lg:col-span-8">
          {faq.items.map((item) => (
            <details key={item.q} className="group rounded-2xl bg-paper-sunk px-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold transition-colors hover:text-signal-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg viewBox="0 0 20 20" className="size-5 shrink-0 text-ink-faint transition-transform duration-300 ease-[var(--ease-out-expo)] group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </summary>
              <p className="max-w-[62ch] pb-6 text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
