import { cn } from "@/lib/cn";

/**
 * Fine paper grain laid over the whole page. Gives the flat oceanic base a
 * printed, tactile quality without a single image request.
 */
export function Grain({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grain-layer pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay",
        className,
      )}
    />
  );
}

/**
 * A slow bloom of light on the horizon — dawn seen from the deck. Sits behind
 * hero content and drifts almost imperceptibly.
 */
export function HorizonGlow({
  className,
  tone = "brass",
}: {
  className?: string;
  tone?: "brass" | "tide";
}) {
  const colour =
    tone === "brass"
      ? "rgba(200,162,74,0.14) 0%, rgba(200,162,74,0.05) 34%, transparent 68%"
      : "rgba(29,74,94,0.35) 0%, rgba(29,74,94,0.1) 40%, transparent 70%";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 animate-drift",
        className,
      )}
      style={{
        background: `radial-gradient(ellipse 70% 55% at 50% 88%, ${colour})`,
      }}
    />
  );
}

/** Hairline rule with a small brass diamond at its centre. */
export function MarkedRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center gap-4 text-tide", className)}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-tide to-tide" />
      <span className="size-1.5 rotate-45 bg-brass/70" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-tide to-tide" />
    </div>
  );
}

/** Soft vignette that separates stacked dark sections without a hard border. */
export function DepthEdge({
  position = "top",
  className,
}: {
  position?: "top" | "bottom";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 h-32",
        position === "top"
          ? "top-0 bg-gradient-to-b from-abyss to-transparent"
          : "bottom-0 bg-gradient-to-t from-abyss to-transparent",
        className,
      )}
    />
  );
}
