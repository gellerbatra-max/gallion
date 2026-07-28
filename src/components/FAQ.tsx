import { cn } from "@/lib/cn";

/**
 * Native <details> accordion — keyboard accessible, works without JS, and
 * indexable by search engines. The marker is replaced with a brass rule.
 */
export function FAQ({
  items,
  className,
}: {
  items: Array<{ q: string; a: string }>;
  className?: string;
}) {
  return (
    <div className={cn("divide-y divide-tide/60 border-y border-tide/60", className)}>
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 transition-colors duration-500 hover:text-brass [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-lg leading-snug sm:text-xl">
              {item.q}
            </h3>
            <span
              aria-hidden="true"
              className="relative mt-2 block size-3.5 shrink-0"
            >
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-brass" />
              <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-brass transition-transform duration-500 ease-[var(--ease-voyage)] group-open:rotate-90 group-open:opacity-0" />
            </span>
          </summary>
          <p className="measure pb-7 text-[0.9375rem] leading-[1.8] text-mist">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
