export default function AppLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  // TODO: Add Clerk auth check — redirect to /sign-in if not authenticated
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border bg-surface px-4 py-6">
        <span className="font-display text-xl text-primary">Hastara</span>
        <nav className="mt-8 flex flex-col gap-2">
          <a
            href="/dashboard"
            className="rounded-lg px-3 py-2 font-body text-sm text-charcoal hover:bg-cream"
          >
            Dashboard
          </a>
          <a
            href="/settings"
            className="rounded-lg px-3 py-2 font-body text-sm text-muted hover:bg-cream"
          >
            Settings
          </a>
        </nav>
      </aside>
      <main className="flex-1 bg-background p-8">{children}</main>
    </div>
  );
}
