import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlowCard } from "@/components/shared/glow-card";
import type { ArchitectureRecommendation } from "@/lib/types";

export function RecommendationCard({ rec }: { rec: ArchitectureRecommendation }) {
  return (
    <Link href={`/recommendations?id=${rec.id}`}>
      <GlowCard className="h-full">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-wide text-ink-muted">
              {rec.businessType}
            </span>
            <h3 className="mt-1 font-display text-base font-semibold text-white">{rec.title}</h3>
          </div>
          <span className="shrink-0 rounded-full bg-cebula-gradient px-2.5 py-1 text-xs font-medium text-white">
            {rec.recommendationScore}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-ink-muted">{rec.summary}</p>
        <div className="mt-4 flex items-center gap-1 text-xs font-medium text-glow-accent">
          View details <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </GlowCard>
    </Link>
  );
}
