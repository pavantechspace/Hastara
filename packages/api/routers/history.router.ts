import { z } from 'zod';
import { router } from '../trpc';
import { protectedProcedure } from '../middleware/auth.middleware';

export const historyRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        cursor: z.string().uuid().optional(),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),

  getAnalytics: protectedProcedure
    .input(z.object({ period: z.enum(['30d', '90d', '365d']) }))
    .query(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),

  compare: protectedProcedure
    .input(
      z.object({
        readingAId: z.string().uuid(),
        readingBId: z.string().uuid(),
      }),
    )
    .query(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),
});
