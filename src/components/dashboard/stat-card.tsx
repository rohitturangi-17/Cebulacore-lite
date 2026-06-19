import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  iconColor?: string;
  iconBg?: string;
  suffix?: string;
}

export function StatCard({ title, value, change, changeLabel, icon: Icon, iconColor = "text-indigo-500", iconBg = "bg-indigo-500/10", suffix }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:shadow-lg hover:shadow-black/5 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--muted-foreground)] font-medium">{title}</p>
          <div className="flex items-baseline gap-1 mt-2">
            <p className="text-2xl font-bold text-[var(--foreground)]">{value}</p>
            {suffix && <span className="text-sm text-[var(--muted-foreground)]">{suffix}</span>}
          </div>
          {change !== undefined && (
            <div className={cn("flex items-center gap-1 mt-2 text-xs font-medium", isPositive ? "text-emerald-500" : "text-red-500")}>
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{isPositive ? "+" : ""}{change}%</span>
              {changeLabel && <span className="text-[var(--muted-foreground)] font-normal">{changeLabel}</span>}
            </div>
          )}
        </div>
        <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center", iconBg)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </div>
    </div>
  );
}
