import { LayoutDashboard, Sparkles, BarChart3, Bot, GitBranch, UserCircle } from "lucide-react";

export const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/recommendations", label: "Recommendations", icon: Sparkles },
  { href: "/cost-comparison", label: "Cost Comparison", icon: BarChart3 },
  { href: "/assistant", label: "AI Assistant", icon: Bot },
  { href: "/architecture", label: "Architecture Viewer", icon: GitBranch },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export const pageTitles: Record<string, { title: string; breadcrumb: string }> = {
  "/dashboard": { title: "Dashboard", breadcrumb: "CebulaCore" },
  "/wizard": { title: "Requirement Wizard", breadcrumb: "CebulaCore" },
  "/recommendations": { title: "Recommendations", breadcrumb: "CebulaCore" },
  "/cost-comparison": { title: "Cost Comparison", breadcrumb: "CebulaCore" },
  "/assistant": { title: "AI Assistant", breadcrumb: "CebulaCore" },
  "/architecture": { title: "Architecture Viewer", breadcrumb: "CebulaCore" },
  "/profile": { title: "Profile", breadcrumb: "CebulaCore" },
};
