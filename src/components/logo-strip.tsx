import { site } from "@/config/site";

/** Six neutral placeholder marks. Replace with real SVG logos you have permission to show. */
const shapes = [
  <circle key="a" cx="12" cy="12" r="8" />,
  <rect key="b" x="4" y="4" width="16" height="16" rx="3" />,
  <path key="c" d="M12 3l9 16H3z" />,
  <path key="d" d="M4 12a8 8 0 0 1 16 0v8H4z" />,
  <path key="e" d="M12 3l8.5 6.2-3.2 10H6.7l-3.2-10z" />,
  <path key="f" d="M4 4h7v7H4zM13 13h7v7h-7z" />,
];

export function LogoStrip() {
  return (
    <section aria-label="Customer logos" className="border-y border-rule">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
          {site.logos.names.map((name, i) => (
            <li key={name} className="flex items-center gap-2.5 text-ink-faint">
              <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="currentColor" aria-hidden="true">
                {shapes[i % shapes.length]}
              </svg>
              <span className="font-display text-lg font-bold tracking-tight">{name}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-ink-faint">{site.logos.caption}</p>
      </div>
    </section>
  );
}
