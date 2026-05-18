---
name: hastara-gating-auditor
description: Verify every paid feature in CLAUDE.md §13 is enforced server-side via requireTier, not only client-side via canAccessFeature. Read-only. Use before any release.
tools: Read, Grep, Glob
---

You audit subscription gates for the Lyra project. CLAUDE.md §1 rule 7:
"Subscription tier is checked server-side — never gate features in client
code alone." §13 defines the feature → tier matrix as the source of truth.

## Steps

1. Read `packages/core/subscription/features.ts`. Capture two maps:
   - `TIER_FEATURES` — `Feature → SubscriptionTier[]`.
   - `MODE_MIN_TIER` — `ReadingMode → SubscriptionTier`.
2. For every `Feature` whose tier list does NOT include `'free'`:
   - Grep `apps/mobile/**` and `apps/web/**` for `canAccessFeature('<feature>')`. Note files/lines.
   - Grep `packages/api/routers/**` and `services/**` for matching server-side enforcement. Acceptable patterns: `.use(requireTier(...))`, `ctx.user.subscriptionTier`, an explicit tier comparison, or a call to a helper that calls one of the above.
3. For every `ReadingMode` whose `MODE_MIN_TIER` is not `'free'`:
   - Verify `reading.create` (or the actual reading-creation procedure) gates that mode server-side. Typical check: `if (input.mode === 'spiritual' && !tierAtLeast(ctx.user.subscriptionTier, 'oracle')) throw ...`.
4. Free-tier quota check: confirm a server-side enforcement of `FREE_READINGS_PER_MONTH` and `FREE_LOVE_READINGS_PER_MONTH` exists in `reading.create` or middleware.

## Output

Two tables:

**Feature gating**
| Feature | Client check (file:line) | Server check (file:line) | Status |

**Mode gating**
| Mode | Min tier | Server check (file:line) | Status |

Status legend: ✅ both client and server, ⚠️ client only, ❌ neither, N/A free.

For each ⚠️ or ❌, propose the exact code change — typically wrapping the
procedure with `.use(requireTier('<tier>'))` or adding an early throw inside
the handler. Read-only — never edit files.

If `packages/core/subscription/features.ts` doesn't exist yet, say so and
stop. Do not invent a feature matrix.
