import Link from "next/link";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import type { Venture } from "@/content/ventures";

/**
 * Portfolio card. Renders identically whether a venture is an exploration
 * area or a live business — when `href` is present the whole card becomes a
 * link, so adding a launched venture requires no layout change.
 */
export function VentureCard({
  venture,
  className,
}: {
  venture: Venture;
  className?: string;
}) {
  const inner = "relative flex h-full flex-col p-7 sm:p-8";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-tide/70 bg-hull/40 transition-all duration-700 ease-[var(--ease-voyage)] hover:border-brass/40 hover:bg-hull/70",
        className,
      )}
    >
      {/* Brass wash on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(200,162,74,0.1),transparent_65%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      <div className={inner}>
        <div className="flex items-start justify-between gap-4">
          <p className="label text-brass/80">{venture.theme}</p>
          <Badge status={venture.status} />
        </div>

        <h3 className="mt-7 text-2xl leading-tight transition-colors duration-500 group-hover:text-brass-soft sm:text-[1.75rem]">
          {venture.name}
        </h3>
        <p className="label mt-3 text-haze">Working name</p>

        <p className="mt-5 text-[0.9375rem] leading-[1.7] text-sand/85">
          {venture.oneLiner}
        </p>
        <p className="mt-4 text-sm leading-[1.7] text-mist">
          {venture.description}
        </p>

        <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-tide/60 pt-6 text-sm">
          <div className="flex flex-col gap-1.5">
            <dt className="label text-haze">Route</dt>
            <dd className="text-sand/80">{venture.geography}</dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="label text-haze">Stage since</dt>
            <dd className="text-sand/80">{venture.since}</dd>
          </div>
        </dl>

        {venture.href ? (
          <Link
            href={venture.href}
            className="mt-6 inline-flex items-center gap-2 text-sm text-brass"
          >
            {/* Full-card click target once the venture has somewhere to go */}
            <span aria-hidden="true" className="absolute inset-0" />
            Visit venture
            <span
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}
