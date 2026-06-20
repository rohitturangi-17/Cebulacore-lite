"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AIOrb } from "@/components/shared/ai-orb";

export function CTASection() {
  return (
    <section className="relative px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel relative mx-auto max-w-4xl overflow-hidden rounded-xl2 px-8 py-16 text-center"
      >
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cebula-radial blur-3xl" />
        <div className="relative z-10 flex flex-col items-center">
          <AIOrb size="sm" />
          <h2 className="mt-6 font-display text-3xl font-semibold text-white sm:text-4xl">
            Ready to see your architecture?
          </h2>
          <p className="mt-3 max-w-md text-ink-muted">
            Answer five quick questions and Cebula will draft a recommendation in minutes.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/auth/register">Start Building</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
