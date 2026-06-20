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
import { CostMonthPoint } from "@/types";
import { formatCurrency } from "@/lib/utils";

const providerColors: Record<string, string> = {
  AWS: "#F59E0B",
  Azure: "#2563EB",
  GCP: "#22C55E",
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-lg p-3 text-xs">
      <p className="mb-1 font-mono text-muted">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-mono">
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
}

export function CostChart({ data }: { data: CostMonthPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          {(["AWS", "Azure", "GCP"] as const).map((p) => (
            <linearGradient id={`grad-${p}`} key={p} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={providerColors[p]} stopOpacity={0.45} />
              <stop offset="95%" stopColor={providerColors[p]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#94A3B8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `$${v / 1000}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#94A3B8" }} />
        {(["AWS", "Azure", "GCP"] as const).map((p) => (
          <Area
            key={p}
            type="monotone"
            dataKey={p}
            stroke={providerColors[p]}
            fill={`url(#grad-${p})`}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
