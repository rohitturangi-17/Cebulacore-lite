import { Lightbulb, DollarSign, Network, Bot, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockRecentActivity } from "@/data/mock";
import Link from "next/link";
import { cn } from "@/lib/utils";

const typeConfig = {
  recommendation: { icon: Lightbulb, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  cost: { icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  architecture: { icon: Network, color: "text-purple-500", bg: "bg-purple-500/10" },
  chat: { icon: Bot, color: "text-amber-500", bg: "bg-amber-500/10" },
};

const providerColor = {
  AWS: "warning",
  Azure: "default",
  GCP: "success",
  "Multi-cloud": "secondary",
} as const;

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)]">
      <div className="flex items-center justify-between p-6 pb-4">
        <h2 className="font-semibold text-[var(--foreground)]">Recent Activity</h2>
        <Link href="/recommendations" className="text-xs text-indigo-500 hover:text-indigo-600 flex items-center gap-1 font-medium">
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {mockRecentActivity.map((item) => {
          const config = typeConfig[item.type as keyof typeof typeConfig] || typeConfig.recommendation;
          const pColor = providerColor[item.provider as keyof typeof providerColor] || "secondary";
          return (
            <div key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[var(--muted)]/50 transition-colors cursor-pointer">
              <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0", config.bg)}>
                <config.icon className={cn("h-4 w-4", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--foreground)] truncate">{item.title}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{item.time}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant={pColor}>{item.provider}</Badge>
                {item.score && (
                  <span className="text-xs font-bold text-emerald-500">{item.score}%</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
