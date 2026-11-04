import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHead } from "@/components/PageHead";
import { Photo } from "@/components/Photo";
import { Hang } from "@/components/Hang";
import { Board, Stars } from "@/components/Paint";
import { Faq } from "@/components/Faq";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "About",
  description:
    "Chaiwala Shop is a chai cafe on Salvio St in downtown Concord, CA: ten chais, hot or iced, in a clay kullad if you like, and vegetarian desi street food.",
};

// word for word from the shop's Yelp reviews (src/data/reviews.ts)
const notice = [
  { text: "Place is clean and staff are polite.", who: "Grace C., Concord" },
  { text: "The music is not too loud, good for catching up or sitting to work", who: "Trevor Y., Redwood City" },
  { text: "Very welcoming and calming atmosphere with great music and food.", who: "Taylor B., Concord" },
  { text: "It's exactly the kind of place I seek out for a cozy break during the day.", who: "Wesley M., San Francisco" },
];

export default function AboutPage() {
  return (
    <>
      <PageHead title="A chaiwala on Salvio St.">
        I opened {business.name} in downtown Concord in {business.established}. Chai is the reason I opened the door.
      </PageHead>

      <section className="bg-tea py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:px-12">
          <Hang>
            <div className="board board-tea overflow-hidden !rounded-[16px] p-2 before:!hidden">
              <Photo name="room-wide" sizes="(min-width: 1024px) 760px, 100vw" className="aspect-[16/10] h-auto w-full rounded-[11px] object-cover" />
            </div>
          </Hang>
          <div className="flex max-w-[58ch] flex-col gap-5 text-[1.12rem] leading-relaxed text-enamel/90">
            <p>
              There are ten chais on my board: ginger, cardamom, kadak, masala, tulsi, saffron, chocolate, fennel, paan and
              rose. I make every one with 2% milk and one spoon of sugar, hot or iced, and you can have it in a clay kullad.
            </p>
            <p>
              Next to the chai there&apos;s Maggi, bun maska, cheese chutney and Nutella buns, corn masala, peri peri fries,
              sandwiches, pizza, kullad pizza, white sauce pasta and veggie burgers. All of it is vegetarian, and there&apos;s a
              kids&apos; menu if you ask.
            </p>
            <p>Sit down and stay a while, or take your chai over to Todos Santos Plaza.</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link href="/#chai" className="plate">
                Make my chai <ArrowRight size={18} strokeWidth={2.4} aria-hidden />
              </Link>
              <Link href="/menu" className="plate plate-ghost">
                See the menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="notice-title" className="relative isolate bg-maroon py-20 md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-multiply [background-image:var(--grain)] [background-size:180px]" />
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-12">
          <h2 id="notice-title" className="paint text-[clamp(2.6rem,8vw,4.8rem)] text-enamel">
            What people notice.
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {notice.map((n, i) => (
              <li key={n.who} className="min-w-0">
                <Hang index={i}>
                  <Board tone={i % 3 === 1 ? "turmeric" : "enamel"} className="px-7 pb-8 pt-9">
                    <Stars className="text-maroon" />
                    <p className="paint-flat mt-4 text-[1.6rem] leading-[1.15] text-maroon-ink">&ldquo;{n.text}&rdquo;</p>
                    <p className="rate-wide mt-4 text-[0.75rem] text-maroon">{n.who}, on Yelp</p>
                  </Board>
                </Hang>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq />
    </>
  );
}
