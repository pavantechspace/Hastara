# packages/api — tRPC Routers & Middleware

All backend procedures live here. Every procedure that touches data must use `protectedProcedure`.

---

## Authentication Patterns

### tRPC middleware (`packages/api/middleware/auth.middleware.ts`)

```typescript
import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../trpc';
import type { SubscriptionTier } from '@hastara/core/types';

// Verifies Clerk JWT, injects user into ctx
export const authMiddleware = middleware(async ({ ctx, next }) => {
  const { userId } = ctx.auth;
  if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

  const user = await ctx.db.query.users.findFirst({
    where: eq(users.clerkUserId, userId),
  });
  if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return next({ ctx: { ...ctx, user } });
});

export const protectedProcedure = publicProcedure.use(authMiddleware);

// Pipe after authMiddleware to enforce a minimum subscription tier
export const requireTier = (minTier: SubscriptionTier) =>
  authMiddleware.unstable_pipe(async ({ ctx, next }) => {
    const tierOrder: SubscriptionTier[] = ['free', 'mystic', 'oracle', 'sage'];
    if (tierOrder.indexOf(ctx.user.subscriptionTier) < tierOrder.indexOf(minTier)) {
      throw new TRPCError({ code: 'FORBIDDEN', message: 'Upgrade required' });
    }
    return next();
  });
```

**Context available in every `protectedProcedure`:**
- `ctx.user` — full `User` object (from DB, not Clerk)
- `ctx.db` — Drizzle ORM client
- `ctx.redis` — Upstash Redis client

### Mobile — accessing the current user

```typescript
// Always read from Zustand, never directly from Clerk
import { useAuthStore } from '@/store/auth.store';
const user = useAuthStore(s => s.user);
```

### Web — server-side auth (Next.js App Router)

```typescript
// app/(app)/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');
}
```

---

## tRPC Procedure Template

```typescript
// packages/api/routers/example.router.ts
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const exampleRouter = router({
  // Query — fetching data
  list: protectedProcedure
    .input(z.object({
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(50).default(20),
    }))
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.query.readings.findMany({
        where: eq(readings.userId, ctx.user.clerkUserId),
        orderBy: [desc(readings.createdAt)],
        limit: input.limit + 1,
        ...(input.cursor ? { where: lt(readings.id, input.cursor) } : {}),
      });
      const hasMore = items.length > input.limit;
      return {
        items: hasMore ? items.slice(0, -1) : items,
        nextCursor: hasMore ? items[input.limit - 1].id : undefined,
      };
    }),

  // Mutation — changing state
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1).max(200) }))
    .mutation(async ({ ctx, input }) => {
      if (someConditionFails) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Human-readable error for the UI',
        });
      }
      const result = await ctx.db.insert(someTable).values({
        userId: ctx.user.clerkUserId,
        name: input.name,
        createdAt: new Date().toISOString(),
      }).returning();
      return result[0];
    }),
});
```

---

## All 30 tRPC Procedure Signatures

```typescript
// READING
reading.create              → input: { mode, hand, palmImageUrl }           → output: { readingId, streamUrl }
reading.list                → input: { cursor?, limit? }                    → output: { items: ReadingListItem[], nextCursor? }
reading.byId                → input: { id }                                 → output: Reading
reading.delete              → input: { id }                                 → output: { success: boolean }
reading.share               → input: { id }                                 → output: { shareUrl: string }
reading.generateInfographic → input: { id, aspectRatio }                   → output: { infographicUrl: string }
reading.generateFutureSelf  → input: { id, portraitUrl }                   → output: { imageUrls: string[] }
reading.generatePastLife    → input: { id }                                 → output: { imageUrl, narrative: string }

// NUMEROLOGY
numerology.getProfile            → input: void                              → output: NumerologyProfile
numerology.getPersonalCycles     → input: void                              → output: { personalYear, personalMonth, personalDay, guidance }
numerology.getLifePathDetails    → input: { number: number }                → output: { title, description, strengths[], challenges[] }

// ASTROLOGY
astrology.getBirthChart          → input: { system: AstrologySystem }       → output: BirthChart
astrology.getCurrentTransits     → input: void                              → output: { transits: PlanetTransit[], moonPhase: MoonPhase }
astrology.getCompatibility       → input: { userBId?, userBBirthData? }     → output: SynastryResult

// DAILY ORACLE
dailyOracle.today                → input: void                              → output: DailyOracle
dailyOracle.history              → input: { limit?: number }                → output: DailyOracle[]
dailyOracle.getLuckyDaysCalendar → input: { month, year }                   → output: Array<{ date, luckScore, color }>

// COMPATIBILITY
compatibility.create             → input: { palmAUrl, palmBUrl, userBId? }  → output: CompatibilityReading
compatibility.list               → input: void                              → output: CompatibilityReading[]

// SUBSCRIPTION
subscription.getCurrent          → input: void                              → output: { tier, subscription?, readingsThisMonth }
subscription.cancel              → input: void                              → output: { success, effectiveDate }
subscription.pause               → input: { resumeAt: string }              → output: { success }
subscription.getReferralCode     → input: void                              → output: { code, referralUrl, successfulReferrals }

// PROFILE
profile.get                      → input: void                              → output: User
profile.update                   → input: Partial<UserUpdateFields>         → output: User
profile.getStats                 → input: void                              → output: ProfileStats
profile.exportData               → input: void                              → output: { downloadUrl, expiresAt }

// HISTORY
history.list                     → input: { cursor?, limit? }               → output: { items: ReadingListItem[], nextCursor? }
history.getAnalytics             → input: { period: '30d' | '90d' | '365d' } → output: HistoryAnalytics
history.compare                  → input: { readingAId, readingBId }        → output: { diffNarrative, readingA, readingB }

// NOTIFICATIONS
notifications.updatePreferences  → input: { time?, enabled? }              → output: { success }
```

---

## Error Handling Pattern

```typescript
import { TRPCError } from '@trpc/server';

// In procedures — map domain errors to tRPC codes
function toTRPCError(err: unknown): TRPCError {
  if (err instanceof TRPCError) return err;
  if (err instanceof Error) {
    if (err.message.includes('rate limit')) {
      return new TRPCError({ code: 'TOO_MANY_REQUESTS', message: err.message });
    }
    if (err.message.includes('not found')) {
      return new TRPCError({ code: 'NOT_FOUND', message: err.message });
    }
  }
  return new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });
}

// In mobile components — FORBIDDEN always navigates to paywall
function handleError(error: unknown, toast: ToastFn) {
  if (error instanceof TRPCClientError) {
    if (error.data?.code === 'FORBIDDEN') { router.push('/premium'); return; }
    toast.error(error.message);
    return;
  }
  toast.error('Something went wrong. Please try again.');
}
```

---

## Testing Patterns

```typescript
// Unit test — packages/core/**/*.test.ts
import { describe, it, expect } from 'vitest';
import { calculateLifePathNumber } from './pythagorean';

describe('calculateLifePathNumber', () => {
  it('returns correct life path for a known DOB', () => {
    expect(calculateLifePathNumber('1990-07-15')).toBe(5);
  });
  it('handles master number 11', () => {
    expect(calculateLifePathNumber('1979-02-29')).toBe(11);
  });
});
```

```typescript
// Integration test — packages/api/routers/*.test.ts
import { describe, it, expect } from 'vitest';
import { createTestCaller } from '../test-utils';

describe('reading.list', () => {
  it('returns only readings belonging to the current user', async () => {
    const caller = createTestCaller({ userId: 'user_test_123' });
    const result = await caller.reading.list({ limit: 10 });
    expect(result.items.every(r => r.userId === 'user_test_123')).toBe(true);
  });
});
```
