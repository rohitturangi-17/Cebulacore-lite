import Link from "next/link";
import { Wand2, GitCompare, Network } from "lucide-react";
import { GlowCard } from "@/components/shared/glow-card";

const actions = [
  {
    href: "/wizard",
    icon: Wand2,
    title: "Create recommendation",
    description: "Walk through the requirement wizard",
  },
  {
    href: "/cost-comparison",
    icon: GitCompare,
    title: "Compare cloud services",
    description: "See AWS, Azure, and GCP side by side",
  },
  {
    href: "/architecture",
    icon: Network,
    title: "Generate architecture",
    description: "Explore a visual diagram of your setup",
  },
];

export function QuickActions() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link key={action.href} href={action.href}>
            <GlowCard glowColor="primary" className="h-full">
              <Icon className="h-5 w-5 text-glow-accent" />
              <h4 className="mt-3 font-display text-sm font-semibold text-white">{action.title}</h4>
              <p className="mt-1 text-xs text-ink-muted">{action.description}</p>
            </GlowCard>
          </Link>
        );
      })}
    </div>
  );
}
