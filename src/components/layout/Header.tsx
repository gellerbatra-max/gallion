"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { nav, contact } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Header condenses and frosts once the hero is behind it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll, trap focus loosely, and restore focus on close.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-700 ease-[var(--ease-voyage)]",
        scrolled || open
          ? "glass border-b border-tide/60"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 sm:px-8 lg:px-12">
        <div
          className={cn(
            "transition-all duration-700 ease-[var(--ease-voyage)]",
            scrolled || open ? "py-4" : "py-6",
          )}
        >
          <Wordmark />
        </div>

        {/* Desktop navigation — four co-equal items, no separate CTA pill.
            Contact is a plain nav link, matching the calm, institutional
            register asked for across the rest of the site. */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.8125rem] tracking-wide transition-colors duration-400",
                    isActive(item.href)
                      ? "text-brass"
                      : "text-mist hover:text-ivory",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-brass transition-transform duration-500 ease-[var(--ease-voyage)]",
                      isActive(item.href) ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="-mr-2 flex size-11 items-center justify-center rounded-full text-ivory transition-colors hover:text-brass lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span
              className={cn(
                "absolute left-0 block h-px w-6 bg-current transition-all duration-500 ease-[var(--ease-voyage)]",
                open ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px bg-current transition-all duration-500 ease-[var(--ease-voyage)]",
                open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4",
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-navigation"
        ref={panelRef}
        hidden={!open}
        // Solid rather than frosted: at mobile widths the panel sits directly
        // over hero type, and translucency made both unreadable.
        className="h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-tide/60 bg-abyss lg:hidden"
      >
        {/* Delegated close: any navigation from inside the panel dismisses it,
            which keeps the panel state out of a pathname effect. */}
        <nav
          aria-label="Primary — mobile"
          onClick={() => setOpen(false)}
          className="flex min-h-full flex-col px-6 py-8 sm:px-8"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block border-b border-tide/50 py-4 font-display text-2xl transition-colors",
                    isActive(item.href)
                      ? "text-brass"
                      : "text-ivory hover:text-brass",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3 pt-12">
            <span className="label text-haze">Write to us</span>
            <a
              href={`mailto:${contact.general}`}
              className="link-draw w-fit text-lg text-brass"
            >
              {contact.general}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
