"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Photo } from "@/components/Photo";
import { Hang } from "@/components/Hang";
import { Board } from "@/components/Paint";
import { photos, type PhotoName } from "@/data/photos";
import { cn } from "@/lib/utils";

// Ordered so the three-column wall has no holes: wide, 1 / 1, 1, 1 / 1, wide / 1, 1, then the menu plate.
const order: { name: PhotoName; caption: string; wide?: boolean }[] = [
  { name: "room-wide", caption: "The counter on Salvio St", wide: true },
  { name: "chai-kullads", caption: "Chai in kullads" },
  { name: "maggi", caption: "Maggi" },
  { name: "chai-bun", caption: "Chai and a bun" },
  { name: "fries", caption: "Peri peri fries" },
  { name: "pasta", caption: "White sauce pasta" },
  { name: "room-chairs", caption: "Where to sit", wide: true },
  { name: "juice", caption: "Fresh orange juice" },
  { name: "prep", caption: "Chopping for the kitchen" },
];

function largest(name: PhotoName) {
  const p = photos[name];
  const w = p.widths[p.widths.length - 1];
  return { src: `/photos/${name}-${w}.webp`, width: w, height: Math.round((p.h * w) / p.w) };
}

/** Every real photo, hung on the wall; tap one to see it as big as it was posted. */
export function Gallery() {
  const [index, setIndex] = useState(-1);
  return (
    <>
      <ul className="grid grid-flow-row-dense grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {order.map((o, i) => (
          <li key={o.name} className={cn("min-w-0", o.wide && "sm:col-span-2")}>
            <Hang index={i}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="board board-enamel group block w-full cursor-zoom-in !rounded-[14px] p-2.5 pb-3 text-left before:!hidden"
                aria-label={`Open photo: ${o.caption}`}
              >
                <span className="block overflow-hidden rounded-[9px] bg-tea">
                  <Photo
                    name={o.name}
                    sizes={o.wide ? "(min-width: 1024px) 860px, (min-width: 640px) 100vw, 100vw" : "(min-width: 1024px) 430px, (min-width: 640px) 50vw, 100vw"}
                    className={cn(
                      "h-auto w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]",
                      o.wide ? "aspect-[16/10]" : "aspect-[4/5]",
                    )}
                  />
                </span>
                <span className="rate mt-2.5 block px-1 text-[1rem] text-maroon-ink">{o.caption}</span>
              </button>
            </Hang>
          </li>
        ))}
        <li className="min-w-0">
          <Hang index={order.length} className="h-full">
            <Board tone="turmeric" className="flex h-full min-h-[18rem] flex-col justify-between gap-6 px-7 pb-8 pt-9">
              <p className="paint-flat text-[2rem] leading-[1.1] text-maroon-ink">Everything in these photos is on my board.</p>
              <Link href="/menu" className="plate plate-maroon self-start">
                See the menu <ArrowRight size={18} strokeWidth={2.4} aria-hidden />
              </Link>
            </Board>
          </Hang>
        </li>
      </ul>
      <Lightbox
        open={index >= 0}
        index={Math.max(index, 0)}
        close={() => setIndex(-1)}
        slides={order.map((o) => ({ ...largest(o.name), alt: photos[o.name].alt }))}
        styles={{ container: { backgroundColor: "rgba(26, 13, 11, 0.96)" } }}
      />
    </>
  );
}
