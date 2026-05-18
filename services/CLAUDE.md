# services/ — Supabase Edge Functions (Deno + TypeScript)

All services run on Deno. No Node.js APIs. Use `Deno.env.get('VAR')` — never `process.env`.

---

## Edge Function Template

```typescript
// services/reading-service/index.ts
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
  // Auth
  const jwt = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!jwt) return new Response('Unauthorized', { status: 401 });

  const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);
  if (authError || !user) return new Response('Unauthorized', { status: 401 });

  // Rate limit
  const { success } = await ratelimit.limit(user.id);
  if (!success) return new Response('Rate limit exceeded', { status: 429 });

  // Business logic
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
```

---

## Environment Variables (Deno — server-only)

Full list in `.env.example` at repo root. Read via `Deno.env.get('VAR_NAME')!`.

| Category | Variables |
|----------|-----------|
| Supabase | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`, `SUPABASE_DB_URL` |
| OpenAI | `OPENAI_API_KEY`, `OPENAI_ORG_ID` |
| Anthropic | `ANTHROPIC_API_KEY` |
| BFL (FLUX.2 Pro) | `BFL_API_KEY` |
| ElevenLabs | `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID_SAGE`, `ELEVENLABS_VOICE_ID_MYSTIC`, `ELEVENLABS_VOICE_ID_ORACLE` |
| RevenueCat | `REVENUECAT_SERVER_API_KEY`, `REVENUECAT_WEBHOOK_SECRET` |
| Stripe | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ORACLE_MONTHLY`, `STRIPE_PRICE_ORACLE_ANNUAL`, `STRIPE_PRICE_SAGE_MONTHLY`, `STRIPE_PRICE_SAGE_ANNUAL` |
| Upstash Redis | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |
| Cloudflare R2 | `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_R2_BUCKET_NAME`, `CLOUDFLARE_R2_ACCESS_KEY_ID`, `CLOUDFLARE_R2_SECRET_ACCESS_KEY`, `CLOUDFLARE_R2_PUBLIC_URL` |
| Astronomy API | `ASTRONOMY_API_APPLICATION_ID`, `ASTRONOMY_API_APPLICATION_SECRET` |
| Resend | `RESEND_API_KEY`, `EMAIL_FROM` |
| App URLs | `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`, `EXPO_PUBLIC_API_URL` |

---

## Service Catalogue

| Service directory | Purpose | Rate limit |
|-------------------|---------|-----------|
| `reading-service/` | GPT-5 Vision extraction → Claude Opus 4.7 synthesis → cache result in Redis by `reading_id` | 5 scans/hour per user |
| `numerology-service/` | Compute full `NumerologyProfile` from DOB + name | None |
| `astrology-service/` | Birth chart (western + vedic), current transits, mahadasha | None |
| `daily-oracle-service/` | Overnight batch: generate `DailyOracle` for all users with `notificationsEnabled` | Cron — not user-facing |
| `compatibility-service/` | Two-palm VisionJSON + numerology → `CompatibilityReading` | 3 readings/day per user |
| `subscription-service/` | RevenueCat webhook handler + Stripe webhook handler — syncs tier to DB | — |
| `notification-service/` | Scheduled push notifications via Expo Push API | — |
| `image-generation-service/` | FLUX.2 Pro — future self portrait, past life portrait, soul mandala | 2 images/day per user |

---

## AI Model Usage per Service

| Service | Vision model | Synthesis model | Image model | Voice model |
|---------|-------------|-----------------|-------------|-------------|
| reading-service | GPT-5 Vision (`OPENAI_API_KEY`) | Claude Opus 4.7 (`ANTHROPIC_API_KEY`) | — | ElevenLabs v3 (Oracle+) |
| daily-oracle-service | — | Claude Opus 4.7 | — | — |
| compatibility-service | — | Claude Opus 4.7 | — | — |
| image-generation-service | — | — | FLUX.2 Pro (`BFL_API_KEY`) | — |

---

## Caching Rules

- All reading narratives are cached in Upstash Redis by `reading_id`
- Check Redis before calling any AI model: `await redis.get(`reading:${readingId}:narrative`)`
- Daily oracle cached by `userId:date` key — regenerate only if missing
- Cache TTL for readings: indefinite (immutable once generated)
- Cache TTL for daily oracle: 26 hours (ensure next day regenerates)

---

## Deploy

```bash
# Deploy single function
supabase functions deploy reading-service

# Deploy all functions
supabase functions deploy --all
```
