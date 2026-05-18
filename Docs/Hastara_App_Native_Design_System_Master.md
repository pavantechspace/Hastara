# Hastara App-Native Design System Master

Document ID: DS-HASTARA-APP-001  
Version: 1.1  
Date: May 2026  
Audience: AI IDEs, Codex, Claude Code, GPT-5, Opus, Sonnet, frontend engineers, product designers  
Platforms: iOS, Android, Web  
Source context: `Docs/hastara_design_system.html`, `Hastara Software Requirements Specification_SRS_v1.0.docx`, `Hastara PalmVisionAI_Research and Strategic Product Document.docx`, `AGENTS.md`

---

## 1. Purpose

This is the master implementation document for turning Hastara's editorial brand system into an app-native design system for mobile and web.

It is written for both humans and AI coding agents. Treat this file as the source of truth for visual direction, design tokens, component behavior, screen composition, motion, and shareable artifact templates.

When building Hastara UI, do not invent visual patterns unless this document is incomplete. Prefer extending this system with explicit tokens and reusable components.

## 2. Product Design Positioning

Hastara is a premium AI-powered palmistry, numerology, and astrology product. The design should feel like:

- A serious self-discovery tool, not a novelty fortune-teller.
- A privacy-aware AI analysis product, not a generic horoscope feed.
- A calm daily ritual app, not a loud entertainment app.
- A modern Vedic/editorial experience, not purple crystal kitsch.
- A visual insight engine, not a wall of generated text.

The design target is **premium mystic-tech**:

- Editorial warmth from cream surfaces, serif headings, and gold details.
- Technical credibility from dark scan surfaces, line overlays, confidence states, and structured analysis.
- Ritual depth from daily oracle, tarot, moon, mantra, and streak mechanics.
- Shareability from compatibility cards, convergence maps, future-self imagery, and mandalas.

## 3. Core Experience Principles

1. **Scan first, explain second.** The Home screen exists to start a palm scan, resume a reading, or enter the daily ritual.
2. **Show the AI working.** Camera, validation, analysis, and results should expose meaningful states: image quality, line detection, confidence, convergence, and cached output.
3. **Structured insight over long prose.** Generated narratives must be broken into sections, highlights, scores, diagrams, and actionable reflection prompts.
4. **Privacy is part of the interface.** Palm images are biometric-equivalent. Every scan/upload flow needs subtle but clear trust cues.
5. **Premium means depth, not noise.** Paid tiers unlock richer analysis, voice, rare markings, convergence maps, and generated artifacts. Do not make premium screens visually louder than free screens.
6. **Daily habit surfaces should be calm.** Daily Oracle, tarot, moon phase, and streaks should feel grounding, not gamified in a childish way.
7. **The app must be visually useful in screenshots.** Every major result screen should produce a clear, shareable artifact without requiring explanation.

## 4. Design Modes

Hastara uses three visual modes. All screens must choose one primary mode.

### 5.1 Ritual Light

Used for: Home, Daily, History, Profile, Premium, Reading Result, Settings.

Character:

- Cream or warm white base.
- Forest green hierarchy.
- Warm gold emphasis.
- Charcoal body text.
- Gentle borders.
- Low-shadow, tactile surfaces.

Implementation:

- Background: `cream` or `creamAlt`.
- Surface: `surface` or `cream`.
- Primary actions: `forest`.
- Accent details: `gold`.

### 5.2 Vision Dark

Used for: Palm camera, image validation, AI analysis, compatibility scan, AR overlay.

Character:

- Deep green-black background.
- High camera focus.
- Palm overlays, line detection, progress rings.
- Teal and gold technical highlights.
- Sparse copy.

Implementation:

- Background: `ink`.
- Overlay panels: `inkElevated`.
- Primary overlay: `visionTeal`.
- Premium/rare marking overlay: `gold`.
- Text: `textOnDark`.

### 5.3 Share Editorial

Used for: Instagram story cards, reading summaries, compatibility cards, convergence maps, future-self cards, soul mandalas, infographic exports.

Character:

- High contrast.
- Elegant typography.
- Minimal metadata.
- Strong composition.
- Watermarked Hastara identity.

Implementation:

- Prefer `cream` + `forest` + `gold`.
- Use image/diagram as primary content, not decoration.
- Keep card text short and legible at social-media scale.

## 5. Global Design Tokens

All tokens must live in `packages/ui/tokens.ts` and be exported as `as const`. Platform-specific wrappers may map these tokens into Tailwind, NativeWind, CSS variables, and React Native style utilities.

Never hardcode hex values in components. Use tokens.

### 6.1 Color Tokens

#### Core Brand

| Token | Hex | Usage |
|---|---:|---|
| `forest` | `#0D3B2E` | Primary brand, CTAs, active tabs, main headings |
| `forestMid` | `#0F6E56` | Strong borders, analysis emphasis, secondary CTA |
| `gold` | `#B8935A` | Premium accent, separators, icons, H3, rare markings |
| `cream` | `#F8F5EE` | Main light background |
| `creamAlt` | `#F4F0E5` | Secondary background, grouped sections |
| `surface` | `#FFFFFF` | Modals, sheets, input fields, raised panels |
| `charcoal` | `#1A1A1A` | Primary body text |
| `muted` | `#666666` | Secondary labels, captions |
| `border` | `#D4C9B0` | Default divider and card border |

#### Vision Dark

| Token | Hex | Usage |
|---|---:|---|
| `ink` | `#071C17` | Camera and AI analysis background |
| `inkElevated` | `#0B2A22` | Bottom sheets and overlay panels on dark |
| `visionTeal` | `#38C6A3` | Palm landmarks, valid scan states |
| `visionBlue` | `#5DADEC` | Informational analysis states |
| `scanAmber` | `#D6A85F` | Needs attention, framing hints |
| `textOnDark` | `#F8F5EE` | Primary dark-mode text |
| `textOnDarkMuted` | `#B7C6BE` | Secondary dark-mode text |

#### Semantic

| Token | Hex | Usage |
|---|---:|---|
| `success` | `#4A7C59` | Positive score, completed states |
| `successTint` | `#E8F0E8` | Success surfaces |
| `warning` | `#C9836F` | Soft warnings, low luck score, no panic states |
| `warningTint` | `#F6E8DF` | Warning surfaces |
| `error` | `#B85450` | Destructive or failed states only |
| `errorTint` | `#F5E5E5` | Error surfaces |
| `info` | `#185FA5` | Informational labels |
| `infoTint` | `#E5EEF5` | Informational surfaces |

#### Feature Accents

| Token | Hex | Usage |
|---|---:|---|
| `modeStandard` | `#0D3B2E` | Standard reading |
| `modeLove` | `#B86B7D` | Love reading |
| `modeCareer` | `#185FA5` | Career reading |
| `modeHealth` | `#4A7C59` | Health reading, non-medical framing only |
| `modeSpiritual` | `#7B5EA7` | Spiritual reading |
| `modeCrystalBall` | `#5E6AD2` | Crystal Ball mode |

#### Subscription Tier Accents

| Token | Hex | Usage |
|---|---:|---|
| `tierFree` | `#666666` | Free tier |
| `tierMystic` | `#B8935A` | Mystic |
| `tierOracle` | `#0D3B2E` | Oracle |
| `tierSage` | `#7B5EA7` | Sage |

### 6.2 Typography Tokens

| Role | Font | Usage |
|---|---|---|
| Display | Cormorant Garamond | Brand, screen titles, reading headings, share cards |
| Body | DM Sans | UI, body text, forms, buttons |
| Mono | JetBrains Mono | Technical metadata, IDs, debug/dev docs |

Rules:

- Use the display font **intentionally and confidently**, not sparingly. It signals craft and earns the premium price. Screen titles, reading section headings, oracle text, score labels, and share cards all warrant Cormorant Garamond. Reserve DM Sans for dense operational content: buttons, form fields, tabs, metadata.
- Use body font for all buttons, tabs, inputs, labels, and dense content.
- Do not use negative letter spacing.
- Do not scale font sizes with viewport width.
- Keep generated reading prose at comfortable reading sizes.
- For mobile, avoid long all-caps labels except tiny metadata tags.

### 6.3 Type Scale

Full specification per token. All weights are from the available font axes. Line heights are minimum values — tighter only if design is validated.

| Token | Mobile | Web | Weight | Line Height | Letter Spacing | Usage |
|---|---:|---:|---|---|---|---|
| `caption` | 11 | 12 | DM Sans 400 | 1.4 | +0.02em | Metadata, timestamps |
| `label` | 12 | 13 | DM Sans 500 | 1.4 | +0.01em | Field labels, chips |
| `bodySmall` | 13 | 14 | DM Sans 400 | 1.5 | 0 | Secondary body |
| `body` | 16 | 16 | DM Sans 400 | 1.6 | 0 | Standard body |
| `bodyLarge` | 18 | 18 | DM Sans 400 | 1.65 | 0 | Reading intro, oracle text |
| `titleSmall` | 20 | 22 | Cormorant Garamond 600 | 1.25 | -0.01em | Card titles |
| `title` | 24 | 28 | Cormorant Garamond 600 | 1.2 | -0.01em | Section titles |
| `displaySmall` | 32 | 40 | Cormorant Garamond 700 | 1.1 | -0.02em | Screen hero title |
| `display` | 40 | 56 | Cormorant Garamond 700 | 1.05 | -0.02em | Landing/major editorial title |

Rules:

- Never use DM Sans above `titleSmall`. Never use Cormorant Garamond below `titleSmall`.
- `display` and `displaySmall` use Cormorant Garamond 700 italic when used for reading result headers and oracle titles.
- Do not override line heights to be tighter than the values above without explicit design review.

### 6.4 Spacing Tokens

Use an 8px spacing grid with 4px available for tiny alignment.

| Token | Value | Usage |
|---|---:|---|
| `xs` | 4 | Icon gaps, tight metadata |
| `sm` | 8 | Compact padding |
| `md` | 12 | Form and chip padding |
| `lg` | 16 | Default card padding |
| `xl` | 24 | Screen section gap |
| `xxl` | 32 | Major vertical rhythm |
| `screen` | 20 mobile / 32 web | Page side padding |

### 6.5 Radius Tokens

| Token | Value | Usage |
|---|---:|---|
| `sm` | 6 | Tags, tiny controls |
| `md` | 8 | Buttons, inputs, repeated cards |
| `lg` | 12 | Sheets, grouped modules |
| `xl` | 16 | Paywall panels, large feature modules |
| `pill` | 999 | Pills, segmented controls |

Rule: repeated app cards should usually use `8px` or `12px`. Avoid making the entire app feel like stacked rounded blobs.

### 6.6 Elevation Tokens

Mobile:

- `none`: flat surfaces.
- `soft`: subtle card lift, `shadowOpacity 0.06`, `elevation 2`.
- `modal`: bottom sheets and dialogs, `shadowOpacity 0.14`, `elevation 8`.

Web:

- Prefer borders over heavy shadows.
- Use shadows only for floating menus, modals, and sticky controls.

### 6.7 Border Tokens

| Token | Value | Usage |
|---|---|---|
| `hairline` | platform hairline / 1px web | Subtle dividers |
| `default` | 1px solid `border` | Cards, inputs |
| `strong` | 1px solid `forestMid` | Active analysis sections |
| `premium` | 1px solid `gold` | Premium feature emphasis |

## 6. Platform Implementation Rules

### 7.1 Shared Package

Canonical tokens:

- `packages/ui/tokens.ts`

Expected exports:

- `Colors`
- `Typography`
- `FontSize`
- `Spacing`
- `Radius`
- `BorderWidth`
- `Shadows`
- `ZIndex`
- `Motion`
- `FeatureColor`
- `TierColor`

### 7.2 Web

Targets:

- Next.js 15 App Router.
- Tailwind CSS 3.4.
- CSS variables in `apps/web/app/globals.css`.
- Shared Tailwind config in `packages/config/tailwind/index.js`.

Rules:

- Use server components by default for static marketing/app shell UI.
- Use client components only for interaction, animation, and stateful controls.
- Use semantic HTML for accessibility.
- Use responsive layouts from `320px` upward.
- Do not create a marketing-style landing screen inside the authenticated app.

### 7.3 Mobile

Targets:

- React Native 0.74.
- Expo SDK 51.
- Expo Router.
- NativeWind 4.
- Reanimated 3.
- Skia for palm overlays, charts, mandalas, and generated reading diagrams.

Rules:

- Respect safe areas on iOS and Android.
- Tap targets must be at least `44x44`.
- Use native haptics for tarot flip, scan completion, compatibility result reveal, and milestone badges.
- Use bottom sheets for mode selection, paywall preview, scan hints, and reading actions.
- Avoid web-style hover assumptions.

## 7. Component System

Every component must have typed props. No `any`. Shared components belong in `packages/ui` when cross-platform. Platform-specific versions should use `.native.tsx` and `.web.tsx`.

### 8.1 Foundation Components

#### `AppScreen`

Purpose: Standard page wrapper.

Props:

- `mode: 'ritualLight' | 'visionDark' | 'shareEditorial'`
- `safeArea?: boolean`
- `scroll?: boolean`
- `children`

Rules:

- Applies background token.
- Applies default side padding except camera/full-bleed screens.
- Handles status bar style on mobile.

#### `AppHeader`

Purpose: Top navigation header.

Variants:

- `standard`
- `compact`
- `transparent`
- `vision`

Rules:

- Header must not compete with primary scan action.
- In camera mode, use icon buttons only.

#### `BottomTabBar`

Tabs:

- Home
- Daily
- History
- Profile
- Premium only for free users

Rules:

- Active state uses `forest` in Ritual Light.
- Active state uses `visionTeal` in Vision Dark only if tab bar appears over dark surfaces.
- Premium tab should not appear for paid users unless it becomes a benefits screen.

### 8.2 Control Components

#### `Button`

Variants:

- `primary`
- `secondary`
- `ghost`
- `danger`
- `premium`
- `vision`

Sizes:

- `sm`
- `md`
- `lg`

Rules:

- Primary buttons use `forest` in Ritual Light.
- Vision buttons use `visionTeal` or dark outlined treatment.
- Premium buttons may use `gold` fill only for tier conversion.
- Buttons need disabled, loading, and locked states.
- Use icons for common actions: scan, share, save, play, download, close, back.

#### `IconButton`

Purpose: Tool actions.

Rules:

- Use lucide icons where available on web.
- Use matching icon library on mobile.
- Tooltip on web for unfamiliar icons.
- Minimum target `44x44`.

#### `SegmentedControl`

Used for:

- Reading modes.
- Astrology system: Western / Vedic.
- Time windows: Week / Month / Year.
- Hand: Left / Right / Both.

Rules:

- Use `pill` outer radius.
- Active segment uses feature color when mode-specific.

#### `Chip`

Used for:

- Reading mode.
- Tier labels.
- Confidence labels.
- Locked feature tags.

Variants:

- `neutral`
- `feature`
- `tier`
- `status`
- `locked`

### 8.3 Data and Insight Components

#### `InsightCard`

Purpose: Reusable reading insight block.

Content:

- Title.
- Short summary.
- Optional confidence.
- Optional source system: palmistry, numerology, astrology, convergence.
- Optional locked state.

Rules:

- Avoid nesting cards inside cards.
- Use a left accent border for source system.
- Generated prose should be truncated only when the full detail is accessible.

#### `ScoreRing`

Used for:

- Luck score.
- Compatibility score.
- Karma/Dharma score.
- Image quality.

Rules:

- Score must never imply medical, financial, or fatalistic certainty.
- Use labels like `tendency`, `alignment`, `clarity`, `confidence`.

#### `MetricRow`

Used for:

- Palm line traits.
- Numerology values.
- Birth chart metadata.
- Subscription benefits.

Rules:

- Dense, readable, not decorative.

#### `Accordion`

Used for:

- Six-phase reading result.
- Profile sections.
- FAQ and legal disclosure.

Rules:

- First section may open by default.
- Persist expansion state for reading results when appropriate.

#### `Timeline`

Used for:

- Palm evolution.
- Dasha periods.
- Personal year/month/day cycles.
- Reading history.

Rules:

- Use clear date labels.
- Avoid deterministic prediction language.

### 8.4 Palm-Specific Components

#### `PalmCamera`

Purpose: Full-screen capture flow.

Required UI:

- Camera preview.
- Hand/oval guide.
- Real-time validation hints.
- Image quality state.
- Capture or auto-capture progress.
- Gallery upload fallback.
- Privacy microcopy.

Validation states:

- `searching`
- `moveCloser`
- `moreLight`
- `flattenHand`
- `centerPalm`
- `holdStill`
- `ready`
- `capturing`
- `failed`

Rules:

- No API spend until on-device validation passes.
- Use Vision Dark mode.
- Copy must be short and instructional.

#### `PalmOverlay`

Purpose: Draw detected landmarks and palm line overlays.

Visual tokens:

- Major lines: `visionTeal`.
- Minor lines: `visionBlue`.
- Rare markings: `gold`.
- Low-confidence segments: dashed `scanAmber`.

Rules:

- Overlays must not obscure the palm.
- Labels appear only after analysis or on tap.

#### `LineMap`

Purpose: Static result diagram for heart, head, life, fate, sun, mercury, marriage lines.

Rules:

- Show detected line name, confidence, and trait summary.
- Use tap-to-expand on mobile.
- Use side panel on desktop.

#### `MountMap`

Purpose: Palm mount visualization.

Rules:

- Show Venus, Jupiter, Saturn, Apollo, Mercury, Mars Lower, Mars Upper, Moon.
- Use elevation as intensity, not as judgment.

#### `RareMarkingBadge`

Purpose: Render rare marking detection.

Rules:

- Must show confidence.
- Locked if Oracle+ is required.
- Avoid exaggerated copy.

### 8.5 Astrology and Numerology Components

#### `BirthChartWheel`

Purpose: Visual chart for Western/Vedic placements.

Rules:

- Use clear labels.
- Use zoom or detail panel for small screens.
- If birth time is missing, show `Sun-only chart` state.

#### `NumerologyGrid`

Purpose: Pythagorean, Chaldean, and Lo-Shu data.

Rules:

- Make absent/present numbers visually scannable.
- Do not overuse mystical decoration.

#### `ConvergenceMap`

Purpose: Core Hastara differentiator. This is the most important component in the product. It must communicate the triple convergence concept visually in under 5 seconds without requiring explanation.

**Layout (Portrait — primary)**

```
┌─────────────────────────────────────────┐
│  PALMISTRY      NUMEROLOGY    ASTROLOGY  │  ← Lane headers (label, DM Sans 500)
│      │               │            │     │
│   ●──┼───────────────┼────────────┼──●  │  ← Trait dots connected by thin lines
│      │          ◆ CONVERGENCE     │     │  ← Gold diamond node where all 3 agree
│   ●──┼───────────────┼────────────┼──●  │
│      │     ✕ TENSION              │     │  ← Amber X node where systems diverge
│   ●──┼───────────────┼────────────┼──●  │
│                                         │
│  ─────────────── SYNTHESIS ──────────── │  ← Gold divider
│  One sentence that names the dominant   │
│  life theme across all three systems.   │
└─────────────────────────────────────────┘
```

**Visual Tokens**

| Element | Token | Notes |
|---|---|---|
| Lane lines | `border` `#D4C9B0` | 1px, vertical, full height |
| Trait dots | `forestMid` `#0F6E56` | 8px filled circle |
| Convergence node diamond | `gold` `#B8935A` | 16px, filled, drop-shadow soft |
| Tension node X | `scanAmber` `#D6A85F` | 14px, outlined, no fill |
| Lane header text | `muted` `#666666` | `label` token, all-caps |
| Synthesis text | `charcoal` `#1A1A1A` | `body` token, DM Sans, italic |
| Synthesis divider | `gold` `#B8935A` | hairline |
| Background | `cream` `#F8F5EE` | Ritual Light mode |

**States**

- `loading`: Three lane skeletons with animated shimmer. No node positions shown.
- `partial`: Lanes visible, nodes revealed one source at a time during generation stream.
- `complete`: All nodes, connections, and synthesis text visible. Share CTA appears.
- `locked`: Blurred overlay (40% opacity cream) with Oracle+ upgrade CTA centered.

**Motion — Convergence Reveal**

Nodes appear in sequence, not all at once. Each stage uses the `slow` (420ms) token.

1. Palmistry lane: dots appear top-to-bottom, line draws down.
2. Numerology lane: same sequence, 200ms delay after palmistry.
3. Astrology lane: same sequence, 200ms delay after numerology.
4. Connecting lines between lanes: draw left-to-right at `slow`.
5. Convergence nodes: bloom in with scale 0.5 → 1.0 at `ceremonial` (700ms).
6. Tension nodes: appear with a brief scale overshoot (1.0 → 1.15 → 1.0) at `slow`.
7. Gold divider draws left-to-right, synthesis text fades in: `standard` (240ms).

Total maximum duration: ~2.5 seconds. If reduced motion is enabled, all elements appear simultaneously with a single crossfade.

**Rules**

- This component is Oracle+. Gate via `requireTier('oracle')` server-side.
- It must be exportable as a share card via the Triple Convergence Card template (§11.3).
- Maximum 5 nodes per lane visible without scroll on mobile. Overflow accessible via expand.
- Never show more than 2 convergence nodes and 2 tension nodes on the default view — signal the pattern, do not overwhelm.
- Synthesis text must come from the AI reading, never be hardcoded or templated.

### 8.6 Tier Visual Registers

Each subscription tier has a distinct visual signature that must be applied consistently across TierCard, LockedFeature, Paywall, and any tier badge or accent within reading screens. These registers are cumulative — Oracle carries everything Mystic has, plus its own layer.

#### Free

- No tier accent color. Uses `muted` (`#666666`) for tier labels.
- Locked features show a soft blur or frosted overlay at 40% opacity over the preview content.
- CTA buttons use `ghost` variant with `forest` text, not `primary`.
- No tier badge shown; absence communicates free state.

#### Mystic

- Accent: `tierMystic` (`#B8935A`) — warm gold.
- Tier badge: gold pill label "Mystic" placed top-right of upgraded sections.
- Card borders: `1px solid #B8935A` (`premium` border token) on unlocked feature cards.
- Upgrade CTA: `premium` button variant with gold fill.
- Emotional register: "You've unlocked depth." Warm, inviting, not transactional.
- Paywall heading uses `displaySmall` in Cormorant Garamond italic, cream background.

#### Oracle

- Accent: `tierOracle` (`#0D3B2E`) — forest authority.
- Tier badge: forest pill label "Oracle" with cream text.
- Card borders: `1px solid #0F6E56` (`strong` border token) on unlocked feature cards.
- ConvergenceMap and advanced analysis sections get a `strong` left border (4px) to signal Oracle exclusivity.
- Upgrade CTA: `primary` button variant.
- Emotional register: "You see what others don't." Authoritative, clear, grounded.
- Paywall heading uses forest background with cream `displaySmall`.

#### Sage

- Accent: `tierSage` (`#7B5EA7`) — deep purple.
- Tier badge: purple pill label "Sage" with white text.
- Card borders: `1px solid #7B5EA7` on unlocked feature cards.
- Generated artifact screens (future-self, soul mandala, past-life) use subtle purple gradient bleed at screen edges — no more than 8% opacity so cream base is dominant.
- Upgrade CTA: `primary` button variant with purple fill override.
- Emotional register: "You're in the inner sanctum." Rare, composed, not loud.
- Paywall heading uses cream background with purple `displaySmall` italic and a gold divider.

Rules:

- Never use more than one tier accent on a single screen.
- Tier visual register must not make free-tier screens feel broken or punished — free is complete, paid is deeper.
- Tier badge appears only on content that is directly gated, not on navigation or general UI.

### 8.7 Monetization Components

#### `Paywall`

Tiers:

- Free.
- Mystic.
- Oracle.
- Sage.

Rules:

- Lead with outcomes, not raw feature count.
- Show trial terms clearly.
- Use App Store/Play Store billing on mobile and Stripe only on web.
- Avoid dark-pattern countdowns.
- Explain what unlocks immediately after purchase.

#### `TierCard`

Required:

- Tier name.
- Price.
- Best-for phrase.
- 4 to 6 core benefits.
- CTA.
- Trial/subscription terms.

Rules:

- Oracle is the default recommended plan unless product strategy changes.
- Sage should feel premium but not visually chaotic.

#### `LockedFeature`

Purpose: Inline upgrade affordance.

Rules:

- Show preview value.
- Explain required tier.
- CTA should open contextual paywall.

### 8.8 Marketplace Components

#### `AstrologerCard`

Required:

- Name.
- Photo or avatar.
- Specialty.
- Languages.
- Rating.
- Availability.
- Price per minute.
- CTA: Chat or Call.

Rules:

- Marketplace UI must feel vetted and safe.
- Avoid gambling-like urgency.

#### `SessionSummary`

Required:

- Duration.
- Cost.
- Attached reading context.
- Rating prompt.

Rules:

- Billing must be transparent.

## 8. Screen Templates

### 9.1 Mobile Navigation

Primary tabs:

1. Home
2. Daily
3. History
4. Profile
5. Premium, free users only

Secondary routes:

- Reading detail.
- Palm camera.
- Compatibility.
- Advanced analysis.
- Onboarding.
- Auth.
- Settings.
- Marketplace.

### 9.2 Web Navigation

Public web:

- Landing.
- Pricing.
- Blog/SEO.
- Auth.

Authenticated web:

- Dashboard.
- Reading history.
- Reading detail.
- Settings.
- Billing.

Rules:

- Web app should support review, export, billing, and account management.
- Mobile app remains the primary palm capture experience.

### 9.3 Home Screen

Mode: Ritual Light.

Purpose: scan hub and daily re-entry.

Required sections:

- Greeting and current streak.
- Primary scan CTA.
- Last reading preview.
- Daily Oracle preview.
- Quick actions: Compatibility, History, Profile.
- Free tier remaining reads or tier status.

Primary CTA:

- `Scan your palm`

Rules:

- Do not create a landing page inside the app.
- The scan CTA must be visually dominant.
- Avoid decorative hero sections.

### 9.4 Palm Camera Screen

Mode: Vision Dark.

Required states:

- Permission request.
- Camera ready.
- Validation hints.
- Auto-capture countdown.
- Preview confirm.
- Upload fallback.
- Failed validation.

Required copy examples:

- `Center your palm`
- `More light needed`
- `Hold still`
- `Ready to capture`
- `Your palm photo is encrypted and used only for this reading`

Rules:

- Keep all controls reachable with one hand.
- Use bottom action zone.

### 9.5 Analysis Progress Screen

Mode: Vision Dark.

Purpose: Make waiting time meaningful.

Stages:

1. Validating palm image.
2. Mapping major lines.
3. Reading mounts and markings.
4. Checking numerology.
5. Building convergence.
6. Writing your reading.

Rules:

- Show progress but do not fake exact precision.
- If cached reading exists, skip generation and show `Loaded from saved reading`.

### 9.6 Reading Result Screen

Mode: Ritual Light.

Required sections:

- Reading header: mode, hand, date, dominant trait.
- Luck/alignment score.
- Palm line map.
- Six-phase reading accordion:
  - Foundation.
  - Major lines.
  - Minor lines.
  - Mounts.
  - Rare markings.
  - Synthesis.
- Convergence summary.
- Actions: Save, Share, Voice, Export.
- Upgrade prompts for locked details.

Rules:

- Show generated text in readable chunks.
- Always include disclaimer framing as tendencies, not guarantees.
- Voice narration is Oracle+ or Sage according to entitlement.

### 9.7 Daily Oracle Screen

Mode: Ritual Light.

Required sections:

- Date and moon phase.
- Oracle card.
- Tarot card flip.
- Lucky color.
- Lucky number.
- Luck/alignment score.
- Streak.
- Optional Sage: mantra and mudra.

Rules:

- Tarot interaction should use haptic feedback.
- Daily content should feel complete for free users.
- Do not bury the daily ritual behind premium.

### 9.8 History Screen

Mode: Ritual Light.

Required sections:

- Search/filter.
- Reading list.
- Mode filters.
- Score trend.
- Palm evolution prompt.

Rules:

- Reading cards show date, mode, luck score, dominant trait, thumbnail.
- Avoid exposing raw AI internals.

### 9.9 Profile Screen

Mode: Ritual Light.

Required sections:

- User summary.
- Numerology profile.
- Birth data.
- Badges.
- Subscription.
- Settings.
- Privacy.

Rules:

- Security and deletion controls must be clear.
- Birth time missing state must explain chart limitations.

### 9.10 Premium Screen

Mode: Ritual Light with restrained premium accents.

Required sections:

- Tier comparison.
- Recommended Oracle plan.
- Trial terms.
- Feature previews.
- Restore purchases on mobile.
- Manage subscription path.

Rules:

- Do not use fear-based copy.
- Do not imply outcomes are guaranteed.

### 9.11 Compatibility Screen

Modes: Vision Dark for scanning, Ritual Light for result.

Flow:

1. Select compatibility.
2. Scan user palm.
3. Scan partner palm.
4. Analyze both palms.
5. Result with six dimensions.

Dimensions:

- Emotional.
- Intellectual.
- Romantic.
- Spiritual.
- Financial.
- Communication.

Rules:

- User B may be a guest.
- Do not require partner account creation.
- Compatibility is Mystic+ unless strategy changes.

### 9.12 Advanced Analysis Screen

Mode: Ritual Light.

Purpose: Oracle+ infographic and deep visual analysis.

Required:

- Convergence map.
- Palm line and mount diagrams.
- Numerology summary.
- Birth chart summary.
- Export/share CTA.

Rules:

- This is a structured visual report, not a long article.

### 9.13 Marketplace Screen

Mode: Ritual Light.

Required:

- Filter by language, specialty, availability.
- Astrologer cards.
- Credit balance.
- Trust/safety note.

Rules:

- Show exact price before session start.
- Attach reading context only with explicit user action.

## 9. Motion Rules

Motion must support comprehension. It must not become mystical decoration.

### 10.1 Motion Tokens

| Token | Duration | Easing | Direction | Feel |
|---|---:|---|---|---|
| `instant` | 80ms | linear | Scale 0.97→1.0 on press | Physical tap confirmation |
| `fast` | 150ms | ease-out | Fade + 2px translate | Snappy, no weight |
| `standard` | 240ms | ease-in-out | Fade + 4px translate | Controlled, purposeful |
| `slow` | 420ms | ease-in-out | Transform-based (flip, bloom) | Deliberate, ritualistic |
| `ceremonial` | 700ms | cubic-bezier(0.22, 1, 0.36, 1) | Bloom outward from center | Earned, rare, reverent |

The `ceremonial` easing is a custom spring curve — fast acceleration, long soft settle. It must not be reused for routine transitions. Reserve it for: first reading completion, mandala reveal, convergence map fully loaded.

### 10.2 Motion Patterns

#### Scan Ready Pulse

- A soft glow ring expands outward from the hand guide oval and fades — scale 1.0→1.06→1.0, opacity 0.6→0→0.6.
- Duration: `standard` loop (240ms each direction).
- Color: `visionTeal` at 50% opacity.
- Use only when validation state is `ready`. Stop immediately on `capturing` or `failed`.
- Do not pulse error states — amber color change alone signals the problem.

#### Auto-Capture Countdown

- A single continuous ring strokes clockwise around the oval guide, completing over the capture hold duration (default 1.5s).
- Stroke color: `visionTeal`. Stroke width: 3px.
- Haptic at completion (medium impact).
- If the user moves the palm during countdown, ring resets with a brief `scanAmber` flash on the stroke.

#### Analysis Progress

- Stage label fades out and the next fades in — opacity 1→0 then 0→1, each at `fast` (150ms). No slide on the label itself.
- The progress bar beneath advances smoothly, not in discrete jumps — use an interpolated fill driven by a timer, not by actual API progress events.
- Avoid spinning loaders as the primary element. The progress bar and stage text together are the experience.

#### Tarot Flip

- True 3D card rotation on the Y axis: 0°→90° (front disappears) then 90°→180° (back appears). Each half uses `slow` (420ms) with ease-in for the first half, ease-out for the second.
- Implement via `perspective(800px) rotateY()` on web; `react-native-reanimated` interpolated rotation on mobile.
- Haptic at the midpoint (90°) — light impact type.
- Card shadow deepens during rotation (soft → modal elevation) and returns to soft at completion.
- On reduced motion: instant crossfade between card back and card front, no rotation.

#### Reading Stream

- Text streams in sentence-by-sentence, not character-by-character. Each sentence fades in at `fast` (150ms).
- Section containers are pre-sized using a min-height estimate before content arrives — no layout shift as text fills in.
- Section header appears immediately; body text streams beneath it.
- When the full section is complete, a subtle `success` tint (`#E8F0E8`) briefly washes the section border (200ms) to signal completion.

#### Convergence Reveal

See §7.5 ConvergenceMap for the full sequenced animation spec. Summary: palmistry lane → numerology lane → astrology lane → connecting lines → convergence nodes bloom → tension nodes appear → synthesis fades in. Total: ~2.5 seconds. `ceremonial` easing on node bloom only.

### 10.3 Reduced Motion

Respect platform reduced-motion settings.

Fallbacks:

- Replace flip with crossfade.
- Replace pulse with static highlight.
- Replace streaming with paragraph reveal.

## 10. Haptics Rules

Mobile only.

Use haptics for:

- Scan validation success.
- Auto-capture complete.
- Tarot card reveal.
- Reading generation complete.
- Badge/milestone unlock.
- Payment success.

Do not use haptics for:

- Error loops.
- Every tab switch.
- Passive scrolling.

## 11. Share-Card Templates

Share cards are a core growth surface. They must be generated from reusable templates, not ad hoc screenshots. Every card must be legible at the scale it will appear on social media — test at 375px wide before shipping.

**Supported formats:**

| Format | Dimensions | Use case |
|---|---|---|
| Instagram Story | `1080×1920` | Reading summary, daily oracle, future-self |
| Square feed | `1080×1080` | Compatibility, convergence, soul mandala |
| Wide web/social | `1200×630` | OG preview, web sharing |
| App infographic export | `1080×1920` portrait | Advanced analysis, full reading export |

**Universal composition rules:**

- Hastara wordmark: bottom-right corner, 10% card width, `muted` or `textOnDarkMuted` depending on background. Never centered — centering competes with content.
- Safe zone: 80px inset on all sides for Story format; 60px for Square.
- No more than 3 typographic levels per card: headline, supporting, micro-label.
- Text contrast must pass WCAG AA at final rendered size. Test gold text on cream — it is borderline and must be `forest` weight or larger.
- Date/mode label: top-left, `caption` token, `muted`, formatted as `"Standard · 14 May"`.

### 12.1 Reading Summary Card

Purpose: Share a single reading insight.

**Composition (Story 1080×1920):**

```
[80px top margin]
STANDARD · 14 MAY                     ← caption, muted, top-left
─────────────────────────             ← gold hairline, 40% width, left-aligned

[~400px vertical center zone]
  Your dominant energy this season    ← displaySmall, Cormorant 700 italic, forest
  is one of quiet momentum.           ← (continued, max 18 words)

  ── Luck alignment: 74 ──            ← label, DM Sans 500, gold, centered

[Bottom zone]
  Palmistry · Numerology · Astrology  ← caption, muted, centered

[Hastara wordmark — bottom-right]
[80px bottom margin]
```

Visual tokens: cream background, forest heading, gold divider and score label.

Text limits: 18 words for main insight, 40 words total including all labels.

### 12.2 Compatibility Card

Purpose: Share relationship result.

**Composition (Square 1080×1080):**

```
[60px margin all sides]
Compatibility reading                 ← label, DM Sans 500, muted, top-left

        ◯  74  ◯                      ← ScoreRing, 200px diameter, centered
     Overall alignment

  ████████████░░  Emotional    82     ← 6 mini progress bars, 4px height
  ██████░░░░░░░░  Financial    48     ← left-aligned, gold fill, border track
  ███████████░░░  Romantic     76
  ████████░░░░░░  Spiritual    58
  ████████████░░  Intellectual 80
  ██████████░░░░  Communication 67

  "Strongest in emotional attunement" ← bodySmall italic, muted, centered

[Hastara wordmark — bottom-right]
```

Visual: cream background with `modeLove` (`#B86B7D`) accent for the score ring on romantic-mode readings; forest otherwise.

Privacy: first names or initials only. Guest partner label: `"Partner"`.

### 12.3 Triple Convergence Card

Purpose: Show the proprietary differentiator. This card must make someone who has never heard of Hastara understand the triple convergence concept from the image alone.

**Composition (Square 1080×1080):**

```
[60px margin]
Triple Convergence                    ← titleSmall, Cormorant 600 italic, forest

PALMISTRY    NUMEROLOGY    ASTROLOGY  ← label, muted, evenly spaced, centered
    │              │             │
    ●──────────────◆─────────────●   ← convergence node (gold diamond, 20px)
    │              │             │
    ●──────────────✕─────────────●   ← tension node (amber X, 16px)
    │              │             │

────────────────────────────────     ← gold divider

"Your ambition and your empathy       ← body italic, charcoal, centered
 are pulling in the same direction."  ← synthesis sentence, max 20 words

[Hastara wordmark — bottom-right]
```

Visual: cream background preferred. Forest background variant available for high-contrast share contexts. Gold convergence node, amber tension node, thin `border` lane lines.

### 12.4 Daily Oracle Card

Purpose: Daily share habit.

Layout:

- Date.
- Moon phase.
- Tarot card name.
- Oracle sentence.
- Lucky color and number.

Visual:

- Ritual Light.
- Optional moon graphic.

Rules:

- Do not reveal full paid content on share card.

### 12.5 Future-Self Card

Purpose: Sage viral asset.

Layout:

- Generated portrait as main image.
- Minimal overlay.
- Age/time horizon: `5 years`, `10 years`, `20 years`, `40 years`.
- One reflective prompt.

Visual:

- Full-bleed image.
- Gradient scrim only for legibility.
- Hastara watermark.

Rules:

- Image is primary.
- Avoid dark, cropped, or uninspectable output.

### 12.6 Soul Mandala Card

Purpose: Sage wallpaper/share artifact.

Layout:

- Mandala centered.
- Optional one-line interpretation.
- User initials or reading date.

Visual:

- Cream, forest, gold, plus generated accent palette.

Rules:

- Must work as phone wallpaper.
- Avoid clutter.

## 12. Accessibility

Minimum requirements:

- WCAG AA contrast for all text.
- Tap targets at least `44x44`.
- Dynamic type support where feasible.
- Screen reader labels for all icon-only buttons.
- Reduced-motion support.
- No color-only state communication.
- Form errors must be text-readable.
- Charts need accessible summaries.

Palm camera accessibility:

- Provide upload-from-gallery fallback.
- Provide textual validation hints.
- Do not rely on audio alone.

Tarot and motion interactions:

- Flip state must be screen-reader understandable.
- Reduced-motion users get crossfade.

## 13. Content and Copy Rules

Tone:

- Warm.
- Grounded.
- Clear.
- Reflective.
- Never theatrical.
- Never fatalistic.

Allowed framing:

- `suggests`
- `points toward`
- `indicates a tendency`
- `may reflect`
- `a useful pattern to notice`

Avoid:

- `destined`
- `guaranteed`
- `you will die`
- `you will become rich`
- `medical diagnosis`
- `financial advice`
- `curse`
- `bad luck is coming`

Health mode:

- Must use wellness/reflection language.
- Must not diagnose, predict illness, or recommend treatment.

Financial/career:

- Must not provide financial advice.
- Use strengths, tendencies, and planning reflections.

## 14. Privacy and Trust UI

Required trust surfaces:

- Camera permission screen.
- Palm upload preview.
- Reading generation loading.
- Profile privacy settings.
- Account deletion flow.
- Share confirmation.

**Trust copy tone:** Write as a brand that has already earned trust — clear, direct, and confident. Avoid legal hedging, passive voice, and over-explanation. One short sentence is always stronger than two cautious ones.

| Surface | Copy |
|---|---|
| Camera permission prompt | `"Your palm stays on your device. We analyse it, then delete the image."` |
| Palm upload preview | `"This photo is used only for your reading. You choose whether it's saved."` |
| Reading generation loading | `"Your reading is generated privately — no human ever sees your palm."` |
| Share confirmation sheet | `"Sharing includes your insight and score only — never your birth data or palm image."` |
| Profile > Privacy description | `"You own your data. Export it, delete it, or pause analysis any time."` |
| Account deletion confirmation | `"Your palm images and readings will be permanently deleted within 24 hours."` |

Rules:

- Never start trust copy with "We" — leads with the brand, not the user. Start with "Your" wherever possible.
- Do not use the word "encrypted" in user-facing copy unless it is the primary message — it reads as defensive, not reassuring.
- Do not imply palm photos are casual images. Every scan context must treat the image as meaningful.
- Deletion and export controls must be reachable in two taps from Profile.
- Trust copy must not appear only in onboarding — it must be present at every scan, upload, and share surface.

## 15. Empty, Loading, Error, and Locked States

These states are premium design moments, not functional fallbacks. A user who paid for Sage tier and encounters an empty state should still feel the experience is worth the price. Every state below must carry the Hastara brand voice: warm, grounded, never clinical.

### 16.1 Empty States

Empty states are invitations, not dead ends. They must use Cormorant Garamond for the headline, include a brief brand-voice line, and lead directly to the next meaningful action.

| Screen | Headline | Supporting copy | CTA |
|---|---|---|---|
| No readings yet | "Your story begins with your palm." | "A single scan reveals patterns across palmistry, numerology, and astrology." | `Scan your palm` (primary button) |
| No daily oracle | "Today's oracle is being prepared." | "Check back in a moment — your reading is generated fresh each morning." | `Refresh` (ghost button) |
| Missing birth time | "Your chart is running in sun-only mode." | "Add your birth time in Profile to unlock full Vedic placements and Dasha periods." | `Add birth time` (ghost button) |
| No compatibility readings | "Discover how your palm reads with someone you love." | "Compatibility is a two-palm reading — scan yours first, then theirs." | `Start compatibility` (primary button) |
| History — no results for filter | "No readings match this filter." | — | `Clear filter` (ghost button) |

Rules:

- Empty state headline always uses `titleSmall` in Cormorant Garamond 600 italic, `forest` color.
- Supporting copy uses `body` in DM Sans, `muted` color.
- Never use the word "empty", "nothing", "no data", or "null".
- Never show a generic illustration unrelated to palmistry or ritual.

### 16.2 Loading States

Loading states must make waiting feel active and intentional, not stalled.

**Content lists (History, Marketplace):**
Use skeleton cards that match the exact layout of the real card — same height, same padding, same number of text lines. Skeleton shimmer color: `border` (`#D4C9B0`) animating to `creamAlt` (`#F4F0E5`) at `standard` (240ms) loop.

**AI generation (Reading, Oracle, Compatibility):**
Use staged progress with named steps. Never an indefinite spinner as the primary element.

Reading generation stages and copy:

1. `Mapping your palm lines…`
2. `Reading mounts and markings…`
3. `Calculating your numerology…`
4. `Aligning your Vedic chart…`
5. `Finding convergence across all three…`
6. `Writing your reading…`

Each stage: `bodySmall` in DM Sans, `textOnDarkMuted` (Vision Dark mode), with a thin teal progress bar advancing underneath. Stage transitions use `standard` (240ms) fade + 4px upward slide.

If a cached reading is loaded: replace all stages with a single line — `"Loaded from your saved reading."` — shown for 800ms before transitioning to the result.

### 16.3 Error States

Errors must be specific, recoverable, and never alarming. Use the warning register, not the error register, unless data loss has occurred.

| Scenario | Copy | Action |
|---|---|---|
| Poor palm lighting | "We need more light to see your palm clearly." | `Try again` |
| Blurred image | "This image is a little blurred — even a small movement can affect it." | `Retake` / `Upload instead` |
| Palm not centered | "Move your palm into the frame and flatten your hand." | Auto-retry (no tap required) |
| Reading service busy | "Your scan is saved. We'll generate your reading in the background." | `Go to History` |
| Network offline | "You're offline. Your reading will start once you're reconnected." | `Retry now` |
| Cached read failed | "We couldn't load this reading. It may have been deleted." | `Back to History` |

Rules:

- Error headline uses `bodyLarge` in DM Sans 500, `warning` (`#C9836F`) color. Never `error` red for palm-related issues.
- Use `error` (`#B85450`) only for destructive outcomes: failed payment, data deletion, account error.
- Every error must offer a specific next action. No dead-end error screens.
- Do not apologize more than once per error message.

### 16.4 Locked States

Locked states must preview value without exposing full paid output. They are a sales surface and must feel like an invitation, not a wall.

**Layout:**

```
┌────────────────────────────────────┐
│  [Blurred or dimmed feature preview│  ← 40% opacity cream overlay
│   — enough to show what it is]     │
│                                    │
│  🔒  Oracle feature                │  ← Tier badge (from §7.6 visual register)
│  [Feature name, titleSmall italic] │
│  [1-sentence value statement]      │  ← body, muted
│                                    │
│  [ Unlock with Oracle  ▶ ]         │  ← primary button, tier color
└────────────────────────────────────┘
```

Required per locked feature:

| Element | Spec |
|---|---|
| Preview | Visible but non-interactive. Blur 12px or 40% opacity overlay — never fully hidden. |
| Tier badge | Pill label matching tier register from §8.6. |
| Feature name | `titleSmall`, Cormorant Garamond 600 italic, `charcoal`. |
| Value statement | One sentence, `body`, DM Sans, `muted`. Leads with outcome, not feature name. |
| CTA | `"Unlock with [Tier]"` → opens contextual paywall bottom sheet for that tier. |

Value statement examples (outcome-first):

- Triple Convergence: `"See exactly where your palm, numbers, and stars agree — and where they pull in different directions."`
- Voice reading: `"Hear your reading in a calm, personalised voice you can listen to anywhere."`
- Future-self image: `"A portrait of yourself in 5, 10, or 20 years — generated from your reading."`
- Soul mandala: `"A unique mandala built from your palm signature — yours to keep as a wallpaper or share."`

## 16. AI-Agent Implementation Checklist

When an AI coding agent builds or modifies Hastara UI, it must check:

- Uses `packages/ui/tokens.ts` tokens, not hardcoded colors.
- Uses TypeScript strict mode and no `any`.
- Places shared components in `packages/ui`.
- Uses `.native.tsx` and `.web.tsx` platform splits when behavior differs.
- Keeps AI calls out of client bundles.
- Uses server-side tRPC and Edge Function patterns for backend logic.
- Enforces paid features server-side, not only through hidden UI.
- Does not add JavaScript files.
- Does not add production `console.log`.
- Does not create marketing pages for authenticated app screens.
- Uses Vision Dark mode for camera/analysis.
- Uses Ritual Light mode for app reading/ritual/profile surfaces.
- Uses Share Editorial templates for exports and social assets.
- Includes accessible labels for icon-only actions.
- Includes loading, empty, error, disabled, and locked states.
- Avoids fatalistic, medical, financial, or deterministic claims.

## 17. Suggested File Architecture

Shared UI:

```text
packages/ui/
├── tokens.ts
├── AppScreen.native.tsx
├── AppScreen.web.tsx
├── Button.native.tsx
├── Button.web.tsx
├── IconButton.native.tsx
├── IconButton.web.tsx
├── Card.native.tsx
├── Card.web.tsx
├── ScoreRing.native.tsx
├── ScoreRing.web.tsx
├── InsightCard.native.tsx
├── InsightCard.web.tsx
├── SegmentedControl.native.tsx
├── SegmentedControl.web.tsx
├── Accordion.native.tsx
├── Accordion.web.tsx
└── index.ts
```

Mobile app:

```text
apps/mobile/
├── components/
│   ├── camera/
│   │   ├── PalmCamera.tsx
│   │   ├── PalmOverlay.tsx
│   │   └── ValidationOverlay.tsx
│   ├── reading/
│   │   ├── LineMap.tsx
│   │   ├── MountMap.tsx
│   │   ├── ConvergenceMap.tsx
│   │   └── ReadingPhaseAccordion.tsx
│   ├── daily/
│   │   ├── OracleCard.tsx
│   │   ├── TarotCard.tsx
│   │   └── MoonPhaseWidget.tsx
│   └── share/
│       ├── ReadingShareCard.tsx
│       ├── CompatibilityShareCard.tsx
│       └── ConvergenceShareCard.tsx
```

Web app:

```text
apps/web/
├── components/
│   ├── dashboard/
│   ├── reading/
│   ├── billing/
│   ├── marketing/
│   └── share/
```

## 18. Build Order

Recommended implementation sequence:

1. Create canonical tokens in `packages/ui/tokens.ts`.
2. Map tokens to Tailwind, CSS variables, and NativeWind.
3. Build `AppScreen`, `Button`, `IconButton`, `Card`, `Chip`, `SegmentedControl`.
4. Build `ScoreRing`, `InsightCard`, `Accordion`, `MetricRow`.
5. Build palm camera shell with Vision Dark mode.
6. Build reading result template.
7. Build Daily Oracle template.
8. Build Premium/paywall components.
9. Build Convergence Map.
10. Build share-card templates.
11. Add accessibility, loading, locked, empty, and error states.
12. Verify desktop and mobile visual output with screenshots.

## 19. Definition of Done

A UI implementation is complete only when it passes all three gates below. All gates are required — passing two out of three is not sufficient.

### Gate 1 — Technical

- Uses `packages/ui/tokens.ts` tokens, not hardcoded colors or sizes.
- TypeScript strict mode: zero `any`, zero JavaScript files.
- No production `console.log`.
- No client-side-only paid feature gate — tier is enforced server-side via `requireTier`.
- No AI calls in client bundles.
- Platform splits use `.native.tsx` / `.web.tsx` where behavior differs.

### Gate 2 — Functional

- Correct visual mode applied (Ritual Light / Vision Dark / Share Editorial).
- Responsive behavior verified on mobile (375px) and web (1280px minimum).
- All four states present and designed: empty, loading, error, locked.
- Accessible: WCAG AA contrast, 44×44 tap targets, icon-only buttons have labels, reduced-motion fallback exists.
- Trust copy present on every scan, upload, and share surface.
- Avoids all prohibited claims: no fatalistic, medical, financial, or deterministic language.

### Gate 3 — Premium Quality

This gate has no checklist — it requires a judgment call. Ask these questions before marking done:

1. **Would a user who paid $19.99/month feel this screen is worth it?** If the screen looks like it belongs in a free app, it fails this gate.
2. **Does the display font appear where it should?** Screen titles, reading section headings, oracle text, and score labels must use Cormorant Garamond. Absence reads as generic.
3. **Does the tier visual register apply correctly?** Mystic gold, Oracle forest, Sage purple must be present and intentional — not absent, not accidental.
4. **Is every state a brand moment?** Empty states must invite. Loading states must feel active. Locked states must show value, not a wall.
5. **Does the screen produce a shareable artifact where applicable?** Reading result, compatibility, convergence, and daily oracle screens must have a visible share action.
6. **Is the copy warm, grounded, and direct?** Read every string aloud. If it sounds like a legal disclaimer or a generic SaaS product, rewrite it.

If any question above cannot be answered "yes", the implementation is not done.

---

## Appendix A — Competitor Reference

Use competitors as reference points, not as templates. This section is background context for design decisions — it is not a primary implementation reference.

| Competitor | What works | What Hastara must avoid |
|---|---|---|
| CHANI | Editorial tone, ritual habit loops, authored feel, gold/black symbolic art | Too content-led for a scan-first product; whimsical collage must not dominate |
| Co-Star | Strong memorability, minimalist identity, social virality | Stark black/white and edgy copy can feel cold, negative, and fatalistic — the opposite of Hastara's warmth |
| The Pattern | Psychological mirror framing, compatibility, private self-reflection, audio depth | Dense text without visual analysis underuses Hastara's palm AI differentiator |
| Sanctuary | Live astrologer marketplace mechanics, chart education, chat/call conversion | Marketplace-first UX must not overwhelm the core AI reading flow |
| AstroTalk | Clear live-consultation monetization, expert discovery | Transactional visual density and aggressive upsell patterns |
| Generic palm reader apps | Simple scan-to-result flow | Commodity fortune-teller look, low-trust paywalls, weak privacy posture |

**Hastara's advantage** is the Triple Convergence: palmistry + numerology + Vedic astrology synthesised into one structured reading. No competitor does all three from a single palm scan. The UI must make this convergence visible, not bury it in prose.

---

End of DS-HASTARA-APP-001.
