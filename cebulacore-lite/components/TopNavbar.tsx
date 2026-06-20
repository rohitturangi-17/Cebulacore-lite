"use client";
import { Bell, Menu, Search } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function TopNavbar({
  title,
  breadcrumb,
  onMobileMenu,
}: {
  title: string;
  breadcrumb?: string;
  onMobileMenu?: () => void;
}) {
  const { sidebarCollapsed } = useAppStore();

  return (
    <header
      className={cn(
        "glass sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.08] px-4 transition-all duration-300 md:px-6",
        sidebarCollapsed ? "md:ml-[76px]" : "md:ml-64"
      )}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenu}
          className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-white md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          {breadcrumb && <p className="text-xs text-muted">{breadcrumb}</p>}
          <h1 className="font-display text-base font-medium text-white">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            placeholder="Search..."
            className="h-9 w-48 rounded-full border border-white/10 bg-white/[0.03] pl-9 pr-4 text-sm text-white placeholder:text-muted/60 outline-none focus:border-glow-secondary/50 lg:w-64"
          />
        </div>
        <button className="relative rounded-full p-2 text-muted hover:bg-white/5 hover:text-white">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-glow-primary to-accent text-sm font-medium shadow-glow-sm">
          A
        </div>
      </div>
    </header>
  );
}
