import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-muted/60 outline-none transition-colors focus:border-glow-secondary/60 focus:bg-white/[0.05]",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
