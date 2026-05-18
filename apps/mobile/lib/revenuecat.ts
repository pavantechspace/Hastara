import type { SubscriptionTier } from '@hastara/core/types';

export async function initializeRevenueCat(): Promise<void> {
  throw new Error('Not implemented');
}

export async function getCurrentTier(): Promise<SubscriptionTier> {
  throw new Error('Not implemented');
}

export async function purchasePackage(_packageId: string): Promise<boolean> {
  throw new Error('Not implemented');
}

export async function restorePurchases(): Promise<SubscriptionTier> {
  throw new Error('Not implemented');
}
