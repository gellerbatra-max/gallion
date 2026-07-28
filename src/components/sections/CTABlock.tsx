import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CompassRose } from "@/components/visuals/CompassRose";
import { contact } from "@/content/site";

type CTABlockProps = {
  eyebrow?: string;
  title: React.ReactNode;
  body: React.ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CTABlock({
  eyebrow = "Come aboard",
  title,
  body,
  primary = { label: "Start a conversation", href: "/contact" },
  secondary,
}: CTABlockProps) {
  return (
    <Section spacing="lg" className="overflow-hidden border-t border-tide/50">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_120%_at_50%_120%,rgba(200,162,74,0.12),transparent_70%)]"
      />
      <CompassRose
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-40 w-[34rem] text-brass/[0.05]"
      />

      <Container size="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-6 text-3xl leading-[1.12] sm:text-4xl lg:text-[3rem]">
              {title}
            </h2>
            <div className="measure mt-6 text-[1.0625rem] leading-[1.75] text-mist">
              {body}
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-end">
              <Button href={primary.href} withArrow>
                {primary.label}
              </Button>
              {secondary ? (
                <Button href={secondary.href} variant="secondary">
                  {secondary.label}
                </Button>
              ) : null}
            </div>

            <p className="mt-8 text-sm text-haze lg:text-right">
              Or write directly —{" "}
              <a
                href={`mailto:${contact.general}`}
                className="link-draw text-brass"
              >
                {contact.general}
              </a>
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
