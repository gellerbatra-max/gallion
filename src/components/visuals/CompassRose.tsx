import { cn } from "@/lib/cn";

/**
 * A restrained 8-point rose — thin strokes, no ornament. Used as a large,
 * near-invisible background mark and as the wordmark glyph at small sizes.
 */
export function CompassRose({
  className,
  spin = false,
}: {
  className?: string;
  spin?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 200 200"
      className={cn(spin && "animate-rotate-slow", className)}
      fill="none"
    >
      {/* Cardinal star */}
      <path
        d="M100 6 L110 90 L194 100 L110 110 L100 194 L90 110 L6 100 L90 90 Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Intercardinal star, inset */}
      <path
        d="M100 34 L106 94 L166 100 L106 106 L100 166 L94 106 L34 100 L94 94 Z"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeOpacity="0.55"
        transform="rotate(45 100 100)"
      />
      <circle cx="100" cy="100" r="62" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.4" />
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.22" />
      <circle cx="100" cy="100" r="3" fill="currentColor" fillOpacity="0.7" />
    </svg>
  );
}
