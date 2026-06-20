"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { GlassPanel } from "@/components/shared/glass-panel";
import { mockAnnualProjection } from "@/lib/mock/data";

export function AnnualProjectionChart() {
  return (
    <GlassPanel className="p-6">
      <h3 className="font-display text-base font-semibold text-white">Annual cost projection</h3>
      <p className="mt-1 text-sm text-ink-muted">Projected yearly spend assuming steady growth</p>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockAnnualProjection} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="month" stroke="#94A3B8" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} fontSize={12} width={56} />
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
            <Bar dataKey="aws" name="AWS" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            <Bar dataKey="azure" name="Azure" fill="#2563EB" radius={[6, 6, 0, 0]} />
            <Bar dataKey="gcp" name="GCP" fill="#22C55E" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassPanel>
  );
}
