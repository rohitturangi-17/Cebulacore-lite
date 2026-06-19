import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CostChart, AnnualProjectionChart } from "@/components/charts/cost-chart";
import { mockCostData } from "@/data/mock";
import { TrendingDown, TrendingUp, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const providerMeta = [
  { key: "aws" as const, name: "Amazon Web Services", short: "AWS", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  { key: "azure" as const, name: "Microsoft Azure", short: "AZR", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  { key: "gcp" as const, name: "Google Cloud Platform", short: "GCP", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
];

export default function CostComparisonPage() {
  const estimates = mockCostData.estimates;
  const lowestMonthly = Math.min(estimates.aws.monthly, estimates.azure.monthly, estimates.gcp.monthly);

  return (
    <DashboardLayout title="Cost Comparison">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Cloud Cost Comparison</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Estimated costs based on your last recommendation: E-commerce Platform.</p>
        </div>

        {/* Cost cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {providerMeta.map((p) => {
            const est = estimates[p.key];
            const isLowest = est.monthly === lowestMonthly;
            return (
              <div key={p.key} className={cn("rounded-2xl border p-6 bg-[var(--card)] relative", p.border, isLowest && "ring-2 ring-emerald-500/30")}>
                {isLowest && (
                  <div className="absolute -top-2.5 left-4">
                    <span className="text-xs bg-emerald-500 text-white font-semibold px-2.5 py-1 rounded-full">Best Value</span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center text-sm font-black", p.bg, p.color)}>
                    {p.short}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-[var(--foreground)]">{formatCurrency(est.monthly)}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">per month</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-[var(--foreground)] mb-4">{p.name}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">Annual estimate</span>
                    <span className="font-semibold text-[var(--foreground)]">{formatCurrency(est.annual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">Setup costs</span>
                    <span className="font-semibold text-[var(--foreground)]">{formatCurrency(est.setup)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[var(--border)]">
                    <span className="text-[var(--muted-foreground)]">vs. AWS baseline</span>
                    <span className={cn("font-bold flex items-center gap-1", est.monthly <= estimates.aws.monthly ? "text-emerald-500" : "text-red-500")}>
                      {est.monthly <= estimates.aws.monthly ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                      {Math.abs(Math.round(((est.monthly - estimates.aws.monthly) / estimates.aws.monthly) * 100))}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Savings callout */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
            <DollarSign className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <p className="font-semibold text-emerald-600 dark:text-emerald-400">GCP saves you ~$3,840/year compared to Azure</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Based on current estimates. Actual savings depend on usage, reserved instances, and committed use discounts.</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <CostChart />
          <AnnualProjectionChart />
        </div>
      </div>
    </DashboardLayout>
  );
}
