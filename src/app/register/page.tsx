"use client";

import { useState } from "react";
import Link from "next/link";
import { Cloud, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label, Select } from "@/components/ui/form-elements";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/dashboard";
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
            <Cloud className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-[var(--foreground)]">CebulaCore Lite</span>
        </div>
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Create your account</h1>
        <p className="text-[var(--muted-foreground)] text-sm mb-8">Start getting AI-powered cloud architecture recommendations today.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="Alex" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Chen" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" type="email" placeholder="alex@company.io" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org">Organization</Label>
            <Input id="org" placeholder="TechCorp Solutions" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select id="role">
              <option value="">Select your role</option>
              <option>Cloud Architect</option>
              <option>DevOps Engineer</option>
              <option>Software Engineer</option>
              <option>CTO / VP Engineering</option>
              <option>Product Manager</option>
              <option>Other</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                required
                className="pr-10"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[var(--muted)] space-y-2">
            <p className="text-xs font-semibold text-[var(--muted-foreground)]">Free plan includes:</p>
            {["5 AI recommendations/month", "Cost comparison across 3 providers", "1 saved architecture"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {f}
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create free account"}
          </Button>
        </form>

        <p className="text-center text-sm text-[var(--muted-foreground)] mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-500 hover:text-indigo-600 font-medium">Sign in</Link>
        </p>
        <p className="text-center text-xs text-[var(--muted-foreground)] mt-3">
          By creating an account you agree to our{" "}
          <a href="#" className="text-indigo-500">Terms</a> and{" "}
          <a href="#" className="text-indigo-500">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
