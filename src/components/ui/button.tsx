import Link from "next/link";

type Variant = "primary" | "ink" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.95rem] font-semibold transition-[background-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out-expo)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal text-on-signal shadow-[0_6px_18px_-8px_var(--signal)] hover:shadow-[0_10px_26px_-10px_var(--signal)] hover:brightness-105",
  ink: "bg-ink text-paper hover:bg-ink-soft",
  ghost: "text-ink hover:bg-paper-sunk",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}
