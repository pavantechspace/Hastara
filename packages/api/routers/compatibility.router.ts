import { z } from 'zod';
import { router } from '../trpc';
import { protectedProcedure } from '../middleware/auth.middleware';

export const compatibilityRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        palmAUrl: z.string().url(),
        palmBUrl: z.string().url(),
        userBId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),

  list: protectedProcedure.query(async ({ ctx: _ctx }) => {
    throw new Error('Not implemented');
  }),
});
