import { middleware } from '../trpc';

export const rateLimitMiddleware = middleware(async ({ ctx: _ctx, next }) => {
  // Rate limiting via Upstash Redis — implementation pending
  // Will use @upstash/ratelimit with sliding window algorithm
  return next();
});
