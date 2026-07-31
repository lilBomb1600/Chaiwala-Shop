"use client";

import { useId } from "react";
import { Coffee, ImageIcon, Store } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  cup: Coffee,
  shop: Store,
  photo: ImageIcon,
} as const;

/**
 * Stand-in visual used wherever a real photo hasn't been supplied yet.
 * Swap the corresponding <Image> in place of this once the file lands
 * in /public/images — search the codebase for "ready: false" entries.
 */
export function PlaceholderImage({
  icon = "photo",
  label,
  className,
}: {
  icon?: keyof typeof icons;
  label?: string;
  className?: string;
}) {
  const gradientId = useId();
  const Icon = icons[icon];

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3e6cd" />
            <stop offset="55%" stopColor="#e9dbbf" />
            <stop offset="100%" stopColor="#c98a3a" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
      </svg>
      <div className="relative flex flex-col items-center gap-2 opacity-70">
        <Icon className="h-8 w-8 text-espresso-light" strokeWidth={1.25} />
        {label && (
          <span className="text-center text-[0.65rem] font-medium uppercase tracking-wider text-espresso-light">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
