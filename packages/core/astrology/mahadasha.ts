import type { DashaPeriod } from '../types/index.ts';

export function getCurrentMahadasha(_dob: string, _birthTime: string): DashaPeriod {
  throw new Error('Not implemented');
}

export function getMahadashaSequence(
  _dob: string,
  _birthTime: string,
): DashaPeriod[] {
  throw new Error('Not implemented');
}

export function getCurrentAntardasha(
  _mahadasha: DashaPeriod,
  _currentDate: string,
): DashaPeriod['subperiods'][number] | undefined {
  throw new Error('Not implemented');
}
