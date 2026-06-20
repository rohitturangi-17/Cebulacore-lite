"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/shared/glass-panel";
import { mockUserProfile } from "@/lib/mock/data";

export function ProfileSettings() {
  const [name, setName] = useState(mockUserProfile.name);
  const [email, setEmail] = useState(mockUserProfile.email);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <GlassPanel className="p-6 sm:p-8">
      <h2 className="font-display text-base font-semibold text-white">Profile settings</h2>
      <p className="mt-1 text-sm text-ink-muted">Update your personal information.</p>

      <div className="mt-6 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <Button variant="secondary" size="sm">
          Change avatar
        </Button>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="profile-name">Full name</Label>
          <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-email">Email</Label>
          <Input id="profile-email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-role">Role</Label>
          <Input id="profile-role" defaultValue={mockUserProfile.role} disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-plan">Plan</Label>
          <Input id="profile-plan" defaultValue={mockUserProfile.plan.toUpperCase()} disabled />
        </div>
      </div>

      <Button className="mt-6">Save changes</Button>
    </GlassPanel>
  );
}
