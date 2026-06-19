import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { CostChart } from "@/components/charts/cost-chart";
import { Lightbulb, DollarSign, Bookmark, Bot } from "lucide-react";
import { mockDashboardStats } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome banner */}
        <div className="p-6 rounded-2xl gradient-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-1">Good morning, Alex 👋</h2>
            <p className="text-indigo-100 text-sm">You have 3 pending recommendations to review. Your AI usage resets in 8 days.</p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Recommendations"
            value={mockDashboardStats.totalRecommendations}
            change={12}
            changeLabel="vs last month"
            icon={Lightbulb}
            iconColor="text-indigo-500"
            iconBg="bg-indigo-500/10"
          />
          <StatCard
            title="Est. Monthly Cost"
            value={formatCurrency(mockDashboardStats.estimatedMonthlyCost)}
            change={-8}
            changeLabel="vs last month"
            icon={DollarSign}
            iconColor="text-emerald-500"
            iconBg="bg-emerald-500/10"
          />
          <StatCard
            title="Saved Architectures"
            value={mockDashboardStats.savedArchitectures}
            change={3}
            changeLabel="this month"
            icon={Bookmark}
            iconColor="text-purple-500"
            iconBg="bg-purple-500/10"
          />
          <StatCard
            title="AI Usage"
            value={`${mockDashboardStats.aiUsagePercent}%`}
            change={-5}
            changeLabel="vs last month"
            icon={Bot}
            iconColor="text-amber-500"
            iconBg="bg-amber-500/10"
          />
        </div>

        {/* Chart */}
        <CostChart />

        {/* Bottom grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
