"use client";
import { motion } from "framer-motion";

/**
 * Ambient infinity-wave ribbons used behind hero / auth sections.
 * Pure SVG + framer-motion, no external assets.
 */
export function FloatingRibbon({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 1200 700" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ribbon-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="ribbon-b" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -100 420 C 250 200, 450 600, 750 320 S 1150 150, 1350 380"
          fill="none"
          stroke="url(#ribbon-a)"
          strokeWidth="120"
          strokeLinecap="round"
          style={{ filter: "blur(40px)" }}
          animate={{
            d: [
              "M -100 420 C 250 200, 450 600, 750 320 S 1150 150, 1350 380",
              "M -100 380 C 280 560, 480 180, 760 420 S 1120 540, 1350 320",
              "M -100 420 C 250 200, 450 600, 750 320 S 1150 150, 1350 380",
            ],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M -100 220 C 200 420, 500 80, 800 260 S 1100 480, 1350 180"
          fill="none"
          stroke="url(#ribbon-b)"
          strokeWidth="90"
          strokeLinecap="round"
          style={{ filter: "blur(36px)" }}
          animate={{
            d: [
              "M -100 220 C 200 420, 500 80, 800 260 S 1100 480, 1350 180",
              "M -100 260 C 220 60, 520 380, 820 140 S 1080 280, 1350 220",
              "M -100 220 C 200 420, 500 80, 800 260 S 1100 480, 1350 180",
            ],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>
    </div>
  );
}
