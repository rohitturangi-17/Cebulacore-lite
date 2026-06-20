"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { GlassPanel } from "@/components/shared/glass-panel";

const providers = [
  { name: "AWS", color: "#F59E0B", strength: "Broadest service catalog" },
  { name: "Azure", color: "#2563EB", strength: "Best enterprise identity integration" },
  { name: "GCP", color: "#22C55E", strength: "Strongest data & ML tooling" },
];

const rows = [
  { label: "Compute autoscaling", aws: true, azure: true, gcp: true },
  { label: "Managed Kubernetes", aws: true, azure: true, gcp: true },
  { label: "Serverless containers", aws: true, azure: true, gcp: true },
  { label: "Global edge network", aws: true, azure: true, gcp: false },
  { label: "Native AI/ML pipeline", aws: true, azure: true, gcp: true },
];

export function CloudComparison() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-glow-accent">
            Provider landscape
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            One workload, three providers
          </h2>
          <p className="mt-3 text-ink-muted">
            Cebula evaluates the same requirements against each provider&apos;s strengths.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <GlassPanel className="mt-14 overflow-x-auto p-2">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="px-5 py-4 text-left font-medium text-ink-muted">Capability</th>
                  {providers.map((p) => (
                    <th key={p.name} className="px-5 py-4 text-left">
                      <span className="font-display font-semibold text-white">{p.name}</span>
                      <p className="mt-0.5 text-xs font-normal text-ink-muted">{p.strength}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                    <td className="px-5 py-4 text-ink-muted">{row.label}</td>
                    {(["aws", "azure", "gcp"] as const).map((key) => (
                      <td key={key} className="px-5 py-4">
                        {row[key] ? (
                          <Check className="h-4 w-4 text-status-success" />
                        ) : (
                          <span className="text-ink-muted/40">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
