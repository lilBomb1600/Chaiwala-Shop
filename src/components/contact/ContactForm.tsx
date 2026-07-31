"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("submitted"), 700);
  }

  if (status === "submitted") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-3xl bg-white p-12 text-center shadow-sm shadow-espresso/5"
      >
        <CheckCircle2 className="h-12 w-12 text-pine" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-espresso">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm text-espresso-light">
          Thanks for reaching out — we&apos;ll get back to you as soon as we can, usually within a day.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-sm shadow-espresso/5 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-espresso">
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            placeholder="Your name"
            className="w-full rounded-xl border border-beige bg-cream/40 px-4 py-3 text-sm text-espresso outline-none transition-colors placeholder:text-espresso-light/50 focus:border-maroon"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-espresso">
            Email
          </label>
          <input
            id="email"
            name="email"
            required
            type="email"
            placeholder="you@email.com"
            className="w-full rounded-xl border border-beige bg-cream/40 px-4 py-3 text-sm text-espresso outline-none transition-colors placeholder:text-espresso-light/50 focus:border-maroon"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-espresso">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full rounded-xl border border-beige bg-cream/40 px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-maroon"
          defaultValue="General Inquiry"
        >
          <option>General Inquiry</option>
          <option>Catering & Events</option>
          <option>Feedback</option>
          <option>Careers</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-espresso">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="How can we help?"
          className="w-full resize-none rounded-xl border border-beige bg-cream/40 px-4 py-3 text-sm text-espresso outline-none transition-colors placeholder:text-espresso-light/50 focus:border-maroon"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-maroon px-6 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-maroon/25 transition-all hover:-translate-y-0.5 hover:bg-maroon-dark disabled:opacity-70"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
