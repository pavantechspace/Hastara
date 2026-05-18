# Lyra — GitHub Copilot Instructions
# Place this file at: .github/copilot-instructions.md
# Copilot reads it automatically for context in every completion and chat session.

## Project: Lyra
Multi-platform AI palmistry + numerology + astrology app.
Turborepo monorepo: iOS/Android (React Native + Expo 51), Web (Next.js 15), Backend (Supabase Edge Functions).

## Stack
- Language: TypeScript 5.4 strict — no `any`, no `.js` files
- Mobile: React Native 0.74, Expo SDK 51, expo-router, NativeWind 4, Reanimated 3
- Web: Next.js 15 App Router, Tailwind CSS, shadcn/ui
- API: tRPC v11 (not v10)
- ORM: Drizzle ORM 0.30 (Edge-compatible)
- Auth: Clerk (@clerk/nextjs + @clerk/expo)
- DB: PostgreSQL via Supabase, Row-Level Security on every table
- State: Zustand 4.5 (global), TanStack Query v5 (server state)
- Payments: RevenueCat (mobile), Stripe (web)
- Cache: Upstash Redis
- Package manager: pnpm (not npm, not yarn)

## Non-negotiable rules
1. No AI API calls in any client code — always Edge Functions
2. Subscription tier checked server-side (tRPC middleware) AND client (UI gating)
3. Every tRPC procedure is `protectedProcedure` unless explicitly public
4. All AI outputs cached in Redis keyed by reading_id before responding
5. Mobile uses NativeWind className — never StyleSheet.create()
6. Import domain types from `packages/core/types/index.ts`
7. Import AI prompts from `packages/core/prompts/`

## Patterns to follow

### tRPC procedure
```typescript
import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const myRouter = router({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // ctx.user: User (from Clerk JWT)
      // ctx.db: Drizzle client
      // ctx.redis: Upstash Redis client
    }),
});
```

### Mobile screen
```tsx
import { ScrollView, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/trpc';

export default function MyScreen() {
  const { data, isLoading, isError } = useQuery(api.example.list.queryOptions());
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorBanner />;
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-5 pt-12">{/* content */}</View>
    </ScrollView>
  );
}
```

### Subscription gating
```typescript
// In UI (mobile)
const canAccess = useSubscriptionStore(s => s.canAccessFeature('advanced_analysis'));

// In tRPC procedure
.use(requireTier('oracle'))
```

## Subscription tiers
- free: 3 readings/month, standard+love modes, daily oracle, basic numerology
- mystic: unlimited readings, career+health modes, birth chart, Chaldean numerology
- oracle: spiritual mode, rare markings, voice reading, infographic export, triple convergence
- sage: crystal ball mode, future-self images, past-life vision, soul mandala, mantra/mudra

## File naming
- Components: PascalCase.tsx
- Utilities: camelCase.ts
- Stores: name.store.ts
- Routers: name.router.ts
- Prompts: name.prompt.ts
- Directories: kebab-case/
- Platform splits: Component.native.tsx and Component.web.tsx

## Design tokens
Primary: #0D3B2E | Gold: #B8935A | Cream: #F8F5EE | Text: #1A1A1A
Display font: Cormorant Garamond | Body: DM Sans

## Key env var names (never invent — use these exact names)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
OPENAI_API_KEY, ANTHROPIC_API_KEY, BFL_API_KEY, ELEVENLABS_API_KEY
EXPO_PUBLIC_REVENUECAT_APPLE_KEY, EXPO_PUBLIC_REVENUECAT_ANDROID_KEY
STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN

Mobile (client-exposed) vars use EXPO_PUBLIC_ prefix.
Web (client-exposed) vars use NEXT_PUBLIC_ prefix.
Server-only vars have no prefix.

## Full context
See CLAUDE.md in the project root for: complete TypeScript types, all 9 AI prompts,
all 30 tRPC procedure signatures, complete .env.example, full folder structure.
