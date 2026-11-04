"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Phone } from "lucide-react";
import { ArtPhoto } from "@/components/Photo";
import { Board } from "@/components/Paint";
import { business } from "@/data/business";
import { status, type Status } from "@/lib/hours";

const band = ["Chai", "Hot or iced", "Regular $4.50", "Large $6.50", "Kullad $1", "Oat, soy or almond $1", "Open daily from 10"];

function Cords({ className }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <span className="absolute left-[16%] top-0 h-full w-[3px] bg-[linear-gradient(90deg,#4a3018,#d8b07a_50%,#4a3018)] shadow-[1px_0_2px_rgb(0_0_0/0.5)]" />
      <span className="absolute right-[16%] top-0 h-full w-[3px] bg-[linear-gradient(90deg,#4a3018,#d8b07a_50%,#4a3018)] shadow-[1px_0_2px_rgb(0_0_0/0.5)]" />
      {/* the hooks on the board */}
      <span className="absolute bottom-[-5px] left-[calc(16%-4px)] h-[10px] w-[10px] rounded-full border-2 border-[#c9a06a]" />
      <span className="absolute bottom-[-5px] right-[calc(16%-4px)] h-[10px] w-[10px] rounded-full border-2 border-[#c9a06a]" />
    </div>
  );
}

export function OpenLine({ className }: { className?: string }) {
  const [s, setS] = useState<Status | null>(null);
  useEffect(() => {
    const tick = () => setS(status());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className={className} aria-live="polite">
      <span
        aria-hidden
        className={`mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle ${s?.open === false ? "bg-current opacity-40" : "bg-[#5fd36f] shadow-[0_0_0_3px_rgb(95_211_111/0.25)]"}`}
      />
      {s ? s.line : "Open daily from 10 AM"}
    </span>
  );
}

/**
 * The opening: the Concord room, and the shop's board hung over it on two cords. The board swings when the page
 * moves, the way a hung sign does, and settles; the open tag under it swings on its own, faster.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const boardY = useTransform(scrollYProgress, [0, 1], [0, -110]);

  const vel = useVelocity(scrollY);
  const push = useTransform(vel, [-2400, 0, 2400], [3.2, 0, -3.2], { clamp: true });
  const sway = useSpring(push, { stiffness: 52, damping: 4.5, mass: 1 });
  const tagSway = useSpring(push, { stiffness: 95, damping: 3.5, mass: 0.5 });
  const drop = useMotionValue(reduce ? 0 : 3.5);
  const rotate = useTransform(() => (reduce ? 0 : sway.get() + drop.get()));
  const tagRotate = useTransform(() => (reduce ? 0 : tagSway.get() * 1.8 + drop.get() * -1.6));

  useEffect(() => {
    if (reduce) return;
    // hung, let go, settles
    const c = animate(drop, 0, { type: "spring", stiffness: 38, damping: 3.2, mass: 1, delay: 0.25 });
    return () => c.stop();
  }, [drop, reduce]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-tea md:h-[100svh] md:min-h-[680px]"
    >
      {/* the room */}
      <div className="relative h-[54svh] overflow-hidden md:absolute md:inset-0 md:h-auto">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={reduce ? undefined : { scale: photoScale, y: photoY }}
        >
          <motion.div
            className="h-full w-full"
            initial={reduce ? false : { scale: 1.08, filter: "brightness(0.72) saturate(0.9)" }}
            animate={{ scale: 1, filter: "brightness(1) saturate(1)" }}
            transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ArtPhoto
              phone="room-tall"
              wide="room-wide"
              priority
              className="h-full w-full object-cover object-[50%_58%] md:object-[30%_50%]"
            />
          </motion.div>
        </motion.div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-tea/85 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-tea to-transparent md:h-40 md:from-tea/70" />
      </div>

      {/* the board, hung from the ceiling on two cords */}
      <motion.div
        className="relative z-10 -mt-[54svh] px-4 md:absolute md:right-[4vw] md:top-0 md:mt-0 md:w-[clamp(440px,42vw,600px)] md:px-0"
        style={reduce ? undefined : { y: boardY }}
      >
        <motion.div style={{ rotate, transformOrigin: "50% 0%" }} className="will-change-transform">
          <Cords className="relative h-[calc(54svh-5.5rem)] min-h-[140px] md:h-[clamp(70px,13vh,130px)] md:min-h-0" />
          <Board tone="maroon" className="px-6 pb-7 pt-8 sm:px-9 md:px-10 md:pb-9 md:pt-10">
            <h1
              id="hero-title"
              className="paint text-[clamp(2.9rem,13vw,4rem)] text-enamel md:text-[min(5.3vw,9.2vh,5.5rem)]"
            >
              Take a <br />
              chai break.
            </h1>
            <p className="mt-4 max-w-[34ch] text-[1.05rem] leading-snug text-enamel/90 md:mt-5 md:text-[1.2rem]">
              Ten chais, hot or iced, and desi street bites on Salvio St in downtown Concord.
            </p>

            {/* the rate line: every number on it is from the board over the counter */}
            <p className="rate mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-[9px] bg-turmeric px-3.5 py-2.5 text-[0.86rem] leading-tight text-maroon-ink shadow-[inset_0_-2px_0_rgb(0_0_0/0.15)] md:mt-6 md:text-[0.95rem]">
              {band.map((b, i) => (
                <span key={b} className="inline-flex items-center gap-2">
                  {i > 0 && (
                    <svg viewBox="0 0 10 10" className="h-2 w-2 text-maroon" aria-hidden>
                      <path d="M5 0l5 5-5 5-5-5z" fill="currentColor" />
                    </svg>
                  )}
                  <span className="nums">{b}</span>
                </span>
              ))}
            </p>

            <div id="hero-ctas" className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3 md:mt-7">
              <a href="#chai" className="plate">
                Make my chai
              </a>
              <a href={business.phoneHref} className="plate plate-ghost">
                <Phone size={17} strokeWidth={2.4} aria-hidden />
                <span className="sm:hidden">Call</span>
                <span className="hidden sm:inline">{business.phone}</span>
              </a>
            </div>
            <OpenLine className="rate-wide mt-5 block text-[0.78rem] text-enamel/85 md:hidden" />
          </Board>

          {/* the open tag, hung under the board; swings on its own */}
          <motion.div
            style={{ rotate: tagRotate, transformOrigin: "50% 0%" }}
            className="mx-auto hidden w-fit will-change-transform md:block"
          >
            <div aria-hidden className="relative mx-auto h-9 w-[150px]">
              <span className="absolute left-[18%] top-0 h-full w-[3px] bg-[linear-gradient(90deg,#4a3018,#d8b07a_50%,#4a3018)]" />
              <span className="absolute right-[18%] top-0 h-full w-[3px] bg-[linear-gradient(90deg,#4a3018,#d8b07a_50%,#4a3018)]" />
            </div>
            <div className="board board-enamel !rounded-[12px] px-6 py-3 before:!inset-[5px] before:!rounded-[8px]">
              <OpenLine className="rate text-[0.95rem] text-maroon-ink" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div aria-hidden className="h-10 md:hidden" />
    </section>
  );
}
