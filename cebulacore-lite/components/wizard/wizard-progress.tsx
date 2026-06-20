import { cn } from "@/lib/utils";

const labels = ["Business", "Users", "Availability", "Budget", "Provider"];

export function WizardProgress({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {labels.map((label, i) => {
        const index = i + 1;
        const active = index === step;
        const complete = index < step;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors",
                  complete && "bg-cebula-gradient text-white",
                  active && !complete && "border-2 border-glow-accent text-white",
                  !active && !complete && "border border-white/15 text-ink-muted"
                )}
              >
                {index}
              </div>
              <span className={cn("hidden text-[11px] sm:block", active ? "text-white" : "text-ink-muted/70")}>
                {label}
              </span>
            </div>
            {index < labels.length && (
              <div className={cn("h-px w-6 sm:w-10", complete ? "bg-glow-accent" : "bg-white/10")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
