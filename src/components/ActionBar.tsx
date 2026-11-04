"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, ScrollText } from "lucide-react";
import { business } from "@/data/business";
import { cn } from "@/lib/utils";

/**
 * Phones only: Call, Directions and Menu on a small board pinned to the bottom of the screen. On the home page it
 * waits until the opening's own buttons have scrolled away; it steps aside while the footer's buttons are showing.
 */
export function ActionBar() {
  const pathname = usePathname();
  const [heroGone, setHeroGone] = useState(pathname !== "/");
  const [footer, setFooter] = useState(false);
  const [prev, setPrev] = useState(pathname);

  if (pathname !== prev) {
    setPrev(pathname);
    setHeroGone(pathname !== "/");
  }

  useEffect(() => {
    const hero = document.getElementById("hero-ctas");
    const foot = document.getElementById("footer-ctas");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0);
        if (e.target === foot) setFooter(e.isIntersecting);
      }
    });
    if (hero) io.observe(hero);
    if (foot) io.observe(foot);
    return () => io.disconnect();
  }, [pathname]);

  const show = heroGone && !footer;
  const btn =
    "flex min-h-[3.25rem] flex-1 flex-col items-center justify-center gap-0.5 rounded-[10px] rate text-[0.8rem] no-underline transition-transform active:translate-y-px";

  return (
    <div
      className={cn(
        "fixed inset-x-3 z-40 transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] md:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0",
      )}
      style={{ bottom: "max(10px, env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
      inert={!show}
    >
      <nav aria-label="Quick actions" className="board board-tea flex gap-1.5 !rounded-[16px] p-1.5 before:!hidden">
        <a href={business.phoneHref} className={cn(btn, "bg-turmeric text-maroon-ink")}>
          <Phone size={18} strokeWidth={2.4} aria-hidden />
          Call
        </a>
        <a href={business.directionsHref} target="_blank" rel="noopener" className={cn(btn, "bg-maroon text-enamel")}>
          <MapPin size={18} strokeWidth={2.4} aria-hidden />
          Directions
        </a>
        <Link href="/menu" className={cn(btn, "bg-maroon text-enamel")}>
          <ScrollText size={18} strokeWidth={2.4} aria-hidden />
          Menu
        </Link>
      </nav>
    </div>
  );
}
