/**
 * A still drawing of the signal field. Shown before the 3D field loads, and instead of it
 * when WebGL is missing or the visitor prefers reduced motion.
 */
export function StaticField() {
  const rows = 14;
  const cols = 44;
  const dots: { x: number; y: number; r: number; hot: boolean }[] = [];
  for (let r = 0; r < rows; r++) {
    const depth = r / (rows - 1); // 0 far, 1 near
    const y0 = 120 + depth * 300;
    const spread = 0.55 + depth * 0.45;
    for (let c = 0; c < cols; c++) {
      const u = c / (cols - 1) - 0.5;
      const x = 400 + u * 820 * spread;
      const h = Math.sin(u * 9 + r * 0.5) * 18 + Math.sin(u * 4 - r * 0.3) * 14;
      dots.push({
        x: Math.round(x * 10) / 10,
        y: Math.round((y0 - h * (0.6 + depth)) * 10) / 10,
        r: Math.round((1 + depth * 1.8) * 10) / 10,
        hot: h > 14,
      });
    }
  }
  return (
    <svg viewBox="0 0 800 460" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="field-fade" x1="0" x2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.18" stopColor="white" />
          <stop offset="0.82" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="field-mask">
          <rect width="800" height="460" fill="url(#field-fade)" />
        </mask>
      </defs>
      <g mask="url(#field-mask)">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.hot ? "var(--signal)" : "var(--ink-faint)"} opacity={d.hot ? 0.9 : 0.45} />
        ))}
      </g>
    </svg>
  );
}
