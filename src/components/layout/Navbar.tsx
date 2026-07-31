"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { business } from "@/data/business";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        open ? "bg-cream shadow-sm shadow-espresso/5" : scrolled ? "glass shadow-sm shadow-espresso/5" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Logo />

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors hover:text-maroon",
                  active ? "text-maroon" : "text-espresso"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-saffron"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={business.phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-espresso-light transition-colors hover:text-maroon"
          >
            <Phone className="h-4 w-4" />
            {business.phone}
          </a>
          <Link
            href="/menu"
            className="rounded-full bg-maroon px-6 py-2.5 text-sm font-semibold text-cream shadow-md shadow-maroon/20 transition-all hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/30"
          >
            Order Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-beige text-espresso lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-cream shadow-lg shadow-espresso/10 lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 pb-8 pt-2" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-cream-dark text-maroon"
                      : "text-espresso hover:bg-cream-dark/70"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-3 border-t border-beige pt-4">
                <a
                  href={business.phoneHref}
                  className="flex items-center gap-2 px-4 text-sm font-medium text-espresso-light"
                >
                  <Phone className="h-4 w-4" />
                  {business.phone}
                </a>
                <Link
                  href="/menu"
                  className="rounded-full bg-maroon px-6 py-3 text-center text-sm font-semibold text-cream shadow-md shadow-maroon/20"
                >
                  Order Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
