import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/Photo";
import { Board, Stars, VegMark } from "@/components/Paint";
import { SwipeRail } from "@/components/SwipeRail";
import { BoardRail } from "@/components/menu/RateBoards";
import { Hang } from "@/components/Hang";
import type { PhotoName } from "@/data/photos";
import { reviews } from "@/data/reviews";
import { ReviewText } from "@/components/home/ReviewText";

/** The menu, as boards on the wall at night. */
export function BoardSection() {
  return (
    <section id="board" aria-labelledby="board-title" className="relative bg-tea py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-12">
          <h2 id="board-title" className="paint text-[clamp(2.7rem,8.6vw,5.4rem)] text-enamel [--shade:var(--maroon)]">
            Everything on my board.
          </h2>
          <div className="lg:pb-3">
            <p className="max-w-[46ch] text-[1.1rem] leading-relaxed text-enamel/85">
              Same prices as the screens over my counter. Swipe through, or pick a taste and I&apos;ll dim the rest.
            </p>
            <p className="mt-3 flex items-center gap-2 text-[0.95rem] text-enamel/80">
              <VegMark /> Everything here is vegetarian.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <BoardRail />
      </div>
      <div className="mx-auto mt-4 max-w-[1440px] px-4 md:px-6 lg:px-12">
        <Link href="/menu" className="plate plate-ghost">
          The whole board on one page <ArrowRight size={18} strokeWidth={2.4} aria-hidden />
        </Link>
      </div>
    </section>
  );
}

const counter: { name: PhotoName; caption: string }[] = [
  { name: "chai-kullads", caption: "Chai in kullads" },
  { name: "maggi", caption: "Maggi" },
  { name: "fries", caption: "Peri peri fries" },
  { name: "chai-bun", caption: "Chai and a bun" },
  { name: "pasta", caption: "White sauce pasta" },
  { name: "juice", caption: "Fresh orange juice" },
  { name: "prep", caption: "Chopping for the kitchen" },
];

/** Stills from the shop's own Reels, hung like prints on a turmeric wall. */
export function FromCounter() {
  return (
    <section aria-labelledby="counter-title" className="relative isolate overflow-x-clip bg-turmeric py-20 text-maroon-ink md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] mix-blend-multiply [background-image:var(--grain)] [background-size:180px]" />
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-5 px-4 md:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-12 lg:px-12">
        <h2 id="counter-title" className="paint text-[clamp(2.7rem,8.6vw,5.4rem)] text-maroon [--shade:var(--maroon-ink)]">
          From my counter.
        </h2>
        <p className="max-w-[44ch] text-[1.1rem] leading-relaxed lg:pb-3">
          Stills from the videos I post. Everything here is on the board.
        </p>
      </div>
      <SwipeRail label="Photos from the counter" className="mt-10 md:mt-6">
        {counter.map((c, i) => (
          <Hang key={c.name} index={i} className="w-[68vw] max-w-[300px] sm:w-[280px]">
            <figure className="board board-enamel !rounded-[14px] p-2.5 pb-3 before:!hidden">
              <div className="overflow-hidden rounded-[9px] bg-tea">
                <Photo name={c.name} sizes="(min-width: 640px) 280px, 68vw" className="aspect-[4/5] h-auto w-full object-cover" />
              </div>
              <figcaption className="rate mt-2.5 px-1 text-[1rem] text-maroon-ink">{c.caption}</figcaption>
            </figure>
          </Hang>
        ))}
        <div className="flex w-[68vw] max-w-[300px] items-center sm:w-[280px]">
          <Link href="/gallery" className="plate plate-maroon">
            All the photos <ArrowRight size={18} strokeWidth={2.4} aria-hidden />
          </Link>
        </div>
      </SwipeRail>
    </section>
  );
}

/** Real Yelp reviews, word for word. */
export function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="relative isolate bg-maroon py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-multiply [background-image:var(--grain)] [background-size:180px]" />
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-12">
        <figure>
          <blockquote>
            <p id="reviews-title" className="paint max-w-[13ch] text-[clamp(2.6rem,8vw,5.4rem)] text-enamel">
              &ldquo;My new favorite place for chai!!&rdquo;
            </p>
          </blockquote>
          <figcaption className="rate-wide mt-5 flex items-center gap-3 text-[0.8rem] text-turmeric">
            <Stars /> S D., Concord, on Yelp
          </figcaption>
        </figure>
      </div>
      <SwipeRail label="Reviews from Yelp" tone="dark" className="mt-12 md:mt-6">
        {reviews.map((r, i) => (
          <Hang key={r.name} index={i} className="w-[84vw] max-w-[380px] sm:w-[360px]">
            <Board as="article" tone="enamel" className="px-6 pb-7 pt-8 md:px-7">
              <Stars className="text-maroon" />
              <ReviewText text={r.text} />
              <p className="mt-5 border-t border-maroon/20 pt-4">
                <span className="rate block text-[1.05rem] text-maroon">{r.name}</span>
                <span className="text-[0.85rem] text-maroon-ink/75">
                  {r.location} · {r.date}
                </span>
              </p>
            </Board>
          </Hang>
        ))}
        <div aria-hidden className="w-1 shrink-0" />
      </SwipeRail>
    </section>
  );
}
