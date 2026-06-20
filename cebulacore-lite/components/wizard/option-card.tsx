"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ icon: Icon, title, description, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all duration-200",
        selected
          ? "border-glow-accent/70 bg-white/[0.06] shadow-glow-sm"
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
      )}
    >
      {Icon && (
        <Icon className={cn("h-5 w-5", selected ? "text-glow-accent" : "text-ink-muted")} />
      )}
      <span className="font-display text-sm font-semibold text-white">{title}</span>
      {description && <span className="text-xs text-ink-muted">{description}</span>}
    </button>
  );
}
