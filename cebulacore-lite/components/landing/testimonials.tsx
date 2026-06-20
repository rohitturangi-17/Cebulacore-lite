"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/shared/glass-panel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "We used it to sanity-check our architecture before a client pitch. The reasoning behind each service choice was genuinely useful to walk through with stakeholders.",
    name: "Priya Nair",
    role: "Solutions Architect",
  },
  {
    quote:
      "Comparing AWS and GCP pricing side by side for the same workload saved us a full day of manual spreadsheet work.",
    name: "Marcus Webb",
    role: "Engineering Lead",
  },
  {
    quote:
      "The architecture diagrams gave our non-technical founders something they could actually follow during planning.",
    name: "Sofia Lindqvist",
    role: "Startup Founder",
  },
];

export function Testimonials() {
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
            Early feedback
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            What early users are saying
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassPanel className="flex h-full flex-col p-6">
                <p className="flex-1 text-sm leading-relaxed text-ink-muted">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-ink-muted">{t.role}</p>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
