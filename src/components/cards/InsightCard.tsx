import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatDate, type Insight } from "@/content/insights";

export function InsightCard({
  insight,
  variant = "default",
  className,
}: {
  insight: Insight;
  /** `feature` gives the lead article a larger, quieter treatment. */
  variant?: "default" | "feature";
  className?: string;
}) {
  const feature = variant === "feature";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col border-t border-tide/70 pt-7 transition-colors duration-700 hover:border-brass/50",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="label text-brass/80">{insight.category}</span>
        <span aria-hidden="true" className="size-1 rounded-full bg-tide" />
        <time dateTime={insight.date} className="label text-haze">
          {formatDate(insight.date)}
        </time>
      </div>

      <h3
        className={cn(
          "mt-5 leading-[1.18]",
          feature ? "text-3xl sm:text-4xl lg:text-[2.75rem]" : "text-2xl",
        )}
      >
        <Link
          href={`/insights/${insight.slug}`}
          className="transition-colors duration-500 group-hover:text-brass-soft"
        >
          {/* Full-card click target, keyboard-accessible via the link itself */}
          <span className="absolute inset-0" aria-hidden="true" />
          {insight.title}
        </Link>
      </h3>

      <p
        className={cn(
          "mt-4 leading-[1.75] text-mist",
          feature ? "measure text-[1.0625rem]" : "text-[0.9375rem]",
        )}
      >
        {insight.deck}
      </p>

      <div className="mt-auto flex items-center gap-4 pt-7">
        <span className="inline-flex items-center gap-2 text-sm text-brass">
          Read
          <span
            aria-hidden="true"
            className="transition-transform duration-500 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-tide/60" />
        <span className="label text-haze">{insight.readingTime}</span>
      </div>
    </article>
  );
}
