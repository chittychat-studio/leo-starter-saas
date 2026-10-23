import { site } from "@/config/site";
import { WaitlistForm } from "./waitlist-form";

export function FinalCta() {
  const { finalCta } = site;
  return (
    <section id="join" aria-labelledby="join-title" className="scroll-mt-20 px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-[90rem] rounded-[2rem] bg-panel text-on-panel">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:items-end lg:py-28">
          <div className="lg:col-span-7">
            <h2 id="join-title" className="font-display text-[clamp(2.6rem,6vw,4.6rem)] font-extrabold leading-[0.98]">
              {finalCta.heading}
            </h2>
            <p className="mt-5 max-w-md text-lg text-on-panel-soft">{finalCta.body}</p>
          </div>
          <div className="lg:col-span-5">
            <WaitlistForm source="footer" tone="panel" />
          </div>
        </div>
      </div>
    </section>
  );
}
