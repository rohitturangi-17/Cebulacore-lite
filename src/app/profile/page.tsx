"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label, Select, Textarea } from "@/components/ui/form-elements";
import { Badge } from "@/components/ui/badge";
import { mockUser } from "@/data/mock";
import { User, Building2, Palette, Save, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type Tab = "profile" | "organization" | "theme";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "organization", label: "Organization", icon: Building2 },
    { id: "theme", label: "Theme Settings", icon: Palette },
  ];

  return (
    <DashboardLayout title="Profile">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Account Settings</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Manage your profile, organization, and preferences.</p>
        </div>

        {/* Avatar card */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 flex items-center gap-5">
          <div className="h-20 w-20 rounded-2xl gradient-bg flex items-center justify-center text-white text-2xl font-extrabold flex-shrink-0">
            {mockUser.avatar}
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--foreground)]">{mockUser.name}</h2>
            <p className="text-sm text-[var(--muted-foreground)]">{mockUser.role} · {mockUser.organization}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="default">{mockUser.plan} Plan</Badge>
              <span className="text-xs text-[var(--muted-foreground)]">Joined {mockUser.joinedDate}</span>
            </div>
          </div>
          <div className="ml-auto hidden sm:block">
            <Button variant="outline" size="sm">Change Photo</Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[var(--muted)] rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          {activeTab === "profile" && (
            <div className="space-y-5">
              <h3 className="font-semibold text-[var(--foreground)]">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First name</Label>
                  <Input defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label>Last name</Label>
                  <Input defaultValue="Chen" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email address</Label>
                <Input type="email" defaultValue={mockUser.email} />
              </div>
              <div className="space-y-2">
                <Label>Role / Title</Label>
                <Input defaultValue={mockUser.role} />
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  placeholder="Tell us about your cloud experience..."
                  defaultValue="Senior cloud architect with 8+ years of experience designing scalable distributed systems on AWS and GCP."
                  className="h-24"
                />
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-4">Change Password</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Current password</Label>
                    <Input type="password" placeholder="Enter current password" />
                  </div>
                  <div className="space-y-2">
                    <Label>New password</Label>
                    <Input type="password" placeholder="At least 8 characters" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-4">Usage Statistics</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Recommendations", value: mockUser.recommendationsCount },
                    { label: "Architectures Saved", value: mockUser.architecturesCount },
                    { label: "AI Queries", value: 184 },
                  ].map((s) => (
                    <div key={s.label} className="p-4 rounded-xl bg-[var(--muted)] text-center">
                      <p className="text-2xl font-bold text-[var(--foreground)]">{s.value}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "organization" && (
            <div className="space-y-5">
              <h3 className="font-semibold text-[var(--foreground)]">Organization Details</h3>
              <div className="space-y-2">
                <Label>Organization name</Label>
                <Input defaultValue={mockUser.organization} />
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Select defaultValue="technology">
                  <option value="technology">Technology</option>
                  <option value="finance">Finance & Fintech</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail & E-commerce</option>
                  <option value="media">Media & Entertainment</option>
                  <option value="other">Other</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Company size</Label>
                <Select defaultValue="51-200">
                  <option value="1-10">1–10 employees</option>
                  <option value="11-50">11–50 employees</option>
                  <option value="51-200">51–200 employees</option>
                  <option value="201-1000">201–1,000 employees</option>
                  <option value="1000+">1,000+ employees</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Primary cloud environment</Label>
                <Select defaultValue="aws">
                  <option value="aws">Amazon Web Services</option>
                  <option value="azure">Microsoft Azure</option>
                  <option value="gcp">Google Cloud Platform</option>
                  <option value="multi">Multi-cloud</option>
                  <option value="none">No existing infrastructure</option>
                </Select>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <h3 className="font-semibold text-[var(--foreground)] mb-4">Plan & Billing</h3>
                <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[var(--foreground)]">Pro Plan</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">$29/month · Renews June 15, 2025</p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Manage Billing</Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">Cancel Plan</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "theme" && (
            <div className="space-y-6">
              <h3 className="font-semibold text-[var(--foreground)]">Appearance</h3>

              <div>
                <Label className="mb-3 block">Color theme</Label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "light", label: "Light", preview: "bg-white border-2" },
                    { id: "dark", label: "Dark", preview: "bg-slate-900 border-2" },
                    { id: "system", label: "System", preview: "bg-gradient-to-br from-white to-slate-900 border-2" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 text-center transition-all",
                        theme === t.id ? "border-indigo-500" : "border-[var(--border)] hover:border-indigo-300"
                      )}
                    >
                      <div className={cn("h-12 rounded-lg mb-2 mx-auto", t.preview)} />
                      <p className="text-xs font-medium text-[var(--foreground)]">{t.label}</p>
                      {theme === t.id && (
                        <CheckCircle2 className="h-4 w-4 text-indigo-500 mx-auto mt-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Dashboard density</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Comfortable", "Compact"].map((d) => (
                    <button
                      key={d}
                      className={cn(
                        "p-4 rounded-xl border-2 text-center text-sm font-medium transition-all",
                        d === "Comfortable"
                          ? "border-indigo-500 text-[var(--foreground)]"
                          : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-indigo-300"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Notification preferences</Label>
                <div className="space-y-3">
                  {[
                    { label: "Recommendation complete", enabled: true },
                    { label: "Cost threshold alerts", enabled: true },
                    { label: "Weekly summary email", enabled: false },
                    { label: "Product updates", enabled: false },
                  ].map((n) => (
                    <div key={n.label} className="flex items-center justify-between py-2">
                      <span className="text-sm text-[var(--foreground)]">{n.label}</span>
                      <button
                        className={cn(
                          "relative h-5 w-9 rounded-full transition-colors",
                          n.enabled ? "bg-indigo-500" : "bg-[var(--muted)]"
                        )}
                      >
                        <span className={cn(
                          "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                          n.enabled ? "translate-x-4" : "translate-x-0.5"
                        )} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-6 mt-6 border-t border-[var(--border)]">
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
              Delete account
            </Button>
            <Button onClick={handleSave} className="gap-2 min-w-[120px]">
              {saved ? (
                <><CheckCircle2 className="h-4 w-4" /> Saved!</>
              ) : (
                <><Save className="h-4 w-4" /> Save changes</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
