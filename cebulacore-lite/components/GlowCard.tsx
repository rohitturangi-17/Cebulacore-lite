"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlowCard({
  className,
  children,
  glow = "primary",
  hover = true,
}: {
  className?: string;
  children: React.ReactNode;
  glow?: "primary" | "accent" | "success" | "warning" | "danger";
  hover?: boolean;
}) {
  const glowMap: Record<string, string> = {
    primary: "hover:shadow-glow",
    accent: "hover:shadow-glow-accent",
    success: "hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]",
    warning: "hover:shadow-[0_0_40px_rgba(245,158,11,0.25)]",
    danger: "hover:shadow-[0_0_40px_rgba(239,68,68,0.25)]",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "glass rounded-xl2 p-6 transition-shadow duration-300",
        hover && glowMap[glow],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
