"use client";

import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { mockCostData } from "@/data/mock";
import { useState } from "react";
import { cn } from "@/lib/utils";

const colors = {
  aws: "#f59e0b",
  azure: "#3b82f6",
  gcp: "#10b981",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 shadow-xl">
        <p className="text-xs font-semibold text-[var(--foreground)] mb-2">{label}</p>
        {payload.map((entry: { name: string; value: number; color: string }) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[var(--muted-foreground)] capitalize">{entry.name}:</span>
            <span className="font-semibold text-[var(--foreground)]">${entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function CostChart() {
  const [chartType, setChartType] = useState<"area" | "bar">("area");
  const data = mockCostData.monthly.filter(d => d.aws > 0);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-[var(--foreground)]">Monthly Cost Comparison</h3>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">Jan – Oct 2024</p>
        </div>
        <div className="flex gap-1 bg-[var(--muted)] rounded-lg p-1">
          {(["area", "bar"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all",
                chartType === type
                  ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        {chartType === "area" ? (
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <defs>
              {Object.entries(colors).map(([key, color]) => (
                <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
            {Object.entries(colors).map(([key, color]) => (
              <Area key={key} type="monotone" dataKey={key} stroke={color} strokeWidth={2} fill={`url(#gradient-${key})`} />
            ))}
          </AreaChart>
        ) : (
          <BarChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
            {Object.entries(colors).map(([key, color]) => (
              <Bar key={key} dataKey={key} fill={color} radius={[3, 3, 0, 0]} />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export function AnnualProjectionChart() {
  const annualData = [
    { provider: "AWS", monthly: 2840, annual: 34080, savings: 0 },
    { provider: "Azure", monthly: 3150, annual: 37800, savings: -3720 },
    { provider: "GCP", monthly: 2520, annual: 30240, savings: 3840 },
  ];

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-[var(--foreground)]">Annual Cost Projection</h3>
        <p className="text-xs text-[var(--muted-foreground)] mt-1">Estimated total for 12 months</p>
      </div>
      <div className="space-y-4">
        {annualData.map((d) => (
          <div key={d.provider}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-[var(--foreground)]">{d.provider}</span>
              <div className="flex items-center gap-3">
                {d.savings !== 0 && (
                  <span className={cn("text-xs font-medium", d.savings > 0 ? "text-emerald-500" : "text-red-500")}>
                    {d.savings > 0 ? "Save" : "Extra"} ${Math.abs(d.savings).toLocaleString()}/yr
                  </span>
                )}
                <span className="text-sm font-bold text-[var(--foreground)]">${(d.annual / 1000).toFixed(1)}k</span>
              </div>
            </div>
            <div className="h-2.5 bg-[var(--muted)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(d.annual / 40000) * 100}%`,
                  backgroundColor: d.provider === "AWS" ? colors.aws : d.provider === "Azure" ? colors.azure : colors.gcp
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
