import { Zap, BarChart3, Network, ArrowRight } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    href: "/wizard",
    icon: Zap,
    label: "New Recommendation",
    description: "Start a new architecture recommendation",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    hoverBg: "hover:bg-indigo-500/20",
  },
  {
    href: "/cost-comparison",
    icon: BarChart3,
    label: "Compare Cloud Services",
    description: "Compare costs across AWS, Azure & GCP",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    hoverBg: "hover:bg-emerald-500/20",
  },
  {
    href: "/architecture",
    icon: Network,
    label: "Generate Architecture",
    description: "Visualize your cloud architecture",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    hoverBg: "hover:bg-purple-500/20",
  },
];

export function QuickActions() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)]">
      <div className="p-6 pb-4">
        <h2 className="font-semibold text-[var(--foreground)]">Quick Actions</h2>
        <p className="text-xs text-[var(--muted-foreground)] mt-1">Jump to common tasks</p>
      </div>
      <div className="p-6 pt-0 space-y-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] ${action.hoverBg} transition-all duration-150 group`}
          >
            <div className={`h-10 w-10 rounded-lg ${action.bg} flex items-center justify-center flex-shrink-0`}>
              <action.icon className={`h-5 w-5 ${action.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--foreground)]">{action.label}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5 truncate">{action.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-[var(--muted-foreground)] group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
