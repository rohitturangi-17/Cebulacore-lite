"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Loader2 } from "lucide-react";
import { FloatingRibbon } from "@/components/FloatingRibbon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  organization: z.string().optional(),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);
    try {
      await api.register(data);
      router.push("/dashboard");
    } catch {
      setServerError("Couldn't create your account. Please try again.");
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
      <FloatingRibbon className="absolute inset-0 opacity-60" />

      <div className="glass-strong relative w-full max-w-md rounded-xl2 p-8 shadow-glow">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-glow-primary to-accent shadow-glow-sm">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h1 className="font-display text-xl font-medium">Create your account</h1>
          <p className="mt-1 text-sm text-muted">Start building cloud architectures with Cebula.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" placeholder="Alex Rivera" {...register("name")} />
            {errors.name && <p className="mt-1.5 text-xs text-danger">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="organization">Organization (optional)</Label>
            <Input id="organization" placeholder="Acme Inc." {...register("organization")} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@company.com" {...register("email")} />
            {errors.email && <p className="mt-1.5 text-xs text-danger">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && <p className="mt-1.5 text-xs text-danger">{errors.password.message}</p>}
          </div>
          {serverError && <p className="text-xs text-danger">{serverError}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-white hover:text-glow-secondary">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
