"use client";
import { useMemo, useRef, useState } from "react";
import { ZoomIn, ZoomOut, Maximize, Minimize, Download, RotateCcw } from "lucide-react";
import { ArchitectureNode, ARCH_NODE_WIDTH, ARCH_NODE_HEIGHT } from "@/components/ArchitectureNode";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { architectureBlueprints } from "@/lib/mock-data";

export default function ArchitectureViewerPage() {
  const { activeRecommendation } = useAppStore();
  const blueprint = architectureBlueprints[activeRecommendation?.businessType ?? "saas"];

  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const nodeCenter = (id: string) => {
    const n = blueprint.nodes.find((n) => n.id === id)!;
    return { x: n.x + ARCH_NODE_WIDTH / 2, y: n.y + ARCH_NODE_HEIGHT / 2 };
  };

  const bounds = useMemo(() => {
    const maxX = Math.max(...blueprint.nodes.map((n) => n.x)) + ARCH_NODE_WIDTH + 80;
    const maxY = Math.max(...blueprint.nodes.map((n) => n.y)) + ARCH_NODE_HEIGHT + 80;
    return { width: maxX, height: maxY };
  }, [blueprint]);

  async function toggleFullscreen() {
    if (!containerRef.current) return;
    if (!fullscreen) {
      await containerRef.current.requestFullscreen?.();
      setFullscreen(true);
    } else {
      await document.exitFullscreen?.();
      setFullscreen(false);
    }
  }

  function exportPNG() {
    const svg = svgRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const svgBlob = new Blob(
      ['<?xml version="1.0" standalone="no"?>\r\n', source],
      { type: "image/svg+xml;charset=utf-8" }
    );
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = 2;
      canvas.width = bounds.width * scale;
      canvas.height = bounds.height * scale;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#050816";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `${blueprint.id}.png`;
        link.click();
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium">{blueprint.name}</h1>
          <p className="mt-1 text-sm text-muted">{blueprint.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="icon" onClick={() => setZoom((z) => Math.max(0.5, z - 0.15))} aria-label="Zoom out">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-mono text-xs text-muted">{Math.round(zoom * 100)}%</span>
          <Button variant="secondary" size="icon" onClick={() => setZoom((z) => Math.min(2, z + 0.15))} aria-label="Zoom in">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={() => setZoom(1)} aria-label="Reset zoom">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={toggleFullscreen} aria-label="Toggle fullscreen">
            {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
          <Button onClick={exportPNG}>
            <Download className="h-4 w-4" /> Export PNG
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="glass relative h-[60vh] overflow-auto rounded-xl2 bg-[#03050f]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        <div
          className="origin-top-left p-10 transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          <svg
            ref={svgRef}
            width={bounds.width}
            height={bounds.height}
            viewBox={`0 0 ${bounds.width} ${bounds.height}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            <rect width={bounds.width} height={bounds.height} fill="#03050f" />
            {blueprint.edges.map((e, i) => {
              const from = nodeCenter(e.from);
              const to = nodeCenter(e.to);
              const midX = (from.x + to.x) / 2;
              return (
                <path
                  key={i}
                  d={`M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`}
                  fill="none"
                  stroke="url(#edge-gradient)"
                  strokeWidth={1.5}
                  strokeOpacity={0.55}
                  strokeDasharray="6 5"
                >
                  <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1.4s" repeatCount="indefinite" />
                </path>
              );
            })}
            {blueprint.nodes.map((n) => (
              <ArchitectureNode key={n.id} node={n} />
            ))}
          </svg>
        </div>
      </div>
      <p className="text-xs text-muted">
        Blueprint shown is illustrative. CebulaCore is advisory-only — it never provisions or modifies this architecture for you.
      </p>
    </div>
  );
}
