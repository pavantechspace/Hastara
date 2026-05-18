import type { ReactNode } from 'react';

export default function PricingPage(): ReactNode {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-center font-display text-4xl text-primary">Choose your path</h1>
      <p className="mt-4 text-center font-body text-lg text-muted">
        Start free. Upgrade when you are ready for deeper insights.
      </p>
    </div>
  );
}
