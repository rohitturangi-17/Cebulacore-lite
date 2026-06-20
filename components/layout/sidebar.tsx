"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  BarChart3,
  MessageCircle,
  Network,
  UserCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/recommendations", label: "Recommendations", icon: Sparkles },
  { href: "/cost-comparison", label: "Cost Comparison", icon: BarChart3 },
  { href: "/assistant", label: "AI Assistant", icon: MessageCircle },
  { href: "/architecture", label: "Architecture Viewer", icon: Network },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 84 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden md:flex h-screen flex-col glass-panel border-r border-white/[0.08] sticky top-0 shrink-0"
    >
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="h-8 w-8 shrink-0 rounded-full bg-cebula-gradient shadow-glow-sm" />
        {!sidebarCollapsed && (
          <span className="font-display text-base font-semibold tracking-tight text-white">
            CebulaCore
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                active
                  ? "bg-white/[0.08] text-white"
                  : "text-ink-muted hover:bg-white/[0.05] hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  active ? "text-glow-accent" : "text-ink-muted group-hover:text-white"
                )}
              />
              {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-glow-accent"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={toggleSidebar}
        className="m-3 flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] py-2 text-xs text-ink-muted hover:bg-white/[0.05] hover:text-white transition-colors"
      >
        {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        {!sidebarCollapsed && "Collapse"}
      </button>
    </motion.aside>
  );
}
