"use client";
import { useMemo, useState } from "react";
import { Cloud } from "lucide-react";
import { CostChart } from "@/components/CostChart";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAppStore } from "@/lib/store";
import { generateCostSeries } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const fallbackBaseline = { AWS: 2840, Azure: 3010, GCP: 2705 };
const providerColors: Record<string, string> = { AWS: "#F59E0B", Azure: "#2563EB", GCP: "#22C55E" };

export default function CostComparisonPage() {
  const { activeRecommendation } = useAppStore();
  const [view, setView] = useState<"monthly" | "annual">("monthly");

  const baseline = useMemo(() => {
    if (!activeRecommendation) return fallbackBaseline;
    const byProvider: Record<string, number> = {};
    activeRecommendation.plans.forEach((p) => (byProvider[p.provider] = p.monthlyCost));
    return {
      AWS: byProvider.AWS ?? fallbackBaseline.AWS,
      Azure: byProvider.Azure ?? fallbackBaseline.Azure,
      GCP: byProvider.GCP ?? fallbackBaseline.GCP,
    };
  }, [activeRecommendation]);

  const monthly = useMemo(() => generateCostSeries(baseline), [baseline]);
  const annual = useMemo(() => {
    let aws = 0, azure = 0, gcp = 0;
    return monthly.map((m) => {
      aws += m.AWS; azure += m.Azure; gcp += m.GCP;
      return { month: m.month, AWS: aws, Azure: azure, GCP: gcp };
    });
  }, [monthly]);

  const annualTotal = annual[annual.length - 1];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium">Cost Comparison</h1>
        <p className="mt-1 text-sm text-muted">
          {activeRecommendation
            ? `Projected spend for your ${activeRecommendation.businessType} architecture.`
            : "Projected spend for a typical mid-traffic workload. Run the wizard for numbers tailored to you."}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {(["AWS", "Azure", "GCP"] as const).map((p) => (
          <div key={p} className="glass rounded-xl2 p-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4" style={{ color: providerColors[p] }} />
                <h3 className="font-display font-medium">{p}</h3>
              </div>
              {activeRecommendation?.recommendedProvider === p && <Badge color="accent">Recommended</Badge>}
            </div>
            <p className="font-mono text-2xl font-semibold">{formatCurrency(baseline[p])}</p>
            <p className="text-xs text-muted">per month, current estimate</p>
            <div className="mt-3 border-t border-white/[0.06] pt-3">
              <p className="font-mono text-sm text-muted">{formatCurrency(annualTotal[p])} / yr projected</p>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl2 p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-lg font-medium">
            {view === "monthly" ? "Monthly Cost Comparison" : "Annual Cost Projection"}
          </h2>
          <Tabs defaultValue="monthly" onValueChange={(v) => setView(v as "monthly" | "annual")}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">Annual</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CostChart data={view === "monthly" ? monthly : annual} />
      </div>
    </div>
  );
}
