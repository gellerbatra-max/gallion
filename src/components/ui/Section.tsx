import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Vertical rhythm. `lg` is the default section spacing across the site. */
  spacing?: "sm" | "lg" | "xl";
  /** Surface tone — alternate to give long pages a tidal rhythm. */
  tone?: "base" | "raised" | "parchment";
  bordered?: boolean;
  "aria-labelledby"?: string;
};

const spacings = {
  sm: "py-16 sm:py-20",
  lg: "py-20 sm:py-28 lg:py-32",
  xl: "py-24 sm:py-32 lg:py-40",
} as const;

const tones = {
  base: "",
  raised: "bg-deep/40",
  parchment: "bg-ivory text-hull",
} as const;

export function Section({
  children,
  id,
  className,
  spacing = "lg",
  tone = "base",
  bordered = false,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        spacings[spacing],
        tones[tone],
        bordered && "border-t border-tide/50",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
