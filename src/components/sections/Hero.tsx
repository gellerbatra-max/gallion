import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Meridians } from "@/components/visuals/Meridians";
import { CompassRose } from "@/components/visuals/CompassRose";
import { HorizonGlow } from "@/components/visuals/Atmosphere";
import { home } from "@/content/home";

/**
 * Splits a headline on its accent phrase so the phrase can be styled
 * separately. Falls back to rendering the whole string plainly if the accent
 * text is not found — content edits should never be able to crash the page.
 */
function Headline({ text, accent }: { text: string; accent: string }) {
  const index = accent ? text.indexOf(accent) : -1;
  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index);
  const after = text.slice(index + accent.length);

  return (
    <>
      {before}
      <span className="text-gilt">{accent}</span>
      {after}
    </>
  );
}

/**
 * Home hero. Every layer here is vector or gradient — no photography, no
 * video, nothing that blocks first paint.
 */
export function Hero() {
  const { hero } = home;

  return (
    <section className="relative isolate overflow-hidden">
      {/* Depth stack: chart → rose → horizon */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_-10%,#0B2A38_0%,#07202C_38%,#04121A_74%)]" />
        <Meridians className="text-tide" opacity={0.55} />
        <CompassRose
          spin
          className="absolute top-1/2 left-1/2 w-[min(115vw,1000px)] -translate-x-1/2 -translate-y-1/2 text-brass/[0.055]"
        />
        <HorizonGlow />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-abyss to-transparent" />
      </div>

      <Container
        size="wide"
        className="flex min-h-[88svh] flex-col justify-center pt-28 pb-14 sm:pt-32 lg:min-h-[90svh]"
      >
        <Reveal className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-brass/60" />
          <p className="label text-brass">{hero.kicker}</p>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-8 max-w-5xl text-[2.75rem] leading-[1.05] font-light sm:text-6xl lg:text-[4.75rem] xl:text-[5.25rem]">
            <Headline text={hero.headline} accent={hero.headlineAccent} />
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="measure mt-9 text-lg leading-[1.75] text-mist sm:text-xl">
            {hero.subheadline}
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={hero.primaryCta.href} withArrow>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </Reveal>

        {/* Standing facts — quiet, factual, no invented performance claims */}
        <Reveal delay={340}>
          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-8 border-t border-tide/60 pt-8 sm:grid-cols-3">
            {hero.stats.map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                <dt className="label text-haze">{item.label}</dt>
                <dd className="text-sm text-sand">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
