"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "secondary" | "accent";
  onClick?: () => void;
}

const glowMap = {
  primary: "hover:shadow-[0_0_50px_rgba(37,99,235,0.25)]",
  secondary: "hover:shadow-[0_0_50px_rgba(124,58,237,0.25)]",
  accent: "hover:shadow-[0_0_50px_rgba(168,85,247,0.25)]",
};

export function GlowCard({ children, className, glowColor = "secondary", onClick }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={onClick}
      className={cn(
        "glass-panel rounded-xl2 border border-white/[0.08] p-6 transition-shadow duration-300",
        glowMap[glowColor],
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
