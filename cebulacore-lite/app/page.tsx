"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, PlayCircle, Sparkles } from "lucide-react";
import { AIOrb } from "@/components/AIOrb";
import { FloatingRibbon } from "@/components/FloatingRibbon";
import { GlowCard } from "@/components/GlowCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { features, aiWorkflowSteps, testimonials } from "@/lib/mock-data";

const cloudHighlights = [
  {
    provider: "AWS",
    color: "#F59E0B",
    points: ["Broadest managed-service catalog", "Deepest enterprise integrations", "Best fit for complex, regulated workloads"],
  },
  {
    provider: "Azure",
    color: "#2563EB",
    points: ["Native Microsoft 365 / AD integration", "Strong hybrid & on-prem connectivity", "Preferred by enterprise IT teams"],
  },
  {
    provider: "GCP",
    color: "#22C55E",
    points: ["Best price-performance for compute", "Leading data & ML tooling", "Simplest container-first workflows"],
  },
];

export default function LandingPage() {
  return (
    <div className="relative overflow-x-hidden">
      <MarketingNav />
      <Hero />
      <Features />
      <CloudComparison />
      <AIWorkflow />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}

function MarketingNav() {
  return (
    <nav className="glass sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/[0.08] px-6 lg:px-10">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-glow-primary to-accent shadow-glow-sm">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="font-display text-base font-semibold tracking-tight">CebulaCore Lite</span>
      </div>
      <div className="hidden items-center gap-8 text-sm text-muted md:flex">
        <a href="#features" className="transition-colors hover:text-white">Features</a>
        <a href="#comparison" className="transition-colors hover:text-white">Cloud Comparison</a>
        <a href="#workflow" className="transition-colors hover:text-white">How it works</a>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/login" className="hidden text-sm font-medium text-muted hover:text-white sm:block">
          Log in
        </Link>
        <Link href="/register">
          <Button size="sm">Start Building</Button>
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-10 text-center">
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent)]" />
      <FloatingRibbon className="absolute inset-0 opacity-70" />

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <AIOrb size="xl" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl"
      >
        Hey, I&apos;m{" "}
        <span className="text-gradient">Cebula</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="relative mt-4 max-w-xl text-lg text-muted"
      >
        I help you design cloud architectures powered by AI — across AWS, Azure, and GCP.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row"
      >
        <Link href="/register">
          <Button size="lg">
            Start Building <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <a href="#workflow">
          <Button size="lg" variant="secondary">
            <PlayCircle className="h-4 w-4" /> Watch Demo
          </Button>
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative mt-6 text-xs font-mono uppercase tracking-wider text-muted/70"
      >
        Advisory-only · never touches your cloud resources
      </motion.p>

      <div className="relative mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {[
          { value: 3, suffix: "", label: "Cloud providers" },
          { value: 1200, suffix: "+", label: "Recommendations generated" },
          { value: 96, suffix: "%", label: "Avg. confidence score" },
          { value: 28, suffix: "%", label: "Avg. cost reduction" },
        ].map((s) => (
          <div key={s.label}>
            <p className="font-mono text-2xl font-semibold text-white sm:text-3xl">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-xl">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-glow-secondary/80">Capabilities</p>
          <h2 className="font-display text-3xl font-medium sm:text-4xl">
            Built to answer the question your team keeps debating
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((f) => (
            <GlowCard key={f.title}>
              <h3 className="font-display text-lg font-medium">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.description}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function CloudComparison() {
  return (
    <section id="comparison" className="relative px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-xl">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-glow-secondary/80">Cloud Comparison</p>
          <h2 className="font-display text-3xl font-medium sm:text-4xl">Three providers, one honest comparison</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {cloudHighlights.map((c) => (
            <div key={c.provider} className="glass rounded-xl2 p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                <h3 className="font-display text-lg font-medium">{c.provider}</h3>
              </div>
              <ul className="space-y-3">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: c.color }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIWorkflow() {
  return (
    <section id="workflow" className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-xl">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-glow-secondary/80">How it works</p>
          <h2 className="font-display text-3xl font-medium sm:text-4xl">From requirements to recommendation, in four steps</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aiWorkflowSteps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="glass rounded-xl2 p-6">
                <span className="font-mono text-xs text-glow-secondary/80">0{i + 1}</span>
                <h3 className="mt-2 font-display text-base font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.detail}</p>
              </div>
              {i < aiWorkflowSteps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-glow-secondary/60 to-transparent lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-xl">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-glow-secondary/80">Customers</p>
          <h2 className="font-display text-3xl font-medium sm:text-4xl">Teams use Cebula to settle the debate</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="glass rounded-xl2 p-6">
              <p className="text-sm leading-relaxed text-white/90">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="px-6 py-24 lg:px-10">
      <div className="glass-strong relative mx-auto max-w-5xl overflow-hidden rounded-xl2 p-12 text-center">
        <FloatingRibbon className="absolute inset-0 opacity-30" />
        <div className="relative">
          <AIOrb size="md" className="mx-auto" />
          <h2 className="mt-6 font-display text-3xl font-medium sm:text-4xl">Ready to settle your architecture debate?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Answer five questions and get a scored recommendation across AWS, Azure, and GCP — advisory-only, always.
          </p>
          <Link href="/register" className="mt-8 inline-block">
            <Button size="lg">
              Start Building <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.08] px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-glow-primary to-accent">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-display text-sm font-medium">CebulaCore Lite</span>
        </div>
        <p className="text-center text-xs text-muted">
          Advisory-only platform. CebulaCore never accesses, modifies, deploys, or manages your cloud resources.
        </p>
        <p className="text-xs text-muted">© {new Date().getFullYear()} CebulaCore</p>
      </div>
    </footer>
  );
}
