---
description: Create a new tRPC router file and wire it into the AppRouter export
argument-hint: <router-name>
---

Create a new tRPC router at `packages/api/routers/$1.router.ts` and register it.

Steps:
1. If `packages/api/routers/$1.router.ts` already exists, stop and report.
2. Write the new router using this exact skeleton:

```typescript
import { router } from '../trpc';

export const $1Router = router({
  // procedures go here — add via /new-procedure $1 <name>
});
```

3. Open `packages/api/index.ts` (the `AppRouter` export). Add the import and merge the router into the `appRouter` object, preserving alphabetical order. Do NOT remove any other routers.
4. Run `pnpm --filter api typecheck`. Report any errors.

Hard rules:
- File must be `$1.router.ts` — kebab-case file, camelCase exported `Router` symbol.
- Never use `publicProcedure` by default; the procedures themselves choose `protectedProcedure` vs `publicProcedure`.
- Do not create the directory structure if it doesn't exist — instead stop and tell the user the `packages/api` workspace isn't initialised yet.
