"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, ZoomOut, Download, Maximize2, RotateCcw, Network } from "lucide-react";
import { cn } from "@/lib/utils";

const archNodes = [
  { id: "cdn", label: "CloudFront CDN", type: "edge", x: 50, y: 10, color: "bg-amber-500" },
  { id: "waf", label: "WAF", type: "security", x: 20, y: 10, color: "bg-red-500" },
  { id: "alb", label: "App Load Balancer", type: "network", x: 50, y: 28, color: "bg-blue-500" },
  { id: "eks", label: "EKS Cluster", type: "compute", x: 35, y: 48, color: "bg-indigo-500" },
  { id: "rds", label: "Aurora RDS", type: "database", x: 65, y: 48, color: "bg-emerald-500" },
  { id: "cache", label: "ElastiCache", type: "cache", x: 65, y: 66, color: "bg-purple-500" },
  { id: "s3", label: "S3 Storage", type: "storage", x: 20, y: 66, color: "bg-orange-500" },
  { id: "mq", label: "Amazon SQS", type: "messaging", x: 35, y: 66, color: "bg-pink-500" },
];

export default function ArchitecturePage() {
  const [zoom, setZoom] = useState(100);
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <DashboardLayout title="Architecture Viewer">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Architecture Viewer</h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">E-commerce Platform · AWS · Generated 2 hours ago</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success">AWS</Badge>
            <Badge>Microservices</Badge>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export SVG
            </Button>
          </div>
        </div>

        <div className={cn("rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden", fullscreen && "fixed inset-4 z-50")}>
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-[var(--muted-foreground)]" />
              <span className="text-sm font-medium text-[var(--foreground)]">E-commerce Architecture</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(50, zoom - 10))} className="h-8 w-8">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs text-[var(--muted-foreground)] w-12 text-center">{zoom}%</span>
              <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(200, zoom + 10))} className="h-8 w-8">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setZoom(100)} className="h-8 w-8">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setFullscreen(!fullscreen)} className="h-8 w-8">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Diagram */}
          <div className="relative bg-[var(--muted)]/30 overflow-auto" style={{ height: fullscreen ? "calc(100vh - 10rem)" : "480px" }}>
            <div
              className="relative w-full h-full transition-transform duration-200"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
            >
              {/* SVG connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
                <line x1="50%" y1="17%" x2="50%" y2="27%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" className="text-[var(--muted-foreground)]" />
                <line x1="50%" y1="33%" x2="37%" y2="46%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" className="text-[var(--muted-foreground)]" />
                <line x1="50%" y1="33%" x2="63%" y2="46%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" className="text-[var(--muted-foreground)]" />
                <line x1="37%" y1="53%" x2="37%" y2="64%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" className="text-[var(--muted-foreground)]" />
                <line x1="63%" y1="53%" x2="63%" y2="64%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" className="text-[var(--muted-foreground)]" />
              </svg>

              {/* Nodes */}
              {archNodes.map((node) => (
                <div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110", node.color)}>
                      <Network className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-[var(--foreground)] bg-[var(--card)] px-2 py-0.5 rounded-md border border-[var(--border)] whitespace-nowrap shadow-sm">{node.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 px-4 py-3 border-t border-[var(--border)]">
            {[
              { color: "bg-blue-500", label: "Network" },
              { color: "bg-indigo-500", label: "Compute" },
              { color: "bg-emerald-500", label: "Database" },
              { color: "bg-amber-500", label: "Edge/CDN" },
              { color: "bg-orange-500", label: "Storage" },
              { color: "bg-purple-500", label: "Cache" },
              { color: "bg-red-500", label: "Security" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                <div className={cn("h-2.5 w-2.5 rounded", l.color)} />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
