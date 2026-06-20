"use client";

import { motion } from "framer-motion";
import { Brain, GitCompare, Network, ShieldCheck } from "lucide-react";
import { GlowCard } from "@/components/shared/glow-card";

const features = [
  {
    icon: Brain,
    title: "AI-generated recommendations",
    description:
      "Describe your business and Cebula proposes a complete architecture, with the reasoning behind every service choice.",
  },
  {
    icon: GitCompare,
    title: "Side-by-side cloud comparison",
    description:
      "See the same workload priced and structured across AWS, Azure, and GCP before you commit to a provider.",
  },
  {
    icon: Network,
    title: "Visual architecture diagrams",
    description:
      "Every recommendation comes with a diagram you can explore, zoom into, and export for your own documentation.",
  },
  {
    icon: ShieldCheck,
    title: "Advisory-only, always",
    description:
      "CebulaCore Lite never connects to your cloud account. It reads requirements and returns recommendations — nothing more.",
  },
];

export function Features() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-glow-accent">
            What Cebula does
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            From requirements to architecture, in minutes
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <GlowCard>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cebula-gradient shadow-glow-sm">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {feature.description}
                  </p>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
