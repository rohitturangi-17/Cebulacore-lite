import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  light?: boolean;
}

export function GlassPanel({ children, className, light = false }: GlassPanelProps) {
  return (
    <div className={cn(light ? "glass-panel-light" : "glass-panel", "rounded-xl2", className)}>
      {children}
    </div>
  );
}
