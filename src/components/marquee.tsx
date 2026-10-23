import type { ReactNode } from "react";

/**
 * A row that drifts sideways, in CSS only (see .marquee in globals.css).
 * - The items are rendered twice; the copy is hidden from screen readers.
 * - It pauses on hover and while anything inside has keyboard focus.
 * - With reduced motion it stops and wraps into a normal row.
 */
export function Marquee({
  items,
  label,
  seconds = 40,
  reverse = false,
  className = "",
}: {
  items: ReactNode[];
  label: string;
  seconds?: number;
  reverse?: boolean;
  className?: string;
}) {
  const style = { "--marquee-duration": `${seconds}s` } as React.CSSProperties;
  return (
    <div className={`marquee ${reverse ? "marquee-reverse" : ""} ${className}`} style={style} role="region" aria-label={label}>
      <ul className="marquee-track">
        {items.map((item, i) => (
          <li key={i} className="marquee-item">
            {item}
          </li>
        ))}
      </ul>
      <ul className="marquee-track" aria-hidden="true">
        {items.map((item, i) => (
          <li key={i} className="marquee-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
