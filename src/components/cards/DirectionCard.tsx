import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import type { Direction } from "@/content/directions";

/**
 * A single card shape for every "future direction" preview — title,
 * one-line description, status and market focus. Used identically on the
 * home page and the About page, reading from the same content source.
 */
export function DirectionCard({
  direction,
  className,
}: {
  direction: Direction;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-tide/70 bg-hull/40 p-7 transition-all duration-700 ease-[var(--ease-voyage)] hover:border-brass/40 hover:bg-hull/70 sm:p-8",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(200,162,74,0.1),transparent_65%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <Badge status={direction.status} />
        </div>

        <h3 className="mt-7 text-2xl leading-tight transition-colors duration-500 group-hover:text-brass-soft sm:text-[1.75rem]">
          {direction.title}
        </h3>

        <p className="mt-4 text-[0.9375rem] leading-[1.7] text-sand/85">
          {direction.description}
        </p>

        <div className="mt-auto flex flex-col gap-1.5 border-t border-tide/60 pt-6">
          <span className="label text-haze">Market focus</span>
          <span className="text-sm text-sand/80">{direction.marketFocus}</span>
        </div>
      </div>
    </article>
  );
}
