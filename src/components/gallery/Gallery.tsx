"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Photo } from "@/components/Photo";
import { Hang } from "@/components/Hang";
import { photos, type PhotoName } from "@/data/photos";
import { cn } from "@/lib/utils";

const order: { name: PhotoName; caption: string; wide?: boolean }[] = [
  { name: "room-wide", caption: "The counter on Salvio St", wide: true },
  { name: "chai-kullads", caption: "Chai in kullads" },
  { name: "maggi", caption: "Maggi" },
  { name: "chai-bun", caption: "Chai and a bun" },
  { name: "room-chairs", caption: "Where to sit", wide: true },
  { name: "fries", caption: "Peri peri fries" },
  { name: "pasta", caption: "White sauce pasta" },
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
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
