import type { TarotCard } from '../types/index.ts';

export const MAJOR_ARCANA: TarotCard[] = [];

export const MINOR_ARCANA: TarotCard[] = [];

export const FULL_DECK: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export function drawTarotCard(_seed: string): TarotCard {
  throw new Error('Not implemented');
}

export function drawTarotSpread(
  _seed: string,
  _count: number,
): TarotCard[] {
  throw new Error('Not implemented');
}
