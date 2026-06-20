import { cn } from "@/lib/utils";

export function GlassPanel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("glass rounded-xl2 shadow-[0_8px_32px_rgba(0,0,0,0.35)]", className)}>
      {children}
    </div>
  );
}
