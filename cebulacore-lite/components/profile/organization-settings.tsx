"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/shared/glass-panel";
import { mockUserProfile } from "@/lib/mock/data";

export function OrganizationSettings() {
  const [org, setOrg] = useState(mockUserProfile.organization);

  return (
    <GlassPanel className="p-6 sm:p-8">
      <h2 className="font-display text-base font-semibold text-white">Organization settings</h2>
      <p className="mt-1 text-sm text-ink-muted">Manage the workspace your recommendations belong to.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="org-name">Organization name</Label>
          <Input id="org-name" value={org} onChange={(e) => setOrg(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="org-size">Team size</Label>
          <Input id="org-size" placeholder="e.g. 1-10" />
        </div>
      </div>

      <Button className="mt-6">Save changes</Button>
    </GlassPanel>
  );
}
