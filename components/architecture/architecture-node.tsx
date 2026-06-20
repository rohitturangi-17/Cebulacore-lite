import { Cpu, Database, HardDrive, Network, Shield, Brain } from "lucide-react";
import type { ArchitectureNode as NodeType } from "@/lib/types";

const iconMap = {
  compute: Cpu,
  storage: HardDrive,
  database: Database,
  network: Network,
  security: Shield,
  ai: Brain,
};

const colorMap = {
  compute: "#2563EB",
  storage: "#F59E0B",
  database: "#22C55E",
  network: "#7C3AED",
  security: "#EF4444",
  ai: "#A855F7",
};

export function ArchitectureNodeView({ node }: { node: NodeType }) {
  const Icon = iconMap[node.type];
  const color = colorMap[node.type];

  return (
    <div
      className="absolute flex w-36 flex-col items-center gap-2 rounded-xl border border-white/10 bg-[#0a0f1f]/90 p-3 text-center shadow-glow-sm backdrop-blur-glass"
      style={{ left: node.x, top: node.y }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}22` }}
      >
        <Icon className="h-4.5 w-4.5" style={{ color }} />
      </div>
      <span className="text-xs font-medium text-white">{node.label}</span>
    </div>
  );
}
