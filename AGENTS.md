# AGENTS.md — Lyra Project Context

> This file is read automatically by Codex on every session. It contains the complete
> technical context for the Hastara project. Never ask the engineer what stack, pattern, or
> convention to use — the answer is always in this file.

---

## 1. CRITICAL RULES (read before writing any code)

1. **TypeScript strict mode always.** Zero `any` types. Use `unknown` + type guards instead.
2. **No JavaScript files anywhere** — every file is `.ts` or `.tsx`.
3. **Never hardcode env vars** — always read from `process.env.VARIABLE_NAME`. See §7 for all names.
4. **All AI calls go through Edge Functions** — no AI API keys in any client bundle.
5. **All backend logic is server-side** — tRPC procedures, not client-side API calls.
6. **RLS enforces data isolation** — never query another user's data. Trust the DB policy.
7. **Subscription tier is checked server-side** — never gate features in client code alone.
8. **No `console.log` in production code** — use structured logging via `logger.ts`.
9. **Cache AI outputs** — never regenerate a reading that has been cached by `reading_id`.
10. **Follow the patterns in §9–§11 exactly** — do not invent new patterns.

---

## 2. Project Overview

**Lyra** is a multi-platform AI-powered palmistry, numerology, and astrology app.

- **iOS + Android**: React Native + Expo SDK 51 (Turborepo `apps/mobile/`)
- **Web**: Next.js 15 App Router (Turborepo `apps/web/`)
- **Backend**: Supabase Edge Functions — Deno + TypeScript (Turborepo `services/`)
- **Shared logic**: `packages/core`, `packages/api`, `packages/ui`, `packages/db`

**Core differentiator**: Triple Convergence — palmistry + numerology + Vedic astrology
synthesised into one reading by GPT-5 Vision (feature extraction) + Codex Opus 4.7 (narrative).

**Docs**:
- `docs/SRS-HASTARA-001.docx` — requirements
- `docs/TDD-HASTARA-001.docx` — architecture + data model
- `docs/PROJ-HASTARA-001.docx` — product vision + market analysis

---

## 3. Repository Structure

```
hastara/
├── apps/
│   ├── mobile/                        # React Native + Expo SDK 51
│   │   ├── app/                       # expo-router file-based routes
│   │   │   ├── (tabs)/
│   │   │   │   ├── index.tsx          # Home — palm scan hub
│   │   │   │   ├── daily.tsx          # Daily oracle, tarot, moon phase
│   │   │   │   ├── history.tsx        # Reading archive + analytics
│   │   │   │   ├── profile.tsx        # Stats, badges, settings
│   │   │   │   └── premium.tsx        # Paywall — free users only
│   │   │   ├── reading/
│   │   │   │   └── [id].tsx           # Full reading result screen
│   │   │   ├── advanced-analysis.tsx  # Infographic export — Oracle+
│   │   │   ├── compatibility.tsx      # Two-palm compatibility scan
│   │   │   ├── onboarding/
│   │   │   │   ├── step-1.tsx         # Welcome
│   │   │   │   ├── step-2.tsx         # Birth data entry
│   │   │   │   ├── step-3.tsx         # Dominant hand selection
│   │   │   │   ├── step-4.tsx         # First palm scan
│   │   │   │   └── step-5.tsx         # Paywall introduction
│   │   │   ├── auth/
│   │   │   │   ├── sign-in.tsx
│   │   │   │   └── sign-up.tsx
│   │   │   └── _layout.tsx
│   │   ├── components/                # Mobile-only components
│   │   │   ├── camera/
│   │   │   │   ├── PalmCamera.tsx
│   │   │   │   └── ValidationOverlay.tsx
│   │   │   ├── reading/
│   │   │   │   ├── ReadingCard.tsx
│   │   │   │   ├── PhaseAccordion.tsx
│   │   │   │   └── ShareCard.tsx
│   │   │   └── daily/
│   │   │       ├── OracleCard.tsx
│   │   │       ├── TarotCard.tsx
│   │   │       └── MoonPhaseWidget.tsx
│   │   ├── lib/
│   │   │   ├── camera.ts              # expo-camera wrapper
│   │   │   ├── notifications.ts       # expo-notifications
│   │   │   ├── revenuecat.ts          # RevenueCat SDK
│   │   │   └── mediapipe.ts           # Hand landmark validation
│   │   ├── store/                     # Zustand stores (mobile)
│   │   │   ├── auth.store.ts
│   │   │   ├── subscription.store.ts
│   │   │   └── reading.store.ts
│   │   ├── hooks/                     # Custom hooks
│   │   ├── app.config.ts
│   │   └── package.json
│   │
│   └── web/                           # Next.js 15 App Router
│       ├── app/
│       │   ├── (marketing)/           # Public SEO pages
│       │   │   ├── page.tsx           # Landing page
│       │   │   ├── pricing/
│       │   │   └── blog/
│       │   ├── (app)/                 # Authenticated web app
│       │   │   ├── dashboard/
│       │   │   └── settings/
│       │   ├── api/
│       │   │   ├── webhooks/
│       │   │   │   ├── clerk/route.ts
│       │   │   │   ├── stripe/route.ts
│       │   │   │   └── revenuecat/route.ts
│       │   │   └── trpc/[trpc]/route.ts
│       │   └── layout.tsx
│       ├── components/
│       └── package.json
│
├── packages/
│   ├── core/                          # Pure business logic — no I/O
│   │   ├── numerology/
│   │   │   ├── pythagorean.ts         # Life path, expression, etc.
│   │   │   ├── chaldean.ts
│   │   │   └── lo-shu.ts
│   │   ├── astrology/
│   │   │   ├── zodiac.ts              # DOB → zodiac sign
│   │   │   ├── nakshatra.ts
│   │   │   └── mahadasha.ts
│   │   ├── tarot/
│   │   │   └── deck.ts                # 78-card data + seeded draw
│   │   ├── prompts/                   # AI prompt templates
│   │   │   ├── vision.prompt.ts       # GPT-5 Vision system prompt
│   │   │   ├── synthesis.prompt.ts    # Codex synthesis prompts
│   │   │   ├── oracle.prompt.ts
│   │   │   ├── compatibility.prompt.ts
│   │   │   └── tarot.prompt.ts
│   │   └── types/                     # All shared domain types
│   │       └── index.ts               # See §5 for full type definitions
│   │
│   ├── api/                           # tRPC client + router types
│   │   ├── client.ts
│   │   ├── routers/                   # tRPC router definitions
│   │   │   ├── reading.router.ts
│   │   │   ├── numerology.router.ts
│   │   │   ├── astrology.router.ts
│   │   │   ├── daily-oracle.router.ts
│   │   │   ├── compatibility.router.ts
│   │   │   ├── subscription.router.ts
│   │   │   ├── profile.router.ts
│   │   │   └── history.router.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts      # JWT validation + user injection
│   │   │   ├── tier.middleware.ts      # Subscription gating
│   │   │   └── ratelimit.middleware.ts
│   │   └── index.ts                   # AppRouter export
│   │
│   ├── ui/                            # Shared design primitives
│   │   ├── tokens.ts                  # Colours, typography, spacing
│   │   ├── Card.native.tsx
│   │   ├── Card.web.tsx
│   │   ├── Button.native.tsx
│   │   ├── Button.web.tsx
│   │   └── Text.tsx
│   │
│   ├── db/                            # Drizzle ORM schema + migrations
│   │   ├── schema.ts                  # All table definitions
│   │   ├── client.ts                  # DB client factory
│   │   └── migrations/
│   │
│   └── config/                        # Shared configs
│       ├── typescript/tsconfig.json
│       ├── eslint/index.js
│       ├── prettier/index.js
│       └── tailwind/index.js
│
├── services/                          # Supabase Edge Functions
│   ├── reading-service/
│   ├── numerology-service/
│   ├── astrology-service/
│   ├── daily-oracle-service/
│   ├── compatibility-service/
│   ├── subscription-service/
│   ├── notification-service/
│   └── image-generation-service/
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 4. Tech Stack — Exact Versions

| Layer | Package | Version | Notes |
|-------|---------|---------|-------|
| Mobile framework | react-native | 0.74.x | Expo managed |
| Mobile framework | expo | ~51.0.0 | SDK 51 |
| Web framework | next | 15.0.x | App Router only |
| Language | typescript | 5.4.x | strict: true everywhere |
| Navigation (mobile) | expo-router | ~3.5.x | File-based |
| Styling (mobile) | nativewind | 4.x | Tailwind for RN |
| Styling (web) | tailwindcss | 3.4.x | |
| Animation | react-native-reanimated | 3.x | |
| Canvas | @shopify/react-native-skia | 1.x | Palm contour drawing |
| Charts | victory-native | 40.x | Line + radar charts |
| API protocol | @trpc/server + @trpc/client | 11.x | Not 10.x |
| ORM | drizzle-orm | 0.30.x | Edge-compatible |
| State (global) | zustand | 4.5.x | |
| Server state | @tanstack/react-query | 5.x | |
| Auth | @clerk/nextjs + @clerk/expo | latest | |
| DB + Storage | @supabase/supabase-js | 2.x | |
| Camera | expo-camera | ~15.0.x | |
| Image edit | expo-image-manipulator | ~12.0.x | |
| Notifications | expo-notifications | ~0.28.x | |
| Payments (mobile) | react-native-purchases | 7.x | RevenueCat |
| Payments (web) | stripe | 16.x | |
| Share image | react-native-view-shot | 4.x | |
| Audio | expo-av | ~14.0.x | TTS playback |
| Analytics | posthog-react-native + posthog-js | latest | |
| Error tracking | @sentry/react-native + @sentry/nextjs | latest | |

---

## 5. TypeScript Types — Complete Domain Interfaces

```typescript
// packages/core/types/index.ts
// This is the single source of truth for all domain types.

// ─── Primitives ───────────────────────────────────────────────────────────────

export type SubscriptionTier = 'free' | 'mystic' | 'oracle' | 'sage';
export type ReadingMode =
  | 'standard'
  | 'love'
  | 'career'
  | 'health'
  | 'spiritual'
  | 'crystal_ball';
export type Hand = 'left' | 'right' | 'both';
export type HandShape = 'earth' | 'air' | 'water' | 'fire';
export type AstrologySystem = 'western' | 'vedic';
export type LinePrecision = 'short' | 'medium' | 'long';
export type Prominence = 1 | 2 | 3 | 4 | 5;
export type ImageQuality = 'good' | 'acceptable' | 'poor';
export type MoonPhaseName =
  | 'new_moon' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous'
  | 'full_moon' | 'waning_gibbous' | 'last_quarter' | 'waning_crescent';

// ─── Vision JSON (returned by GPT-5 Vision) ───────────────────────────────────

export interface PalmLine {
  depth: Prominence;
  length: LinePrecision;
  shape: string;
  breaks: number;
  branches: number;
  traits: string[];
}

export interface PalmLineOptional extends PalmLine {
  present: boolean;
}

export interface PalmMount {
  elevation: Prominence;
  traits: string[];
}

export type RareMarkingType =
  | 'mystic_cross'
  | 'ring_of_solomon'
  | 'simian_line'
  | 'medical_stigmata'
  | 'teacher_square'
  | 'trident'
  | 'cross_of_st_andrew'
  | 'star_of_apollo';

export interface RareMarking {
  type: RareMarkingType;
  location: string;
  confidence: number; // 0.0–1.0
}

export interface VisionJSON {
  handShape: HandShape;
  palmShape: string;
  fingerLengths: Record<'thumb' | 'index' | 'middle' | 'ring' | 'pinky', LinePrecision>;
  thumbFlexibility: 'rigid' | 'moderate' | 'flexible';
  lines: {
    heart: PalmLine;
    head: PalmLine;
    life: PalmLine;
    fate: PalmLineOptional;
    sun: PalmLineOptional;
    mercury: PalmLineOptional;
    marriage: PalmLineOptional;
  };
  mounts: {
    venus: PalmMount;
    jupiter: PalmMount;
    saturn: PalmMount;
    apollo: PalmMount;
    mercury: PalmMount;
    marsLower: PalmMount;
    marsUpper: PalmMount;
    moon: PalmMount;
  };
  rareMarkings: RareMarking[];
  imageQuality: {
    lighting: ImageQuality;
    framing: ImageQuality;
    occlusion: 'none' | 'partial' | 'severe';
  };
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface BirthLocation {
  lat: number;
  lng: number;
  city: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2
  timezone: string;    // IANA tz name
}

export interface User {
  clerkUserId: string;          // PK — matches Clerk user ID
  email: string;
  name: string;
  locale: string;               // BCP47 e.g. 'en', 'hi', 'ta'
  dob: string;                  // ISO 8601 date 'YYYY-MM-DD'
  birthTime?: string;           // 'HH:MM:SS' — optional
  birthLocation: BirthLocation;
  dominantHand: 'left' | 'right';
  zodiacSign: string;           // Computed at signup
  nakshatra?: string;           // Requires birthTime
  lifePathNumber: number;
  expressionNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  subscriptionTier: SubscriptionTier;
  streakCount: number;
  totalReadings: number;
  xpPoints: number;
  badges: BadgeId[];
  notificationTime: string;     // 'HH:MM:SS'
  notificationsEnabled: boolean;
  region: 'mumbai' | 'frankfurt' | 'us-east';
  createdAt: string;            // ISO 8601 datetime
  lastActiveAt: string;
}

// ─── Badges ───────────────────────────────────────────────────────────────────

export type BadgeId =
  | 'first_scan'
  | 'mystic_apprentice'   // 7-day streak
  | 'cosmic_seeker'       // 30-day streak
  | 'oracle_master'       // 90-day streak
  | 'double_vision'       // compatibility reading
  | 'crystal_ball'        // 10 total readings
  | 'star_sharer'         // 5 shared reading cards
  | 'numerologist';       // birth chart completed

// ─── Reading ──────────────────────────────────────────────────────────────────

export interface Reading {
  id: string;
  userId: string;
  createdAt: string;
  mode: ReadingMode;
  hand: Hand;
  palmImageUrl: string;
  rawVisionJson: VisionJSON;
  narrativeMarkdown: string;
  luckScore: number;       // 0–100
  dominantTrait: string;
  audioUrl?: string;
  infographicUrl?: string;
  sharedAt?: string;
  visionProvider: string;
  synthesisProvider: string;
  aiCostCents: number;
}

export interface ReadingListItem {
  id: string;
  createdAt: string;
  mode: ReadingMode;
  luckScore: number;
  dominantTrait: string;
  palmImageUrl: string;
}

// ─── Daily Oracle ──────────────────────────────────────────────────────────────

export interface DailyOracle {
  userId: string;
  date: string;           // 'YYYY-MM-DD'
  oracleText: string;
  tarotCard: TarotCard;
  moonPhase: MoonPhase;
  luckScore: number;
  luckyColor: string;
  luckyNumber: number;    // 1–9
  mantra?: string;        // Sage tier only
  mudra?: string;         // Sage tier only
  generatedAt: string;
}

export interface TarotCard {
  id: number;             // 0–77
  name: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  reversed: boolean;
  svgPath: string;        // public asset path
  interpretation: string; // AI-generated, personalised
}

export interface MoonPhase {
  phase: MoonPhaseName;
  illumination: number;   // 0.0–1.0
  guidance: string;
  isSpecial: boolean;     // new moon or full moon
}

// ─── Birth Chart ───────────────────────────────────────────────────────────────

export interface PlanetPosition {
  sign: string;
  house: number;
  degrees: number;
  retrograde: boolean;
}

export interface HousePosition {
  sign: string;
  degrees: number;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  aspect: 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition';
  orb: number;
  applying: boolean;
}

export interface NakshatraPosition {
  nakshatra: string;
  pada: number;           // 1–4
  lord: string;
  deity: string;
}

export interface DashaPeriod {
  planet: string;
  startDate: string;
  endDate: string;
  subperiods: Array<{ planet: string; startDate: string; endDate: string }>;
}

export interface BirthChart {
  id: string;
  userId: string;
  system: AstrologySystem;
  planets: Record<string, PlanetPosition>;
  houses: Record<string, HousePosition>;
  aspects: Aspect[];
  nakshatras?: Record<string, NakshatraPosition>;
  dashaPeriods?: DashaPeriod[];
  chartSvgUrl: string;
  computedAt: string;
}

// ─── Compatibility ─────────────────────────────────────────────────────────────

export interface CompatibilityDimension {
  score: number;          // 0–100
  description: string;
}

export interface CompatibilityReading {
  id: string;
  userAId: string;
  userBId?: string;
  userBGuestHash?: string;
  scores: {
    emotional: CompatibilityDimension;
    intellectual: CompatibilityDimension;
    romantic: CompatibilityDimension;
    spiritual: CompatibilityDimension;
    financial: CompatibilityDimension;
    communication: CompatibilityDimension;
  };
  overallScore: number;
  couplePortraitUrl?: string;
  summary: string;
  strengths: string[];
  challenges: string[];
  advice: string;
  createdAt: string;
}

// ─── Subscription ─────────────────────────────────────────────────────────────

export interface Subscription {
  id: string;
  userId: string;
  tier: Exclude<SubscriptionTier, 'free'>;
  status: 'trialing' | 'active' | 'grace' | 'cancelled' | 'expired';
  platform: 'ios' | 'android' | 'web';
  revenuecatId?: string;
  stripeSubscriptionId?: string;
  trialUsed: boolean;
  startedAt: string;
  renewsAt?: string;
  cancelledAt?: string;
  referrerId?: string;
}

// ─── Numerology ────────────────────────────────────────────────────────────────

export interface NumerologyProfile {
  // Pythagorean
  lifePathNumber: number;
  expressionNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  birthdayNumber: number;
  maturityNumber: number;
  // Current cycles
  personalYear: number;
  personalMonth: number;
  personalDay: number;
  // Pinnacles & Challenges
  pinnacles: [number, number, number, number];
  challenges: [number, number, number, number];
  // Karmic
  karmicLessons: number[];
  karmicDebts: number[];
  masterNumbers: number[];
}

// ─── Zustand Stores ────────────────────────────────────────────────────────────

export interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isOnboarded: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setOnboarded: (onboarded: boolean) => void;
  reset: () => void;
}

export interface SubscriptionStore {
  tier: SubscriptionTier;
  readingsThisMonth: number;
  isLoading: boolean;
  setTier: (tier: SubscriptionTier) => void;
  setReadingsThisMonth: (count: number) => void;
  // Gating helpers — use these everywhere, never inline tier checks
  canScan: () => boolean;               // has readings remaining
  canAccessMode: (mode: ReadingMode) => boolean;
  canAccessFeature: (feature: Feature) => boolean;
}

export type Feature =
  | 'advanced_analysis'
  | 'voice_reading'
  | 'rare_markings'
  | 'birth_chart'
  | 'triple_convergence'
  | 'bilateral_comparison'
  | 'future_self_image'
  | 'past_life_image'
  | 'soul_mandala'
  | 'mantra_mudra'
  | 'karma_score'
  | 'lucky_days_calendar'
  | 'chaldean_numerology'
  | 'lo_shu_grid'
  | 'crystal_ball_mode'
  | 'astrologer_credit';

export interface ReadingStore {
  currentReading: Reading | null;
  streamingText: string;
  isGenerating: boolean;
  progress: number;         // 0–100, for UI progress bar
  setCurrentReading: (reading: Reading | null) => void;
  appendStreamingText: (chunk: string) => void;
  clearStreamingText: () => void;
  setIsGenerating: (generating: boolean) => void;
  setProgress: (progress: number) => void;
}
```

---

## 6. Naming Conventions

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
export function Card({}) {}       // too generic
export function readingCard({}) {} // lowercase
```

### tRPC procedures
```typescript
// Pattern: router.action — verb is the action
reading.create
reading.list
reading.byId
reading.delete
dailyOracle.today
profile.update
subscription.getCurrent
```

---

## 7. Environment Variables — Complete .env.example

```bash
# ─── CLERK AUTH ────────────────────────────────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding/step-1
CLERK_WEBHOOK_SECRET=whsec_...

# Expo (mobile) — prefix EXPO_PUBLIC_ for client bundle exposure
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# ─── SUPABASE ──────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_JWT_SECRET=your-jwt-secret
SUPABASE_DB_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres

EXPO_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ─── OPENAI ────────────────────────────────────────────────────────────────────
OPENAI_API_KEY=sk-proj-...
OPENAI_ORG_ID=org-...           # optional

# ─── ANTHROPIC ─────────────────────────────────────────────────────────────────
ANTHROPIC_API_KEY=sk-ant-api03-...

# ─── BLACK FOREST LABS (FLUX.2 Pro) ───────────────────────────────────────────
BFL_API_KEY=...

# ─── ELEVENLABS ────────────────────────────────────────────────────────────────
ELEVENLABS_API_KEY=...
ELEVENLABS_VOICE_ID_SAGE=...       # deep, calm voice persona
ELEVENLABS_VOICE_ID_MYSTIC=...     # soft, whispered voice persona
ELEVENLABS_VOICE_ID_ORACLE=...     # neutral voice persona

# ─── REVENUECAT ────────────────────────────────────────────────────────────────
REVENUECAT_SERVER_API_KEY=...
REVENUECAT_WEBHOOK_SECRET=...
EXPO_PUBLIC_REVENUECAT_APPLE_KEY=appl_...
EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=goog_...

# Product identifiers (match App Store / Play Store exactly)
RC_PRODUCT_MYSTIC_WEEKLY=hastara_mystic_weekly_499
RC_PRODUCT_MYSTIC_ANNUAL=hastara_mystic_annual_5999
RC_PRODUCT_ORACLE_MONTHLY=hastara_oracle_monthly_999
RC_PRODUCT_ORACLE_ANNUAL=hastara_oracle_annual_8999
RC_PRODUCT_SAGE_MONTHLY=hastara_sage_monthly_1999
RC_PRODUCT_SAGE_ANNUAL=hastara_sage_annual_16999
RC_ENTITLEMENT_MYSTIC=hastara_mystic
RC_ENTITLEMENT_ORACLE=hastara_oracle
RC_ENTITLEMENT_SAGE=hastara_sage

# ─── STRIPE ────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ORACLE_MONTHLY=price_...
STRIPE_PRICE_ORACLE_ANNUAL=price_...
STRIPE_PRICE_SAGE_MONTHLY=price_...
STRIPE_PRICE_SAGE_ANNUAL=price_...

# ─── MAPBOX ────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoibHlyYSIsImEi...
EXPO_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoibHlyYSIsImEi...

# ─── UPSTASH REDIS ─────────────────────────────────────────────────────────────
UPSTASH_REDIS_REST_URL=https://us1-xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxx...

# ─── CLOUDFLARE R2 ─────────────────────────────────────────────────────────────
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_R2_BUCKET_NAME=hastara-assets-prod
CLOUDFLARE_R2_ACCESS_KEY_ID=...
CLOUDFLARE_R2_SECRET_ACCESS_KEY=...
CLOUDFLARE_R2_PUBLIC_URL=https://assets.hastara.app

# ─── ASTRONOMY API ─────────────────────────────────────────────────────────────
ASTRONOMY_API_APPLICATION_ID=...
ASTRONOMY_API_APPLICATION_SECRET=...

# ─── POSTHOG ───────────────────────────────────────────────────────────────────
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
EXPO_PUBLIC_POSTHOG_KEY=phc_...

# ─── SENTRY ────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SENTRY_DSN=https://xxx@oyyy.ingest.sentry.io/zzz
SENTRY_AUTH_TOKEN=...
EXPO_PUBLIC_SENTRY_DSN=https://xxx@oyyy.ingest.sentry.io/zzz

# ─── RESEND (transactional email) ─────────────────────────────────────────────
RESEND_API_KEY=re_...
EMAIL_FROM=hello@hastara.app

# ─── APP URLS ──────────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=https://hastara.app
NEXT_PUBLIC_API_URL=https://api.hastara.app
EXPO_PUBLIC_API_URL=https://api.hastara.app
```

---

## 8. Authentication Patterns

### tRPC middleware (packages/api/middleware/auth.middleware.ts)
```typescript
import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../trpc';
import type { SubscriptionTier, Feature } from '@hastara/core/types';

// Verify JWT from Clerk, inject user into context
export const authMiddleware = middleware(async ({ ctx, next }) => {
  const { userId } = ctx.auth;
  if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

  const user = await ctx.db.query.users.findFirst({
    where: eq(users.clerkUserId, userId),
  });
  if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return next({ ctx: { ...ctx, user } });
});

export const protectedProcedure = publicProcedure.use(authMiddleware);

// Require a minimum tier
export const requireTier = (minTier: SubscriptionTier) =>
  authMiddleware.unstable_pipe(async ({ ctx, next }) => {
    const tierOrder: SubscriptionTier[] = ['free', 'mystic', 'oracle', 'sage'];
    if (tierOrder.indexOf(ctx.user.subscriptionTier) < tierOrder.indexOf(minTier)) {
      throw new TRPCError({ code: 'FORBIDDEN', message: 'Upgrade required' });
    }
    return next();
  });
```

### Mobile — accessing the current user
```typescript
// Always read from Zustand, not from Clerk directly
import { useAuthStore } from '@/store/auth.store';

function MyComponent() {
  const user = useAuthStore(s => s.user);
  // ...
}
```

### Web — server-side auth
```typescript
// app/(app)/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');
  // ...
}
```

---

## 9. tRPC Procedure Pattern

### Standard template for a new procedure
```typescript
// packages/api/routers/example.router.ts
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const exampleRouter = router({
  // Query: fetching data
  list: protectedProcedure
    .input(z.object({
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(50).default(20),
    }))
    .query(async ({ ctx, input }) => {
      // ctx.user is always available in protectedProcedure
      // ctx.db is the Drizzle client
      // ctx.redis is the Upstash Redis client
      const items = await ctx.db.query.readings.findMany({
        where: eq(readings.userId, ctx.user.clerkUserId),
        orderBy: [desc(readings.createdAt)],
        limit: input.limit + 1,
        ...(input.cursor ? { where: lt(readings.id, input.cursor) } : {}),
      });

      const hasMore = items.length > input.limit;
      return {
        items: hasMore ? items.slice(0, -1) : items,
        nextCursor: hasMore ? items[input.limit - 1].id : undefined,
      };
    }),

  // Mutation: changing state
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1).max(200),
    }))
    .mutation(async ({ ctx, input }) => {
      // Validate business rules
      if (someConditionFails) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Human-readable error for the UI',
        });
      }

      const result = await ctx.db.insert(someTable).values({
        userId: ctx.user.clerkUserId,
        name: input.name,
        createdAt: new Date().toISOString(),
      }).returning();

      return result[0];
    }),
});
```

### All 30 tRPC procedure signatures

```typescript
// READING
reading.create          → input: { mode, hand, palmImageUrl }      → output: { readingId, streamUrl }
reading.list            → input: { cursor?, limit? }               → output: { items: ReadingListItem[], nextCursor? }
reading.byId            → input: { id }                            → output: Reading
reading.delete          → input: { id }                            → output: { success: boolean }
reading.share           → input: { id }                            → output: { shareUrl: string }
reading.generateInfographic → input: { id, aspectRatio }          → output: { infographicUrl: string }
reading.generateFutureSelf  → input: { id, portraitUrl }          → output: { imageUrls: string[] }
reading.generatePastLife    → input: { id }                        → output: { imageUrl, narrative: string }

// NUMEROLOGY
numerology.getProfile   → input: void                              → output: NumerologyProfile
numerology.getPersonalCycles → input: void                        → output: { personalYear, personalMonth, personalDay, guidance }
numerology.getLifePathDetails → input: { number: number }         → output: { title, description, strengths[], challenges[] }

// ASTROLOGY
astrology.getBirthChart → input: { system: AstrologySystem }      → output: BirthChart
astrology.getCurrentTransits → input: void                        → output: { transits: PlanetTransit[], moonPhase: MoonPhase }
astrology.getCompatibility   → input: { userBId?, userBBirthData? } → output: SynastryResult

// DAILY ORACLE
dailyOracle.today       → input: void                              → output: DailyOracle
dailyOracle.history     → input: { limit?: number }               → output: DailyOracle[]
dailyOracle.getLuckyDaysCalendar → input: { month, year }         → output: Array<{ date, luckScore, color }>

// COMPATIBILITY
compatibility.create    → input: { palmAUrl, palmBUrl, userBId? } → output: CompatibilityReading
compatibility.list      → input: void                              → output: CompatibilityReading[]

// SUBSCRIPTION
subscription.getCurrent → input: void                              → output: { tier, subscription?, readingsThisMonth }
subscription.cancel     → input: void                              → output: { success, effectiveDate }
subscription.pause      → input: { resumeAt: string }             → output: { success }
subscription.getReferralCode → input: void                        → output: { code, referralUrl, successfulReferrals }

// PROFILE
profile.get             → input: void                              → output: User
profile.update          → input: Partial<UserUpdateFields>        → output: User
profile.getStats        → input: void                              → output: ProfileStats
profile.exportData      → input: void                              → output: { downloadUrl, expiresAt }

// HISTORY
history.list            → input: { cursor?, limit? }               → output: { items: ReadingListItem[], nextCursor? }
history.getAnalytics    → input: { period: '30d' | '90d' | '365d' } → output: HistoryAnalytics
history.compare         → input: { readingAId, readingBId }       → output: { diffNarrative, readingA, readingB }

// NOTIFICATIONS
notifications.updatePreferences → input: { time?, enabled? }     → output: { success }
```

---

## 10. React Native Screen Pattern

```typescript
// apps/mobile/app/(tabs)/example.tsx
// Standard template for every screen in the mobile app.

import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/trpc';
import { useAuthStore } from '@/store/auth.store';
import { useSubscriptionStore } from '@/store/subscription.store';
import { ErrorBanner } from '@/components/ui/ErrorBanner';

export default function ExampleScreen() {
  const user = useAuthStore(s => s.user);
  const canAccess = useSubscriptionStore(s => s.canAccessFeature);

  // Data fetching
  const { data, isLoading, isError, error, refetch } = useQuery(
    api.example.list.queryOptions({ limit: 20 })
  );

  // ── Loading state ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color="#B8935A" />
      </View>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (isError) {
    return <ErrorBanner message={error.message} onRetry={refetch} />;
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <>
      <Stack.Screen options={{ title: 'Example', headerShown: false }} />
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-12">
          {/* Content here */}
        </View>
      </ScrollView>
    </>
  );
}
```

---

## 11. Edge Function (Service) Pattern

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
  // ── Auth ─────────────────────────────────────────────────────────────────
  const jwt = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!jwt) return new Response('Unauthorized', { status: 401 });

  const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);
  if (authError || !user) return new Response('Unauthorized', { status: 401 });

  // ── Rate limit ────────────────────────────────────────────────────────────
  const { success } = await ratelimit.limit(user.id);
  if (!success) return new Response('Rate limit exceeded', { status: 429 });

  // ── Business logic ────────────────────────────────────────────────────────
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

## 12. AI Prompt Library — All Prompts (Complete)

### 12.1 GPT-5 Vision — Palm Feature Extraction
```
SYSTEM:
You are an expert palmist with deep knowledge of Western chiromancy,
Vedic Hasta Samudrika Shastra, and Chinese palmistry.

Analyse the provided palm photograph and return ONLY valid JSON matching
the schema below. No prose, no markdown fences, no explanation.

Schema: { see VisionJSON interface in §5 }

CONSTRAINTS — never violate these:
- Never make medical diagnoses or predictions about illness or death.
- Never make fatalistic predictions about specific events or dates.
- Frame all observations as tendencies and patterns, not certainties.
- If image_quality.lighting or image_quality.framing is "poor",
  set rare_markings to [] and reduce trait specificity to 2 items max.
- Confidence values for rare_markings must be honest; use <0.5 when uncertain.
```

### 12.2 Codex Opus 4.7 — Standard Reading Synthesis
```
SYSTEM:
You are a master palmist, numerologist, and Vedic astrologer with 30 years
of practice. You synthesise Western chiromancy, Vedic Hasta Samudrika Shastra,
and Chinese palmistry into coherent, personalised narrative readings.

You write in clear modern English with occasional poetic phrasing.
Never theatrical, never campy. Warm, articulate, grounded.

USER CONTEXT (JSON):
{
  "name": "{{name}}",
  "lifePathNumber": {{lifePathNumber}},
  "expressionNumber": {{expressionNumber}},
  "personalYear": {{personalYear}},
  "zodiacSun": "{{zodiacSun}}",
  "zodiacMoon": "{{zodiacMoon}}",
  "zodiacRising": "{{zodiacRising}}",
  "nakshatra": "{{nakshatra}}",
  "currentMahadasha": "{{currentMahadasha}}",
  "dominantHand": "{{dominantHand}}"
}

PALM ANALYSIS (JSON): {{visionJSON}}

TASK:
Write a six-phase reading in markdown with these exact headings and lengths:

## Foundation (120–150 words)
Hand shape, elemental type, palm proportions, thumb character.
Cross-reference: how does hand type align with life path number?

## Major Lines (150–180 words)
Heart, head, life, fate lines. Depth, trajectory, notable features.
Cross-reference: which planetary Mahadasha amplifies or challenges these?

## Minor Lines (100–130 words)
Sun line, Mercury line, marriage lines. Present or absent, what this means.

## Mounts (100–130 words)
The three most prominent mounts. Vedic planetary equivalents.

## Rare Markings (include ONLY if present, else omit this section)
Each marking: name, significance in Western and Vedic traditions.

## Synthesis — Triple Convergence (180–220 words)
THIS IS THE UNIQUE SECTION. Explicitly identify:
1. Where palmistry, numerology, and astrology AGREE (convergence nodes)
2. Where they CONTRADICT each other (tension nodes)
3. The dominant life theme emerging from all three systems together
4. One concrete action the person can take this month based on the synthesis.

Close with a single italic sentence in second person that summarises the reading.

ABSOLUTE CONSTRAINTS:
- Never predict death, serious illness, financial ruin, or relationship failure.
- Never give specific dates for future events.
- Never make medical or legal recommendations.
- Always frame as tendencies and energies, not certainties.
- Use sentence case throughout (no Title Case in prose).
- If the user seems to be in distress, close with:
  "If you are going through a difficult time, please reach out to someone
  you trust or contact a support line in your area."
```

### 12.3 Codex — Love & Relationships Mode
```
[Same system header as 12.2]

FOCUS: Foreground the heart line (depth, endpoint, branches), Venus mount
elevation and firmness, little finger flexibility and length, marriage lines,
and the Moon mount. Weave the user's life-path-number compatibility patterns
and 7th house (partnerships) from their Vedic chart into every phase.

The Synthesis section must answer: "What does this person need to feel
deeply loved, and what is one thing that may be holding them back?"

[Same constraints as 12.2]
```

### 12.4 Codex — Career & Wealth Mode
```
[Same system header as 12.2]

FOCUS: Foreground the fate line (origin, trajectory, breaks), sun/Apollo line
(present or absent, strength), Mercury mount (communication, business sense),
head line length and slope (analytical vs intuitive decision-making), and the
Jupiter mount (ambition, authority). Weave the user's life-path career
archetype and current Mahadasha planet's influence on career matters.

The Synthesis section must answer: "What is this person's strongest career
asset, and what is the one internal obstacle they must overcome?"

[Same constraints as 12.2]
```

### 12.5 Codex — Health & Vitality Mode
```
[Same system header as 12.2]

FOCUS: Foreground the life line (depth, arc, breaks, islands), the health/
Mercury line (present or absent), both Mars mounts (resilience, recovery
energy), nail quarter description (note: do not diagnose conditions), and
overall palm colour and texture as vitality indicators. Weave the user's
birth chart Mars placement and current Mahadasha health implications.

The Synthesis section must answer: "What is this person's greatest
energetic strength, and what lifestyle pattern would most restore their vitality?"

ADDITIONAL CONSTRAINT: Never diagnose, suggest, or imply any medical condition.
If health findings are concerning, always recommend consulting a healthcare
professional. Use "energy patterns" and "vitality indicators", never "symptoms".

[Same constraints as 12.2]
```

### 12.6 Codex — Spiritual Path Mode
```
[Same system header as 12.2]

FOCUS: Foreground the intuition line (between Moon mount and Mercury),
Moon mount height (imagination, spirituality), mystic cross (if present),
fate line origin (rises from Moon = destined spiritual path), and the
Ring of Solomon (if present). Weave the user's life-path spiritual archetype,
nakshatra deity and gana, and 12th house (spirituality) placement.

The Synthesis section must answer: "What is this person's spiritual
dharma, and what is the practice or discipline most aligned with their path?"

[Same constraints as 12.2]
```

### 12.7 Codex — Crystal Ball Mode (unlocked at 10 readings or Sage)
```
[Same system header as 12.2]

CONTEXT: This user has completed {{totalReadings}} readings with Lyra.
You have deep familiarity with their palm signature. This is an advanced
narrative reading styled as a mystical vision rather than a structured report.

Write in four flowing sections without headings:
1. The Past (what has shaped them, echoes in the palm)
2. The Present (where they stand, the convergence of all three systems)
3. The Near Future (tendencies and energies for the next 6–12 months)
4. The Invitation (one thing the universe is asking of them)

Total length: 400–500 words. More lyrical and atmospheric than other modes,
but still grounded. End with a one-sentence oracle in italics.

[Same constraints as 12.2]
```

### 12.8 Oracle Generation Prompt (runs in overnight batch cron)
```
SYSTEM:
You are a mystical guide generating a personalised daily oracle message.
Keep messages to exactly 2–3 sentences. Never fatalistic. Always empowering.
Frame as tendencies, energies, and invitations — never commands or predictions.

USER CONTEXT:
- Name: {{name}}
- Today's date: {{date}}
- Moon phase: {{moonPhase}} — {{moonPhaseGuidance}}
- Life path number: {{lifePathNumber}} ({{lifePathArchetype}})
- Personal year: {{personalYear}}
- Personal day: {{personalDay}}
- Zodiac sun: {{zodiacSun}}
- Dominant trait from last reading: {{dominantTrait}}
- Current Mahadasha planet: {{mahadashaPlaned}}

Generate a 2–3 sentence oracle message for today that weaves at least two
of these context elements together naturally. Do not mention specific elements
by name (don't say "Your life path number 7..."). Let the meaning flow through
without the machinery showing.

Return only the oracle text. No quotes, no preamble.
```

### 12.9 Compatibility Synthesis Prompt
```
SYSTEM:
You are an expert in palmistry synastry and relationship compatibility
analysis across Western, Vedic, and Chinese traditions.

PALM A — {{userAName}}: {{visionJSONofPalmA}}
PALM B — {{userBName}}: {{visionJSONofPalmB}}

NUMEROLOGY CONTEXT:
- Person A life path: {{userALifePath}}
- Person B life path: {{userBLifePath}}
- Compatibility archetype: {{numerologyCompatNote}}

Return a JSON object with this exact structure:
{
  "overallScore": number 0-100,
  "scores": {
    "emotional": { "score": number, "description": "2 sentences" },
    "intellectual": { "score": number, "description": "2 sentences" },
    "romantic": { "score": number, "description": "2 sentences" },
    "spiritual": { "score": number, "description": "2 sentences" },
    "financial": { "score": number, "description": "2 sentences" },
    "communication": { "score": number, "description": "2 sentences" }
  },
  "summary": "3-sentence overall summary",
  "strengths": ["string", "string", "string"],
  "challenges": ["string", "string"],
  "advice": "2-sentence closing advice"
}

CONSTRAINTS: No predictions of relationship failure or breakup.
Frame everything as tendencies and potentials.
```

---

## 13. Subscription Gating — Feature Matrix (use this as code)

```typescript
// packages/core/subscription/features.ts

export const TIER_FEATURES: Record<Feature, SubscriptionTier[]> = {
  // Free + all paid tiers
  advanced_analysis:     ['oracle', 'sage'],
  voice_reading:         ['oracle', 'sage'],
  rare_markings:         ['oracle', 'sage'],
  birth_chart:           ['mystic', 'oracle', 'sage'],
  triple_convergence:    ['oracle', 'sage'],
  bilateral_comparison:  ['mystic', 'oracle', 'sage'],
  future_self_image:     ['sage'],
  past_life_image:       ['sage'],
  soul_mandala:          ['sage'],
  mantra_mudra:          ['sage'],
  karma_score:           ['sage'],
  lucky_days_calendar:   ['oracle', 'sage'],
  chaldean_numerology:   ['mystic', 'oracle', 'sage'],
  lo_shu_grid:           ['oracle', 'sage'],
  crystal_ball_mode:     ['sage'],   // or earned via 10 readings
  astrologer_credit:     ['oracle', 'sage'],
};

export const MODE_MIN_TIER: Record<ReadingMode, SubscriptionTier> = {
  standard:      'free',
  love:          'free',
  career:        'mystic',
  health:        'mystic',
  spiritual:     'oracle',
  crystal_ball:  'sage',
};

export const FREE_READINGS_PER_MONTH = 3;
export const FREE_LOVE_READINGS_PER_MONTH = 1;
```

---

## 14. Design System Tokens (NativeWind / Tailwind)

```javascript
// packages/config/tailwind/index.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary palette
        primary:  '#0D3B2E',  // Forest green
        gold:     '#B8935A',  // Warm gold
        cream:    '#F8F5EE',  // Cream surface
        charcoal: '#1A1A1A',  // Near-black text

        // Semantic
        background: '#F8F5EE',
        surface:    '#FFFFFF',
        muted:      '#666666',
        border:     '#D4C9B0',

        // Tier colours
        'tier-mystic': '#B8935A',
        'tier-oracle': '#0D3B2E',
        'tier-sage':   '#7B5EA7',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
};
```

### Usage in mobile (NativeWind)
```tsx
// ✅ Use Tailwind classes via className
<View className="bg-primary rounded-card p-4">
  <Text className="font-display text-2xl text-cream">Lyra</Text>
</View>

// ✅ Dynamic styles with cn() utility
import { cn } from '@hastara/ui/utils';
<View className={cn('rounded-card p-4', isPremium ? 'bg-gold' : 'bg-surface')} />

// ❌ Never use StyleSheet.create() — use NativeWind
```

---

## 15. Error Handling Pattern

```typescript
// Standard error handling across all tRPC procedures
import { TRPCError } from '@trpc/server';

// Map error types to tRPC codes
function toTRPCError(err: unknown): TRPCError {
  if (err instanceof TRPCError) return err;
  if (err instanceof Error) {
    if (err.message.includes('rate limit')) {
      return new TRPCError({ code: 'TOO_MANY_REQUESTS', message: err.message });
    }
    if (err.message.includes('not found')) {
      return new TRPCError({ code: 'NOT_FOUND', message: err.message });
    }
  }
  return new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });
}

// Mobile error display pattern
function handleError(error: unknown, toast: ToastFn) {
  if (error instanceof TRPCClientError) {
    if (error.data?.code === 'FORBIDDEN') {
      // Navigate to paywall
      router.push('/premium');
      return;
    }
    toast.error(error.message);
    return;
  }
  toast.error('Something went wrong. Please try again.');
}
```

---

## 16. Testing Patterns

```typescript
// Unit test pattern — packages/core/**/*.test.ts
import { describe, it, expect } from 'vitest';
import { calculateLifePathNumber } from './pythagorean';

describe('calculateLifePathNumber', () => {
  it('returns correct life path for a known DOB', () => {
    expect(calculateLifePathNumber('1990-07-15')).toBe(5);
  });

  it('handles master number 11', () => {
    expect(calculateLifePathNumber('1979-02-29')).toBe(11);
  });
});
```

```typescript
// Integration test pattern — packages/api/routers/*.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { createTestCaller } from '../test-utils';

describe('reading.list', () => {
  it('returns only readings belonging to the current user', async () => {
    const caller = createTestCaller({ userId: 'user_test_123' });
    const result = await caller.reading.list({ limit: 10 });
    expect(result.items.every(r => r.userId === 'user_test_123')).toBe(true);
  });
});
```

---

## 17. Build & Run Commands

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
pnpm --filter db migrate:dev    # create + apply in local
pnpm --filter db migrate:push   # push to Supabase

# Deploy Edge Functions
supabase functions deploy reading-service
supabase functions deploy --all

# Deploy web
vercel deploy --prod
```

---

## 18. What NOT to Do

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
const text = await Codex.generate(...); // without checking Redis first

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

## 19. Key Architectural Decisions (ADRs)

| Decision | Choice | Why |
|----------|--------|-----|
| API protocol | tRPC v11 | End-to-end type safety, no codegen step |
| Mobile styling | NativeWind | Same Tailwind tokens as web |
| ORM | Drizzle | Type-safe, Edge-compatible, no reflection |
| Auth | Clerk | Apple Sign-In support, phone OTP, Indian market |
| Mobile billing | RevenueCat | Cross-platform, webhook-first architecture |
| Vision AI | OpenAI GPT-5 | Best structured JSON output from images |
| Synthesis AI | Codex Opus 4.7 | Best long-form narrative; tool-use support |
| Image gen | FLUX.2 Pro | Best photorealism for portraits |
| Voice | ElevenLabs v3 | 12-language coverage, lowest latency |
| Package manager | pnpm | Workspace support, disk efficiency |
| Monorepo | Turborepo | Shared cache, per-package pipelines |

---

## 20. Dev Environment Tips

### Package Manager
- **Always use pnpm** — never `npm` or `yarn`. All scripts assume pnpm workspaces.
- Install all dependencies: `pnpm install` (from workspace root)
- Add a package to a specific workspace: `pnpm add <pkg> --filter mobile`

### Starting Services
```bash
# All workspaces in parallel (web + mobile bundler)
pnpm dev

# Individual apps
pnpm --filter web dev       # Next.js at http://localhost:3000
pnpm --filter mobile dev    # Expo DevTools (tunnel mode)

# Mobile on device
npx expo run:ios            # Requires Xcode
npx expo run:android        # Requires Android Studio

# Supabase local stack (DB + Edge Functions)
supabase start              # http://localhost:54321
supabase functions serve    # Hot-reload all edge functions locally
```

### Key Local URLs
| Service | URL |
|---------|-----|
| Next.js web | http://localhost:3000 |
| Supabase Studio | http://localhost:54323 |
| Supabase API | http://localhost:54321 |
| Expo DevTools | http://localhost:8081 |

### Environment Variables
- Copy `.env.example` to `.env.local` at the workspace root
- For mobile, also create `apps/mobile/.env.local` with `EXPO_PUBLIC_*` vars
- All variable names are documented in §7 — never invent new names
- Edge Functions read vars from Supabase secrets, not `.env`: `supabase secrets set KEY=value`

---

## 21. Testing Instructions

### Running Tests
```bash
pnpm test                                   # All workspaces
pnpm --filter core test                     # packages/core only
pnpm --filter api test                      # packages/api only
pnpm test -- --watch                        # Watch mode
pnpm test -- --coverage                     # With coverage
```

### File Naming
- Co-locate test files with source: `pythagorean.ts` → `pythagorean.test.ts`
- Use descriptive names matching what is being tested
- Always use camelCase + `.test.ts` suffix

### Required Imports
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
```

### File Structure Template
```typescript
/**
 * Tests for [module/feature name].
 */
import { describe, it, expect } from 'vitest';
import { functionUnderTest } from './module';

describe('functionUnderTest', () => {
  it('returns expected value for known input', () => {
    // Arrange
    const input = '1990-07-15';

    // Act
    const result = functionUnderTest(input);

    // Assert
    expect(result).toBe(5);
  });

  it('handles edge case: master number 11', () => {
    expect(functionUnderTest('1979-11-29')).toBe(11);
  });
});
```

### Test Best Practices
1. **Arrange-Act-Assert**: structure every test with clear sections
2. **Test isolation**: each test must be independent — no shared mutable state
3. **Mock external I/O only**: don't mock your own modules; mock `fetch`, Supabase client, AI APIs
4. **Use `createTestCaller`** from `packages/api/test-utils` for tRPC integration tests
5. **Add tests for every change** — if you add/modify code, update or add a test

### Test Categories
| Category | Location | Tool |
|----------|----------|------|
| Unit | `packages/core/**/*.test.ts` | Vitest |
| tRPC integration | `packages/api/routers/*.test.ts` | Vitest + createTestCaller |
| Component | `apps/mobile/**/__tests__/*.test.tsx` | Vitest + React Native Testing Library |

### Pre-Commit Checklist
- [ ] `pnpm test` passes (all workspaces)
- [ ] `pnpm typecheck` passes (zero type errors)
- [ ] `pnpm lint` passes (no ESLint errors)
- [ ] No `console.log` in changed files
- [ ] No hardcoded env var values

---

## 22. PR Instructions

### PR Title Format
```
[<workspace>] <Description>

Examples:
  [mobile] Add palm scan progress indicator
  [api] Fix reading.list cursor pagination
  [web] Add pricing page
  [core] Add Chaldean numerology calculator
  [db] Add migration for compatibility_readings table
  [services] Add image-generation-service edge function
```

### Before Submitting
1. Run `pnpm test` — all tests green
2. Run `pnpm typecheck` — zero errors
3. Run `pnpm lint` — zero errors
4. Verify no `console.log`, no hardcoded secrets, no `any` types
5. Confirm `pnpm --filter db migrate:dev` applied if schema changed

### PR Checklist
- [ ] Tests pass and new tests added for changed code
- [ ] TypeScript strict mode — zero `any`, zero `console.log`
- [ ] No hardcoded environment variable values
- [ ] DB migrations included if schema changed
- [ ] PR description explains **what** changed and **why**

---

## 23. Common Tasks

### Adding a New tRPC Router
1. Create `packages/api/routers/<name>.router.ts` — follow §9 template
2. Export it from `packages/api/index.ts` and merge into `appRouter`
3. Add corresponding tests in `packages/api/routers/<name>.router.test.ts`
4. If the procedure requires a tier gate, use `requireTier()` from auth middleware

### Adding a New Mobile Screen
1. Create `apps/mobile/app/<path>.tsx` — follow §10 template exactly
2. Use `useAuthStore(s => s.user)` for the current user
3. Use `useSubscriptionStore(s => s.canAccessFeature)` for feature gating
4. Use `useQuery(api.<router>.<procedure>.queryOptions(...))` for data fetching
5. Add `<Stack.Screen options={{ headerShown: false }} />` at the top of the return

### Adding a New Edge Function (Service)
1. Create `services/<name>-service/index.ts` — follow §11 template
2. Register the function in `supabase/config.toml` if needed
3. Test locally: `supabase functions serve <name>-service`
4. Deploy: `supabase functions deploy <name>-service`
5. Set secrets: `supabase secrets set KEY=value` (not `.env`)

### Adding a Shared Type
1. Edit `packages/core/types/index.ts` — this is the single source of truth
2. Export the type — it will be available as `import type { X } from '@hastara/core/types'`
3. Never define domain types in app-level files

### Adding a Drizzle Migration
1. Edit `packages/db/schema.ts` to reflect the schema change
2. Generate migration: `pnpm --filter db migrate:dev`
3. Review the generated file in `packages/db/migrations/`
4. Apply to Supabase: `pnpm --filter db migrate:push`

---

## 24. Troubleshooting

### TypeScript Errors
- Always run `pnpm typecheck` from the **workspace root** — per-package checks miss cross-package type issues
- If a type from `@hastara/core/types` isn't resolving, check `packages/config/typescript/tsconfig.json` path mappings

### Expo / Metro Issues
- Changes not reflecting: clear Metro cache with `npx expo start --clear`
- Native module errors after adding a package: run `npx expo run:ios` or `npx expo run:android` (not just `expo start`)
- `EXPO_PUBLIC_*` vars not available: ensure they are in `apps/mobile/.env.local`, not just root `.env.local`

### tRPC Procedure Not Found
- Verify the router is exported and merged in `packages/api/index.ts`
- Verify the client in `apps/mobile/lib/trpc.ts` or `apps/web` is importing `AppRouter` from the correct path

### Supabase RLS Blocking Queries
- Ensure the request includes `Authorization: Bearer <jwt>` header
- Check the RLS policy in `packages/db/schema.ts` for the relevant table
- Test locally with `supabase db reset` to reapply all policies

### Edge Function 401 / 500
- 401: `SUPABASE_SERVICE_ROLE_KEY` must be set as a Supabase secret, not just in `.env` — run `supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<value>`
- 500: check `supabase functions logs <name>` for the actual error

### pnpm Workspace Errors
- Never run `npm install` — always `pnpm add <pkg> --filter <workspace>`
- If lockfile is out of sync: `pnpm install` from workspace root (never `pnpm install --frozen-lockfile` during dev)

---

*End of AGENTS.md — last updated May 2026*
