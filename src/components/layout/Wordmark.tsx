import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/**
 * Monogram: a compass fix drawn as an eight-point mark inside a hull curve.
 * Kept geometric rather than illustrative — no ship, no rope, no wheel.
 */
function Monogram({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 40 40"
      className={cn("size-8 shrink-0", className)}
      fill="none"
    >
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M20 4 L22.2 17.8 L36 20 L22.2 22.2 L20 36 L17.8 22.2 L4 20 L17.8 17.8 Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="8.5" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.9" />
    </svg>
  );
}

export function Wordmark({
  className,
  showTagline = false,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 text-ivory transition-colors duration-500 hover:text-brass",
        className,
      )}
      aria-label={`${site.name} — home`}
    >
      <Monogram className="text-brass transition-transform duration-[1.2s] ease-[var(--ease-voyage)] group-hover:rotate-45" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.375rem] font-normal tracking-[0.18em] uppercase">
          {site.name}
        </span>
        {showTagline ? (
          <span className="label mt-2 text-haze">Investment Vehicle</span>
        ) : null}
      </span>
    </Link>
  );
}
