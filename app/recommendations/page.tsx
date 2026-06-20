"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { RecommendationCard } from "@/components/recommendations/recommendation-card";
import { RecommendationDetail } from "@/components/recommendations/recommendation-detail";
import { mockRecommendations, getRecommendationById } from "@/lib/mock/recommendations";

function RecommendationsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const selected = id ? getRecommendationById(id) : undefined;

  if (selected) {
    return (
      <div className="mx-auto max-w-4xl">
        <RecommendationDetail rec={selected} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          Recommendations
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Architectures Cebula has generated for your projects.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockRecommendations.map((rec) => (
          <RecommendationCard key={rec.id} rec={rec} />
        ))}
      </div>
    </div>
  );
}

export default function RecommendationsPage() {
  return (
    <AppShell>
      <Suspense>
        <RecommendationsContent />
      </Suspense>
    </AppShell>
  );
}
