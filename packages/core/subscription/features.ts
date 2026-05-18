import type { Feature, SubscriptionTier, ReadingMode } from '../types/index.ts';

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
  crystal_ball_mode: ['sage'],
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
