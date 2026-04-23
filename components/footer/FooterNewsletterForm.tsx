"use client";

import type { FormEvent } from "react";

export function FooterNewsletterForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      className="flex w-full max-w-[28rem] flex-col gap-2 sm:flex-row sm:items-center"
      onSubmit={handleSubmit}
    >
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Email for occasional notes"
        className="min-h-11 flex-1 border border-[var(--color-line)] bg-transparent px-4 text-[0.92rem] text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-ink)]"
        data-cursor-ignore
      />
      <button
        type="submit"
        className="link-underline min-h-11 shrink-0 px-1 text-left text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-ink)] sm:px-0"
        data-cursor-target
        data-cursor-label="Submit"
      >
        Submit
      </button>
    </form>
  );
}
