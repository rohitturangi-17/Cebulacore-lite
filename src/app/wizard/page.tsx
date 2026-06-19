"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label, Select, Textarea } from "@/components/ui/form-elements";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ChevronRight, ChevronLeft, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, title: "Business Type", description: "Tell us about your business" },
  { id: 2, title: "Expected Users", description: "Scale and usage patterns" },
  { id: 3, title: "Availability", description: "Uptime requirements" },
  { id: 4, title: "Budget Range", description: "Monthly cloud spend" },
  { id: 5, title: "Cloud Provider", description: "Provider preferences" },
];

const businessTypes = [
  { value: "ecommerce", label: "E-commerce", icon: "🛒" },
  { value: "saas", label: "SaaS Platform", icon: "🚀" },
  { value: "fintech", label: "Fintech", icon: "💳" },
  { value: "healthcare", label: "Healthcare", icon: "🏥" },
  { value: "media", label: "Media & Streaming", icon: "🎬" },
  { value: "startup", label: "Early-stage Startup", icon: "💡" },
  { value: "enterprise", label: "Enterprise", icon: "🏢" },
  { value: "other", label: "Other", icon: "⚡" },
];

const availabilityOptions = [
  { value: "standard", label: "Standard (99.9% SLA)", desc: "Suitable for most workloads" },
  { value: "high", label: "High Availability (99.95%)", desc: "Business-critical applications" },
  { value: "extreme", label: "Mission Critical (99.99%)", desc: "Zero-downtime requirements" },
];

const budgetRanges = [
  { value: "starter", label: "$0 – $500/mo", desc: "Startup or POC stage" },
  { value: "growth", label: "$500 – $2,000/mo", desc: "Growing product" },
  { value: "scale", label: "$2,000 – $10,000/mo", desc: "Scaling team" },
  { value: "enterprise", label: "$10,000+/mo", desc: "Enterprise workloads" },
];

const cloudProviders = [
  { value: "aws", label: "Amazon Web Services", color: "text-amber-500", bg: "bg-amber-500/10" },
  { value: "azure", label: "Microsoft Azure", color: "text-blue-500", bg: "bg-blue-500/10" },
  { value: "gcp", label: "Google Cloud Platform", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { value: "multi", label: "Multi-cloud / No preference", color: "text-purple-500", bg: "bg-purple-500/10" },
];

export default function WizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    businessType: "",
    users: "",
    usersNotes: "",
    availability: "",
    budget: "",
    provider: "",
    additionalNotes: "",
  });

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(s => s + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      router.push("/recommendations");
    }, 1800);
  };

  return (
    <DashboardLayout title="New Recommendation">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Build a Recommendation</h1>
          <p className="text-[var(--muted-foreground)] text-sm mt-1">Answer 5 quick questions to get your personalized cloud architecture.</p>
        </div>

        {/* Steps indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2 flex-1">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0",
                  currentStep > step.id ? "gradient-bg text-white" :
                  currentStep === step.id ? "border-2 border-indigo-500 text-indigo-500" :
                  "border-2 border-[var(--border)] text-[var(--muted-foreground)]"
                )}>
                  {currentStep > step.id ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn("flex-1 h-0.5 mx-2", currentStep > step.id ? "gradient-bg" : "bg-[var(--border)]")} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-[var(--muted-foreground)] px-0">
            {steps.map((step) => (
              <span key={step.id} className={cn("hidden md:block", currentStep === step.id && "text-indigo-500 font-medium")}>{step.title}</span>
            ))}
          </div>
          <Progress value={progress} className="mt-3 h-1" />
          <p className="text-xs text-[var(--muted-foreground)] mt-2">Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}</p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 min-h-[360px] flex flex-col">
          <div className="flex-1">
            {/* Step 1: Business Type */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-lg font-semibold text-[var(--foreground)] mb-1">What type of business are you building for?</h2>
                <p className="text-sm text-[var(--muted-foreground)] mb-6">This helps us recommend the right architecture pattern.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {businessTypes.map((bt) => (
                    <button
                      key={bt.value}
                      onClick={() => setData(d => ({ ...d, businessType: bt.value }))}
                      className={cn(
                        "p-4 rounded-xl border-2 text-center transition-all hover:border-indigo-500",
                        data.businessType === bt.value ? "border-indigo-500 bg-indigo-500/10" : "border-[var(--border)] bg-[var(--background)]"
                      )}
                    >
                      <div className="text-2xl mb-2">{bt.icon}</div>
                      <p className="text-xs font-medium text-[var(--foreground)]">{bt.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Users */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--foreground)] mb-1">How many users are you expecting?</h2>
                  <p className="text-sm text-[var(--muted-foreground)] mb-6">Helps us size compute, database, and caching layers correctly.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="users">Expected concurrent users</Label>
                  <Select id="users" value={data.users} onChange={(e) => setData(d => ({ ...d, users: e.target.value }))}>
                    <option value="">Select user range</option>
                    <option value="small">Up to 1,000 users</option>
                    <option value="medium">1,000 – 10,000 users</option>
                    <option value="large">10,000 – 100,000 users</option>
                    <option value="xlarge">100,000+ users</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Traffic patterns (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="e.g. Spiky traffic during business hours, global user base..."
                    value={data.usersNotes}
                    onChange={(e) => setData(d => ({ ...d, usersNotes: e.target.value }))}
                    className="h-24"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Availability */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-lg font-semibold text-[var(--foreground)] mb-1">What are your availability requirements?</h2>
                <p className="text-sm text-[var(--muted-foreground)] mb-6">Higher SLAs require multi-region deployments with increased cost.</p>
                <div className="space-y-3">
                  {availabilityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setData(d => ({ ...d, availability: opt.value }))}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 text-left transition-all hover:border-indigo-500",
                        data.availability === opt.value ? "border-indigo-500 bg-indigo-500/10" : "border-[var(--border)] bg-[var(--background)]"
                      )}
                    >
                      <p className="font-medium text-sm text-[var(--foreground)]">{opt.label}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Budget */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-lg font-semibold text-[var(--foreground)] mb-1">What&apos;s your expected monthly cloud budget?</h2>
                <p className="text-sm text-[var(--muted-foreground)] mb-6">We&apos;ll optimize recommendations to stay within your target range.</p>
                <div className="grid grid-cols-2 gap-3">
                  {budgetRanges.map((b) => (
                    <button
                      key={b.value}
                      onClick={() => setData(d => ({ ...d, budget: b.value }))}
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all hover:border-indigo-500",
                        data.budget === b.value ? "border-indigo-500 bg-indigo-500/10" : "border-[var(--border)] bg-[var(--background)]"
                      )}
                    >
                      <p className="font-semibold text-sm text-[var(--foreground)]">{b.label}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{b.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Provider */}
            {currentStep === 5 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--foreground)] mb-1">Do you have a preferred cloud provider?</h2>
                  <p className="text-sm text-[var(--muted-foreground)] mb-6">We&apos;ll still show comparisons. This only sets the primary recommendation.</p>
                </div>
                <div className="space-y-3">
                  {cloudProviders.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setData(d => ({ ...d, provider: p.value }))}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all hover:border-indigo-500",
                        data.provider === p.value ? "border-indigo-500 bg-indigo-500/10" : "border-[var(--border)] bg-[var(--background)]"
                      )}
                    >
                      <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center text-xs font-black", p.bg, p.color)}>
                        {p.value === "multi" ? "⚡" : p.label.split(" ")[0].substring(0, 3).toUpperCase()}
                      </div>
                      <span className="font-medium text-sm text-[var(--foreground)]">{p.label}</span>
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addNotes">Additional requirements (optional)</Label>
                  <Textarea
                    id="addNotes"
                    placeholder="e.g. Must support HIPAA, existing Azure AD setup, GDPR compliance..."
                    value={data.additionalNotes}
                    onChange={(e) => setData(d => ({ ...d, additionalNotes: e.target.value }))}
                    className="h-20"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-[var(--border)]">
            <Button variant="outline" onClick={handlePrev} disabled={currentStep === 1}>
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            {currentStep < steps.length ? (
              <Button onClick={handleNext}>
                Continue <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={submitting} className="gap-2">
                {submitting ? (
                  <>Generating... <span className="animate-spin">⚙</span></>
                ) : (
                  <>Generate Recommendation <Zap className="h-4 w-4" /></>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
