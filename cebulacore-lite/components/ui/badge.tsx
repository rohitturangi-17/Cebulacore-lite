import * as React from "react";
import { cn } from "@/lib/utils";

const colors: Record<string, string> = {
  default: "bg-white/[0.06] text-muted border-white/10",
  primary: "bg-glow-primary/15 text-blue-300 border-glow-primary/30",
  accent: "bg-accent/15 text-purple-300 border-accent/30",
  success: "bg-success/15 text-green-300 border-success/30",
  warning: "bg-warning/15 text-amber-300 border-warning/30",
  danger: "bg-danger/15 text-red-300 border-danger/30",
};

export function Badge({
  className,
  color = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { color?: keyof typeof colors }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium font-mono tracking-wide",
        colors[color],
        className
      )}
      {...props}
    />
  );
}
