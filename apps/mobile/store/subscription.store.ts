import { create } from 'zustand';
import type { SubscriptionStore, SubscriptionTier, ReadingMode, Feature } from '@hastara/core/types';
import {
  TIER_FEATURES,
  MODE_MIN_TIER,
  FREE_READINGS_PER_MONTH,
} from '@hastara/core/subscription/features';

const TIER_ORDER: SubscriptionTier[] = ['free', 'mystic', 'oracle', 'sage'];

export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
  tier: 'free',
  readingsThisMonth: 0,
  isLoading: true,
  setTier: (tier: SubscriptionTier) => set({ tier }),
  setReadingsThisMonth: (readingsThisMonth: number) => set({ readingsThisMonth }),
  canScan: () => {
    const { tier, readingsThisMonth } = get();
    if (tier !== 'free') return true;
    return readingsThisMonth < FREE_READINGS_PER_MONTH;
  },
  canAccessMode: (mode: ReadingMode) => {
    const { tier } = get();
    const minTier = MODE_MIN_TIER[mode];
    return TIER_ORDER.indexOf(tier) >= TIER_ORDER.indexOf(minTier);
  },
  canAccessFeature: (feature: Feature) => {
    const { tier } = get();
    const allowedTiers = TIER_FEATURES[feature];
    return allowedTiers.includes(tier);
  },
}));
