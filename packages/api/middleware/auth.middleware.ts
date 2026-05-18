import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../trpc';
import type { SubscriptionTier } from '@hastara/core/types';

export const authMiddleware = middleware(async ({ ctx, next }) => {
  const { userId } = ctx.auth;
  if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

  const user = ctx.user;
  if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return next({ ctx: { ...ctx, user } });
});

export const protectedProcedure = publicProcedure.use(authMiddleware);

export const requireTier = (minTier: SubscriptionTier) =>
  authMiddleware.unstable_pipe(async ({ ctx, next }) => {
    const tierOrder: SubscriptionTier[] = ['free', 'mystic', 'oracle', 'sage'];
    if (tierOrder.indexOf(ctx.user.subscriptionTier) < tierOrder.indexOf(minTier)) {
      throw new TRPCError({ code: 'FORBIDDEN', message: 'Upgrade required' });
    }
    return next();
  });
