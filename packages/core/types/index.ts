// packages/core/types/index.ts
// Single source of truth for all domain types.

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
  | 'new_moon'
  | 'waxing_crescent'
  | 'first_quarter'
  | 'waxing_gibbous'
  | 'full_moon'
  | 'waning_gibbous'
  | 'last_quarter'
  | 'waning_crescent';

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
  confidence: number;
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
  countryCode: string;
  timezone: string;
}

export interface User {
  clerkUserId: string;
  email: string;
  name: string;
  locale: string;
  dob: string;
  birthTime?: string;
  birthLocation: BirthLocation;
  dominantHand: 'left' | 'right';
  zodiacSign: string;
  nakshatra?: string;
  lifePathNumber: number;
  expressionNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  subscriptionTier: SubscriptionTier;
  streakCount: number;
  totalReadings: number;
  xpPoints: number;
  badges: BadgeId[];
  notificationTime: string;
  notificationsEnabled: boolean;
  region: 'mumbai' | 'frankfurt' | 'us-east';
  createdAt: string;
  lastActiveAt: string;
}

// ─── Badges ───────────────────────────────────────────────────────────────────

export type BadgeId =
  | 'first_scan'
  | 'mystic_apprentice'
  | 'cosmic_seeker'
  | 'oracle_master'
  | 'double_vision'
  | 'crystal_ball'
  | 'star_sharer'
  | 'numerologist';

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
  luckScore: number;
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
  date: string;
  oracleText: string;
  tarotCard: TarotCard;
  moonPhase: MoonPhase;
  luckScore: number;
  luckyColor: string;
  luckyNumber: number;
  mantra?: string;
  mudra?: string;
  generatedAt: string;
}

export interface TarotCard {
  id: number;
  name: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  reversed: boolean;
  svgPath: string;
  interpretation: string;
}

export interface MoonPhase {
  phase: MoonPhaseName;
  illumination: number;
  guidance: string;
  isSpecial: boolean;
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
  pada: number;
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
  score: number;
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
  lifePathNumber: number;
  expressionNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  birthdayNumber: number;
  maturityNumber: number;
  personalYear: number;
  personalMonth: number;
  personalDay: number;
  pinnacles: [number, number, number, number];
  challenges: [number, number, number, number];
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
  canScan: () => boolean;
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
  progress: number;
  setCurrentReading: (reading: Reading | null) => void;
  appendStreamingText: (chunk: string) => void;
  clearStreamingText: () => void;
  setIsGenerating: (generating: boolean) => void;
  setProgress: (progress: number) => void;
}
