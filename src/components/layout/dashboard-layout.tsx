import { Sidebar } from "./sidebar";
import { TopNavbar } from "./top-navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Sidebar />
      <div className="lg:pl-64 transition-all duration-300">
        <TopNavbar title={title} />
        <main className="p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
