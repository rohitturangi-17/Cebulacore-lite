import { AppShell } from "@/components/layout/app-shell";
import { ProviderCostCard } from "@/components/cost/provider-cost-card";
import { MonthlyCostChart } from "@/components/cost/monthly-cost-chart";
import { AnnualProjectionChart } from "@/components/cost/annual-projection-chart";
import { mockCostComparison } from "@/lib/mock/data";

export default function CostComparisonPage() {
  const latest = mockCostComparison[mockCostComparison.length - 1];
  const lowest = Math.min(latest.aws, latest.azure, latest.gcp);

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Cost Comparison
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            See the same workload priced across AWS, Azure, and Google Cloud.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <ProviderCostCard provider="AWS" cost={latest.aws} color="#F59E0B" isLowest={latest.aws === lowest} />
          <ProviderCostCard provider="Azure" cost={latest.azure} color="#2563EB" isLowest={latest.azure === lowest} />
          <ProviderCostCard provider="GCP" cost={latest.gcp} color="#22C55E" isLowest={latest.gcp === lowest} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <MonthlyCostChart />
          <AnnualProjectionChart />
        </div>
      </div>
    </AppShell>
  );
}
