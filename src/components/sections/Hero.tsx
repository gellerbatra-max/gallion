import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Meridians } from "@/components/visuals/Meridians";
import { CompassRose } from "@/components/visuals/CompassRose";
import { HorizonGlow } from "@/components/visuals/Atmosphere";

/**
 * Home hero. Every layer here is vector or gradient — no photography, no
 * video, nothing that blocks first paint.
 */
export function Hero() {
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
        className="flex min-h-[92svh] flex-col justify-center pt-36 pb-24 sm:pt-40 lg:min-h-[94svh]"
      >
        <Reveal className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-brass/60" />
          <p className="label text-brass">Colombo &middot; Est. 2024</p>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-10 max-w-5xl text-[2.75rem] leading-[1.05] font-light sm:text-6xl lg:text-[4.75rem] xl:text-[5.25rem]">
            A venture platform carrying
            <span className="text-gilt"> Sri Lanka </span>
            to the world — and the world back.
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="measure mt-9 text-lg leading-[1.75] text-mist sm:text-xl">
            Gelian is a holding platform for brands and businesses built on an
            island that has been a waypoint in world trade for two thousand
            years. We find what deserves to travel, give it a name worth
            carrying, and hold it for the long passage.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/philosophy" withArrow>
              Read our philosophy
            </Button>
            <Button href="/portfolio" variant="secondary">
              See what we&rsquo;re exploring
            </Button>
          </div>
        </Reveal>

        {/* Standing facts — quiet, factual, no invented performance claims */}
        <Reveal delay={340}>
          <dl className="mt-20 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-8 border-t border-tide/60 pt-10 sm:grid-cols-4">
            {[
              { value: "Six", label: "Themes under study" },
              { value: "Two", label: "Directions of travel" },
              { value: "10 yr", label: "Minimum horizon" },
              { value: "6.9° N", label: "Home port, Colombo" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-2.5">
                <dt className="font-display text-3xl leading-none text-ivory sm:text-4xl">
                  {item.value}
                </dt>
                <dd className="label text-haze">{item.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
