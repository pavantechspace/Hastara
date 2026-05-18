import type { ReactNode } from 'react';

export default function LandingPage(): ReactNode {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
      <h1 className="font-display text-5xl text-primary">
        Your palm holds a story.
        <br />
        <span className="text-gold">Let Hastara read it.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-muted">
        AI-powered palmistry, numerology, and Vedic astrology — synthesised into one
        personalised reading. Available on iOS, Android, and web.
      </p>
    </div>
  );
}
