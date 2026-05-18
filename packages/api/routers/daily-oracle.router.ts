import { z } from 'zod';
import { router } from '../trpc';
import { protectedProcedure } from '../middleware/auth.middleware';

export const dailyOracleRouter = router({
  today: protectedProcedure.query(async ({ ctx: _ctx }) => {
    throw new Error('Not implemented');
  }),

  history: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(90).default(30) }))
    .query(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),

  getLuckyDaysCalendar: protectedProcedure
    .input(
      z.object({
        month: z.number().min(1).max(12),
        year: z.number().min(2024).max(2030),
      }),
    )
    .query(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),
});
