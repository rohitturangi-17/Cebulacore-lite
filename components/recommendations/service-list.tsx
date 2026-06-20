import type { ServiceItem } from "@/lib/types";

export function ServiceList({ services }: { services: ServiceItem[] }) {
  return (
    <ul className="space-y-3">
      {services.map((svc) => (
        <li
          key={svc.name}
          className="flex items-start justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium text-white">{svc.name}</p>
            <p className="mt-0.5 text-xs text-ink-muted">{svc.description}</p>
            <span className="mt-1.5 inline-block rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] uppercase tracking-wide text-ink-muted">
              {svc.category}
            </span>
          </div>
          <span className="shrink-0 font-mono text-sm text-glow-accent">
            ${svc.monthlyCostEstimate}/mo
          </span>
        </li>
      ))}
    </ul>
  );
}
