import { AppShell } from "@/components/layout/app-shell";
import { WizardShell } from "@/components/wizard/wizard-shell";

export default function WizardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl pb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-glow-accent">
          Requirement wizard
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
          Tell Cebula about your project
        </h1>
      </div>
      <WizardShell />
    </AppShell>
  );
}
