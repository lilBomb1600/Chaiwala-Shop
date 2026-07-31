"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { menu } from "@/data/menu";

export function CategoryNav() {
  const [active, setActive] = useState(menu[0].id);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = menu
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeBtn = navRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    activeBtn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  return (
    <div className="glass sticky top-20 z-30 border-b border-beige">
      <div
        ref={navRef}
        className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4 sm:px-8 lg:px-12"
      >
        {menu.map((category) => (
          <a
            key={category.id}
            data-id={category.id}
            href={`#${category.id}`}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active === category.id
                ? "bg-maroon text-cream"
                : "bg-white text-espresso-light hover:bg-cream-dark"
            )}
          >
            {category.title}
          </a>
        ))}
      </div>
    </div>
  );
}
