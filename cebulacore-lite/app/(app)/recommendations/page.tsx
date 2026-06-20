"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, GitBranch, RefreshCcw, ArrowRight } from "lucide-react";
import { AIOrb } from "@/components/AIOrb";
import { RecommendationCard } from "@/components/RecommendationCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";

export default function RecommendationsPage() {
  const router = useRouter();
  const { activeRecommendation, resetWizard } = useAppStore();

  if (!activeRecommendation) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <AIOrb size="lg" />
        <h1 className="font-display text-xl font-medium">No recommendation yet</h1>
        <p className="max-w-sm text-sm text-muted">
          Run the Requirement Wizard and Cebula will generate a scored architecture across AWS, Azure, and GCP.
        </p>
        <Link href="/wizard">
          <Button>
            Start the Wizard <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  const rec = activeRecommendation;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge color="accent" className="mb-2">{rec.businessType}</Badge>
          <h1 className="font-display text-2xl font-medium">{rec.title}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">{rec.summary}</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            resetWizard();
            router.push("/wizard");
          }}
        >
          <RefreshCcw className="h-4 w-4" /> Run again
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ScoreCard label="Recommendation Score" value={rec.recommendationScore} />
        <ScoreCard label="Confidence Score" value={rec.confidenceScore} accent />
      </div>

      <div className="glass rounded-xl2 p-6">
        <div className="mb-4 flex items-center gap-2">
          <AIOrb size="sm" />
          <h2 className="font-display text-lg font-medium">AI Reasoning Summary</h2>
        </div>
        <ol className="space-y-3">
          {rec.reasoning.map((r, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-white/90">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-glow-secondary/20 font-mono text-[10px] text-glow-secondary">
                {i + 1}
              </span>
              {r}
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="mb-4 font-display text-lg font-medium">Provider Comparison</h2>
        <div className="grid gap-5 lg:grid-cols-3">
          {[...rec.plans]
            .sort((a, b) => b.fitScore - a.fitScore)
            .map((plan) => (
              <RecommendationCard key={plan.provider} plan={plan} isWinner={plan.provider === rec.recommendedProvider} />
            ))}
        </div>
      </div>

      <div className="glass flex flex-col items-start justify-between gap-4 rounded-xl2 p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <GitBranch className="h-5 w-5 text-glow-secondary" />
          <div>
            <p className="font-medium">See the architecture, visually</p>
            <p className="text-sm text-muted">Open the blueprint for {rec.businessType} on the Architecture Viewer.</p>
          </div>
        </div>
        <Link href="/architecture">
          <Button variant="secondary">
            Open Architecture Viewer <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function ScoreCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="glass rounded-xl2 p-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-muted">{label}</p>
        <Sparkles className={accent ? "h-4 w-4 text-accent" : "h-4 w-4 text-glow-primary"} />
      </div>
      <div className="flex items-end gap-3">
        <p className="font-mono text-3xl font-semibold text-gradient">{value}</p>
        <p className="pb-1 text-sm text-muted">/ 100</p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-glow-primary via-glow-secondary to-accent"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
