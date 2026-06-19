"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Lightbulb, DollarSign, Bot, Network,
  User, Zap, ChevronLeft, Menu, Settings, LogOut, Cloud
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/wizard", icon: Zap, label: "New Recommendation" },
  { href: "/recommendations", icon: Lightbulb, label: "Recommendations" },
  { href: "/cost-comparison", icon: DollarSign, label: "Cost Comparison" },
  { href: "/assistant", icon: Bot, label: "AI Assistant" },
  { href: "/architecture", icon: Network, label: "Architecture Viewer" },
];

const bottomItems = [
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] shadow-md"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-5 w-5 text-[var(--foreground)]" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-40 flex flex-col border-r border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn("flex items-center h-16 px-4 border-b border-[var(--sidebar-border)]", collapsed ? "justify-center" : "gap-3")}>
          <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
            <Cloud className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <span className="font-bold text-sm text-[var(--foreground)]">CebulaCore</span>
              <span className="text-xs text-[var(--muted-foreground)] block -mt-0.5">Lite</span>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 overflow-y-auto scrollbar-hide">
          <div className="px-3 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 h-9 rounded-lg px-3 text-sm font-medium transition-all duration-150",
                    active
                      ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]",
                    collapsed && "justify-center px-0"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={cn("h-4 w-4 flex-shrink-0", active && "text-indigo-500")} />
                  {!collapsed && <span>{item.label}</span>}
                  {!collapsed && active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  )}
                </Link>
              );
            })}
          </div>

          {!collapsed && (
            <div className="mx-3 my-4 p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Pro Plan Active</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">68% AI usage this month</p>
              <div className="mt-2 h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                <div className="h-full w-[68%] gradient-bg rounded-full" />
              </div>
            </div>
          )}
        </nav>

        {/* Bottom items */}
        <div className="border-t border-[var(--sidebar-border)] py-3 px-3 space-y-1">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 h-9 rounded-lg px-3 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
          <button className={cn(
            "w-full flex items-center gap-3 h-9 rounded-lg px-3 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all",
            collapsed && "justify-center px-0"
          )}>
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Collapse button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute -right-3 top-20 h-6 w-6 rounded-full border border-[var(--border)] bg-[var(--background)] shadow-md hidden lg:flex",
            "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn("h-3 w-3 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </aside>
    </>
  );
}
