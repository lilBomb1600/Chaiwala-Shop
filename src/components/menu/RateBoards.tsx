"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Board, VegMark } from "@/components/Paint";
import { SwipeRail } from "@/components/SwipeRail";
import { boards, filters, priceLabel, type Board as BoardT, type Tag } from "@/data/menu";
import { cn } from "@/lib/utils";

const tones = ["maroon", "turmeric", "enamel"] as const;

function RateBoard({ board, tone, active }: { board: BoardT; tone: (typeof tones)[number]; active: Tag | "all" }) {
  const hits = board.items.filter((i) => active === "all" || i.tags.includes(active)).length;
  const dim = active !== "all" && hits === 0;
  return (
    <Board
      as="article"
      tone={tone}
      className={cn(
        "flex w-full flex-col px-6 pb-7 pt-8 transition-[opacity,filter] duration-500 md:px-7",
        dim && "opacity-35 saturate-50",
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="paint text-[2rem] leading-none">{board.title}</h3>
          {board.spec && <p className="rate-wide mt-2 text-[0.72rem] opacity-80">{board.spec}</p>}
        </div>
        {board.price ? (
          <p className="rate nums shrink-0 pt-1 text-[1.35rem]">{priceLabel(board.price.regular, board.price.large)}</p>
        ) : (
          <VegMark className="mt-2" />
        )}
      </header>
      <ul className="mt-5 flex flex-col">
        {board.items.map((item) => {
          const on = active === "all" || item.tags.includes(active);
          return (
            <li
              key={item.name}
              className={cn(
                "border-t border-current/15 py-2.5 transition-opacity duration-300 first:border-t-0",
                !on && "opacity-25",
              )}
            >
              <div className="flex items-baseline gap-2">
                <span className="rate text-[1.12rem]">{item.name}</span>
                {item.aka && <span className="truncate text-[0.85rem] opacity-75">{item.aka}</span>}
                {(item.price != null || item.priceNote) && (
                  <>
                    <span aria-hidden className="leader" />
                    <span className="rate nums shrink-0 text-[1.08rem]">{item.priceNote ?? priceLabel(item.price, item.large)}</span>
                  </>
                )}
              </div>
              {item.note && <p className="mt-0.5 text-[0.9rem] leading-snug opacity-80">{item.note}</p>}
            </li>
          );
        })}
      </ul>
      {(board.quote || board.footnote) && (
        <footer className="mt-auto pt-5">
          {board.footnote && <p className="text-[0.88rem] leading-snug opacity-85">{board.footnote}</p>}
          {board.quote && (
            <p className="mt-3 text-[0.95rem] leading-snug">
              <span className="paint-flat text-[1.15rem]">&ldquo;{board.quote.text}&rdquo;</span>
              <span className="mt-1 block text-[0.8rem] opacity-75">{board.quote.who}, on Yelp</span>
            </p>
          )}
        </footer>
      )}
    </Board>
  );
}

function FilterBar({ active, onChange, dark }: { active: Tag | "all"; onChange: (t: Tag | "all") => void; dark?: boolean }) {
  return (
    <div role="group" aria-label="Filter the menu" className="flex flex-wrap gap-2">
      {filters.map((f) => {
        const on = active === f.id;
        return (
          <button
            key={f.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(f.id)}
            className={cn("plate !min-h-[2.6rem] !px-4 !text-[0.95rem]", on ? "" : dark ? "plate-ghost" : "plate-maroon")}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}

/** Home: the boards in a row you swipe. Every board is a painted plate; the filter dims what doesn't match. */
export function BoardRail() {
  const [active, setActive] = useState<Tag | "all">("all");
  const count = useMemo(
    () => boards.reduce((n, b) => n + b.items.filter((i) => active === "all" || i.tags.includes(active)).length, 0),
    [active],
  );
  return (
    <div>
      <SwipeRail
        label="The menu boards"
        tone="dark"
        toolbar={
          <div className="flex flex-col gap-3">
            <FilterBar active={active} onChange={setActive} dark />
            <p className="rate-wide text-[0.78rem] text-enamel/75" aria-live="polite">
              {count} {active === "all" ? "items" : "match"}
            </p>
          </div>
        }
      >
        {boards.map((b, i) => (
          <div key={b.id} className="flex w-[84vw] max-w-[360px] sm:w-[340px]">
            <RateBoard board={b} tone={tones[i % 3]} active={active} />
          </div>
        ))}
        <div aria-hidden className="w-1 shrink-0" />
      </SwipeRail>
    </div>
  );
}

/** /menu: every board at once, in columns. */
export function BoardWall() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Tag | "all">("all");
  return (
    <div>
      <div className="sticky top-16 z-20 -mx-4 bg-tea/95 px-4 py-3 md:top-[4.5rem] md:-mx-6 md:px-6 lg:-mx-12 lg:px-12">
        <FilterBar active={active} onChange={setActive} dark />
      </div>
      <div className="mt-8 columns-1 gap-5 sm:columns-2 xl:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
        {boards.map((b, i) => (
          <motion.div
            key={b.id}
            id={b.id}
            initial={reduce ? false : { opacity: 1, rotate: i % 2 ? 1.6 : -1.6, y: 18 }}
            whileInView={{ rotate: 0, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 120, damping: 9 }}
            style={{ transformOrigin: "50% 0%" }}
          >
            <RateBoard board={b} tone={tones[i % 3]} active={active} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
