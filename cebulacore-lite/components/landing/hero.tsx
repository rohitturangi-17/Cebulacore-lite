"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIOrb } from "@/components/shared/ai-orb";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cebula-radial blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <AIOrb size="xl" state="idle" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 mt-10 font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl"
      >
        Hey, I&apos;m <span className="text-gradient">Cebula</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="relative z-10 mt-4 max-w-xl text-lg text-ink-muted"
      >
        I help you design cloud architectures powered by AI.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <Button asChild size="lg" variant="primary">
          <Link href="/auth/register">Start Building</Link>
        </Button>
        <Button size="lg" variant="secondary">
          <Play className="h-4 w-4" />
          Watch Demo
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative z-10 mt-8 text-xs uppercase tracking-[0.2em] text-ink-muted/60"
      >
        Advisory-only · Never touches your live cloud resources
      </motion.p>
    </section>
  );
}
