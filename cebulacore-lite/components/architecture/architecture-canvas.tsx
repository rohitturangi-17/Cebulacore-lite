"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize2, Download, Minimize2 } from "lucide-react";
import { GlassPanel } from "@/components/shared/glass-panel";
import { ArchitectureNodeView } from "./architecture-node";
import type { ArchitectureDiagram } from "@/lib/types";

const NODE_WIDTH = 144;
const NODE_HEIGHT = 78;

export function ArchitectureCanvas({ diagram }: { diagram: ArchitectureDiagram }) {
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function exportPNG() {
    // Frontend-only placeholder: real export requires a backend render step
    // or a canvas-to-image library wired up once this view has live data.
    window.alert("Export PNG will be available once architecture rendering is connected to a backend.");
  }

  function centerOf(id: string) {
    const node = diagram.nodes.find((n) => n.id === id);
    if (!node) return { x: 0, y: 0 };
    return { x: node.x + NODE_WIDTH / 2, y: node.y + NODE_HEIGHT / 2 };
  }

  return (
    <GlassPanel
      className={
        fullscreen
          ? "fixed inset-4 z-50 flex flex-col p-4"
          : "flex flex-col p-4"
      }
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-semibold text-white">{diagram.title}</h3>
          <p className="text-xs text-ink-muted">Dark blueprint view · drag to explore, zoom to inspect</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.15))}
            className="rounded-lg p-2 text-ink-muted hover:bg-white/[0.06] hover:text-white"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))}
            className="rounded-lg p-2 text-ink-muted hover:bg-white/[0.06] hover:text-white"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={exportPNG}
            className="rounded-lg p-2 text-ink-muted hover:bg-white/[0.06] hover:text-white"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            onClick={() => setFullscreen((f) => !f)}
            className="rounded-lg p-2 text-ink-muted hover:bg-white/[0.06] hover:text-white"
          >
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative mt-4 flex-1 overflow-auto rounded-xl border border-white/[0.06] grid-overlay"
        style={{ minHeight: fullscreen ? undefined : 420 }}
      >
        <div
          className="relative origin-top-left transition-transform duration-200"
          style={{ width: 820, height: 480, transform: `scale(${zoom})` }}
        >
          <svg className="absolute inset-0 h-full w-full" style={{ overflow: "visible" }}>
            {diagram.edges.map((edge, i) => {
              const from = centerOf(edge.from);
              const to = centerOf(edge.to);
              return (
                <motion.line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#7C3AED"
                  strokeOpacity={0.45}
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              );
            })}
          </svg>
          {diagram.nodes.map((node) => (
            <ArchitectureNodeView key={node.id} node={node} />
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}
