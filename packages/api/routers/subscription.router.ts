import { z } from 'zod';
import { router } from '../trpc';
import { protectedProcedure } from '../middleware/auth.middleware';

export const subscriptionRouter = router({
  getCurrent: protectedProcedure.query(async ({ ctx: _ctx }) => {
    throw new Error('Not implemented');
  }),

  cancel: protectedProcedure.mutation(async ({ ctx: _ctx }) => {
    throw new Error('Not implemented');
  }),

  pause: protectedProcedure
    .input(z.object({ resumeAt: z.string().datetime() }))
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),

  getReferralCode: protectedProcedure.query(async ({ ctx: _ctx }) => {
    throw new Error('Not implemented');
  }),
});
