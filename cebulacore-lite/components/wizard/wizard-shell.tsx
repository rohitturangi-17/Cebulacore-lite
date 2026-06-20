"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/shared/glass-panel";
import { WizardProgress } from "./wizard-progress";
import { StepBusinessType } from "./step-business-type";
import { StepExpectedUsers } from "./step-expected-users";
import { StepAvailability } from "./step-availability";
import { StepBudget } from "./step-budget";
import { StepProvider } from "./step-provider";
import { useWizardStore } from "@/store/ui-store";
import { createRecommendation } from "@/lib/api";
import type { RequirementInput } from "@/lib/types";

const steps = [StepBusinessType, StepExpectedUsers, StepAvailability, StepBudget, StepProvider];

function isStepComplete(step: number, data: ReturnType<typeof useWizardStore.getState>["data"]) {
  switch (step) {
    case 1:
      return !!data.businessType;
    case 2:
      return !!data.expectedUsers;
    case 3:
      return !!data.availability;
    case 4:
      return !!data.budgetRange;
    case 5:
      return !!data.preferredProvider;
    default:
      return false;
  }
}

export function WizardShell() {
  const router = useRouter();
  const { step, data, setStep } = useWizardStore();
  const [submitting, setSubmitting] = useState(false);

  const StepComponent = steps[step - 1];
  const canAdvance = isStepComplete(step, data);

  async function handleNext() {
    if (step < 5) {
      setStep(step + 1);
      return;
    }
    setSubmitting(true);
    try {
      const rec = await createRecommendation(data as RequirementInput);
      router.push(`/recommendations?id=${rec.id}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <WizardProgress step={step} />

      <GlassPanel className="mt-8 p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between border-t border-white/[0.08] pt-6">
          <Button
            variant="ghost"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <Button onClick={handleNext} disabled={!canAdvance || submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating
              </>
            ) : step === 5 ? (
              <>
                <Sparkles className="h-4 w-4" />
                Generate recommendation
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </GlassPanel>
    </div>
  );
}
