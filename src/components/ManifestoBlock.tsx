import { Reveal } from "@/components/ui/Reveal";
import type { Principle } from "@/content/philosophy";

/**
 * The numbered principle list at the centre of the Philosophy page — a
 * manifesto rendered as an ordered list rather than a decorative block, so
 * it stays legible without JavaScript and to screen readers.
 */
export function ManifestoBlock({ principles }: { principles: Principle[] }) {
  return (
    <ol className="flex flex-col">
      {principles.map((principle, index) => (
        <Reveal
          as="li"
          key={principle.number}
          delay={(index % 2) * 80}
          className="grid gap-6 border-t border-tide/70 py-10 sm:grid-cols-12 sm:gap-10 lg:py-12"
        >
          <div className="flex items-baseline gap-5 sm:col-span-3 sm:flex-col sm:gap-4">
            <span
              aria-hidden="true"
              className="font-display text-2xl leading-none text-brass/85"
            >
              {principle.number}
            </span>
            <span className="label text-haze">{principle.title}</span>
          </div>

          <div className="sm:col-span-9">
            <h3 className="text-2xl leading-[1.25] sm:text-[1.9rem]">
              {principle.claim}
            </h3>
            <p className="measure mt-5 text-[1.0625rem] leading-[1.8] text-mist">
              {principle.body}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
