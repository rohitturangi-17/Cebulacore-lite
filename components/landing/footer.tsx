import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-full bg-cebula-gradient shadow-glow-sm" />
            <span className="font-display text-base font-semibold text-white">CebulaCore</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-ink-muted">
            AI-powered cloud architecture advisor. Advisory-only — never accesses or modifies your
            cloud resources.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-ink-muted/70">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><Link href="/recommendations" className="hover:text-white">Recommendations</Link></li>
              <li><Link href="/cost-comparison" className="hover:text-white">Cost Comparison</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-ink-muted/70">Account</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li><Link href="/auth/login" className="hover:text-white">Sign in</Link></li>
              <li><Link href="/auth/register" className="hover:text-white">Create account</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl text-xs text-ink-muted/50">
        © 2026 CebulaCore Lite. A frontend demonstration project — recommendations shown are illustrative.
      </p>
    </footer>
  );
}
