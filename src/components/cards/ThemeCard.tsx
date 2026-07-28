import { cn } from "@/lib/cn";
import type { Theme } from "@/content/themes";

export function ThemeCard({
  theme,
  detailed = false,
  className,
}: {
  theme: Theme;
  /** Long form for the Ventures page; short form for the home preview. */
  detailed?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col border-t border-tide/70 pt-7 transition-colors duration-700 hover:border-brass/50",
        className,
      )}
    >
      <div className="flex items-baseline justify-between gap-4">
        {/* Index numerals stay in the sans face — Cormorant's old-style
            figures are lovely at size and illegible at label scale. */}
        <span className="text-xs font-medium tracking-[0.3em] text-brass/85">
          {theme.index}
        </span>
        <span
          aria-hidden="true"
          className="h-px flex-1 origin-right scale-x-0 bg-brass/40 transition-transform duration-700 ease-[var(--ease-voyage)] group-hover:scale-x-100"
        />
      </div>

      <h3 className="mt-6 text-2xl leading-tight">{theme.title}</h3>

      <p className="mt-4 text-[0.9375rem] leading-[1.75] text-sand/85">
        {theme.summary}
      </p>

      {detailed ? (
        <p className="mt-4 text-sm leading-[1.75] text-mist">{theme.detail}</p>
      ) : null}

      <ul className="mt-auto flex flex-wrap gap-2 pt-7">
        {theme.markers.map((marker) => (
          <li
            key={marker}
            className="rounded-full border border-tide/70 px-3 py-1.5 text-xs text-mist/80"
          >
            {marker}
          </li>
        ))}
      </ul>
    </article>
  );
}
