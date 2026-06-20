"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AIOrbProps {
  size?: "sm" | "md" | "lg" | "xl";
  state?: "idle" | "thinking" | "speaking";
  className?: string;
}

const sizeMap = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-28 w-28",
  xl: "h-56 w-56",
};

/**
 * AIOrb — the signature visual element of CebulaCore Lite.
 * Represents Cebula's presence across the landing hero, chat interface,
 * and any "AI is thinking" state. Built from layered radial gradients
 * with a slow ambient rotation and a faster pulse when active.
 */
export function AIOrb({ size = "md", state = "idle", className }: AIOrbProps) {
  const isActive = state === "thinking" || state === "speaking";

  return (
    <div className={cn("relative flex items-center justify-center", sizeMap[size], className)}>
      {/* Outer ambient glow */}
      <motion.div
        className="absolute inset-[-30%] rounded-full bg-cebula-radial blur-2xl"
        animate={{
          opacity: isActive ? [0.5, 0.9, 0.5] : [0.3, 0.5, 0.3],
          scale: isActive ? [1, 1.15, 1] : [1, 1.05, 1],
        }}
        transition={{ duration: isActive ? 1.6 : 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating gradient ring */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-80"
        style={{
          background:
            "conic-gradient(from 0deg, #2563EB, #7C3AED, #A855F7, #2563EB)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: isActive ? 4 : 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner core */}
      <motion.div
        className="absolute inset-[14%] rounded-full bg-background"
        style={{
          boxShadow: "inset 0 0 30px rgba(168,85,247,0.4)",
        }}
      />

      {/* Glowing center */}
      <motion.div
        className="absolute inset-[28%] rounded-full bg-cebula-gradient blur-[2px]"
        animate={{
          scale: isActive ? [1, 1.2, 0.95, 1] : [1, 1.08, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{ duration: isActive ? 1.1 : 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
