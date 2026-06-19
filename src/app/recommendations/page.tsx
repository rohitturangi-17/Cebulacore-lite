import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockRecommendation } from "@/data/mock";
import { Download, Bookmark, ExternalLink, Award, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const tierColor = {
  primary: "bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400",
  secondary: "bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400",
  support: "bg-slate-500/10 border-slate-500/30 text-[var(--muted-foreground)]",
};

function ServiceCard({ name, purpose, cost, tier }: { name: string; purpose: string; cost: string; tier: string }) {
  return (
    <div className={cn("p-3.5 rounded-xl border flex items-start gap-3", tierColor[tier as keyof typeof tierColor])}>
      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs opacity-80 mt-0.5">{purpose}</p>
      </div>
      <span className="text-xs font-bold flex-shrink-0">{cost}</span>
    </div>
  );
}

export default function RecommendationsPage() {
  const rec = mockRecommendation;

  return (
    <DashboardLayout title="Recommendations">
      <div className="space-y-6">
        {/* Header card */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="success">Recommended</Badge>
                <Badge variant="warning">{rec.provider}</Badge>
              </div>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">{rec.title}</h1>
              <p className="text-sm text-[var(--muted-foreground)] mt-2 max-w-xl">{rec.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-[var(--muted-foreground)]">
                <span className="font-medium text-[var(--foreground)]">Pattern: {rec.architecture}</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-indigo-500/10 border border-emerald-500/20 min-w-[120px]">
              <Award className="h-6 w-6 text-emerald-500" />
              <div className="text-3xl font-extrabold text-emerald-500">{rec.score}</div>
              <p className="text-xs text-[var(--muted-foreground)] text-center">Recommendation Score</p>
            </div>
          </div>
          <div className="flex gap-3 mt-5 pt-5 border-t border-[var(--border)]">
            <Button size="sm" variant="outline" className="gap-2">
              <Bookmark className="h-4 w-4" /> Save Architecture
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Export PDF
            </Button>
            <Button size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" /> View Architecture
            </Button>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* AWS */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <span className="text-xs font-black text-amber-500">AWS</span>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] text-sm">Amazon Web Services</h3>
                <p className="text-xs text-[var(--muted-foreground)]">Primary recommendation</p>
              </div>
            </div>
            <div className="space-y-2">
              {rec.awsServices.map((s) => <ServiceCard key={s.name} {...s} />)}
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">Estimated total</span>
                <span className="font-bold text-amber-500">~$620/mo</span>
              </div>
            </div>
          </div>

          {/* Azure */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <span className="text-xs font-black text-blue-500">AZ</span>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] text-sm">Microsoft Azure</h3>
                <p className="text-xs text-[var(--muted-foreground)]">Alternative option</p>
              </div>
            </div>
            <div className="space-y-2">
              {rec.azureServices.map((s) => <ServiceCard key={s.name} {...s} />)}
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">Estimated total</span>
                <span className="font-bold text-blue-500">~$720/mo</span>
              </div>
            </div>
          </div>

          {/* GCP */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <span className="text-xs font-black text-emerald-500">GCP</span>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] text-sm">Google Cloud</h3>
                <p className="text-xs text-[var(--muted-foreground)]">Cost-optimized option</p>
              </div>
            </div>
            <div className="space-y-2">
              {rec.gcpServices.map((s) => <ServiceCard key={s.name} {...s} />)}
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">Estimated total</span>
                <span className="font-bold text-emerald-500">~$580/mo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
