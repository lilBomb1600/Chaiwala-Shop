"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-cream-dark py-24 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Good to know before you visit" />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.question} delay={i * 0.05} className="overflow-hidden rounded-2xl bg-white shadow-sm shadow-espresso/5">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-espresso sm:text-lg">
                    {faq.question}
                  </span>
                  <Plus
                    className={cn(
                      "h-5 w-5 shrink-0 text-maroon transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-espresso-light">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
