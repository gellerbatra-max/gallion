"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type State = "idle" | "invalid" | "submitting" | "done";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Dispatch sign-up. Submits to /api/subscribe, which currently validates and
 * acknowledges without persisting — connect it to a real list before launch.
 */
export function NewsletterForm({
  className,
  /** Field and button side by side. Only use where the column is wide. */
  inline = false,
}: {
  className?: string;
  inline?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAIL.test(email.trim())) {
      setState("invalid");
      return;
    }

    setState("submitting");

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
    } catch {
      // The acknowledgement is intentionally optimistic — a dispatch sign-up
      // should never present the visitor with a network error.
    }

    setState("done");
    setEmail("");
  }

  if (state === "done") {
    return (
      <p
        className={cn("text-sm leading-relaxed text-brass", className)}
        role="status"
      >
        You&rsquo;re on the list. The next dispatch will find you.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full", className)}>
      <label htmlFor="dispatch-email" className="label block text-mist/80">
        The Dispatch
      </label>
      <p className="mt-3 text-sm leading-relaxed text-mist">
        Occasional letters on what we&rsquo;re reading, building and getting
        wrong. Six or seven a year. No forwarding of your address, ever.
      </p>

      <div
        className={cn("mt-5 flex flex-col gap-3", inline && "sm:flex-row")}
      >
        <div className="flex-1">
          <input
            id="dispatch-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (state === "invalid") setState("idle");
            }}
            aria-invalid={state === "invalid"}
            aria-describedby={state === "invalid" ? "dispatch-error" : undefined}
            className={cn(
              "w-full rounded-full border bg-abyss/60 px-5 py-3 text-sm transition-colors duration-400 outline-none",
              state === "invalid"
                ? "border-brass-deep"
                : "border-tide hover:border-shoal focus:border-brass",
            )}
          />
        </div>
        <button
          type="submit"
          disabled={state === "submitting"}
          className="rounded-full bg-brass px-6 py-3 text-sm font-medium text-abyss transition-colors duration-400 hover:bg-brass-soft disabled:opacity-60"
        >
          {state === "submitting" ? "Signing…" : "Subscribe"}
        </button>
      </div>

      {state === "invalid" ? (
        <p id="dispatch-error" role="alert" className="mt-3 text-sm text-brass-soft">
          Please enter a valid email address.
        </p>
      ) : null}
    </form>
  );
}
