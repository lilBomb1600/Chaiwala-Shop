"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** A review, word for word; the long ones fold after a few lines so the chits stay a readable size. */
export function ReviewText({ text }: { text: string }) {
  const long = text.length > 360;
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <p className={cn("text-[1rem] leading-relaxed text-maroon-ink", long && !open && "line-clamp-[9]")}>{text}</p>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="rate mt-2 text-[0.95rem] text-maroon underline decoration-2 underline-offset-4 hover:text-maroon-hi"
        >
          {open ? "Show less" : "Read the whole review"}
        </button>
      )}
    </div>
  );
}
