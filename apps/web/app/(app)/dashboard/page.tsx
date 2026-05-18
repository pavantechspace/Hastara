import type { ReactNode } from 'react';

export default function DashboardPage(): ReactNode {
  return (
    <div>
      <h1 className="font-display text-3xl text-primary">Dashboard</h1>
      <p className="mt-2 font-body text-base text-muted">
        Your readings, insights, and daily oracle — all in one place.
      </p>
    </div>
  );
}
