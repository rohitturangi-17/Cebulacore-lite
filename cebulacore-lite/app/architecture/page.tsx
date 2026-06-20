"use client";

import { useState } from "react";
import { ArchitectureCanvas } from "@/components/architecture/architecture-canvas";
import { mockArchitectureDiagrams } from "@/lib/mock/data";
import { AppShell } from "@/components/layout/app-shell";
import { cn } from "@/lib/utils";

export default function ArchitecturePage() {
  const [selectedId, setSelectedId] = useState(mockArchitectureDiagrams[0].id);
  const diagram = mockArchitectureDiagrams.find((d) => d.id === selectedId)!;

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Architecture Viewer
            </h1>
            <p className="mt-1 text-sm text-ink-muted">Explore the diagram behind each recommendation.</p>
          </div>
          <div className="flex gap-2">
            {mockArchitectureDiagrams.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedId(d.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                  d.id === selectedId
                    ? "border-glow-accent/60 bg-white/[0.08] text-white"
                    : "border-white/10 text-ink-muted hover:text-white"
                )}
              >
                {d.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <ArchitectureCanvas diagram={diagram} />
        </div>
      </div>
    </AppShell>
  );
}
