import type { ReactNode } from "react";
import Link from "next/link";
import { AIOrb } from "@/components/shared/ai-orb";
import { AmbientBackground } from "@/components/shared/ambient-background";
import { GlassPanel } from "@/components/shared/glass-panel";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-16">
      <AmbientBackground />
      <Link href="/" className="relative z-10 mb-8 flex items-center gap-3">
        <AIOrb size="sm" />
        <span className="font-display text-lg font-semibold text-white">CebulaCore</span>
      </Link>

      <GlassPanel className="relative z-10 w-full max-w-md p-8">
        <div className="text-center">
          <h1 className="font-display text-2xl font-semibold text-white">{title}</h1>
          <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>
        </div>

        <div className="mt-8">{children}</div>

        <div className="mt-6 text-center text-sm text-ink-muted">{footer}</div>
      </GlassPanel>
    </main>
  );
}
