"use client";

import { OptionCard } from "./option-card";
import { useWizardStore } from "@/store/ui-store";
import type { BudgetRange } from "@/lib/types";

const options: { value: BudgetRange; label: string; description: string }[] = [
  { value: "under-1k", label: "Under $1,000 / mo", description: "Lean, cost-optimized setup" },
  { value: "1k-5k", label: "$1,000 – $5,000 / mo", description: "Balanced performance and cost" },
  { value: "5k-20k", label: "$5,000 – $20,000 / mo", description: "Scale-ready infrastructure" },
  { value: "20k-plus", label: "$20,000+ / mo", description: "Enterprise-grade, high-redundancy" },
];

export function StepBudget() {
  const { data, updateData } = useWizardStore();

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-white">What&apos;s your monthly budget range?</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Cebula tailors service tiers and redundancy to fit comfortably within this range.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            title={opt.label}
            description={opt.description}
            selected={data.budgetRange === opt.value}
            onClick={() => updateData({ budgetRange: opt.value })}
          />
        ))}
      </div>
    </div>
  );
}
