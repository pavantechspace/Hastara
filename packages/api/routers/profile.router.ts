import { z } from 'zod';
import { router } from '../trpc';
import { protectedProcedure } from '../middleware/auth.middleware';

export const profileRouter = router({
  get: protectedProcedure.query(async ({ ctx: _ctx }) => {
    throw new Error('Not implemented');
  }),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(200).optional(),
        locale: z.string().optional(),
        notificationTime: z.string().optional(),
        notificationsEnabled: z.boolean().optional(),
        dominantHand: z.enum(['left', 'right']).optional(),
      }),
    )
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),

  getStats: protectedProcedure.query(async ({ ctx: _ctx }) => {
    throw new Error('Not implemented');
  }),

  exportData: protectedProcedure.mutation(async ({ ctx: _ctx }) => {
    throw new Error('Not implemented');
  }),
});
