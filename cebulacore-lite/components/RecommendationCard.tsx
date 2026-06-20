"use client";
import { motion } from "framer-motion";
import { Cloud, Sparkles } from "lucide-react";
import { ProviderPlan } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const providerStyles: Record<string, { ring: string; chip: string }> = {
  AWS: { ring: "ring-warning/40", chip: "warning" },
  Azure: { ring: "ring-glow-primary/40", chip: "primary" },
  GCP: { ring: "ring-success/40", chip: "success" },
};

export function RecommendationCard({
  plan,
  isWinner,
}: {
  plan: ProviderPlan;
  isWinner?: boolean;
}) {
  const style = providerStyles[plan.provider];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "glass relative rounded-xl2 p-6",
        isWinner && `ring-2 ${style.ring} shadow-glow`
      )}
    >
      {isWinner && (
        <div className="absolute -top-3 right-6 flex items-center gap-1 rounded-full bg-gradient-to-r from-glow-primary to-accent px-3 py-1 text-xs font-medium shadow-glow-sm">
          <Sparkles className="h-3 w-3" /> Recommended
        </div>
      )}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-muted" />
          <h3 className="font-display text-lg font-medium">{plan.provider}</h3>
        </div>
        <Badge color={style.chip as any}>{plan.fitScore}/100 fit</Badge>
      </div>
      <p className="font-mono text-3xl font-semibold text-gradient">{formatCurrency(plan.monthlyCost)}</p>
      <p className="mb-4 text-xs text-muted">estimated / month</p>
      <ul className="space-y-2.5">
        {plan.services.map((s) => (
          <li key={s.name} className="flex items-start gap-2 text-sm">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-glow-secondary" />
            <span>
              <span className="font-medium text-white">{s.name}</span>{" "}
              <span className="text-muted">— {s.purpose}</span>
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
