"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { contact } from "@/content/site";

type Field = "name" | "email" | "organisation" | "topic" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const TOPICS = [
  "Partnership or joint venture",
  "Bringing us an opportunity",
  "Market entry into Sri Lanka",
  "Supplier or maker introduction",
  "Press or speaking",
  "Something else",
] as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please tell us who you are.";
  }
  if (!EMAIL.test(values.email.trim())) {
    errors.email = "We need a valid email address to reply to.";
  }
  if (!values.topic) {
    errors.topic = "Choose the closest description.";
  }
  if (values.message.trim().length < 20) {
    errors.message =
      "A little more detail, please — twenty characters at minimum.";
  }
  if (values.message.trim().length > 4000) {
    errors.message = "That is longer than our form allows. Email us instead.";
  }

  return errors;
}

const inputBase =
  "w-full rounded-xl border bg-abyss/50 px-4 py-3.5 text-[0.9375rem] transition-colors duration-400 outline-none placeholder:text-haze";

export function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    organisation: "",
    topic: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  /** Bot trap — a real visitor never fills this in. */
  const honeypotRef = useRef<HTMLInputElement>(null);

  function update(field: Field, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched) setErrors(validate(next));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      summaryRef.current?.focus();
      return;
    }

    if (honeypotRef.current?.value) {
      setStatus("success"); // Silently absorb bots.
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brass/40 bg-hull/50 p-9 sm:p-11"
      >
        <p className="label text-brass">Message received</p>
        <h2 className="mt-6 text-3xl leading-tight">Thank you — it&rsquo;s logged.</h2>
        <p className="measure mt-5 text-[0.9375rem] leading-[1.75] text-mist">
          {contact.responseTime} If it is time-sensitive, write directly to{" "}
          <a href={`mailto:${contact.general}`} className="link-draw text-brass">
            {contact.general}
          </a>{" "}
          and mark it urgent in the subject line.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({
              name: "",
              email: "",
              organisation: "",
              topic: "",
              message: "",
            });
            setErrors({});
            setTouched(false);
            setStatus("idle");
          }}
          className="mt-8 text-sm text-brass transition-colors hover:text-brass-soft"
        >
          Send another message
        </button>
      </div>
    );
  }

  const errorList = Object.entries(errors) as Array<[Field, string]>;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {/* Error summary — focused on failed submit for screen-reader users */}
      <div
        ref={summaryRef}
        tabIndex={-1}
        role={errorList.length ? "alert" : undefined}
        className={cn(
          "rounded-xl border border-brass-deep/60 bg-brass-deep/10 p-5",
          errorList.length ? "block" : "hidden",
        )}
      >
        <p className="text-sm font-medium text-brass-soft">
          Please check {errorList.length === 1 ? "one field" : `${errorList.length} fields`} before sending.
        </p>
        <ul className="mt-2 flex flex-col gap-1 text-sm text-mist">
          {errorList.map(([field, message]) => (
            <li key={field}>
              <a href={`#field-${field}`} className="link-draw">
                {message}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          required
          error={errors.name}
          value={values.name}
          onChange={(value) => update("name", value)}
          autoComplete="name"
          placeholder="Your name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          error={errors.email}
          value={values.email}
          onChange={(value) => update("email", value)}
          autoComplete="email"
          placeholder="you@company.com"
        />
      </div>

      <Field
        id="organisation"
        label="Company or organisation"
        optional
        value={values.organisation}
        onChange={(value) => update("organisation", value)}
        autoComplete="organization"
        placeholder="Optional"
      />

      <div className="flex flex-col gap-2.5">
        <label htmlFor="field-topic" className="label text-mist/80">
          Nature of enquiry <span className="text-brass">*</span>
        </label>
        <select
          id="field-topic"
          value={values.topic}
          onChange={(event) => update("topic", event.target.value)}
          aria-invalid={Boolean(errors.topic)}
          aria-describedby={errors.topic ? "error-topic" : undefined}
          className={cn(
            inputBase,
            "appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-12",
            errors.topic
              ? "border-brass-deep"
              : "border-tide hover:border-shoal focus:border-brass",
          )}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 8' fill='none'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%239FB3BE' stroke-width='1.4'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="">Select one…</option>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic} className="bg-hull">
              {topic}
            </option>
          ))}
        </select>
        {errors.topic ? (
          <p id="error-topic" className="text-sm text-brass-soft">
            {errors.topic}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor="field-message" className="label text-mist/80">
            Message <span className="text-brass">*</span>
          </label>
          <span className="text-xs text-haze">
            {values.message.trim().length} / 4000
          </span>
        </div>
        <textarea
          id="field-message"
          rows={6}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "error-message" : "hint-message"}
          placeholder="What it is, who the customer is, what stage it's at, and what you need that isn't money."
          className={cn(
            inputBase,
            "resize-y leading-relaxed",
            errors.message
              ? "border-brass-deep"
              : "border-tide hover:border-shoal focus:border-brass",
          )}
        />
        {errors.message ? (
          <p id="error-message" className="text-sm text-brass-soft">
            {errors.message}
          </p>
        ) : (
          <p id="hint-message" className="text-sm text-haze">
            Short and concrete beats long and polished.
          </p>
        )}
      </div>

      {/* Honeypot — visually and programmatically hidden from real users */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="field-fax">Do not fill this in</label>
        <input id="field-fax" ref={honeypotRef} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-5 border-t border-tide/60 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-haze sm:max-w-sm">
          By sending this you agree to us storing your details to reply. Nothing
          is shared with third parties. See our{" "}
          <a href="/privacy" className="link-draw text-mist">
            privacy policy
          </a>
          .
        </p>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-brass px-8 py-3.5 text-sm font-medium text-abyss transition-all duration-500 ease-[var(--ease-voyage)] hover:bg-brass-soft hover:shadow-[0_10px_40px_-12px_rgba(200,162,74,0.55)] disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
          <span
            aria-hidden="true"
            className="transition-transform duration-500 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </button>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-brass-soft">
          Something went wrong sending that. Please try again, or email{" "}
          <a href={`mailto:${contact.general}`} className="link-draw text-brass">
            {contact.general}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  optional = false,
  placeholder,
  autoComplete,
}: {
  id: Field;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={`field-${id}`} className="label text-mist/80">
        {label}{" "}
        {required ? (
          <span className="text-brass">*</span>
        ) : optional ? (
          <span className="text-haze">optional</span>
        ) : null}
      </label>
      <input
        id={`field-${id}`}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `error-${id}` : undefined}
        className={cn(
          inputBase,
          error ? "border-brass-deep" : "border-tide hover:border-shoal focus:border-brass",
        )}
      />
      {error ? (
        <p id={`error-${id}`} className="text-sm text-brass-soft">
          {error}
        </p>
      ) : null}
    </div>
  );
}
