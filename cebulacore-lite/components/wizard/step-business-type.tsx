"use client";

import { ShoppingCart, Layers, HeartPulse, Landmark, Film, MoreHorizontal } from "lucide-react";
import { OptionCard } from "./option-card";
import { useWizardStore } from "@/store/ui-store";
import type { BusinessType } from "@/lib/types";

const options: { value: BusinessType; label: string; description: string; icon: typeof ShoppingCart }[] = [
  { value: "ecommerce", label: "E-commerce", description: "Online storefront or marketplace", icon: ShoppingCart },
  { value: "saas", label: "SaaS", description: "Multi-tenant software product", icon: Layers },
  { value: "healthcare", label: "Healthcare", description: "Patient or clinical data systems", icon: HeartPulse },
  { value: "fintech", label: "FinTech", description: "Payments or financial services", icon: Landmark },
  { value: "media", label: "Media", description: "Streaming or content platform", icon: Film },
  { value: "other", label: "Other", description: "Something else entirely", icon: MoreHorizontal },
];

export function StepBusinessType() {
  const { data, updateData } = useWizardStore();

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-white">What kind of business is this for?</h2>
      <p className="mt-1 text-sm text-ink-muted">This shapes which services Cebula prioritizes.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            icon={opt.icon}
            title={opt.label}
            description={opt.description}
            selected={data.businessType === opt.value}
            onClick={() => updateData({ businessType: opt.value })}
          />
        ))}
      </div>
    </div>
  );
}
