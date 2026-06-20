"use client";
import Link from "next/link";
import { Sparkles, DollarSign, FolderGit2, Bot, ArrowRight, Clock } from "lucide-react";
import { GlowCard } from "@/components/GlowCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { recentActivity, savedArchitectures } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 18) return "Good Afternoon";
  return "Good Evening";
}

const widgets = [
  { label: "Total Recommendations", value: 24, icon: Sparkles, glow: "primary" as const, suffix: "" },
  { label: "Estimated Monthly Cost", value: 3845, icon: DollarSign, glow: "accent" as const, prefix: "$" },
  { label: "Saved Architectures", value: savedArchitectures.length, icon: FolderGit2, glow: "success" as const, suffix: "" },
  { label: "AI Usage", value: 142, icon: Bot, glow: "warning" as const, suffix: " queries" },
];

const quickActions = [
  { label: "Create Recommendation", href: "/wizard", icon: Sparkles },
  { label: "Compare Cloud Services", href: "/cost-comparison", icon: DollarSign },
  { label: "Generate Architecture", href: "/architecture", icon: FolderGit2 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium sm:text-3xl">
          {greeting()}, <span className="text-gradient">Alex</span>
        </h1>
        <p className="mt-1 text-sm text-muted">Here&apos;s what&apos;s happening across your cloud recommendations.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {widgets.map((w) => {
          const Icon = w.icon;
          return (
            <GlowCard key={w.label} glow={w.glow}>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted">{w.label}</p>
                <Icon className="h-4 w-4 text-muted" />
              </div>
              <p className="mt-3 font-mono text-2xl font-semibold sm:text-3xl">
                <AnimatedCounter value={w.value} prefix={w.prefix} suffix={w.suffix} />
              </p>
            </GlowCard>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-xl2 p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-medium">Recent Activity</h2>
            <Clock className="h-4 w-4 text-muted" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((a) => (
              <div key={a.id} className="flex items-start gap-3 border-b border-white/[0.06] pb-4 last:border-0 last:pb-0">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-glow-secondary shadow-glow-sm" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{a.label}</p>
                  <p className="text-sm text-muted">{a.detail}</p>
                </div>
                <span className="whitespace-nowrap text-xs text-muted">{a.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl2 p-6">
          <h2 className="mb-4 font-display text-lg font-medium">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((q) => {
              const Icon = q.icon;
              return (
                <Link key={q.href} href={q.href}>
                  <Button variant="secondary" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" /> {q.label}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              );
            })}
          </div>

          <h3 className="mb-3 mt-6 font-display text-sm font-medium text-muted">Saved Architectures</h3>
          <div className="space-y-2">
            {savedArchitectures.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2.5 text-sm">
                <div>
                  <p className="font-medium">{a.name}</p>
                  <p className="text-xs text-muted">{a.provider} · {a.updatedAt}</p>
                </div>
                <span className="font-mono text-xs text-muted">{formatCurrency(a.monthlyCost)}/mo</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
