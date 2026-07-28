import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** `wide` for full-bleed grids, `narrow` for editorial reading columns. */
  size?: "default" | "wide" | "narrow";
  as?: "div" | "section" | "header" | "footer" | "article" | "nav";
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  children,
  className,
  size = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", sizes[size], className)}>
      {children}
    </Tag>
  );
}
