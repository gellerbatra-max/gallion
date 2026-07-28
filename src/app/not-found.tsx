import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CompassRose } from "@/components/visuals/CompassRose";
import { Meridians } from "@/components/visuals/Meridians";
import { nav } from "@/content/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Meridians className="text-tide" opacity={0.4} />
        <CompassRose
          spin
          className="absolute top-1/2 left-1/2 w-[min(110vw,900px)] -translate-x-1/2 -translate-y-1/2 text-brass/[0.05]"
        />
      </div>

      <Container size="narrow" className="relative text-center">
        <Eyebrow className="justify-center">Off the chart</Eyebrow>

        <h1 className="mt-8 text-[2.5rem] leading-[1.1] sm:text-6xl">
          No landfall here.
        </h1>

        <p className="mx-auto mt-7 max-w-lg text-[1.0625rem] leading-[1.8] text-mist">
          The page you were looking for has either moved, never existed, or is
          still under construction. Any of the three is possible at this stage.
        </p>

        <div className="mt-11 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href="/" withArrow>
            Return to port
          </Button>
          <Button href="/contact" variant="secondary">
            Tell us what broke
          </Button>
        </div>

        <nav aria-label="Site sections" className="mt-16">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-haze transition-colors hover:text-brass"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
