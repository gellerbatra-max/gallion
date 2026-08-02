import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Meridians } from "@/components/visuals/Meridians";
import { HorizonGlow } from "@/components/visuals/Atmosphere";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  /** Small fact pairs shown beneath the lede — coordinates, counts, dates. */
  meta?: Array<{ label: string; value: string }>;
  children?: React.ReactNode;
  className?: string;
  /** Drop the chart backdrop for a plainer header (e.g. legal pages). */
  plain?: boolean;
};

export function PageHeader({
  eyebrow,
  title,
  lede,
  meta,
  children,
  className,
  plain = false,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden border-b border-tide/50 pt-36 pb-20 sm:pt-44 sm:pb-24 lg:pt-48 lg:pb-28",
        className,
      )}
    >
      {!plain ? (
        <>
          <Meridians className="text-tide" opacity={0.32} />
          <HorizonGlow tone="tide" />
        </>
      ) : null}

      <Container size="wide" className="relative">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-4xl text-[2.5rem] leading-[1.08] sm:text-[3.25rem] lg:text-[4rem]">
            {title}
          </h1>
          <div className="measure text-lg leading-[1.7] text-mist sm:text-xl">
            {lede}
          </div>
        </Reveal>

        {meta?.length ? (
          <Reveal delay={140}>
            <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <dt className="label text-haze">{item.label}</dt>
                  <dd className="text-sm text-sand whitespace-pre-line">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}

        {children ? <div className="mt-12">{children}</div> : null}
      </Container>
    </header>
  );
}
