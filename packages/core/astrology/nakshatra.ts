import type { NakshatraPosition } from '../types/index.ts';

export function getNakshatra(
  _dob: string,
  _birthTime: string,
  _lat: number,
  _lng: number,
): NakshatraPosition {
  throw new Error('Not implemented');
}

export function getNakshatraDeity(_nakshatra: string): string {
  throw new Error('Not implemented');
}

export function getNakshatraGana(_nakshatra: string): 'deva' | 'manushya' | 'rakshasa' {
  throw new Error('Not implemented');
}
