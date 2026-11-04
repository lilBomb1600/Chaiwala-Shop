"use client";

import { useSyncExternalStore } from "react";
import { MapPin, Phone } from "lucide-react";
import { Photo } from "@/components/Photo";
import { Board } from "@/components/Paint";
import { Hang } from "@/components/Hang";
import { OpenLine } from "@/components/home/Hero";
import { business } from "@/data/business";
import { week } from "@/lib/hours";
import { cn } from "@/lib/utils";

const noop = () => () => {};
const concordWeekday = () => new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", weekday: "long" }).format(new Date());

/** today's weekday in Concord; null while server rendering, so the static page never guesses the day */
function useToday() {
  return useSyncExternalStore(noop, concordWeekday, () => null);
}

/** Where, when, and the two buttons that matter. */
export function Visit({ headingLevel = 2, className }: { headingLevel?: 1 | 2; className?: string }) {
  const today = useToday();
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <section id="visit" aria-labelledby="visit-title" className={cn("relative bg-tea py-20 md:py-28", className)}>
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-12">
        <div className="min-w-0">
          <H id="visit-title" className="paint text-[clamp(2.7rem,8.6vw,5.4rem)] text-enamel [--shade:var(--maroon)]">
            Next to Todos Santos Plaza.
          </H>
          <p className="mt-5 max-w-[42ch] text-[1.12rem] leading-relaxed text-enamel/85">
            {business.address.line1}, downtown Concord, by the movie theater and the parking garage. Order at the counter, sit
            down, or take it to the plaza.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={business.directionsHref} target="_blank" rel="noopener" className="plate">
              <MapPin size={18} strokeWidth={2.4} aria-hidden /> Directions
            </a>
            <a href={business.phoneHref} className="plate plate-ghost">
              <Phone size={17} strokeWidth={2.4} aria-hidden /> {business.phone}
            </a>
          </div>
          <Hang className="mt-10">
            <div className="board board-tea overflow-hidden !rounded-[16px] p-2 before:!hidden">
              <Photo
                name="room-chairs"
                sizes="(min-width: 1024px) 640px, 100vw"
                className="aspect-[5/4] h-auto w-full rounded-[11px] object-cover"
              />
            </div>
          </Hang>
        </div>

        <div className="min-w-0 lg:pt-6">
          {/* desktop: the hours ride along beside the photo instead of leaving a hole under them */}
          <Hang index={1} className="lg:sticky lg:top-28">
            <Board tone="enamel" className="px-6 pb-8 pt-9 md:px-10 md:pb-10 md:pt-11">
              <h3 className="paint text-[2.4rem] leading-none text-maroon md:text-[3rem]">Hours</h3>
              <OpenLine className="rate mt-3 block text-[1rem] text-maroon-ink" />
              <ul className="mt-6">
                {week.map((d) => {
                  const on = d.day === today;
                  return (
                    <li
                      key={d.day}
                      className={cn(
                        "flex items-baseline gap-2 border-t border-maroon/15 py-3 text-maroon-ink first:border-t-0",
                        on && "-mx-3 rounded-[10px] border-transparent bg-turmeric px-3 [&+li]:border-transparent",
                      )}
                    >
                      <span className="rate text-[1.15rem]">{d.day}</span>
                      {on && <span className="rate-wide text-[0.7rem] text-maroon">Today</span>}
                      <span aria-hidden className="leader" />
                      <span className="rate nums text-[1.15rem]">{d.label}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 text-[0.95rem] text-maroon-ink/80">
                {business.address.full}. Dine in or take out. No reservations needed.
              </p>
            </Board>
          </Hang>
        </div>
      </div>
    </section>
  );
}
