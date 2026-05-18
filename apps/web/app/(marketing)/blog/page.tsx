import type { ReactNode } from 'react';

export default function BlogPage(): ReactNode {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="font-display text-4xl text-primary">Blog</h1>
      <p className="mt-4 font-body text-lg text-muted">
        Insights on palmistry, numerology, and astrology.
      </p>
    </div>
  );
}
