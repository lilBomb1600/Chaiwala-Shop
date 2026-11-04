import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";

/** Questions people ask at the counter, as native disclosure rows on a turmeric wall. */
export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="relative isolate bg-turmeric py-20 text-maroon-ink md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] mix-blend-multiply [background-image:var(--grain)] [background-size:180px]" />
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-14 lg:px-12">
        <h2 id="faq-title" className="paint text-[clamp(2.6rem,8vw,4.8rem)] text-maroon [--shade:var(--maroon-ink)]">
          People ask me.
        </h2>
        <div className="flex flex-col">
          {faqs.map((f) => (
            <details key={f.question} className="group border-t-2 border-maroon/25 last:border-b-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                <span className="rate text-[1.3rem] md:text-[1.45rem]">{f.question}</span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-maroon text-enamel transition-transform duration-300 group-open:rotate-45">
                  <Plus size={18} strokeWidth={2.6} aria-hidden />
                </span>
              </summary>
              <p className="max-w-[60ch] pb-6 text-[1.08rem] leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
