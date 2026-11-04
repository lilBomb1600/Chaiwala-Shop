"use client";

import { useEffect, useRef } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { flavors, type Order } from "@/data/chai";
import { SpiceShape } from "./Spices";

/** blend a hex color toward another by t (0..1) */
function mix(a: string, b: string, t: number) {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return `#${x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("")}`;
}

const SPOUT = { x: 210, y: 138 };

/* where each cup's liquid sits, in the 420 x 520 drawing */
const CUPS = {
  kullad: { rimY: 250, rimRx: 94, rimRy: 14 },
  cup: { rimY: 238, rimRx: 90, rimRy: 12 },
  iced: { rimY: 208, rimRx: 104, rimRy: 13 },
};

/* spices lie on the board beside the cup, the way the shop's own menu board shows them */
const SLOTS = [
  { x: 74, y: 486, r: -18 },
  { x: 350, y: 486, r: 14 },
  { x: 38, y: 452, r: 22 },
  { x: 386, y: 452, r: -10 },
];

const ICE = { fill: "#ffffff", fillOpacity: 0.38, stroke: "#ffffff", strokeOpacity: 0.75, strokeWidth: 1.6 } as const;

/**
 * The cup on the stage: a kullad, a paper cup or a clear iced cup, filled by a pour from the steel kettle every time
 * something changes. The pour, the ripple and the rising level are the payoff for each choice. Every moving part is
 * a motion value written straight to an SVG attribute, so nothing depends on CSS transform origins inside SVG.
 */
export function ChaiCup({ order, pourKey, className }: { order: Order; pourKey: number; className?: string }) {
  const reduce = useReducedMotion();
  const svg = useRef<SVGSVGElement>(null);
  const kettle = useRef<SVGGElement>(null);
  const stream = useRef<SVGGElement>(null);
  const inView = useInView(svg, { once: true, amount: 0.45 });
  const poured = useRef(false);

  const fill = useMotionValue(1);
  const tilt = useMotionValue(0);
  const pourS = useMotionValue(0);
  const pourDrop = useMotionValue(0);
  const ring1 = useMotionValue(0);
  const ring2 = useMotionValue(0);

  const flavor = flavors.find((f) => f.id === order.flavor)!;
  const iced = order.temp === "iced";
  const kind = order.cup === "kullad" ? "kullad" : iced ? "iced" : "cup";
  const geo = CUPS[kind];
  let color = iced ? flavor.iced : flavor.hot;
  if (order.milk !== "2%") color = mix(color, "#f3e2c9", 0.16);
  const large = order.size === "large";

  // the surface sinks and narrows as the cup empties; a clear cup shows the whole column
  const depth = kind === "iced" ? 70 : 34;
  const surfaceY = useTransform(fill, (f) => geo.rimY + 7 + (1 - f) * depth);
  const surfaceRx = useTransform(fill, (f) => geo.rimRx - 4 - (1 - f) * (kind === "iced" ? 10 : 14));
  const surfaceRy = useTransform(fill, (f) => geo.rimRy - 2 - (1 - f) * 3);
  const columnH = useTransform(surfaceY, (y) => 474 - y);
  const streamH = useTransform(surfaceY, (y) => y - SPOUT.y);
  const iceY = useTransform(surfaceY, (y) => y - 12);
  const r1rx = useTransform(ring1, (v) => 18 + v * 52);
  const r1ry = useTransform(ring1, (v) => 3 + v * 9);
  const r1o = useTransform(ring1, (v) => (v === 0 ? 0 : 0.85 * (1 - v)));
  const r2rx = useTransform(ring2, (v) => 18 + v * 60);
  const r2ry = useTransform(ring2, (v) => 3 + v * 10);
  const r2o = useTransform(ring2, (v) => (v === 0 ? 0 : 0.6 * (1 - v)));

  useMotionValueEvent(tilt, "change", (v) => kettle.current?.setAttribute("transform", `rotate(${v} 128 100)`));
  const placeStream = () =>
    stream.current?.setAttribute(
      "transform",
      `translate(0 ${pourDrop.get()}) translate(${SPOUT.x} ${SPOUT.y}) scale(1 ${Math.max(pourS.get(), 0.0001)}) translate(${-SPOUT.x} ${-SPOUT.y})`,
    );
  useMotionValueEvent(pourS, "change", placeStream);
  useMotionValueEvent(pourDrop, "change", placeStream);

  useEffect(() => {
    if (reduce || !inView) return;
    const first = !poured.current;
    poured.current = true;
    const end = first ? 1.55 : 1.1;
    pourDrop.set(0);
    pourS.set(0);
    ring1.set(0);
    ring2.set(0);
    // one timeline; a value may appear twice (tilt in, tilt back) because a sequence merges its segments
    const ctl = animate([
      [tilt, 26, { duration: 0.34, ease: [0.3, 0, 0.2, 1], at: 0 }],
      [pourS, [0, 1], { duration: 0.26, ease: "easeIn", at: 0.2 }],
      [fill, [first ? 0.05 : 0.62, 1], { duration: first ? 1.25 : 0.8, ease: [0.25, 0.6, 0.3, 1], at: 0.4 }],
      [ring1, [0.001, 1], { duration: 0.75, ease: "easeOut", at: 0.42 }],
      [ring2, [0.001, 1], { duration: 0.85, ease: "easeOut", at: 0.8 }],
      // the tail of the stream falls in: its top drops by its own length while it shrinks, so the bottom stays put
      [pourDrop, [0, geo.rimY + 7 - SPOUT.y], { duration: 0.3, ease: "easeIn", at: end }],
      [pourS, 0, { duration: 0.3, ease: "easeIn", at: end }],
      [tilt, 0, { duration: 0.6, ease: [0.16, 1, 0.3, 1], at: end - 0.05 }],
    ]);
    return () => ctl.stop();
  }, [pourKey, inView, reduce, fill, tilt, pourS, pourDrop, ring1, ring2, geo.rimY]);

  return (
    <svg
      ref={svg}
      viewBox="0 0 420 520"
      className={className}
      role="img"
      aria-label={`${large ? "Large" : "Regular"} ${order.temp} ${flavor.name.toLowerCase()} chai ${kind === "kullad" ? "in a clay kullad" : "in a cup"}`}
    >
      <defs>
        <linearGradient id="clay" x1="0" x2="1">
          <stop offset="0" stopColor="#7a3418" />
          <stop offset=".2" stopColor="#bb6539" />
          <stop offset=".42" stopColor="#d07c4b" />
          <stop offset=".7" stopColor="#ae5630" />
          <stop offset="1" stopColor="#6a2b12" />
        </linearGradient>
        <linearGradient id="paper" x1="0" x2="1">
          <stop offset="0" stopColor="#d9d0c3" />
          <stop offset=".3" stopColor="#ffffff" />
          <stop offset=".75" stopColor="#f2ece3" />
          <stop offset="1" stopColor="#c9beae" />
        </linearGradient>
        <linearGradient id="steel" x1="0" x2="1">
          <stop offset="0" stopColor="#7d8082" />
          <stop offset=".35" stopColor="#f4f4f1" />
          <stop offset=".6" stopColor="#c3c5c4" />
          <stop offset="1" stopColor="#6f7173" />
        </linearGradient>
        <pattern id="speckle" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="6" r="0.9" fill="#5a230e" opacity=".35" />
          <circle cx="15" cy="3" r="0.7" fill="#f0a073" opacity=".3" />
          <circle cx="11" cy="16" r="1" fill="#5a230e" opacity=".3" />
          <circle cx="19" cy="12" r="0.6" fill="#5a230e" opacity=".35" />
        </pattern>
        <clipPath id="iced-inner">
          <path d="M104 208 L140 468 Q210 479 280 468 L316 208 Z" />
        </clipPath>
        <clipPath id="cup-band">
          <path d="M112 238 L140 470 Q210 481 280 470 L308 238 Z" />
        </clipPath>
        <filter id="soft" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* shadow on the board */}
      <ellipse cx="210" cy="478" rx={large ? 128 : 116} ry="13" fill="#000" opacity=".5" filter="url(#soft)" />

      {/* spices beside the cup */}
      <AnimatePresence mode="popLayout">
        <motion.g key={flavor.id} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
          {flavor.spices.map((s, i) => {
            const slot = SLOTS[i % SLOTS.length];
            return (
              <g key={i} transform={`translate(${slot.x} ${slot.y})`}>
                <motion.g
                  initial={reduce ? false : { opacity: 0, y: -50, rotate: slot.r - 50 }}
                  animate={{ opacity: 1, y: 0, rotate: slot.r }}
                  transition={{ type: "spring", stiffness: 240, damping: 13, delay: 0.08 + i * 0.07 }}
                >
                  <g transform="scale(1.45)">
                    <SpiceShape kind={s} />
                  </g>
                </motion.g>
              </g>
            );
          })}
        </motion.g>
      </AnimatePresence>

      {/* the spoon of sugar */}
      <AnimatePresence>
        {order.sugar === "one" && (
          <motion.g
            key="spoon"
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24, transition: { duration: 0.2 } }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <g transform="translate(292 508) rotate(-6)">
              <rect x="0" y="-3" width="76" height="6" rx="3" fill="url(#steel)" />
              <ellipse cx="-8" cy="0" rx="16" ry="9" fill="url(#steel)" stroke="#6f7173" strokeWidth="1" />
              <ellipse cx="-8" cy="-2" rx="11" ry="5" fill="#fffdf8" />
              <circle cx="-12" cy="-4" r="1.4" fill="#fff" />
              <circle cx="-5" cy="-3" r="1.2" fill="#f1ece4" />
            </g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* the cup */}
      <motion.g
        animate={{ scale: large ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 210, damping: 16 }}
        style={{ originX: 0.5, originY: 1 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.g
            key={kind}
            initial={reduce ? false : { opacity: 0, y: -26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.16 } }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            {kind === "kullad" && (
              <g>
                <path d="M106 252 C108 330 124 418 140 466 Q210 480 280 466 C296 418 312 330 314 252 Z" fill="url(#clay)" />
                <path d="M106 252 C108 330 124 418 140 466 Q210 480 280 466 C296 418 312 330 314 252 Z" fill="url(#speckle)" />
                {[404, 424, 444].map((y) => {
                  const inset = 132 + (y - 404) * 0.2;
                  return (
                    <g key={y}>
                      <path d={`M${inset} ${y} Q210 ${y + 13} ${420 - inset} ${y}`} stroke="#6a2b12" strokeWidth="2.6" fill="none" opacity=".55" />
                      <path d={`M${inset} ${y + 3} Q210 ${y + 16} ${420 - inset} ${y + 3}`} stroke="#e39264" strokeWidth="1.3" fill="none" opacity=".35" />
                    </g>
                  );
                })}
                <ellipse cx="210" cy="250" rx="106" ry="19" fill="#c9764a" />
                <ellipse cx="210" cy="250" rx="106" ry="19" fill="url(#speckle)" />
                <ellipse cx="210" cy="252" rx={geo.rimRx} ry={geo.rimRy} fill="#4a1d0c" />
              </g>
            )}
            {kind === "cup" && (
              <g>
                <path d="M112 238 L140 470 Q210 481 280 470 L308 238 Z" fill="url(#paper)" />
                <g clipPath="url(#cup-band)">
                  <rect x="100" y="318" width="220" height="74" fill="#8e1b22" />
                  <rect x="100" y="322" width="220" height="2" fill="#f4b223" />
                  <rect x="100" y="386" width="220" height="2" fill="#f4b223" />
                  <text x="210" y="364" textAnchor="middle" fill="#fff6ea" style={{ fontFamily: "var(--font-paint)", fontSize: 27 }}>
                    Chaiwala
                  </text>
                </g>
                <ellipse cx="210" cy="238" rx="99" ry="14" fill="#efe8de" stroke="#cfc4b5" strokeWidth="2" />
                <ellipse cx="210" cy="239" rx={geo.rimRx} ry={geo.rimRy} fill="#5a2a14" />
              </g>
            )}
            {kind === "iced" && (
              <g>
                <g clipPath="url(#iced-inner)">
                  <motion.rect x="90" width="240" y={surfaceY} height={columnH} style={{ fill: color, transition: "fill .6s" }} />
                  <motion.g style={{ y: iceY }}>
                    <rect x="146" y="2" width="40" height="38" rx="9" transform="rotate(18 166 21)" {...ICE} />
                    <rect x="208" y="12" width="40" height="38" rx="9" transform="rotate(-12 228 31)" {...ICE} />
                    <rect x="250" y="-2" width="38" height="36" rx="9" transform="rotate(24 269 16)" {...ICE} />
                  </motion.g>
                </g>
                <path d="M100 206 L138 470 Q210 482 282 470 L320 206" fill="#ffffff" fillOpacity=".07" stroke="#ffffff" strokeOpacity=".55" strokeWidth="2.2" />
                <path d="M118 230 L146 448" stroke="#ffffff" strokeOpacity=".28" strokeWidth="6" strokeLinecap="round" />
                <ellipse cx="210" cy="206" rx="110" ry="14" fill="none" stroke="#ffffff" strokeOpacity=".6" strokeWidth="2.2" />
                <path d="M262 92 L238 440" stroke="#8e1b22" strokeWidth="12" strokeLinecap="round" />
                <path d="M262 92 L238 440" stroke="#f4b223" strokeWidth="2" strokeDasharray="10 14" strokeLinecap="round" />
              </g>
            )}

            {/* the chai, seen from above */}
            <motion.ellipse cx="210" cy={surfaceY} rx={surfaceRx} ry={surfaceRy} style={{ fill: color, transition: "fill .6s" }} />
            <motion.ellipse cx="210" cy={surfaceY} rx={surfaceRx} ry={surfaceRy} fill="none" stroke="#fff6ea" strokeOpacity=".22" strokeWidth="3" />
            {kind === "kullad" && iced && (
              <motion.g style={{ y: iceY }}>
                <rect x="172" y="2" width="34" height="22" rx="7" transform="rotate(14 189 13)" {...ICE} fillOpacity={0.5} />
                <rect x="220" y="8" width="34" height="22" rx="7" transform="rotate(-16 237 19)" {...ICE} fillOpacity={0.5} />
              </motion.g>
            )}
            <motion.ellipse cx="210" cy={surfaceY} rx={r1rx} ry={r1ry} opacity={r1o} fill="none" stroke="#fff6ea" strokeWidth="2" />
            <motion.ellipse cx="210" cy={surfaceY} rx={r2rx} ry={r2ry} opacity={r2o} fill="none" stroke="#fff6ea" strokeWidth="1.5" />
          </motion.g>
        </AnimatePresence>

        {/* steam, when it's hot */}
        {!iced && (
          <g className="steam" fill="none" stroke="#fff6ea" strokeWidth="5" strokeLinecap="round" opacity=".9">
            <path d="M184 222c-10-16 10-26 0-44" />
            <path d="M212 216c-10-16 10-26 0-46" />
            <path d="M240 222c-10-16 10-26 0-44" />
          </g>
        )}
      </motion.g>

      {/* the pour */}
      <g ref={stream} transform={`translate(${SPOUT.x} ${SPOUT.y}) scale(1 0.0001) translate(${-SPOUT.x} ${-SPOUT.y})`}>
        <motion.rect x={SPOUT.x - 4} y={SPOUT.y} width="8" rx="4" height={streamH} style={{ fill: color, transition: "fill .4s" }} />
      </g>

      {/* the kettle */}
      <g ref={kettle}>
        <path d="M168 112 C190 108 206 102 220 96 L223 101 C208 110 192 118 170 122 Z" fill="url(#steel)" stroke="#5f6163" strokeWidth="1.2" />
        <path d="M80 76 Q76 128 96 138 L160 138 Q180 128 176 76 Z" fill="url(#steel)" stroke="#5f6163" strokeWidth="1.4" />
        <path d="M84 96 Q128 104 172 96" stroke="#ffffff" strokeOpacity=".5" strokeWidth="2" fill="none" />
        <ellipse cx="128" cy="76" rx="49" ry="9" fill="#e9e9e5" stroke="#5f6163" strokeWidth="1.4" />
        <ellipse cx="128" cy="76" rx="40" ry="6" fill="#3b2a20" />
        <path d="M80 84 C50 80 48 126 82 124" stroke="#4d4f52" strokeWidth="7" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
