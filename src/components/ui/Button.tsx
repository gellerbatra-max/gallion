import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "quiet";
type Size = "sm" | "md";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-wide transition-all duration-500 ease-[var(--ease-voyage)] disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brass text-abyss hover:bg-brass-soft hover:shadow-[0_10px_40px_-12px_rgba(200,162,74,0.55)]",
  secondary:
    "border border-shoal/70 text-ivory hover:border-brass/70 hover:bg-brass/[0.07]",
  quiet: "text-mist hover:text-brass",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[0.8125rem]",
  md: "px-7 py-3.5 text-sm",
};

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: React.ReactNode;
  className?: string;
};

type AnchorProps = ButtonOwnProps & {
  href: string;
} & Omit<React.ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

type NativeButtonProps = ButtonOwnProps & {
  href?: undefined;
} & Omit<React.ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = AnchorProps | NativeButtonProps;

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-500 ease-[var(--ease-voyage)] group-hover:translate-x-1"
    >
      &rarr;
    </span>
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    withArrow = false,
    children,
    className,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {withArrow ? <Arrow /> : null}
    </>
  );

  if (typeof props.href === "string") {
    const { href, ...anchorRest } = rest as AnchorProps;
    const external = /^(https?:|mailto:|tel:)/.test(href);

    if (external) {
      return (
        <a
          {...anchorRest}
          href={href}
          className={classes}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link {...anchorRest} href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const buttonRest = rest as Omit<NativeButtonProps, "href">;
  return (
    <button {...buttonRest} className={classes}>
      {content}
    </button>
  );
}
