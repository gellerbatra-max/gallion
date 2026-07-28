import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("label flex items-center gap-3 text-brass", className)}>
      <span aria-hidden="true" className="h-px w-8 bg-brass/50" />
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  /** Heading level — sections should almost always stay at h2. */
  as?: "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow className={centered ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}

      <Tag
        className={cn(
          "text-balance text-3xl leading-[1.12] sm:text-4xl lg:text-[2.9rem]",
          // Display type is capped well short of the container so long headings
          // never run as a single unreadable line on wide screens.
          centered ? "mx-auto max-w-3xl" : "max-w-4xl",
        )}
      >
        {title}
      </Tag>

      {lede ? (
        <div
          className={cn(
            "measure text-[1.0625rem] leading-[1.75] text-mist",
            centered && "mx-auto text-center",
          )}
        >
          {lede}
        </div>
      ) : null}
    </Reveal>
  );
}
