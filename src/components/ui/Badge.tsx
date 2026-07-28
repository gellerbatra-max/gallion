import { cn } from "@/lib/cn";
import type { DirectionStatus } from "@/content/directions";
import { directionStatusMeta } from "@/content/directions";

/**
 * Verdigris is reserved for exactly this one tone — "selective" reads as
 * more deliberate than "exploring" without borrowing brass, which stays the
 * site's single colour for interaction and emphasis.
 */
const tones: Record<DirectionStatus, string> = {
  exploring: "border-shoal/60 text-mist",
  developing: "border-brass/45 text-brass",
  selective: "border-verdigris/60 text-verdigris-soft",
  active: "border-brass text-abyss bg-brass",
};

const dots: Record<DirectionStatus, string> = {
  exploring: "bg-mist/70",
  developing: "bg-brass",
  selective: "bg-verdigris-soft",
  active: "bg-abyss",
};

export function Badge({
  status,
  className,
}: {
  status: DirectionStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-2 rounded-full border px-3 py-1.5 whitespace-nowrap",
        tones[status],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          dots[status],
          status === "developing" && "animate-sheen",
        )}
      />
      {directionStatusMeta[status].label}
    </span>
  );
}

/** Neutral variant for non-status labels (categories, tags, counts). */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label inline-flex items-center rounded-full border border-tide/80 px-3 py-1.5 text-mist",
        className,
      )}
    >
      {children}
    </span>
  );
}
