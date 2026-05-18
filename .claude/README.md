# `.claude/` — Hastara-specific Claude Code configuration

This folder configures Claude Code for the Hastara repo. Everything here is an
**active enforcement and acceleration layer** over `CLAUDE.md`. New contributors
should read this once, then forget about it — the slash commands, subagents,
and hooks just work.

## Layout

```
.claude/
├── settings.json              committed team settings (hooks, perms, env)
├── settings.local.json        local overrides (gitignored)
├── .gitignore                 ignores settings.local.json + worktrees/
├── README.md                  this file
├── hooks/                     Node ESM scripts invoked by settings.json
│   ├── block-violations.mjs       PreToolUse — blocks console.log / any / hardcoded keys
│   ├── typecheck-on-write.mjs     PostToolUse — advisory pnpm typecheck on the touched workspace
│   ├── inject-rules-reminder.mjs  UserPromptSubmit — one-line CLAUDE.md §1 reminder
│   └── session-scope.mjs          SessionStart — lists workspaces changed vs main
├── commands/                  custom slash commands (see below)
└── agents/                    project-specific subagents (see below)
```

## Slash commands

Type `/` in Claude Code or run from the CLI.

| Command | What it does |
|---|---|
| `/new-procedure <router> <name>` | Scaffolds a tRPC query or mutation matching CLAUDE.md §9. |
| `/new-router <name>` | Scaffolds a tRPC router file and wires it into `packages/api/index.ts`. |
| `/new-screen <route>` | Scaffolds an Expo Router screen with the standard loading / error / main pattern (§10). |
| `/new-edge-function <name>` | Scaffolds a Deno Edge Function with JWT verify + rate limit (§11). |
| `/new-prompt <mode>` | Scaffolds an AI prompt template with the §12 constraints block. |
| `/audit-rls` | Cross-checks `packages/db/schema.ts` against Supabase RLS policy SQL. |
| `/check-gating` | Flags client-only subscription gates that aren't enforced server-side (§1.7, §13). |
| `/verify-rules` | One-shot scan for `console.log`, `: any`, hardcoded keys, `.js`/`.jsx` files. |

## Subagents

Invoke with `@<name>` or via the `Agent` tool.

| Agent | Role |
|---|---|
| `hastara-prompt-reviewer` | Reads any `*.prompt.ts` and checks against §12 (no medical, no fatalism, no specific dates). |
| `hastara-trpc-builder` | Generates new tRPC procedures matching §9. |
| `hastara-rls-auditor` | Cross-checks Drizzle schema against Supabase RLS policies. |
| `hastara-gating-auditor` | Verifies §13 features are gated server-side, not only on the client. |
| `hastara-type-strictness-reviewer` | Greps for `: any`, `@ts-ignore`, `.js`/`.jsx` files, stray `console.*`. |

## Hooks — what they block / surface

- **PreToolUse on Edit / Write / MultiEdit** rejects any new content that:
  - Calls `console.log` / `console.error` outside `*.test.ts*` or `test-utils/`.
  - Uses `: any` or `as any` outside `*.d.ts`.
  - Contains hardcoded API keys (Anthropic, OpenAI, Stripe, Supabase JWT, PostHog) anywhere except `.env.example`.
- **PostToolUse on Edit / Write** of any `*.ts` / `*.tsx` runs `pnpm --filter <workspace> typecheck` and surfaces failures (non-blocking).
- **UserPromptSubmit** prepends a one-line reminder of the §1 rules most often broken.
- **SessionStart** prints which workspaces have changed since `main` so the agent knows the working scope.

To bypass a hook intentionally (e.g. test files using `console.log`), name your
file `*.test.ts` or place it under `test-utils/` — the hook recognises these.

## Local overrides

`settings.local.json` is gitignored. Use it for:
- Personal `permissions.allow` entries you don't want to push on the team.
- Local-only MCP servers (write-capable Supabase MCP, Stripe MCP) using your
  own keys read from your environment.

Never commit secrets. Never copy `.env` values into `settings.local.json`.

## Adding a new command or agent

1. Drop a markdown file under `commands/` or `agents/` with the standard
   frontmatter (`name`, `description`, and `tools` for agents).
2. The body should cite the relevant `CLAUDE.md` section number and inline
   the template block — CLAUDE.md remains the single source of truth.
3. Open a new Claude Code session to pick it up; no restart of the daemon
   is required.
