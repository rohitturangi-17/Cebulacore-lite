"use client";

import { OptionCard } from "./option-card";
import { useWizardStore } from "@/store/ui-store";
import type { CloudProvider } from "@/lib/types";

const options: { value: CloudProvider | "no-preference"; label: string; description: string }[] = [
  { value: "aws", label: "AWS", description: "Broadest service catalog, mature ecosystem" },
  { value: "azure", label: "Azure", description: "Strong enterprise & Microsoft integration" },
  { value: "gcp", label: "Google Cloud", description: "Best-in-class data and AI tooling" },
  { value: "no-preference", label: "No preference", description: "Let Cebula recommend the best fit" },
];

export function StepProvider() {
  const { data, updateData } = useWizardStore();

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-white">Any preferred cloud provider?</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Cebula will still show you a comparison across all three regardless of your choice.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            title={opt.label}
            description={opt.description}
            selected={data.preferredProvider === opt.value}
            onClick={() => updateData({ preferredProvider: opt.value })}
          />
        ))}
      </div>
    </div>
  );
}
