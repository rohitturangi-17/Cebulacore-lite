"use client";
import { Cloud, Database, Network, Shield, Workflow } from "lucide-react";
import { ArchitectureNodeData } from "@/types";

const categoryStyle: Record<string, { stroke: string; fill: string; icon: React.ElementType }> = {
  network: { stroke: "#2563EB", fill: "rgba(37,99,235,0.12)", icon: Network },
  compute: { stroke: "#A855F7", fill: "rgba(168,85,247,0.12)", icon: Cloud },
  data: { stroke: "#22C55E", fill: "rgba(34,197,94,0.12)", icon: Database },
  integration: { stroke: "#EC4899", fill: "rgba(236,72,153,0.12)", icon: Workflow },
  security: { stroke: "#F59E0B", fill: "rgba(245,158,11,0.12)", icon: Shield },
};

const NODE_W = 168;
const NODE_H = 60;

export function ArchitectureNode({ node }: { node: ArchitectureNodeData }) {
  const style = categoryStyle[node.category] ?? categoryStyle.compute;
  const Icon = style.icon;
  return (
    <g transform={`translate(${node.x}, ${node.y})`}>
      <rect
        width={NODE_W}
        height={NODE_H}
        rx={14}
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth={1.5}
        style={{ filter: `drop-shadow(0 0 12px ${style.stroke}33)` }}
      />
      <foreignObject width={NODE_W} height={NODE_H}>
        <div className="flex h-full w-full items-center gap-2.5 px-3.5">
          <div
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md"
            style={{ background: style.fill, color: style.stroke }}
          >
            <Icon size={15} />
          </div>
          <span className="font-mono text-[11px] leading-tight text-white/90">{node.label}</span>
        </div>
      </foreignObject>
    </g>
  );
}

export const ARCH_NODE_WIDTH = NODE_W;
export const ARCH_NODE_HEIGHT = NODE_H;
