"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { navItems } from "@/lib/nav-items";

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <aside
      className={cn(
        "glass-strong fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-white/[0.08] transition-all duration-300 md:flex",
        sidebarCollapsed ? "w-[76px]" : "w-64"
      )}
    >
      <div className="flex h-16 items-center gap-2.5 px-5">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-glow-primary to-accent shadow-glow-sm">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        {!sidebarCollapsed && (
          <span className="font-display text-sm font-semibold tracking-tight">CebulaCore</span>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const active = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-white/[0.07] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                  : "text-muted hover:bg-white/[0.04] hover:text-white"
              )}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "h-[18px] w-[18px] flex-shrink-0",
                  active && "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                )}
                style={active ? { stroke: "url(#sidebar-icon-gradient)" } : undefined}
              />
              {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 flex-shrink-0 rounded-full bg-glow-secondary shadow-glow-sm" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.08] p-3">
        <button
          onClick={toggleSidebar}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium text-muted transition-colors hover:bg-white/[0.04] hover:text-white"
        >
          {sidebarCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          {!sidebarCollapsed && "Collapse"}
        </button>
      </div>

      {/* gradient def reused by active icon */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="sidebar-icon-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#60A5FA" />
            <stop offset="1" stopColor="#C084FC" />
          </linearGradient>
        </defs>
      </svg>
    </aside>
  );
}
