"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <p
        className={cn(
          "mt-5 flex items-center gap-2 text-sm font-medium",
          variant === "dark" ? "text-saffron-light" : "text-pine"
        )}
      >
        <Check className="h-4 w-4" /> You&apos;re on the list — see you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex max-w-sm gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@email.com"
        className={cn(
          "min-w-0 flex-1 rounded-full border px-4 py-2.5 text-sm outline-none transition-colors",
          variant === "dark"
            ? "border-cream/20 bg-transparent text-cream placeholder:text-cream/40 focus:border-saffron-light"
            : "border-beige bg-white text-espresso placeholder:text-espresso-light/50 focus:border-maroon"
        )}
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors",
          variant === "dark"
            ? "bg-saffron text-espresso hover:bg-saffron-light"
            : "bg-maroon text-cream hover:bg-maroon-dark"
        )}
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
