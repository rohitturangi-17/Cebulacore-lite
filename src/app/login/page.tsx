"use client";

import { useState } from "react";
import Link from "next/link";
import { Cloud, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/form-elements";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/dashboard";
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-1/2 gradient-bg p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-16">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Cloud className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">CebulaCore Lite</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-4">Welcome back to intelligent cloud design</h2>
          <p className="text-indigo-100 text-lg leading-relaxed">Your AI-powered cloud architecture advisor is ready to help you make smarter infrastructure decisions.</p>
          <div className="mt-12 space-y-4">
            {["AI recommendations in minutes", "Compare AWS, Azure & GCP costs", "Zero-risk advisory platform"].map((t) => (
              <div key={t} className="flex items-center gap-3 text-indigo-100">
                <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="absolute top-4 right-4">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)]">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
              <Cloud className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold">CebulaCore Lite</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Sign in</h1>
          <p className="text-[var(--muted-foreground)] text-sm mb-8">Enter your credentials to access your workspace.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="alex@company.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-indigo-500 hover:text-indigo-600">Forgot password?</a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center text-xs text-[var(--muted-foreground)] bg-[var(--background)] px-2">or continue with demo</div>
          </div>

          <Link href="/dashboard">
            <Button variant="outline" className="w-full">
              View demo dashboard
            </Button>
          </Link>

          <p className="text-center text-sm text-[var(--muted-foreground)] mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-indigo-500 hover:text-indigo-600 font-medium">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
