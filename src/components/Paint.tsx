import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The painted dots at the four corners of a board's keyline. */
export function Bolts({ inset = 16 }: { inset?: number }) {
  const s = { top: inset, left: inset };
  return (
    <>
      <span aria-hidden className="bolt" style={s} />
      <span aria-hidden className="bolt" style={{ top: inset, right: inset }} />
      <span aria-hidden className="bolt" style={{ bottom: inset, left: inset }} />
      <span aria-hidden className="bolt" style={{ bottom: inset, right: inset }} />
    </>
  );
}

type Tone = "maroon" | "turmeric" | "enamel" | "tea";

/** A painted board: keyline a brush width in, a dot at each corner, a little grain. */
export function Board({
  tone = "maroon",
  bolts = true,
  className,
  children,
  as: As = "div",
}: {
  tone?: Tone;
  bolts?: boolean;
  className?: string;
  children: ReactNode;
  as?: "div" | "article" | "section" | "li" | "figure";
}) {
  return (
    <As className={cn("board", `board-${tone}`, className)}>
      {bolts && <Bolts />}
      {children}
    </As>
  );
}

/** The Indian vegetarian mark: a green dot in a green square. */
export function VegMark({ className, title = "Vegetarian" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("h-4 w-4 shrink-0", className)} role="img" aria-label={title}>
      <rect x="1" y="1" width="14" height="14" rx="2" fill="#fff" stroke="var(--leaf)" strokeWidth="1.8" />
      <circle cx="8" cy="8" r="3.6" fill="var(--leaf)" />
    </svg>
  );
}

export function Stars({ n = 5, className }: { n?: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
          <path
            d="M10 1.6l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.5l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7z"
            fill={i < n ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}

/** A thin painted rule with a diamond, the way sign painters split a board. */
export function PaintRule({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("flex items-center gap-2 text-current", className)}>
      <span className="h-[2px] flex-1 rounded-full bg-current opacity-60" />
      <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 opacity-80">
        <path d="M5 0l5 5-5 5-5-5z" fill="currentColor" />
      </svg>
      <span className="h-[2px] flex-1 rounded-full bg-current opacity-60" />
    </span>
  );
}
