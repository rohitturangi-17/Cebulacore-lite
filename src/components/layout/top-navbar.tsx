"use client";

import { useTheme } from "next-themes";
import { Bell, Search, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockUser } from "@/data/mock";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TopNavbarProps {
  title?: string;
}

export function TopNavbar({ title }: TopNavbarProps) {
  const { theme, setTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: "New recommendation ready", time: "2m ago", unread: true },
    { id: 2, text: "Cost analysis completed", time: "1h ago", unread: true },
    { id: 3, text: "Architecture saved", time: "3h ago", unread: false },
  ];

  return (
    <header className="h-16 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm sticky top-0 z-30 flex items-center px-6 gap-4">
      {title && (
        <h1 className="text-lg font-semibold text-[var(--foreground)] hidden md:block">{title}</h1>
      )}

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search architectures, recommendations..."
            className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-[var(--border)] bg-[var(--muted)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-colors"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] relative"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500" />
          </Button>
          {notifOpen && (
            <div className="absolute right-0 top-11 w-80 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-[var(--border)]">
                <h3 className="font-semibold text-sm">Notifications</h3>
              </div>
              {notifications.map((n) => (
                <div key={n.id} className={cn("p-4 hover:bg-[var(--muted)] cursor-pointer border-b border-[var(--border)] last:border-0", n.unread && "bg-indigo-50/50 dark:bg-indigo-900/10")}>
                  <p className="text-sm text-[var(--foreground)]">{n.text}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-[var(--border)] cursor-pointer">
          <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
            {mockUser.avatar}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-[var(--foreground)] leading-none">{mockUser.name}</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{mockUser.plan} Plan</p>
          </div>
          <ChevronDown className="h-3 w-3 text-[var(--muted-foreground)] hidden md:block" />
        </div>
      </div>
    </header>
  );
}
