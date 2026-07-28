import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import type { Milestone } from "@/content/about";

/**
 * Company journey. Planned milestones are visually demoted and labelled so a
 * reader never mistakes an intention for an achievement.
 */
export function Timeline({
  milestones,
  className,
}: {
  milestones: Milestone[];
  className?: string;
}) {
  return (
    <ol className={cn("relative", className)}>
      {/* Rhumb line running through the milestones */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-brass/50 via-tide to-transparent sm:left-[calc(7rem+7px)]"
      />

      {milestones.map((milestone, index) => (
        <Reveal
          as="li"
          key={milestone.year}
          delay={index * 70}
          className="relative flex flex-col gap-3 pb-12 pl-10 last:pb-0 sm:flex-row sm:gap-10 sm:pl-0"
        >
          <div className="sm:w-28 sm:shrink-0 sm:text-right">
            <span
              className={cn(
                "label",
                milestone.planned ? "text-haze" : "text-brass",
              )}
            >
              {milestone.year}
            </span>
          </div>

          {/* Fix marker */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1 left-0 size-[15px] rotate-45 border sm:left-28",
              milestone.planned
                ? "border-tide bg-abyss"
                : "border-brass bg-brass/25",
            )}
          />

          <div className="sm:pl-8">
            <h3
              className={cn(
                "flex flex-wrap items-center gap-3 text-xl leading-snug",
                milestone.planned && "text-ivory/70",
              )}
            >
              {milestone.title}
              {milestone.planned ? (
                <span className="label rounded-full border border-tide/80 px-2.5 py-1 text-haze">
                  Planned
                </span>
              ) : null}
            </h3>
            <p className="measure mt-3 text-[0.9375rem] leading-[1.75] text-mist">
              {milestone.body}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
