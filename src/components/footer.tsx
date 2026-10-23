import { site } from "@/config/site";
import { Mark } from "./icons";

export function Footer() {
  const { footer } = site;
  return (
    <footer className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="flex items-center gap-2.5 font-display text-lg font-bold">
            <Mark className="size-7" />
            {site.name}
          </p>
          <p className="mt-3 max-w-xs text-ink-soft">{footer.blurb}</p>
        </div>
        {footer.columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="lg:col-span-3">
            <h2 className="font-sans text-sm font-semibold tracking-normal text-ink">{col.title}</h2>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-ink-soft hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mt-12 flex flex-col gap-2 text-sm text-ink-faint sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <a href={footer.credit.href} className="hover:text-ink">
          {footer.credit.label}
        </a>
      </div>
    </footer>
  );
}
