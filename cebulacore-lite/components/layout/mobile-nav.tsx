"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  LayoutDashboard,
  Sparkles,
  BarChart3,
  MessageCircle,
  Network,
  UserCircle,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/recommendations", label: "Recommendations", icon: Sparkles },
  { href: "/cost-comparison", label: "Cost Comparison", icon: BarChart3 },
  { href: "/assistant", label: "AI Assistant", icon: MessageCircle },
  { href: "/architecture", label: "Architecture Viewer", icon: Network },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full p-2 text-ink-muted hover:bg-white/[0.06] hover:text-white transition-colors md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="left-0 top-0 h-full max-w-[280px] translate-x-0 translate-y-0 rounded-none rounded-r-xl2">
          <DialogTitle className="sr-only">Navigation</DialogTitle>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-cebula-gradient shadow-glow-sm" />
            <span className="font-display text-base font-semibold text-white">CebulaCore</span>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-white/[0.08] text-white" : "text-ink-muted hover:bg-white/[0.05] hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </DialogContent>
      </Dialog>
    </>
  );
}
