import { Lightbulb } from "lucide-react";
import { GlassPanel } from "@/components/shared/glass-panel";
import { ScoreRing } from "./score-ring";
import { ServiceList } from "./service-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ArchitectureRecommendation } from "@/lib/types";

export function RecommendationDetail({ rec }: { rec: ArchitectureRecommendation }) {
  return (
    <div className="space-y-6">
      <GlassPanel className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs uppercase tracking-wide text-glow-accent">
              {rec.businessType} architecture
            </span>
            <h1 className="mt-1 font-display text-2xl font-semibold text-white sm:text-3xl">
              {rec.title}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-ink-muted">{rec.summary}</p>
          </div>
          <div className="flex shrink-0 gap-6">
            <ScoreRing score={rec.recommendationScore} label="Recommendation score" />
            <ScoreRing score={rec.confidenceScore} label="Confidence score" />
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-glow-accent" />
          <h2 className="font-display text-base font-semibold text-white">AI reasoning summary</h2>
        </div>
        <ul className="mt-4 space-y-3">
          {rec.reasoning.map((point, i) => (
            <li key={i} className="flex gap-3 text-sm text-ink-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-glow-accent" />
              {point}
            </li>
          ))}
        </ul>
      </GlassPanel>

      <GlassPanel className="p-6 sm:p-8">
        <h2 className="font-display text-base font-semibold text-white">Recommended services</h2>
        <Tabs defaultValue="aws" className="mt-5">
          <TabsList>
            <TabsTrigger value="aws">AWS</TabsTrigger>
            <TabsTrigger value="azure">Azure</TabsTrigger>
            <TabsTrigger value="gcp">GCP</TabsTrigger>
          </TabsList>
          <TabsContent value="aws">
            <ServiceList services={rec.services.aws} />
          </TabsContent>
          <TabsContent value="azure">
            <ServiceList services={rec.services.azure} />
          </TabsContent>
          <TabsContent value="gcp">
            <ServiceList services={rec.services.gcp} />
          </TabsContent>
        </Tabs>
      </GlassPanel>
    </div>
  );
}
