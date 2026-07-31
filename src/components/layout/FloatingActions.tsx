"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ShoppingBag } from "lucide-react";
import { business } from "@/data/business";

export function FloatingActions() {
  return (
    <>
      {/* Desktop / tablet floating Order Now button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="fixed bottom-8 right-8 z-40 hidden sm:block"
      >
        <Link
          href="/menu"
          className="flex items-center gap-2 rounded-full bg-maroon px-6 py-3.5 text-sm font-semibold text-cream shadow-xl shadow-maroon/30 transition-transform hover:-translate-y-0.5 hover:bg-maroon-dark"
        >
          <ShoppingBag className="h-4 w-4" />
          Order Now
        </Link>
      </motion.div>

      {/* Mobile sticky action bar: Call Now + Order Now */}
      <div className="glass fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-beige px-4 py-3 sm:hidden">
        <a
          href={business.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-maroon px-4 py-3 text-sm font-semibold text-maroon"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
        <Link
          href="/menu"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-maroon px-4 py-3 text-sm font-semibold text-cream shadow-md shadow-maroon/20"
        >
          <ShoppingBag className="h-4 w-4" />
          Order Now
        </Link>
      </div>
    </>
  );
}
