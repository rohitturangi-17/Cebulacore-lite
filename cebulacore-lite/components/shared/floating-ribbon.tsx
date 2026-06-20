import { cn } from "@/lib/utils";

interface FloatingRibbonProps {
  className?: string;
}

/**
 * FloatingRibbon — ambient background atmosphere used on the landing page
 * and auth screens. Pure CSS gradients with a slow drift animation;
 * no JS cost, safe to layer multiple instances.
 */
export function FloatingRibbon({ className }: FloatingRibbonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full opacity-40 blur-3xl animate-ribbon-drift",
        className
      )}
      style={{
        background:
          "linear-gradient(120deg, rgba(37,99,235,0.5), rgba(124,58,237,0.5), rgba(168,85,247,0.4))",
      }}
    />
  );
}
