"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger in milliseconds. Keep under ~400ms so nothing feels laggy. */
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "span";
};

/**
 * Fades content in as it enters the viewport.
 *
 * The reveal state lives on the DOM node rather than in React state — the
 * animation is a purely visual concern, so there is no reason to re-render a
 * subtree for it.
 *
 * Progressive enhancement: the `js-reveal` class is only added to <html> once
 * this component mounts, so with JavaScript disabled every element renders at
 * full opacity. Reduced-motion users skip the transition via CSS.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("js-reveal");

    const node = ref.current;
    if (!node) return;

    const show = () => node.setAttribute("data-reveal", "in");

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
