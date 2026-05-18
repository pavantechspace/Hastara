---
description: Run all pre-release audits — gating, RLS, and TypeScript strictness
---

Run these three auditors sequentially and produce a consolidated release readiness report.

## Step 1 — Subscription Gating Audit

Use the `hastara-gating-auditor` agent.

Verify every paid feature in `packages/core/subscription/features.ts` (TIER_FEATURES + MODE_MIN_TIER) is enforced server-side via `requireTier` in `packages/api/routers/` or `services/`. Client-side `canAccessFeature` calls alone do not count.

## Step 2 — RLS Security Audit

Use the `hastara-rls-auditor` agent.

Cross-check every `pgTable` in `packages/db/schema.ts` against migration SQL. Every table holding user data must have `ENABLE ROW LEVEL SECURITY` and at least one `CREATE POLICY` scoped to `auth.uid()`.

## Step 3 — TypeScript Strictness Sweep

Use the `hastara-type-strictness-reviewer` agent.

Sweep all `.ts` and `.tsx` files (excluding `node_modules`, `.next`, `.expo`, `dist`) for:
- `any` type usage (`: any`, `as any`, `<any>`)
- `@ts-ignore` or `@ts-nocheck` comments
- `.js` source files in `apps/`, `packages/`, `services/`
- `console.log/warn/error` outside `*.test.*` files

## Output

Produce a single consolidated table:

| Audit | Status | Issues found |
|-------|--------|--------------|
| Gating | ✅ / ⚠️ / ❌ | list any ungated features |
| RLS | ✅ / ⚠️ / ❌ | list any unprotected tables |
| Type strictness | ✅ / ⚠️ / ❌ | list files with violations |

**Release verdict:**
- **READY TO SHIP** — all three audits are ✅
- **BLOCKED** — one or more audits are ⚠️ or ❌ (list what must be fixed)
