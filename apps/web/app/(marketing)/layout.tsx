export default function MarketingLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-surface px-6 py-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="font-display text-2xl text-primary">Hastara</span>
          <div className="flex items-center gap-6">
            <a href="/pricing" className="font-body text-sm text-muted hover:text-charcoal">
              Pricing
            </a>
            <a href="/blog" className="font-body text-sm text-muted hover:text-charcoal">
              Blog
            </a>
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
