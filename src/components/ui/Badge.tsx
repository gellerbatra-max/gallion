import { cn } from "@/lib/cn";
import type { VentureStatus } from "@/content/ventures";
import { statusMeta } from "@/content/ventures";

const tones: Record<VentureStatus, string> = {
  exploring: "border-shoal/60 text-mist",
  development: "border-brass/45 text-brass",
  "coming-soon": "border-shoal/40 text-mist/80",
  live: "border-brass text-abyss bg-brass",
};

const dots: Record<VentureStatus, string> = {
  exploring: "bg-mist/70",
  development: "bg-brass",
  "coming-soon": "bg-mist/40",
  live: "bg-abyss",
};

export function Badge({
  status,
  className,
}: {
  status: VentureStatus;
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
          status === "development" && "animate-sheen",
        )}
      />
      {statusMeta[status].label}
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
