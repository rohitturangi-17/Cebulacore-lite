"use client";
import { useState } from "react";
import { Camera, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const themeOptions = [
  { id: "midnight", label: "Midnight", swatch: "linear-gradient(135deg,#050816,#1e1b4b)" },
  { id: "nebula", label: "Nebula", swatch: "linear-gradient(135deg,#2563EB,#7C3AED)" },
  { id: "aurora", label: "Aurora", swatch: "linear-gradient(135deg,#7C3AED,#EC4899)" },
];

export default function ProfilePage() {
  const [theme, setTheme] = useState("midnight");
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium">Profile</h1>
        <p className="mt-1 text-sm text-muted">Manage your account, organization, and appearance preferences.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          <TabsTrigger value="org">Organization</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <div className="glass rounded-xl2 p-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-glow-primary to-accent text-xl font-medium shadow-glow-sm">
                A
                <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-background text-muted hover:text-white">
                  <Camera className="h-3 w-3" />
                </button>
              </div>
              <div>
                <p className="font-medium">Alex Rivera</p>
                <p className="text-sm text-muted">alex@cebulacore.dev</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="fullname">Full name</Label>
                <Input id="fullname" defaultValue="Alex Rivera" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="alex@cebulacore.dev" />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="A short description about you or your role." />
            </div>
            <SaveBar saved={saved} onSave={() => setSaved(true)} />
          </div>
        </TabsContent>

        <TabsContent value="org" className="mt-6">
          <div className="glass rounded-xl2 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="orgname">Organization name</Label>
                <Input id="orgname" defaultValue="Acme Inc." />
              </div>
              <div>
                <Label htmlFor="orgsize">Team size</Label>
                <Input id="orgsize" defaultValue="11–50 employees" />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="industry">Primary industry</Label>
              <Input id="industry" defaultValue="SaaS" />
            </div>
            <SaveBar saved={saved} onSave={() => setSaved(true)} />
          </div>
        </TabsContent>

        <TabsContent value="theme" className="mt-6">
          <div className="glass rounded-xl2 p-6">
            <p className="mb-4 text-sm text-muted">Choose the accent treatment for your workspace.</p>
            <div className="grid grid-cols-3 gap-4">
              {themeOptions.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all",
                    theme === t.id ? "border-glow-secondary/60 shadow-glow-sm" : "border-white/10 hover:bg-white/[0.04]"
                  )}
                >
                  <div className="relative h-12 w-full rounded-lg" style={{ background: t.swatch }}>
                    {theme === t.id && (
                      <Check className="absolute right-1.5 top-1.5 h-4 w-4 text-white" />
                    )}
                  </div>
                  <span className="text-sm">{t.label}</span>
                </button>
              ))}
            </div>
            <SaveBar saved={saved} onSave={() => setSaved(true)} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SaveBar({ saved, onSave }: { saved: boolean; onSave: () => void }) {
  return (
    <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/[0.06] pt-4">
      {saved && <span className="text-xs text-success">Saved</span>}
      <Button onClick={onSave}>Save changes</Button>
    </div>
  );
}
