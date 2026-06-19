"use client";

import Link from "next/link";
import { Cloud, Zap, BarChart3, Shield, Bot, Network, ArrowRight, CheckCircle2, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const features = [
  { icon: Bot, title: "AI-Powered Analysis", description: "Claude-backed intelligence converts your business requirements into precise cloud architecture blueprints.", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { icon: BarChart3, title: "Multi-Cloud Cost Comparison", description: "Side-by-side cost analysis across AWS, Azure, and GCP to find the most cost-effective solution.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: Network, title: "Architecture Visualization", description: "Generate interactive architecture diagrams you can explore, zoom, and export to share with your team.", color: "text-purple-500", bg: "bg-purple-500/10" },
  { icon: Shield, title: "Advisory-Only, Zero Risk", description: "CebulaCore never accesses or modifies your cloud resources. Pure intelligence, zero exposure.", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: Zap, title: "Instant Recommendations", description: "Get actionable architecture recommendations in minutes, not days. Skip the lengthy RFP process.", color: "text-rose-500", bg: "bg-rose-500/10" },
  { icon: Cloud, title: "Multi-Provider Support", description: "Covers AWS, Azure, GCP, and hybrid architectures with up-to-date service catalogs.", color: "text-cyan-500", bg: "bg-cyan-500/10" },
];

const providers = [
  { name: "AWS", color: "text-amber-500", bg: "bg-amber-500/10", strengths: ["Largest service catalog", "Best-in-class ML/AI", "Global edge network"], rating: 4.8 },
  { name: "Azure", color: "text-blue-500", bg: "bg-blue-500/10", strengths: ["Microsoft 365 integration", "Hybrid cloud leader", "Enterprise compliance"], rating: 4.6 },
  { name: "GCP", color: "text-emerald-500", bg: "bg-emerald-500/10", strengths: ["Best data & analytics", "Kubernetes pioneer", "Competitive pricing"], rating: 4.5 },
];

export default function LandingPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-[var(--border)]/50 bg-[var(--background)]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
              <Cloud className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-[var(--foreground)]">CebulaCore <span className="text-indigo-500">Lite</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-[var(--muted-foreground)]">
            <a href="#features" className="hover:text-[var(--foreground)] transition-colors">Features</a>
            <a href="#providers" className="hover:text-[var(--foreground)] transition-colors">Providers</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)]">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link href="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link href="/register"><Button size="sm">Get Started</Button></Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <Badge className="mb-6 inline-flex">
            <Zap className="h-3 w-3 mr-1" /> AI-Powered Cloud Intelligence
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[var(--foreground)] leading-none mb-6">
            Cloud architecture,<br />
            <span className="gradient-text">decided by AI</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-10 leading-relaxed">
            CebulaCore Lite translates your business requirements into battle-tested cloud architectures. Compare AWS, Azure, and GCP instantly, intelligently, and at zero risk to your infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="gap-2">Start for free <ArrowRight className="h-4 w-4" /></Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg">View demo dashboard</Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-[var(--muted-foreground)]">
            {["No credit card required", "Advisory-only", "Free forever tier"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">Everything you need to choose right</h2>
            <p className="text-[var(--muted-foreground)] mt-4 max-w-xl mx-auto">Built for architects, engineers, and technical leaders who need clarity before committing to cloud spend.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                <div className={`h-11 w-11 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                  <f.icon className={`h-5 w-5 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="providers" className="py-24 px-6 bg-[var(--muted)]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Cloud Providers</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">We support all major clouds</h2>
            <p className="text-[var(--muted-foreground)] mt-4">Unbiased, data-driven comparison across the big three cloud platforms.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {providers.map((p) => (
              <div key={p.name} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:shadow-lg transition-all">
                <div className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl ${p.bg} mb-4`}>
                  <span className={`text-xl font-black ${p.color}`}>{p.name}</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(p.rating) ? "text-amber-400 fill-amber-400" : "text-[var(--border)]"}`} />
                  ))}
                  <span className="text-xs text-[var(--muted-foreground)] ml-1">{p.rating}</span>
                </div>
                <ul className="space-y-2">
                  {p.strengths.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-3xl gradient-bg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to architect smarter?</h2>
              <p className="text-indigo-100 mb-8 text-lg">Join 2,400+ engineers using CebulaCore Lite to make confident cloud decisions.</p>
              <Link href="/register">
                <Button size="lg" variant="secondary" className="gap-2 text-indigo-700 font-semibold">
                  Create your free account <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg gradient-bg flex items-center justify-center">
              <Cloud className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-bold text-sm text-[var(--foreground)]">CebulaCore Lite</span>
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">© 2024 CebulaCore Lite — Advisory use only.</p>
          <div className="flex gap-6 text-xs text-[var(--muted-foreground)]">
            <a href="#" className="hover:text-[var(--foreground)]">Privacy</a>
            <a href="#" className="hover:text-[var(--foreground)]">Terms</a>
            <a href="#" className="hover:text-[var(--foreground)]">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
