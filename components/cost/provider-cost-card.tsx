import { GlassPanel } from "@/components/shared/glass-panel";
import { cn } from "@/lib/utils";

interface ProviderCostCardProps {
  provider: "AWS" | "Azure" | "GCP";
  cost: number;
  color: string;
  isLowest?: boolean;
}

export function ProviderCostCard({ provider, cost, color, isLowest }: ProviderCostCardProps) {
  return (
    <GlassPanel className={cn("p-5", isLowest && "border-status-success/40")}>
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-semibold text-white">{provider}</span>
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      </div>
      <p className="mt-3 font-display text-2xl font-semibold text-white">
        ${cost.toLocaleString()}
        <span className="text-sm font-normal text-ink-muted">/mo</span>
      </p>
      {isLowest && (
        <span className="mt-2 inline-block rounded-full bg-status-success/15 px-2.5 py-0.5 text-[11px] font-medium text-status-success">
          Lowest cost
        </span>
      )}
    </GlassPanel>
  );
}
