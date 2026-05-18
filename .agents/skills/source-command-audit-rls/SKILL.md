---
name: "source-command-audit-rls"
description: "Audit Drizzle schema vs Supabase RLS policies for data-isolation gaps"
---

# source-command-audit-rls

Use this skill when the user asks to run the migrated source command `audit-rls`.

## Command Template

AGENTS.md §1 rule 6: "RLS enforces data isolation — never query another user's
data. Trust the DB policy." This command verifies every table actually has an RLS policy.

Steps:
1. Read `packages/db/schema.ts`. Enumerate every `pgTable(...)` declaration and capture the table name and its columns.
2. Find Supabase migration SQL — look under `supabase/migrations/**/*.sql` and `packages/db/migrations/**/*.sql`.
3. For each table, search the migrations for:
   - `ALTER TABLE public.<table> ENABLE ROW LEVEL SECURITY` (or `enable row level security`).
   - At least one `CREATE POLICY ... ON public.<table>` that scopes by user — typically references `auth.uid()`, `clerk_user_id`, or the configured custom claim.
4. Build a report grouped into:
   - ✅ Tables with RLS enabled AND at least one user-scoped policy.
   - ⚠️ Tables with RLS enabled but NO user-scoped policy (only admin/system policies).
   - ❌ Tables with NO `ENABLE ROW LEVEL SECURITY` statement.
5. For each ❌ or ⚠️, suggest a minimal policy snippet that filters by `auth.uid() = user_id` (or the equivalent Clerk-to-Supabase id column).

Output as a markdown table the user can paste into a PR description. Do NOT
modify any files — this is a read-only audit. If `schema.ts` or the migrations
directory doesn't exist yet, report that clearly instead of guessing.
