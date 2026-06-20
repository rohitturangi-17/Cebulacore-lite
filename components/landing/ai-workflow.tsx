"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/shared/glow-card";

const steps = [
  {
    step: "01",
    title: "Describe your requirements",
    description: "Answer a short wizard about your business type, scale, availability needs, and budget.",
  },
  {
    step: "02",
    title: "Cebula reasons through options",
    description: "The AI weighs tradeoffs across compute, storage, networking, and security for your case.",
  },
  {
    step: "03",
    title: "Review a scored recommendation",
    description: "Get a confidence-scored architecture with the reasoning spelled out, not just a service list.",
  },
  {
    step: "04",
    title: "Compare cost across clouds",
    description: "See the same architecture priced on AWS, Azure, and GCP side by side before deciding.",
  },
];

export function AIWorkflow() {
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
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            A guided path from idea to architecture
          </h2>
        </motion.div>

        <div className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlowCard glowColor="primary" className="h-full">
                <span className="font-mono text-xs text-glow-accent">{s.step}</span>
                <h3 className="mt-3 font-display text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.description}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
