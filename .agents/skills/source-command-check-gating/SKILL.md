---
name: "source-command-check-gating"
description: "Verify subscription gates are enforced server-side, not only on the client"
---

# source-command-check-gating

Use this skill when the user asks to run the migrated source command `check-gating`.

## Command Template

AGENTS.md §1 rule 7: "Subscription tier is checked server-side — never gate
features in client code alone." §13 defines the feature matrix. This command
verifies every paid feature has a server-side guard.

Steps:
1. Read `packages/core/subscription/features.ts` (the §13 matrix) to enumerate paid features and modes.
2. For each `Feature` key whose tier list excludes `'free'`:
   - Grep `apps/mobile/**` and `apps/web/**` for usages of `canAccessFeature('<feature>')`. Note the file + line.
   - Grep `packages/api/routers/**` and `services/**` for matching server-side enforcement: `requireTier(...)`, `ctx.user.subscriptionTier`, or an explicit tier comparison.
3. For each `ReadingMode` whose `MODE_MIN_TIER` value isn't `'free'`:
   - Confirm `reading.create` (or wherever modes are dispatched) checks tier server-side before invoking the service.
4. Output a table with columns: `Feature | Client check? | Server check? | Status`.
   - Status is ✅ when both are present, ⚠️ when only client, ❌ when neither.
5. For every ⚠️ or ❌, propose the exact `requireTier(...)` middleware addition needed in the procedure.

Read-only. Do not modify any files. If the relevant workspaces don't exist
yet, report which paths are missing and stop.
