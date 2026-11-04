/* The spices that lie on the board beside the cup, drawn in the same hand as the cup. */
import type { Spice } from "@/data/chai";

export function SpiceShape({ kind }: { kind: Spice }) {
  switch (kind) {
    case "ginger":
      return (
        <g>
          <path d="M-26 4c-2-9 8-14 15-10 4-8 14-8 17-1 7-3 16 2 14 10-1 7-9 9-15 7-6 5-17 5-21-1-6 1-9-1-10-5z" fill="#e2c084" stroke="#a9813f" strokeWidth="1.6" />
          <path d="M-12 2c4 2 9 2 13 0M6 0c3 2 7 2 9 0" stroke="#a9813f" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
      );
    case "cardamom":
      return (
        <g>
          <ellipse rx="8" ry="15" fill="#93a85c" stroke="#5f7333" strokeWidth="1.4" />
          <path d="M0-13v26M-4-10c-1 7-1 13 0 20M4-10c1 7 1 13 0 20" stroke="#5f7333" strokeWidth="1" fill="none" opacity=".7" />
          <path d="M0-15l0-5" stroke="#5f7333" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      );
    case "leaves":
      return (
        <g fill="#3a2717" stroke="#1d130b" strokeWidth=".8">
          <path d="M-18 0c4-6 12-6 15 0-4 5-11 5-15 0z" />
          <path d="M-2 6c3-7 11-8 15-3-3 6-10 8-15 3z" />
          <path d="M4-8c4-5 11-4 13 1-4 4-10 4-13-1z" />
          <path d="M-12-9c3-4 9-4 11 0-3 4-8 4-11 0z" />
        </g>
      );
    case "clove":
      return (
        <g fill="#5b321c" stroke="#2f170b" strokeWidth="1">
          <path d="M-2 0h4l-1 22h-2z" />
          <circle cx="0" cy="-3" r="3.4" />
          <circle cx="-4" cy="-7" r="2.6" />
          <circle cx="4" cy="-7" r="2.6" />
          <circle cx="0" cy="-10" r="2.6" />
        </g>
      );
    case "cinnamon":
      return (
        <g>
          <rect x="-42" y="-7" width="84" height="14" rx="6" fill="#9b5a2c" stroke="#5f3115" strokeWidth="1.4" />
          <path d="M-36-3h70M-36 3h66" stroke="#c88552" strokeWidth="1.2" opacity=".7" />
          <ellipse cx="42" cy="0" rx="4" ry="7" fill="#6f3a17" stroke="#5f3115" strokeWidth="1.2" />
          <path d="M42-3c2 0 2 6 0 6" stroke="#c88552" strokeWidth="1" fill="none" />
        </g>
      );
    case "basil":
      return (
        <g>
          <path d="M-16 0C-10-12 10-12 16 0 10 12-10 12-16 0z" fill="#3f8b3c" stroke="#25602a" strokeWidth="1.3" />
          <path d="M-15 0h30M-5 0l-5-5M2 0l-5-6M-5 0l-5 5M2 0l-5 6" stroke="#25602a" strokeWidth="1" fill="none" opacity=".8" />
        </g>
      );
    case "saffron":
      return (
        <g fill="none" strokeLinecap="round" strokeWidth="2.4">
          <path d="M-18 4c6-6 12-8 20-6" stroke="#d6331d" />
          <path d="M-10 10c8-3 14-10 18-16" stroke="#e8552a" />
          <path d="M-4-6c6 2 10 8 18 8" stroke="#c2281a" />
          <path d="M2 8c6 0 10-4 16-2" stroke="#f08a24" />
        </g>
      );
    case "cocoa":
      return (
        <g>
          <path d="M-14-8h22l6 6v12h-28z" fill="#4a2616" stroke="#2a130a" strokeWidth="1.2" />
          <path d="M-14-8l6 6h22M-8-2v12" stroke="#6b3a22" strokeWidth="1.2" fill="none" />
          <path d="M14 6c6-2 10 2 8 6-2 3-7 2-8-1" fill="none" stroke="#5a2e1a" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      );
    case "fennel":
      return (
        <g fill="#a9ab59" stroke="#6c6e2e" strokeWidth=".9">
          <ellipse cx="-8" cy="0" rx="3" ry="7" transform="rotate(-20 -8 0)" />
          <ellipse cx="0" cy="-3" rx="3" ry="7" transform="rotate(15 0 -3)" />
          <ellipse cx="8" cy="2" rx="3" ry="7" transform="rotate(-5 8 2)" />
          <ellipse cx="-2" cy="7" rx="3" ry="7" transform="rotate(70 -2 7)" />
        </g>
      );
    case "betel":
      return (
        <g>
          <path d="M0 18C-22 4-22-14-8-16-3-17 0-13 0-10c0-3 3-7 8-6 14 2 14 20-8 34z" fill="#3e7d33" stroke="#27561f" strokeWidth="1.4" />
          <path d="M0-10v26M0 0c-6-3-10-3-13-1M0 6c6-3 10-3 13-1" stroke="#9cc58a" strokeWidth="1" fill="none" opacity=".8" />
        </g>
      );
    case "petal":
      return (
        <g>
          <path d="M0-14C10-12 14 0 8 10 4 15-4 15-8 10-14 0-10-12 0-14z" fill="#d9607a" stroke="#a63a52" strokeWidth="1.2" />
          <path d="M-2-8c3 4 4 10 2 16" stroke="#f3a3b4" strokeWidth="1.2" fill="none" opacity=".8" />
        </g>
      );
  }
}
