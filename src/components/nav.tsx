import Link from "next/link";
import { site } from "@/config/site";
import { Mark } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { ButtonLink } from "./ui/button";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-paper">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight">
          <Mark className="size-7" />
          {site.name}
        </Link>

        <ul className="ml-6 hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                data-nav-link
                className="rounded-full px-3 py-2 text-[0.95rem] text-ink-soft transition-colors hover:text-ink aria-[current=true]:bg-paper-sunk aria-[current=true]:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          <div className="hidden sm:block">
            <ButtonLink href="#join" variant="ink">
              {site.hero.primaryCta}
            </ButtonLink>
          </div>
          <details className="group relative md:hidden">
            <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-full hover:bg-paper-sunk [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Open menu</span>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
                <path d="M4 8h16M4 16h16" className="group-open:hidden" />
                <path d="M6 6l12 12M18 6L6 18" className="hidden group-open:block" />
              </svg>
            </summary>
            <ul className="menu-pop absolute right-0 top-12 w-56 rounded-2xl bg-paper-raised p-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="block rounded-xl px-3 py-2.5 hover:bg-paper-sunk">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#join" className="mt-1 block rounded-xl bg-ink px-3 py-2.5 font-semibold text-paper">
                  {site.hero.primaryCta}
                </a>
              </li>
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
}
