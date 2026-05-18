import { z } from 'zod';
import { router } from '../trpc';
import { protectedProcedure } from '../middleware/auth.middleware';

export const astrologyRouter = router({
  getBirthChart: protectedProcedure
    .input(z.object({ system: z.enum(['western', 'vedic']) }))
    .query(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),

  getCurrentTransits: protectedProcedure.query(async ({ ctx: _ctx }) => {
    throw new Error('Not implemented');
  }),

  getCompatibility: protectedProcedure
    .input(
      z.object({
        userBId: z.string().optional(),
        userBBirthData: z
          .object({
            dob: z.string(),
            birthTime: z.string().optional(),
            birthLocation: z.object({
              lat: z.number(),
              lng: z.number(),
              city: z.string(),
              country: z.string(),
              countryCode: z.string(),
              timezone: z.string(),
            }),
          })
          .optional(),
      }),
    )
    .query(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),
});
