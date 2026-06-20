import type { LucideIcon } from "lucide-react";
import { GlassPanel } from "@/components/shared/glass-panel";
import { AnimatedCounter } from "@/components/shared/animated-counter";

interface StatWidgetProps {
  icon: LucideIcon;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  accent?: string;
}

export function StatWidget({ icon: Icon, label, value, prefix = "", suffix = "", accent = "#7C3AED" }: StatWidgetProps) {
  return (
    <GlassPanel className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-muted">{label}</p>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accent}22` }}
        >
          <Icon className="h-4.5 w-4.5" style={{ color: accent }} />
        </div>
      </div>
      <p className="mt-3 font-display text-2xl font-semibold text-white">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </p>
    </GlassPanel>
  );
}
