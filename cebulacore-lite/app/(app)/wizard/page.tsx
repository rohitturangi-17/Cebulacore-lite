"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ShoppingCart,
  Layers,
  HeartPulse,
  Landmark,
  Clapperboard,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { AIOrb } from "@/components/AIOrb";
import { useAppStore } from "@/lib/store";
import { api } from "@/lib/api";
import { budgetLabels } from "@/lib/mock-data";
import { AvailabilityTier, BudgetRange, BusinessType, CloudProviderId } from "@/types";
import { cn } from "@/lib/utils";

const steps = ["Business Type", "Expected Users", "Availability", "Budget", "Cloud Provider"];

const businessTypes: { id: BusinessType; label: string; icon: React.ElementType }[] = [
  { id: "ecommerce", label: "E-commerce", icon: ShoppingCart },
  { id: "saas", label: "SaaS Platform", icon: Layers },
  { id: "healthcare", label: "Healthcare", icon: HeartPulse },
  { id: "fintech", label: "FinTech", icon: Landmark },
  { id: "media", label: "Media & Streaming", icon: Clapperboard },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

const availabilityTiers: { id: AvailabilityTier; label: string; detail: string }[] = [
  { id: "standard", label: "Standard", detail: "Single region is fine. Brief downtime is acceptable." },
  { id: "high", label: "High Availability", detail: "Multi-AZ. Downtime should be rare and short." },
  { id: "mission-critical", label: "Mission-Critical", detail: "Multi-region failover. Near-zero downtime tolerance." },
];

const providers: { id: CloudProviderId; label: string }[] = [
  { id: "aws", label: "AWS" },
  { id: "azure", label: "Azure" },
  { id: "gcp", label: "GCP" },
  { id: "no-preference", label: "No preference — recommend the best fit" },
];

export default function WizardPage() {
  const router = useRouter();
  const { wizardData, wizardStep, setWizardField, setWizardStep, setActiveRecommendation } = useAppStore();
  const [submitting, setSubmitting] = useState(false);

  const isLast = wizardStep === steps.length - 1;
  const canContinue = (() => {
    switch (wizardStep) {
      case 0: return !!wizardData.businessType;
      case 1: return wizardData.expectedUsers > 0;
      case 2: return !!wizardData.availability;
      case 3: return !!wizardData.budget;
      case 4: return !!wizardData.preferredProvider;
      default: return true;
    }
  })();

  async function handleNext() {
    if (!isLast) {
      setWizardStep(wizardStep + 1);
      return;
    }
    setSubmitting(true);
    try {
      const rec = await api.getRecommendation(wizardData);
      setActiveRecommendation(rec);
      router.push("/recommendations");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="font-display text-2xl font-medium">Requirement Wizard</h1>
        <p className="mt-1 text-sm text-muted">Five quick questions, one scored architecture recommendation.</p>
      </div>

      <div className="mb-8">
        <div className="mb-2 flex justify-between text-xs text-muted">
          <span>{steps[wizardStep]}</span>
          <span>{wizardStep + 1} / {steps.length}</span>
        </div>
        <Progress value={((wizardStep + 1) / steps.length) * 100} />
      </div>

      <div className="glass rounded-xl2 p-8">
        <AnimatePresence mode="wait">
          {submitting ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-4 py-12 text-center"
            >
              <AIOrb size="lg" />
              <p className="font-display text-lg">Cebula is reasoning over your requirements…</p>
              <p className="text-sm text-muted">Weighing availability, compliance, and budget against provider catalogs.</p>
            </motion.div>
          ) : (
            <motion.div
              key={wizardStep}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              {wizardStep === 0 && (
                <div>
                  <h2 className="mb-4 font-display text-lg font-medium">What kind of business is this for?</h2>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {businessTypes.map((b) => {
                      const Icon = b.icon;
                      const active = wizardData.businessType === b.id;
                      return (
                        <button
                          key={b.id}
                          onClick={() => setWizardField("businessType", b.id)}
                          className={cn(
                            "flex flex-col items-center gap-2 rounded-xl border p-5 text-sm transition-all",
                            active
                              ? "border-glow-secondary/60 bg-glow-secondary/10 shadow-glow-sm"
                              : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                          )}
                        >
                          <Icon className={cn("h-6 w-6", active ? "text-glow-secondary" : "text-muted")} />
                          {b.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-5">
                    <Textarea
                      placeholder="Optional — describe your business in a sentence or two."
                      value={wizardData.businessDescription}
                      onChange={(e) => setWizardField("businessDescription", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {wizardStep === 1 && (
                <div>
                  <h2 className="mb-4 font-display text-lg font-medium">How many users do you expect?</h2>
                  <p className="mb-2 font-mono text-3xl font-semibold text-gradient">
                    {wizardData.expectedUsers.toLocaleString()}
                  </p>
                  <input
                    type="range"
                    min={100}
                    max={500000}
                    step={100}
                    value={wizardData.expectedUsers}
                    onChange={(e) => setWizardField("expectedUsers", Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <div className="mb-6 flex justify-between text-xs text-muted">
                    <span>100</span>
                    <span>500,000+</span>
                  </div>
                  <h3 className="mb-3 text-sm font-medium text-muted">Expected growth</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {(["flat", "steady", "rapid"] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setWizardField("growthRate", g)}
                        className={cn(
                          "rounded-xl border px-4 py-3 text-sm capitalize transition-all",
                          wizardData.growthRate === g
                            ? "border-glow-secondary/60 bg-glow-secondary/10"
                            : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div>
                  <h2 className="mb-4 font-display text-lg font-medium">What availability do you need?</h2>
                  <div className="space-y-3">
                    {availabilityTiers.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setWizardField("availability", t.id)}
                        className={cn(
                          "block w-full rounded-xl border p-4 text-left transition-all",
                          wizardData.availability === t.id
                            ? "border-glow-secondary/60 bg-glow-secondary/10 shadow-glow-sm"
                            : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                        )}
                      >
                        <p className="font-medium">{t.label}</p>
                        <p className="mt-1 text-sm text-muted">{t.detail}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div>
                  <h2 className="mb-4 font-display text-lg font-medium">What&apos;s your monthly budget?</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(Object.entries(budgetLabels) as [BudgetRange, string][]).map(([id, label]) => (
                      <button
                        key={id}
                        onClick={() => setWizardField("budget", id)}
                        className={cn(
                          "rounded-xl border p-4 text-sm font-medium transition-all",
                          wizardData.budget === id
                            ? "border-glow-secondary/60 bg-glow-secondary/10 shadow-glow-sm"
                            : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {wizardStep === 4 && (
                <div>
                  <h2 className="mb-4 font-display text-lg font-medium">Preferred cloud provider?</h2>
                  <div className="space-y-3">
                    {providers.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setWizardField("preferredProvider", p.id)}
                        className={cn(
                          "block w-full rounded-xl border p-4 text-left text-sm font-medium transition-all",
                          wizardData.preferredProvider === p.id
                            ? "border-glow-secondary/60 bg-glow-secondary/10 shadow-glow-sm"
                            : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                        )}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!submitting && (
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setWizardStep(Math.max(0, wizardStep - 1))}
            disabled={wizardStep === 0}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button onClick={handleNext} disabled={!canContinue}>
            {isLast ? (
              <>
                <Sparkles className="h-4 w-4" /> Get Recommendation
              </>
            ) : (
              <>
                Continue <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
