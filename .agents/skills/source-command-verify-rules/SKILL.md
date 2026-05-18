---
name: "source-command-verify-rules"
description: "One-shot scan for AGENTS.md §1 Critical Rule violations across the repo"
---

# source-command-verify-rules

Use this skill when the user asks to run the migrated source command `verify-rules`.

## Command Template

Scan the whole repo for the rules most often broken. The PreToolUse hook
blocks new violations, but pre-existing ones can still linger.

Run all checks in parallel using Grep, then collate a single report.

1. **Rule 1 — no `any`.** Grep `: any` and `as any` across `**/*.{ts,tsx}` excluding `**/*.d.ts`. Report file:line for each hit.
2. **Rule 2 — no JavaScript.** Glob for `**/*.{js,jsx}` excluding `node_modules`, `.turbo`, `dist`, `build`, hook scripts under `.Codex/hooks/` (those are intentionally ESM), and config files at the repo root (`.eslintrc.js`, `*.config.js`).
3. **Rule 3 — no hardcoded env vars.** Grep for the same key patterns the PreToolUse hook checks: `sk-ant-api03-`, `sk-proj-`, `pk_live_`, `sk_live_`, `whsec_`, JWT prefixes (`eyJhbGciOi[A-Za-z0-9_=-]{20,}\.`), `phc_`. Exclude `.env.example` and markdown.
4. **Rule 4 — no AI calls on the client.** Grep `apps/mobile/**` and `apps/web/**` (excluding API routes and Edge Functions) for direct imports of `openai`, `@anthropic-ai/sdk`, `anthropic`, `elevenlabs`. Report any hit as critical.
5. **Rule 6 — no unscoped DB queries.** Grep `packages/api/**` and `services/**` for `db.query.<table>.findMany(` or `.select(` without an adjacent `where:` clause referencing `userId`, `clerkUserId`, or `ctx.user.*`. This is heuristic; flag for human review rather than asserting violation.
6. **Rule 8 — no `console.log` in prod.** Grep `console.(log|error|warn|info|debug)` across `apps/**`, `packages/**`, `services/**`. Exclude `*.test.ts*`, `test-utils/`, `.Codex/hooks/`, and Edge Function `catch` blocks (the §11 template explicitly allows one `console.error` in the final catch).

Output one markdown section per rule, with file:line links. Finish with a
one-line summary: total violations and which rule has the most. Read-only —
do not modify any files.
