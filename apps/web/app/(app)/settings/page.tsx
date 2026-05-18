import type { ReactNode } from 'react';

export default function SettingsPage(): ReactNode {
  return (
    <div>
      <h1 className="font-display text-3xl text-primary">Settings</h1>
      <p className="mt-2 font-body text-base text-muted">
        Manage your account, notifications, and subscription.
      </p>
    </div>
  );
}
