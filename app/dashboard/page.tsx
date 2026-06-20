import { Sparkles, DollarSign, Bookmark, Brain } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { StatWidget } from "@/components/dashboard/stat-widget";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { mockDashboardStats } from "@/lib/mock/data";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <div>
          <p className="text-sm text-ink-muted">Good morning</p>
          <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Welcome back, Alex
          </h1>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatWidget
            icon={Sparkles}
            label="Total recommendations"
            value={mockDashboardStats.totalRecommendations}
            accent="#A855F7"
          />
          <StatWidget
            icon={DollarSign}
            label="Estimated monthly cost"
            value={mockDashboardStats.estimatedMonthlyCost}
            prefix="$"
            accent="#22C55E"
          />
          <StatWidget
            icon={Bookmark}
            label="Saved architectures"
            value={mockDashboardStats.savedArchitectures}
            accent="#2563EB"
          />
          <StatWidget
            icon={Brain}
            label="AI usage"
            value={mockDashboardStats.aiUsagePercent}
            suffix="%"
            accent="#7C3AED"
          />
        </div>

        <div className="mt-10">
          <h2 className="font-display text-base font-semibold text-white">Quick actions</h2>
          <div className="mt-4">
            <QuickActions />
          </div>
        </div>

        <div className="mt-10">
          <RecentActivity />
        </div>
      </div>
    </AppShell>
  );
}
