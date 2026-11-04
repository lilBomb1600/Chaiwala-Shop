"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A row you move sideways yourself: swipe on a phone, two-finger scroll on a trackpad, drag with a mouse, or the
 * arrow plates. It snaps board to board and never takes over the page's vertical scroll.
 */
export function SwipeRail({
  children,
  label,
  className,
  arrowsClassName,
  tone = "light",
  toolbar,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  arrowsClassName?: string;
  tone?: "light" | "dark";
  /** controls that share the arrows' row (left side) */
  toolbar?: ReactNode;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const swallow = useRef(false);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = rail.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = el.scrollWidth - el.clientWidth;
      const start = el.scrollLeft < 4;
      const end = el.scrollLeft > max - 4;
      setEdge((e) => (e.start === start && e.end === end ? e : { start, end }));
    };
    const onScroll = () => (raf ||= requestAnimationFrame(update));
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const w = first ? first.getBoundingClientRect().width + gap : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * w, behavior: reduce ? "auto" : "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.dataset.dragging = "true";
    }
    if (d.moved) e.currentTarget.scrollLeft = d.left - dx;
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    swallow.current = true;
    window.setTimeout(() => (swallow.current = false), 0);
    delete e.currentTarget.dataset.dragging;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const btn = cn(
    "plate !min-h-0 h-12 w-12 !p-0 disabled:pointer-events-none disabled:opacity-35",
    tone === "dark" ? "plate-ghost" : "plate-maroon",
  );

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "mx-auto mb-5 flex max-w-[1440px] items-end justify-between gap-4 px-4 md:px-6 lg:px-12",
          !toolbar && "hidden md:flex",
          arrowsClassName,
        )}
      >
        <div className="min-w-0">{toolbar}</div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <button type="button" aria-label="Previous" disabled={edge.start} onClick={() => step(-1)} className={btn}>
            <ArrowLeft size={20} strokeWidth={2.4} aria-hidden />
          </button>
          <button type="button" aria-label="Next" disabled={edge.end} onClick={() => step(1)} className={btn}>
            <ArrowRight size={20} strokeWidth={2.4} aria-hidden />
          </button>
        </div>
      </div>
      <div
        ref={rail}
        role="region"
        aria-label={label}
        tabIndex={0}
        data-lenis-prevent-horizontal
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (swallow.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className="swipe-rail items-start pb-6 pt-2 [--rail-pad:1rem] md:[--rail-pad:1.5rem] lg:[--rail-pad:3rem]"
      >
        {children}
      </div>
    </div>
  );
}
