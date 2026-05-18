# Hastara

Hastara is a multi-platform AI-powered palmistry, numerology, and astrology app. The product combines palm image analysis, numerology, and Vedic astrology into a single "Triple Convergence" reading experience across mobile, web, and Supabase Edge Functions.

## What This Repository Contains

This is a pnpm + Turborepo monorepo with:

- `apps/mobile` - React Native and Expo SDK 51 app for iOS and Android.
- `apps/web` - Next.js 15 App Router web app.
- `packages/core` - Pure domain logic, shared types, numerology, astrology, tarot, subscription rules, and AI prompts.
- `packages/api` - tRPC v11 routers, middleware, and API client exports.
- `packages/db` - Drizzle ORM schema, database client, and migration commands.
- `packages/ui` - Shared design primitives with native and web implementations.
- `packages/config` - Shared TypeScript, ESLint, Prettier, and Tailwind configuration.
- `services` - Supabase Edge Functions for AI, subscription, notifications, and domain services.
- `Docs` - Product, requirements, technical design, research, and design system documents.

## Product Scope

Hastara supports:

- Palmistry readings from hand images.
- Numerology profiles and daily cycles.
- Western and Vedic astrology foundations.
- Daily oracle guidance with tarot and moon phase context.
- Compatibility readings.
- Subscription-based access to premium features.
- AI-generated narratives, audio, images, and advanced reading artifacts through server-side services.

AI keys and provider calls must stay out of client bundles. Client apps call tRPC and backend services; AI execution belongs in Supabase Edge Functions.

## Tech Stack

| Area            | Technology                     |
| --------------- | ------------------------------ |
| Monorepo        | Turborepo                      |
| Package manager | pnpm 9.1.0                     |
| Runtime         | Node.js 20+                    |
| Language        | TypeScript 5.4, strict mode    |
| Mobile          | Expo SDK 51, React Native 0.74 |
| Mobile routing  | expo-router                    |
| Web             | Next.js 15 App Router          |
| API             | tRPC v11                       |
| Database        | Supabase Postgres              |
| ORM             | Drizzle ORM                    |
| Auth            | Clerk                          |
| Mobile billing  | RevenueCat                     |
| Web billing     | Stripe                         |
| State           | Zustand, TanStack Query        |
| Styling         | NativeWind and Tailwind CSS    |
| Analytics       | PostHog                        |
| Error tracking  | Sentry                         |

## Prerequisites

Install these before running the project:

- Node.js `>=20.0.0`
- pnpm `9.1.0`
- Expo tooling for mobile development
- Supabase CLI for Edge Function and database work
- Optional: EAS CLI for mobile builds
- Optional: Vercel CLI for web deployment

## Quick Start

Install dependencies:

```bash
pnpm install
```

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

Run all development workspaces:

```bash
pnpm dev
```

Run one app at a time:

```bash
pnpm --filter @hastara/web dev
pnpm --filter @hastara/mobile dev
```

Run validation:

```bash
pnpm typecheck
pnpm lint
pnpm test
```

## Workspace Scripts

Root scripts:

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `pnpm dev`          | Run `turbo dev` across workspaces.        |
| `pnpm build`        | Build all buildable workspaces.           |
| `pnpm typecheck`    | Type-check all workspaces.                |
| `pnpm lint`         | Lint all workspaces.                      |
| `pnpm test`         | Run tests across workspaces.              |
| `pnpm format`       | Format supported files with Prettier.     |
| `pnpm format:check` | Check formatting without writing changes. |
| `pnpm clean`        | Run Turborepo clean tasks.                |

Package-specific examples:

```bash
pnpm --filter @hastara/db generate
pnpm --filter @hastara/db migrate:dev
pnpm --filter @hastara/db migrate:push
pnpm --filter @hastara/db studio
```

## Repository Layout

```text
hastara/
├── apps/
│   ├── mobile/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── store/
│   └── web/
│       ├── app/
│       └── components/
├── packages/
│   ├── api/
│   ├── config/
│   ├── core/
│   ├── db/
│   └── ui/
├── services/
├── Docs/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Apps

### Mobile

Location: `apps/mobile`

The mobile app uses Expo Router and React Native. Primary route groups include:

- `app/(tabs)` - home, daily oracle, history, profile, and premium.
- `app/onboarding` - onboarding steps.
- `app/auth` - sign in and sign up.
- `app/reading/[id].tsx` - full reading screen.
- `app/compatibility.tsx` - compatibility scan.
- `app/advanced-analysis.tsx` - premium analysis/export flow.

Useful commands:

```bash
pnpm --filter @hastara/mobile dev
pnpm --filter @hastara/mobile typecheck
pnpm --filter @hastara/mobile lint
pnpm --filter @hastara/mobile test
```

### Web

Location: `apps/web`

The web app uses Next.js App Router. Route groups include:

- `app/(marketing)` - public landing, pricing, and blog pages.
- `app/(app)` - authenticated dashboard and settings pages.
- `app/api/trpc/[trpc]` - tRPC endpoint.
- `app/api/webhooks` - Clerk, Stripe, and RevenueCat webhooks.

Useful commands:

```bash
pnpm --filter @hastara/web dev
pnpm --filter @hastara/web build
pnpm --filter @hastara/web typecheck
pnpm --filter @hastara/web lint
```

## Packages

### `@hastara/core`

Pure business logic with no I/O. This package owns:

- Domain types in `types/index.ts`.
- Numerology calculations.
- Astrology helpers.
- Tarot data and seeded draws.
- Subscription feature maps.
- AI prompt templates.

Use this package as the source of truth for shared domain contracts.

### `@hastara/api`

tRPC routers and middleware. This package owns:

- Protected procedure patterns.
- Auth middleware.
- Subscription tier middleware.
- Rate-limit middleware.
- Router exports for reading, numerology, astrology, daily oracle, compatibility, subscription, profile, and history.

Backend business rules should be enforced here or deeper server-side, not only in clients.

### `@hastara/db`

Drizzle ORM schema and client factory. This package owns:

- Table definitions.
- Database client exports.
- Migration and Drizzle Studio commands.

Database access must respect user isolation and Supabase RLS policies.

### `@hastara/ui`

Shared UI primitives and tokens. Components use platform-specific files where needed:

- `Button.native.tsx` / `Button.web.tsx`
- `Card.native.tsx` / `Card.web.tsx`
- `Text.tsx`
- `tokens.ts`
- `utils.ts`

### `@hastara/config`

Shared configuration for TypeScript, ESLint, Prettier, and Tailwind.

## Services

Location: `services`

Supabase Edge Functions are organized by domain:

- `reading-service`
- `numerology-service`
- `astrology-service`
- `daily-oracle-service`
- `compatibility-service`
- `subscription-service`
- `notification-service`
- `image-generation-service`

Deploy an individual function:

```bash
supabase functions deploy reading-service
```

Deploy all functions:

```bash
supabase functions deploy --all
```

## Environment Variables

Use `.env.example` as the canonical list of required variables.

Important conventions:

- `NEXT_PUBLIC_*` values are exposed to the Next.js client bundle.
- `EXPO_PUBLIC_*` values are exposed to the Expo client bundle.
- Unprefixed values are server-only and must never be imported into client code.
- AI provider keys must only be used from server-side code and Edge Functions.

Major service groups:

- Clerk
- Supabase
- OpenAI
- Anthropic
- Black Forest Labs
- ElevenLabs
- RevenueCat
- Stripe
- Mapbox
- Upstash Redis
- Cloudflare R2
- Astronomy API
- PostHog
- Sentry
- Resend

## Architecture Rules

Follow these rules when changing code:

- TypeScript strict mode only.
- Do not introduce `any`; use `unknown` with type guards.
- Do not add JavaScript source files.
- Do not hardcode environment variables or secrets.
- Do not call AI providers from client apps.
- Keep backend logic in tRPC procedures, Edge Functions, or server-only modules.
- Enforce subscription gates server-side.
- Use RLS and user-scoped database queries for data isolation.
- Cache AI outputs by reading ID before regenerating content.
- Do not use `console.log` in production code.
- Prefer existing package patterns over new abstractions.

## Naming Conventions

Files:

- `PascalCase.tsx` for React components.
- `camelCase.ts` for utilities, hooks, and stores.
- `kebab-case` for directories.
- `.native.tsx` and `.web.tsx` for platform-specific components.
- `*.store.ts` for Zustand stores.
- `*.router.ts` for tRPC routers.
- `*.prompt.ts` for AI prompts.
- `*.schema.ts` for Zod schemas.
- `*.service.ts` for Edge Function business logic.

tRPC procedures use `router.action` names:

```text
reading.create
reading.list
reading.byId
dailyOracle.today
profile.update
subscription.getCurrent
```

## Subscription Model

Subscription tiers:

- `free`
- `mystic`
- `oracle`
- `sage`

Premium access is modeled in `packages/core/subscription/features.ts`. Client helpers may improve UX, but server-side procedures must enforce the actual gate.

## Database Notes

The database layer uses Drizzle with Supabase Postgres. Keep schema changes in `packages/db/schema.ts` and use Drizzle commands from the `@hastara/db` workspace.

Common commands:

```bash
pnpm --filter @hastara/db generate
pnpm --filter @hastara/db migrate:dev
pnpm --filter @hastara/db migrate:push
pnpm --filter @hastara/db studio
```

## Documentation

Important project documentation lives in `Docs`:

- `Hastara Software Requirements Specification_SRS_v1.0.docx`
- `Hastara Technical Design Document_TDD_v1.0.docx`
- `Hastara PalmVisionAI_Research and Strategic Product Document.docx`
- `Hastara_App_Native_Design_System_Master.md`
- `hastara_design_system.html`

Agent and contributor guidance:

- `AGENTS.md`
- `CLAUDE.md`
- Package-level `CLAUDE.md` files where present.

## Development Workflow

1. Pull the latest branch state.
2. Install dependencies with `pnpm install`.
3. Copy `.env.example` to `.env.local` and fill the required values.
4. Run the relevant app or package with `pnpm --filter`.
5. Make narrowly scoped changes following existing patterns.
6. Run `pnpm typecheck`, `pnpm lint`, and targeted tests.
7. For database or auth changes, verify RLS and server-side access checks.
8. For subscription changes, verify tier enforcement on the server.
9. For AI changes, verify provider calls remain server-side and cached output is reused.

## Deployment

Web:

```bash
vercel deploy --prod
```

Mobile:

```bash
eas build --platform ios --profile development
eas build --platform android --profile development
```

Edge Functions:

```bash
supabase functions deploy --all
```

Database:

```bash
pnpm --filter @hastara/db migrate:push
```

## Security Checklist

Before merging sensitive changes, verify:

- No secrets are committed.
- No AI provider keys are referenced by client code.
- All protected tRPC procedures require authentication.
- Paid features are checked server-side.
- User-owned records are queried with user scope.
- Supabase RLS policies match schema changes.
- Webhooks validate signatures.
- Logs do not include secrets, tokens, birth data, or palm image URLs unnecessarily.

## License

This repository is private. Add license details here when the project owner finalizes distribution terms.
