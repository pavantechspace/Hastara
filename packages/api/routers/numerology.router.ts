import { z } from 'zod';
import { router } from '../trpc';
import { protectedProcedure } from '../middleware/auth.middleware';

export const numerologyRouter = router({
  getProfile: protectedProcedure.query(async ({ ctx: _ctx }) => {
    throw new Error('Not implemented');
  }),

  getPersonalCycles: protectedProcedure.query(async ({ ctx: _ctx }) => {
    throw new Error('Not implemented');
  }),

  getLifePathDetails: protectedProcedure
    .input(z.object({ number: z.number().min(1).max(33) }))
    .query(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),
});
