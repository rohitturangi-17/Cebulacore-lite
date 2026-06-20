import { Sparkles, BarChart3, Network, MessageCircle } from "lucide-react";
import { GlassPanel } from "@/components/shared/glass-panel";
import { mockActivity } from "@/lib/mock/data";
import type { ActivityItem } from "@/lib/types";

const iconMap: Record<ActivityItem["type"], typeof Sparkles> = {
  recommendation: Sparkles,
  cost: BarChart3,
  architecture: Network,
  chat: MessageCircle,
};

function timeAgo(timestamp: string) {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export function RecentActivity() {
  return (
    <GlassPanel className="p-6">
      <h3 className="font-display text-base font-semibold text-white">Recent activity</h3>
      <div className="mt-5 space-y-4">
        {mockActivity.map((item) => {
          const Icon = iconMap[item.type];
          return (
            <div key={item.id} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
                <Icon className="h-4 w-4 text-glow-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="truncate text-xs text-ink-muted">{item.description}</p>
              </div>
              <span className="shrink-0 text-xs text-ink-muted/70">{timeAgo(item.timestamp)}</span>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
