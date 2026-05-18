---
description: Scaffold a new tRPC procedure following CLAUDE.md §9 exactly
argument-hint: <router> <procedure-name> [query|mutation]
---

Create a new tRPC procedure in `packages/api/routers/$1.router.ts` named `$2`.
If a third argument is `mutation`, scaffold a `.mutation(...)`; otherwise a `.query(...)`.

Hard rules (CLAUDE.md §9):
1. Use `protectedProcedure` (auth + user injection), never `publicProcedure`, unless the user explicitly says so.
2. Validate input with a Zod schema. No `z.any()`. No `z.unknown()` without a follow-up guard.
3. Scope every DB read/write by `ctx.user.clerkUserId`.
4. Throw `TRPCError` with a UI-readable `message` on business-rule failures.
5. Never call AI APIs from a procedure — proxy to an Edge Function in `services/`.
6. Never check subscription tier on the client only. If the procedure is gated, use the `requireTier(<tier>)` middleware (CLAUDE.md §8 / §13).

Steps:
1. Read `packages/api/routers/$1.router.ts`. If it doesn't exist, run `/new-router $1` first and stop.
2. Add the procedure to the existing `router({ ... })` export, preserving alphabetical order.
3. Import any domain types from `packages/core/types/index.ts` — never redefine them.
4. If the procedure returns a list, follow the cursor-pagination shape from §9 (`{ items, nextCursor }`).
5. After writing, run `pnpm --filter api typecheck` and report any errors back to the user.

Reference template (mirror this exactly):

```typescript
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
    });
    const hasMore = items.length > input.limit;
    return {
      items: hasMore ? items.slice(0, -1) : items,
      nextCursor: hasMore ? items[input.limit - 1].id : undefined,
    };
  }),
```

Do NOT add unrelated changes. Do NOT touch the mobile or web app. Only modify the router file (and `packages/api/index.ts` if a new router was just created).
