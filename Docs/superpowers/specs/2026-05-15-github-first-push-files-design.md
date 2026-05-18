# Design: GitHub First Push — Minimum Required Files

**Date:** 2026-05-15  
**Author:** Pavankumar Goli  
**Status:** Approved

---

## Goal

Prepare the Hastara monorepo for its first push to a public GitHub repository used by a private team. The repo should look professional and credible externally while giving team members everything they need to onboard and contribute.

---

## Context

- Repository: public GitHub, no commits yet (on `master` branch)
- Audience: private dev team (primary), public observers (secondary)
- License: Proprietary — All Rights Reserved
- Existing files that need no changes: `.gitignore`, `CLAUDE.md`, `AGENTS.md`, `.env.example`

---

## Files to Create

### 1. `README.md` (root)

**Purpose:** Project storefront and team onboarding entry point.

**Sections:**
- Badge row: Node ≥20, pnpm 9, TypeScript strict, License: Proprietary
- One-paragraph product description: Hastara is a multi-platform AI-powered palmistry, numerology, and astrology app (iOS + Android + Web). Core feature: Triple Convergence — GPT-5 Vision (palm feature extraction) + Claude Opus 4.7 (narrative synthesis).
- Tech stack table: React Native + Expo 51, Next.js 15, tRPC v11, Drizzle ORM, Supabase, Clerk auth, RevenueCat, Stripe
- Monorepo structure (4-line tree): `apps/` (mobile + web), `packages/` (core, api, ui, db, config), `services/` (Edge Functions), root config files
- Prerequisites: Node 20+, pnpm 9.1+, Supabase CLI, EAS CLI
- 4-step setup: clone → `pnpm install` → `cp .env.example .env` → `pnpm dev`
- Links to `CONTRIBUTING.md` (for team workflow) and `CLAUDE.md` (for AI-assisted dev context)

---

### 2. `LICENSE` (root)

**Purpose:** Legal protection for a commercial proprietary codebase.

**Content:** Standard "All Rights Reserved" notice.
```
Copyright (c) 2026 Pavankumar Goli. All rights reserved.

This source code is proprietary and confidential. No part of this
codebase may be reproduced, distributed, or transmitted in any form
or by any means without the prior written permission of the author.
```

---

### 3. `CONTRIBUTING.md` (root)

**Purpose:** Define team workflow so every contributor follows the same process.

**Sections:**
- Intro: private commercial project, contributions by invitation only, no external PRs accepted
- Branch naming: `feat/<slug>`, `fix/<slug>`, `chore/<slug>`, `docs/<slug>` — branch from `main`
- Commit format: Conventional Commits — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
- PR process: one feature per PR, fill in PR template, request 1 review before merge
- Code standards: pointer to CLAUDE.md §1 (critical rules) and §6 (naming conventions)
- Package manager: always `pnpm` — never `npm` or `yarn`

---

### 4. `.github/pull_request_template.md`

**Purpose:** Ensure every PR includes context and passes the CLAUDE.md §1 checklist before review.

**Sections:**
- **What does this PR do?** — 1–3 bullet points
- **Type** — checkbox: feat / fix / chore / docs / refactor
- **CLAUDE.md §1 checklist** — checkboxes:
  - [ ] No `any` types — used `unknown` + type guards where needed
  - [ ] No `console.log` in production code
  - [ ] No AI API calls in client bundle
  - [ ] Subscription tier gated server-side via `requireTier`
  - [ ] All env vars read from `process.env`
  - [ ] No hardcoded secrets
- **How was this tested?** — free text
- **Screenshots** — (for UI changes only)

---

## What Is NOT Being Created

| File | Reason skipped |
|------|----------------|
| `CODE_OF_CONDUCT.md` | Overkill for private team |
| Issue templates | Not needed — team uses direct communication |
| `SECURITY.md` | Out of scope for v1 push |

---

## Files Already Present (No Changes)

| File | Purpose |
|------|---------|
| `.gitignore` | Excludes node_modules, build outputs, secrets |
| `CLAUDE.md` | Full project technical context for AI-assisted dev |
| `AGENTS.md` | Agent/AI workflow instructions |
| `.env.example` | Template for all required environment variables |
| `pnpm-workspace.yaml` | Monorepo workspace config |
| `turbo.json` | Turborepo pipeline config |
| `tsconfig.json` | Root TypeScript config |
| `.eslintrc.js` | ESLint config |
| `.prettierrc` | Prettier config |

---

## Success Criteria

- `README.md` renders correctly on GitHub with no broken links
- `LICENSE` clearly states proprietary / all rights reserved
- `CONTRIBUTING.md` gives a new team member enough to submit their first PR correctly
- PR template auto-populates on every new GitHub PR
- First push succeeds with no secrets or build artifacts committed
