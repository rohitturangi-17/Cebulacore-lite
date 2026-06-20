"use client";

import { Gauge, ShieldCheck, Zap } from "lucide-react";
import { OptionCard } from "./option-card";
import { useWizardStore } from "@/store/ui-store";
import type { AvailabilityTier } from "@/lib/types";

const options: { value: AvailabilityTier; label: string; description: string; icon: typeof Gauge }[] = [
  {
    value: "standard",
    label: "Standard",
    description: "Occasional downtime is acceptable (~99.5% uptime)",
    icon: Gauge,
  },
  {
    value: "high",
    label: "High availability",
    description: "Minimal downtime, multi-AZ resilience (~99.9% uptime)",
    icon: ShieldCheck,
  },
  {
    value: "mission-critical",
    label: "Mission-critical",
    description: "Near-zero downtime tolerance (~99.99%+ uptime)",
    icon: Zap,
  },
];

export function StepAvailability() {
  const { data, updateData } = useWizardStore();

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-white">What&apos;s your availability requirement?</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Higher availability tiers add redundancy — and cost — to the architecture.
      </p>

      <div className="mt-6 space-y-3">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            icon={opt.icon}
            title={opt.label}
            description={opt.description}
            selected={data.availability === opt.value}
            onClick={() => updateData({ availability: opt.value })}
          />
        ))}
      </div>
    </div>
  );
}
