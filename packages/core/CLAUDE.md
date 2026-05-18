# packages/core — Domain Types & AI Prompts

Pure business logic — no I/O, no network calls, no framework dependencies.

---

## Domain Types

**Source of truth:** `packages/core/types/index.ts` — read this file for full interface definitions.

### Primitive Types

```typescript
type SubscriptionTier = 'free' | 'mystic' | 'oracle' | 'sage';
type ReadingMode      = 'standard' | 'love' | 'career' | 'health' | 'spiritual' | 'crystal_ball';
type Hand             = 'left' | 'right' | 'both';
type HandShape        = 'earth' | 'air' | 'water' | 'fire';
type AstrologySystem  = 'western' | 'vedic';
type LinePrecision    = 'short' | 'medium' | 'long';
type Prominence       = 1 | 2 | 3 | 4 | 5;
type ImageQuality     = 'good' | 'acceptable' | 'poor';
type MoonPhaseName    = 'new_moon' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous'
                      | 'full_moon' | 'waning_gibbous' | 'last_quarter' | 'waning_crescent';

type BadgeId = 'first_scan' | 'mystic_apprentice' | 'cosmic_seeker' | 'oracle_master'
             | 'double_vision' | 'crystal_ball' | 'star_sharer' | 'numerologist';
// Earned: mystic_apprentice=7d streak, cosmic_seeker=30d, oracle_master=90d,
//         crystal_ball=10 readings, star_sharer=5 shares

type RareMarkingType = 'mystic_cross' | 'ring_of_solomon' | 'simian_line' | 'medical_stigmata'
                     | 'teacher_square' | 'trident' | 'cross_of_st_andrew' | 'star_of_apollo';

type Feature = 'advanced_analysis' | 'voice_reading' | 'rare_markings' | 'birth_chart'
             | 'triple_convergence' | 'bilateral_comparison' | 'future_self_image'
             | 'past_life_image' | 'soul_mandala' | 'mantra_mudra' | 'karma_score'
             | 'lucky_days_calendar' | 'chaldean_numerology' | 'lo_shu_grid'
             | 'crystal_ball_mode' | 'astrologer_credit';
```

### Interface Shape Reference

| Interface | Key fields |
|-----------|-----------|
| `User` | `clerkUserId` (PK), `email`, `name`, `locale` (BCP47), `dob` (YYYY-MM-DD), `birthTime?` (HH:MM:SS), `birthLocation: BirthLocation`, `dominantHand`, `zodiacSign`, `nakshatra?`, `lifePathNumber`, `expressionNumber`, `soulUrgeNumber`, `personalityNumber`, `subscriptionTier`, `streakCount`, `totalReadings`, `xpPoints`, `badges`, `notificationTime`, `region` ('mumbai'\|'frankfurt'\|'us-east') |
| `BirthLocation` | `lat`, `lng`, `city`, `country`, `countryCode` (ISO 3166-1 alpha-2), `timezone` (IANA) |
| `Reading` | `id`, `userId`, `createdAt`, `mode: ReadingMode`, `hand: Hand`, `palmImageUrl`, `rawVisionJson: VisionJSON`, `narrativeMarkdown`, `luckScore` (0–100), `dominantTrait`, `audioUrl?`, `infographicUrl?`, `sharedAt?`, `visionProvider`, `synthesisProvider`, `aiCostCents` |
| `ReadingListItem` | `id`, `createdAt`, `mode`, `luckScore`, `dominantTrait`, `palmImageUrl` |
| `VisionJSON` | `handShape`, `palmShape`, `fingerLengths` (thumb/index/middle/ring/pinky → LinePrecision), `thumbFlexibility` ('rigid'\|'moderate'\|'flexible'), `lines` (heart/head/life: PalmLine; fate/sun/mercury/marriage: PalmLineOptional), `mounts` (venus/jupiter/saturn/apollo/mercury/marsLower/marsUpper/moon: PalmMount), `rareMarkings: RareMarking[]`, `imageQuality` (lighting/framing: ImageQuality; occlusion: 'none'\|'partial'\|'severe') |
| `PalmLine` | `depth: Prominence`, `length: LinePrecision`, `shape: string`, `breaks: number`, `branches: number`, `traits: string[]` |
| `PalmLineOptional` | extends PalmLine + `present: boolean` |
| `PalmMount` | `elevation: Prominence`, `traits: string[]` |
| `RareMarking` | `type: RareMarkingType`, `location: string`, `confidence` (0.0–1.0) |
| `DailyOracle` | `userId`, `date` (YYYY-MM-DD), `oracleText`, `tarotCard: TarotCard`, `moonPhase: MoonPhase`, `luckScore`, `luckyColor`, `luckyNumber` (1–9), `mantra?` (Sage only), `mudra?` (Sage only), `generatedAt` |
| `TarotCard` | `id` (0–77), `name`, `arcana` ('major'\|'minor'), `suit?` (wands/cups/swords/pentacles), `reversed`, `svgPath`, `interpretation` |
| `MoonPhase` | `phase: MoonPhaseName`, `illumination` (0.0–1.0), `guidance`, `isSpecial` (new/full moon) |
| `BirthChart` | `id`, `userId`, `system: AstrologySystem`, `planets: Record<string, PlanetPosition>`, `houses: Record<string, HousePosition>`, `aspects: Aspect[]`, `nakshatras?: Record<string, NakshatraPosition>`, `dashaPeriods?: DashaPeriod[]`, `chartSvgUrl`, `computedAt` |
| `CompatibilityReading` | `id`, `userAId`, `userBId?`, `userBGuestHash?`, `scores` (emotional/intellectual/romantic/spiritual/financial/communication: CompatibilityDimension), `overallScore`, `couplePortraitUrl?`, `summary`, `strengths: string[]`, `challenges: string[]`, `advice`, `createdAt` |
| `Subscription` | `id`, `userId`, `tier` (excludes 'free'), `status` ('trialing'\|'active'\|'grace'\|'cancelled'\|'expired'), `platform` ('ios'\|'android'\|'web'), `revenuecatId?`, `stripeSubscriptionId?`, `trialUsed`, `startedAt`, `renewsAt?`, `cancelledAt?`, `referrerId?` |
| `NumerologyProfile` | `lifePathNumber`, `expressionNumber`, `soulUrgeNumber`, `personalityNumber`, `birthdayNumber`, `maturityNumber`, `personalYear`, `personalMonth`, `personalDay`, `pinnacles: [n,n,n,n]`, `challenges: [n,n,n,n]`, `karmicLessons: number[]`, `karmicDebts: number[]`, `masterNumbers: number[]` |

### Zustand Store Interfaces

```typescript
// Always use store helpers — never inline tier checks in components

// AuthStore (apps/mobile/store/auth.store.ts)
{ user: User | null, isLoading, isOnboarded, setUser, setLoading, setOnboarded, reset }

// SubscriptionStore (apps/mobile/store/subscription.store.ts)
{ tier: SubscriptionTier, readingsThisMonth, isLoading, setTier, setReadingsThisMonth,
  canScan(): boolean,                      // has readings remaining this month
  canAccessMode(mode: ReadingMode): boolean,
  canAccessFeature(feature: Feature): boolean }

// ReadingStore (apps/mobile/store/reading.store.ts)
{ currentReading: Reading | null, streamingText, isGenerating,
  progress: number,   // 0–100 for UI progress bar
  setCurrentReading, appendStreamingText, clearStreamingText, setIsGenerating, setProgress }
```

---

## AI Prompt Library

**Source files:** `packages/core/prompts/*.prompt.ts` — read these files for full prompt text.

### Prompt Files

| File | Model | Purpose |
|------|-------|---------|
| `vision.prompt.ts` | GPT-5 Vision | Palm photo → `VisionJSON` (structured extraction only, no narrative) |
| `synthesis.prompt.ts` | Claude Opus 4.7 | VisionJSON + user context → 6-phase markdown reading |
| `oracle.prompt.ts` | Claude Opus 4.7 | Daily oracle — 2–3 sentences, runs in overnight batch cron |
| `compatibility.prompt.ts` | Claude Opus 4.7 | Two VisionJSON objects → `CompatibilityReading` JSON |
| `tarot.prompt.ts` | Claude Opus 4.7 | Tarot card interpretation personalised to user context |

### Reading Modes → Synthesis Prompt Variants

| Mode | Min tier | Synthesis focus | Synthesis question answered |
|------|----------|-----------------|-----------------------------|
| `standard` | free | Balanced — Foundation / Major Lines / Minor Lines / Mounts / Rare Markings / Triple Convergence | Dominant life theme from all three systems |
| `love` | free | Heart line, Venus mount, marriage lines, 7th house | "What does this person need to feel deeply loved, and what holds them back?" |
| `career` | mystic | Fate line, Sun/Apollo line, Mercury mount, Jupiter mount, Mahadasha career influence | "Strongest career asset and one internal obstacle to overcome?" |
| `health` | mystic | Life line, Mars mounts, vitality indicators, Mars chart placement | "Greatest energetic strength and lifestyle pattern to restore vitality?" |
| `spiritual` | oracle | Intuition line, Moon mount, mystic cross, nakshatra deity, 12th house | "Spiritual dharma and practice most aligned with their path?" |
| `crystal_ball` | sage (or 10 readings) | Lyrical four-part vision: Past / Present / Near Future / Invitation (400–500 words) | One-sentence oracle in italics at the end |

### Vision Prompt Constraints

- Return ONLY valid JSON matching `VisionJSON` schema — no prose, no markdown fences
- If `imageQuality.lighting` or `imageQuality.framing` is `"poor"`: set `rareMarkings: []`, limit traits to 2 items max
- `rareMarkings[].confidence` must be honest — use `< 0.5` when uncertain

### Synthesis Absolute Constraints (all modes)

- Never predict death, serious illness, financial ruin, or relationship failure
- Never give specific dates for future events
- Never make medical or legal recommendations
- Always frame as tendencies and energies, not certainties
- Use sentence case throughout (no Title Case in prose)
- If user seems in distress, close with: *"If you are going through a difficult time, please reach out to someone you trust or contact a support line in your area."*
- **Health mode extra:** use "energy patterns" / "vitality indicators" — never "symptoms" or any condition name

### Oracle Prompt Key Rules

- Exactly 2–3 sentences. Never fatalistic. Always empowering.
- Weave at least two context elements (moon phase, life path, personal day, Mahadasha, dominant trait) without naming them explicitly
- Return only oracle text — no quotes, no preamble

### Compatibility Prompt Output Schema

```json
{
  "overallScore": "number 0–100",
  "scores": {
    "emotional":      { "score": "number", "description": "2 sentences" },
    "intellectual":   { "score": "number", "description": "2 sentences" },
    "romantic":       { "score": "number", "description": "2 sentences" },
    "spiritual":      { "score": "number", "description": "2 sentences" },
    "financial":      { "score": "number", "description": "2 sentences" },
    "communication":  { "score": "number", "description": "2 sentences" }
  },
  "summary":    "3-sentence overall summary",
  "strengths":  ["string", "string", "string"],
  "challenges": ["string", "string"],
  "advice":     "2-sentence closing advice"
}
```

---

## Numerology Logic

- **Pythagorean** (`numerology/pythagorean.ts`): life path, expression, soul urge, personality, birthday, maturity numbers + personal year/month/day cycles + pinnacles[4] + challenges[4] + karmic lessons/debts + master numbers
- **Chaldean** (`numerology/chaldean.ts`): Mystic+ tier only
- **Lo Shu Grid** (`numerology/lo-shu.ts`): Oracle+ tier only

## Astrology Logic

- `astrology/zodiac.ts` — DOB → zodiac sign
- `astrology/nakshatra.ts` — requires `birthTime`; outputs nakshatra + pada (1–4) + lord + deity
- `astrology/mahadasha.ts` — Vedic dashas; `DashaPeriod[]` with nested subperiods

## Tarot

- `tarot/deck.ts` — 78-card data (major + minor arcana), seeded deterministic daily draw (same card per user per calendar day)
