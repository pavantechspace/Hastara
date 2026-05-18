import { TRPCError } from '@trpc/server';
import { middleware } from '../trpc';
import type { ReadingMode } from '@hastara/core/types';
import { MODE_MIN_TIER } from '@hastara/core/subscription/features';

export const requireModeAccess = (mode: ReadingMode) =>
  middleware(async ({ ctx, next }) => {
    const tierOrder = ['free', 'mystic', 'oracle', 'sage'] as const;
    const minTier = MODE_MIN_TIER[mode];
    const userTier = ctx.user?.subscriptionTier ?? 'free';

    if (tierOrder.indexOf(userTier) < tierOrder.indexOf(minTier)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `${mode} mode requires ${minTier} tier or above`,
      });
    }

    return next();
  });
