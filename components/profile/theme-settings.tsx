"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GlassPanel } from "@/components/shared/glass-panel";

export function ThemeSettings() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [compactSidebar, setCompactSidebar] = useState(false);

  return (
    <GlassPanel className="p-6 sm:p-8">
      <h2 className="font-display text-base font-semibold text-white">Theme settings</h2>
      <p className="mt-1 text-sm text-ink-muted">
        CebulaCore Lite is designed dark-first. More appearance options are on the roadmap.
      </p>

      <div className="mt-6 space-y-5">
        <div className="flex items-center justify-between rounded-lg border border-white/[0.06] p-4">
          <div>
            <Label className="text-white">Dark mode</Label>
            <p className="mt-0.5 text-xs text-ink-muted">Always enabled in this release</p>
          </div>
          <Switch checked disabled />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-white/[0.06] p-4">
          <div>
            <Label className="text-white">Reduce motion</Label>
            <p className="mt-0.5 text-xs text-ink-muted">Minimize animations across the app</p>
          </div>
          <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-white/[0.06] p-4">
          <div>
            <Label className="text-white">Compact sidebar by default</Label>
            <p className="mt-0.5 text-xs text-ink-muted">Start each session with the sidebar collapsed</p>
          </div>
          <Switch checked={compactSidebar} onCheckedChange={setCompactSidebar} />
        </div>
      </div>
    </GlassPanel>
  );
}
