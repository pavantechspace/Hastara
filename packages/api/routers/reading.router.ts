import { z } from 'zod';
import { router } from '../trpc';
import { protectedProcedure } from '../middleware/auth.middleware';

export const readingRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        mode: z.enum(['standard', 'love', 'career', 'health', 'spiritual', 'crystal_ball']),
        hand: z.enum(['left', 'right', 'both']),
        palmImageUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),

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

  byId: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),

  share: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),

  generateInfographic: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        aspectRatio: z.enum(['1:1', '9:16', '4:5']),
      }),
    )
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),

  generateFutureSelf: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        portraitUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),

  generatePastLife: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      throw new Error('Not implemented');
    }),
});
