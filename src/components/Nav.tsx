"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { business } from "@/data/business";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#chai", label: "Make my chai" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Photos" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Visit" },
];

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("paint whitespace-nowrap [--shade:var(--maroon)]", className)}>
      Chaiwala <span className="text-turmeric [--shade:var(--maroon-deep)]">Shop</span>
    </span>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [prev, setPrev] = useState(pathname);

  if (pathname !== prev) {
    setPrev(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500",
        solid || open ? "bg-tea/95 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.9)]" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-6 lg:px-12">
        <Link href="/" aria-label="Chaiwala Shop, home" className="text-[1.55rem] text-enamel md:text-[1.75rem]">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {links.map((l) => {
            const active = l.href === pathname;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rate-wide text-[0.8rem] text-enamel/85 no-underline transition-colors hover:text-turmeric",
                  active && "text-turmeric",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href={business.phoneHref} className="plate !min-h-[2.6rem] !px-4 !text-[0.95rem]">
            <Phone size={16} strokeWidth={2.4} aria-hidden />
            <span className="hidden sm:inline">{business.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="plate plate-ghost !min-h-[2.6rem] !w-[2.6rem] !p-0 lg:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-maroon px-4 pb-10 pt-6 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="paint block py-2 text-[2.6rem] text-enamel no-underline"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <a href={business.phoneHref} className="plate w-full">
                <Phone size={18} strokeWidth={2.4} aria-hidden /> Call {business.phone}
              </a>
              <a href={business.directionsHref} target="_blank" rel="noopener" className="plate plate-ghost w-full">
                Directions to {business.address.line1}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
