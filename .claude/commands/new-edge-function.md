---
description: Scaffold a Supabase Edge Function (Deno) following CLAUDE.md §11
argument-hint: <service-name>
---

Create a new Edge Function at `services/$1/index.ts` following the §11 template exactly.

Hard rules (CLAUDE.md §11):
1. JWT verification first — extract the `Authorization: Bearer ...` header and call `supabase.auth.getUser(jwt)`. Return 401 on failure.
2. Rate-limit by `user.id` using `@upstash/ratelimit` with a sensible window (default `slidingWindow(5, '1 h')` for AI-backed services).
3. Business logic isolated in a `processRequest(userId, body)` function.
4. Wrap business logic in `try { ... } catch (err) { console.error(...); return 500 }`. The `console.error` inside this catch is allowed (it's the only sanctioned log site in services).
5. All AI calls must live inside this service file or a helper it imports — never on the client.
6. Cache AI outputs by a deterministic key (`reading_id`, `oracle:<user>:<date>`, etc.) in Upstash Redis. Do not regenerate cached output.

Reference template (mirror this exactly):

```typescript
import { createClient } from '@supabase/supabase-js';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
});

Deno.serve(async (req) => {
  const jwt = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!jwt) return new Response('Unauthorized', { status: 401 });

  const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);
  if (authError || !user) return new Response('Unauthorized', { status: 401 });

  const { success } = await ratelimit.limit(user.id);
  if (!success) return new Response('Rate limit exceeded', { status: 429 });

  try {
    const body = await req.json();
    const result = await processRequest(user.id, body);
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Service error:', err);
    return new Response('Internal error', { status: 500 });
  }
});

async function processRequest(userId: string, body: unknown) {
  // implement here
}
```

After scaffolding, remind the user to:
- Add the function to deployment (`supabase functions deploy $1`).
- Set required env vars in the Supabase dashboard for the function.
