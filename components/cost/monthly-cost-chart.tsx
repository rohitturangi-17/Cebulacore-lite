"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { GlassPanel } from "@/components/shared/glass-panel";
import { mockCostComparison } from "@/lib/mock/data";

export function MonthlyCostChart() {
  return (
    <GlassPanel className="p-6">
      <h3 className="font-display text-base font-semibold text-white">Monthly cost comparison</h3>
      <p className="mt-1 text-sm text-ink-muted">Estimated spend per provider over the last 6 months</p>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockCostComparison}>
            <defs>
              <linearGradient id="awsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="azureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gcpGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="month" stroke="#94A3B8" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} fontSize={12} width={48} />
            <Tooltip
              contentStyle={{
                background: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                fontSize: 13,
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94A3B8" }} />
            <Area type="monotone" dataKey="aws" name="AWS" stroke="#F59E0B" fill="url(#awsGradient)" strokeWidth={2} />
            <Area type="monotone" dataKey="azure" name="Azure" stroke="#2563EB" fill="url(#azureGradient)" strokeWidth={2} />
            <Area type="monotone" dataKey="gcp" name="GCP" stroke="#22C55E" fill="url(#gcpGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassPanel>
  );
}
