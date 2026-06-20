"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { MobileDrawer } from "@/components/MobileDrawer";
import { FloatingAssistantButton } from "@/components/FloatingAssistantButton";
import { useAppStore } from "@/lib/store";
import { pageTitles } from "@/lib/nav-items";
import { cn } from "@/lib/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sidebarCollapsed } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeKey = Object.keys(pageTitles).find((k) => pathname?.startsWith(k));
  const meta = activeKey ? pageTitles[activeKey] : { title: "CebulaCore", breadcrumb: "" };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-grid pointer-events-none fixed inset-0 opacity-[0.15]" />
      <Sidebar />
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <TopNavbar title={meta.title} breadcrumb={meta.breadcrumb} onMobileMenu={() => setMobileOpen(true)} />
      <main
        className={cn(
          "relative min-h-[calc(100vh-4rem)] px-4 py-6 transition-all duration-300 sm:px-6 lg:px-8",
          sidebarCollapsed ? "md:ml-[76px]" : "md:ml-64"
        )}
      >
        {children}
      </main>
      <FloatingAssistantButton />
    </div>
  );
}
