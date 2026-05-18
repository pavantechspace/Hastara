# CLAUDE.md — Hastara Project Context

> Read automatically every session. Core rules and project-wide conventions live here.
> Package/app-specific patterns auto-load from subdirectory CLAUDE.mds when you work there.

---

## 1. CRITICAL RULES (read before writing any code)

1. **TypeScript strict mode always.** Zero `any` types. Use `unknown` + type guards instead.
2. **No JavaScript files anywhere** — every file is `.ts` or `.tsx`.
3. **Never hardcode env vars** — always read from `process.env.VARIABLE_NAME`. See `.env.example` for all names and `§6` for service groups.
4. **All AI calls go through Edge Functions** — no AI API keys in any client bundle.
5. **All backend logic is server-side** — tRPC procedures, not client-side API calls.
6. **RLS enforces data isolation** — never query another user's data. Trust the DB policy.
7. **Subscription tier is checked server-side** — never gate features in client code alone.
8. **No `console.log` in production code** — use structured logging via `logger.ts`.
9. **Cache AI outputs** — never regenerate a reading that has been cached by `reading_id`.
10. **Follow patterns in subdirectory CLAUDE.mds exactly** — do not invent new patterns.

---

## 2. Project Overview

**Hastara** is a multi-platform AI-powered palmistry, numerology, and astrology app.

- **iOS + Android**: React Native + Expo SDK 51 (Turborepo `apps/mobile/`)
- **Web**: Next.js 15 App Router (Turborepo `apps/web/`)
- **Backend**: Supabase Edge Functions — Deno + TypeScript (Turborepo `services/`)
- **Shared logic**: `packages/core`, `packages/api`, `packages/ui`, `packages/db`

**Core differentiator**: Triple Convergence — palmistry + numerology + Vedic astrology
synthesised into one reading by GPT-5 Vision (feature extraction) + Claude Opus 4.7 (narrative).

**Docs**:

- `Docs/SRS-HASTARA-001.docx` — requirements
- `Docs/TDD-HASTARA-001.docx` — architecture + data model
- `Docs/PROJ-HASTARA-001.docx` — product vision + market analysis

---

## 3. Repository Structure

```
hastara/
├── apps/
│   ├── mobile/                   # React Native + Expo SDK 51
│   │   ├── app/                  # expo-router file-based routes
│   │   │   ├── (tabs)/           # Home, daily, history, profile, premium
│   │   │   ├── reading/[id].tsx  # Full reading result screen
│   │   │   ├── advanced-analysis.tsx  # Infographic export — Oracle+
│   │   │   ├── compatibility.tsx      # Two-palm compatibility scan
│   │   │   ├── onboarding/       # Steps 1–5 (welcome → paywall intro)
│   │   │   └── auth/             # sign-in, sign-up
│   │   ├── components/           # camera/, reading/, daily/ sub-groups
│   │   ├── lib/                  # camera, notifications, revenuecat, mediapipe
│   │   ├── store/                # auth.store, subscription.store, reading.store
│   │   └── hooks/
│   └── web/                      # Next.js 15 App Router
│       └── app/
│           ├── (marketing)/      # Landing, pricing, blog
│           ├── (app)/            # dashboard, settings
│           └── api/              # webhooks/clerk|stripe|revenuecat, trpc/
├── packages/
│   ├── core/                     # Pure business logic — no I/O
│   │   ├── numerology/           # pythagorean, chaldean, lo-shu
│   │   ├── astrology/            # zodiac, nakshatra, mahadasha
│   │   ├── tarot/                # 78-card deck + seeded draw
│   │   ├── prompts/              # *.prompt.ts — AI prompt templates
│   │   └── types/index.ts        # Single source of truth for all domain types
│   ├── api/                      # tRPC routers + middleware
│   │   ├── routers/              # reading, numerology, astrology, daily-oracle,
│   │   │                         #   compatibility, subscription, profile, history
│   │   └── middleware/           # auth, tier, ratelimit
│   ├── ui/                       # Shared design primitives (.native.tsx / .web.tsx)
│   ├── db/                       # Drizzle schema + migrations
│   └── config/                   # typescript, eslint, prettier, tailwind
├── services/                     # Supabase Edge Functions (Deno + TypeScript)
│   └── reading|numerology|astrology|daily-oracle|
│       compatibility|subscription|notification|image-generation -service/
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

**Subdirectory CLAUDE.mds (auto-loaded when you work there):**

| File                      | Contains                                                                    |
| ------------------------- | --------------------------------------------------------------------------- |
| `packages/core/CLAUDE.md` | Domain types reference, AI prompt constraints & mode table                  |
| `packages/api/CLAUDE.md`  | tRPC template, auth middleware, all 30 procedure signatures, error handling |
| `apps/mobile/CLAUDE.md`   | RN screen template, NativeWind tokens, Zustand store access, navigation     |
| `services/CLAUDE.md`      | Edge Function template, Deno env conventions, service catalogue             |

---

## 4. Tech Stack — Exact Versions

| Layer               | Package                               | Version | Notes                   |
| ------------------- | ------------------------------------- | ------- | ----------------------- |
| Mobile framework    | react-native                          | 0.74.x  | Expo managed            |
| Mobile framework    | expo                                  | ~51.0.0 | SDK 51                  |
| Web framework       | next                                  | 15.0.x  | App Router only         |
| Language            | typescript                            | 5.4.x   | strict: true everywhere |
| Navigation (mobile) | expo-router                           | ~3.5.x  | File-based              |
| Styling (mobile)    | nativewind                            | 4.x     | Tailwind for RN         |
| Styling (web)       | tailwindcss                           | 3.4.x   |                         |
| Animation           | react-native-reanimated               | 3.x     |                         |
| Canvas              | @shopify/react-native-skia            | 1.x     | Palm contour drawing    |
| Charts              | victory-native                        | 40.x    | Line + radar charts     |
| API protocol        | @trpc/server + @trpc/client           | 11.x    | Not 10.x                |
| ORM                 | drizzle-orm                           | 0.30.x  | Edge-compatible         |
| State (global)      | zustand                               | 4.5.x   |                         |
| Server state        | @tanstack/react-query                 | 5.x     |                         |
| Auth                | @clerk/nextjs + @clerk/expo           | latest  |                         |
| DB + Storage        | @supabase/supabase-js                 | 2.x     |                         |
| Camera              | expo-camera                           | ~15.0.x |                         |
| Image edit          | expo-image-manipulator                | ~12.0.x |                         |
| Notifications       | expo-notifications                    | ~0.28.x |                         |
| Payments (mobile)   | react-native-purchases                | 7.x     | RevenueCat              |
| Payments (web)      | stripe                                | 16.x    |                         |
| Share image         | react-native-view-shot                | 4.x     |                         |
| Audio               | expo-av                               | ~14.0.x | TTS playback            |
| Analytics           | posthog-react-native + posthog-js     | latest  |                         |
| Error tracking      | @sentry/react-native + @sentry/nextjs | latest  |                         |

---

## 5. Naming Conventions

### Files

- `PascalCase.tsx` — React components
- `camelCase.ts` — utilities, hooks, stores
- `kebab-case/` — directories
- `.native.tsx` / `.web.tsx` — platform splits
- `*.store.ts` — Zustand stores
- `*.router.ts` — tRPC routers
- `*.prompt.ts` — AI prompt templates
- `*.schema.ts` — Zod schemas
- `*.service.ts` — Edge Function business logic

### Variables / Functions

```typescript
// ✅ Correct
const clerkUserId = 'user_abc';
const isPremiumUser = tier !== 'free';
async function generateDailyOracle(userId: string): Promise<DailyOracle> {}
const handleScanPress = () => {};

// ❌ Wrong
const user_id = ...;   // no snake_case in TS
const x = ...;         // no single letters
const getData = ...;   // too generic
```

### Components

```typescript
// ✅ Correct: PascalCase, descriptive, ends in what it is
export function ReadingResultCard({ reading }: ReadingResultCardProps) {}
export function PalmCameraOverlay({ onCapture }: PalmCameraOverlayProps) {}

// ❌ Wrong
export function Card({}) {} // too generic
export function readingCard({}) {} // lowercase
```

### tRPC procedures

```typescript
// Pattern: router.action — verb is the action
reading.create;
reading.list;
reading.byId;
dailyOracle.today;
profile.update;
subscription.getCurrent;
```

---

## 6. Environment Variables — Service Groups

Full variable names are in `.env.example` (repo root). Key naming conventions:

- `NEXT_PUBLIC_` — exposed to Next.js client bundle
- `EXPO_PUBLIC_` — exposed to Expo / React Native bundle
- No prefix — server-only (tRPC procedures, Edge Functions, webhooks)

| Service          | Server-only vars                                                                             | Client-exposed vars                                                      |
| ---------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Clerk            | `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`                                                   | `NEXT_PUBLIC_CLERK_*`, `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`               |
| Supabase         | `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`, `SUPABASE_DB_URL`                        | `NEXT_PUBLIC_SUPABASE_*`, `EXPO_PUBLIC_SUPABASE_*`                       |
| OpenAI           | `OPENAI_API_KEY`, `OPENAI_ORG_ID`                                                            | —                                                                        |
| Anthropic        | `ANTHROPIC_API_KEY`                                                                          | —                                                                        |
| BFL (FLUX.2 Pro) | `BFL_API_KEY`                                                                                | —                                                                        |
| ElevenLabs       | `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID_SAGE/MYSTIC/ORACLE`                               | —                                                                        |
| RevenueCat       | `REVENUECAT_SERVER_API_KEY`, `REVENUECAT_WEBHOOK_SECRET`, `RC_PRODUCT_*`, `RC_ENTITLEMENT_*` | `EXPO_PUBLIC_REVENUECAT_APPLE_KEY`, `EXPO_PUBLIC_REVENUECAT_ANDROID_KEY` |
| Stripe           | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_*`                               | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`                                     |
| Upstash Redis    | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`                                         | —                                                                        |
| Cloudflare R2    | `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_R2_*`                                                   | —                                                                        |
| Mapbox           | —                                                                                            | `NEXT_PUBLIC_MAPBOX_TOKEN`, `EXPO_PUBLIC_MAPBOX_TOKEN`                   |
| PostHog          | —                                                                                            | `NEXT_PUBLIC_POSTHOG_*`, `EXPO_PUBLIC_POSTHOG_KEY`                       |
| Sentry           | `SENTRY_AUTH_TOKEN`                                                                          | `NEXT_PUBLIC_SENTRY_DSN`, `EXPO_PUBLIC_SENTRY_DSN`                       |
| Resend           | `RESEND_API_KEY`, `EMAIL_FROM`                                                               | —                                                                        |
| Astronomy API    | `ASTRONOMY_API_APPLICATION_ID`, `ASTRONOMY_API_APPLICATION_SECRET`                           | —                                                                        |

---

## 7. Subscription Gating — Feature Matrix

```typescript
// packages/core/subscription/features.ts

export const TIER_FEATURES: Record<Feature, SubscriptionTier[]> = {
  advanced_analysis: ['oracle', 'sage'],
  voice_reading: ['oracle', 'sage'],
  rare_markings: ['oracle', 'sage'],
  birth_chart: ['mystic', 'oracle', 'sage'],
  triple_convergence: ['oracle', 'sage'],
  bilateral_comparison: ['mystic', 'oracle', 'sage'],
  future_self_image: ['sage'],
  past_life_image: ['sage'],
  soul_mandala: ['sage'],
  mantra_mudra: ['sage'],
  karma_score: ['sage'],
  lucky_days_calendar: ['oracle', 'sage'],
  chaldean_numerology: ['mystic', 'oracle', 'sage'],
  lo_shu_grid: ['oracle', 'sage'],
  crystal_ball_mode: ['sage'], // or earned via 10 readings
  astrologer_credit: ['oracle', 'sage'],
};

export const MODE_MIN_TIER: Record<ReadingMode, SubscriptionTier> = {
  standard: 'free',
  love: 'free',
  career: 'mystic',
  health: 'mystic',
  spiritual: 'oracle',
  crystal_ball: 'sage',
};

export const FREE_READINGS_PER_MONTH = 3;
export const FREE_LOVE_READINGS_PER_MONTH = 1;
```

---

## 8. Build & Run Commands

```bash
# Install (always use pnpm — not npm or yarn)
pnpm install

# Dev — all workspaces
pnpm dev

# Dev — individual apps
pnpm --filter mobile dev
pnpm --filter web dev

# Mobile on device
cd apps/mobile && npx expo run:ios
cd apps/mobile && npx expo run:android

# Build mobile (EAS)
eas build --platform ios --profile development
eas build --platform android --profile development

# Type-check all workspaces
pnpm typecheck

# Lint all workspaces
pnpm lint

# Test all workspaces
pnpm test

# Database migrations
pnpm --filter db migrate:dev    # create + apply locally
pnpm --filter db migrate:push   # push to Supabase

# Deploy Edge Functions
supabase functions deploy reading-service
supabase functions deploy --all

# Deploy web
vercel deploy --prod
```

---

## 9. What NOT to Do

```typescript
// ❌ Never do these

// 1. Don't put AI calls in the client
const response = await openai.chat.completions.create({ ... }); // in mobile component

// 2. Don't check subscription tier on the client only
if (user.subscriptionTier === 'free') return; // client-side gate only — bypass risk

// 3. Don't use any
const data: any = await fetch(...).then(r => r.json());

// 4. Don't query another user's data
await db.query.readings.findMany(); // missing where clause = all users' readings

// 5. Don't hardcode API keys
const apiKey = 'sk-ant-...'; // in source code

// 6. Don't generate AI output without caching
const text = await claude.generate(...); // without checking Redis first

// 7. Don't use console.log
console.log('user data:', user); // use logger.info instead

// 8. Don't use React Native StyleSheet.create
const styles = StyleSheet.create({ container: { ... } }); // use NativeWind className

// 9. Don't import from apps/ in packages/
import { something } from '../../apps/mobile/...'; // breaks monorepo boundaries

// 10. Don't use npm or yarn
npm install some-package // use: pnpm add some-package --filter mobile
```

---

## 10. Key Architectural Decisions (ADRs)

| Decision        | Choice          | Why                                             |
| --------------- | --------------- | ----------------------------------------------- |
| API protocol    | tRPC v11        | End-to-end type safety, no codegen step         |
| Mobile styling  | NativeWind      | Same Tailwind tokens as web                     |
| ORM             | Drizzle         | Type-safe, Edge-compatible, no reflection       |
| Auth            | Clerk           | Apple Sign-In support, phone OTP, Indian market |
| Mobile billing  | RevenueCat      | Cross-platform, webhook-first architecture      |
| Vision AI       | OpenAI GPT-5    | Best structured JSON output from images         |
| Synthesis AI    | Claude Opus 4.7 | Best long-form narrative; tool-use support      |
| Image gen       | FLUX.2 Pro      | Best photorealism for portraits                 |
| Voice           | ElevenLabs v3   | 12-language coverage, lowest latency            |
| Package manager | pnpm            | Workspace support, disk efficiency              |
| Monorepo        | Turborepo       | Shared cache, per-package pipelines             |

---

_End of CLAUDE.md — last updated May 2026_
