"use client";

import { useWizardStore } from "@/store/ui-store";

const presets = [
  { value: 1000, label: "1K" },
  { value: 10000, label: "10K" },
  { value: 100000, label: "100K" },
  { value: 1000000, label: "1M+" },
];

export function StepExpectedUsers() {
  const { data, updateData } = useWizardStore();
  const users = data.expectedUsers ?? 10000;

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-white">How many users do you expect?</h2>
      <p className="mt-1 text-sm text-ink-muted">
        A rough estimate of monthly active users is fine — this informs compute and database sizing.
      </p>

      <div className="mt-8">
        <p className="font-display text-3xl font-semibold text-gradient">
          {users.toLocaleString()} <span className="text-base text-ink-muted">users / month</span>
        </p>

        <input
          type="range"
          min={100}
          max={2000000}
          step={100}
          value={users}
          onChange={(e) => updateData({ expectedUsers: Number(e.target.value) })}
          className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/[0.08] accent-glow-accent"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => updateData({ expectedUsers: p.value })}
              className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-ink-muted transition-colors hover:border-glow-accent/50 hover:text-white"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
