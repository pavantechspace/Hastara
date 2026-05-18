import { router } from './trpc';
import { readingRouter } from './routers/reading.router';
import { numerologyRouter } from './routers/numerology.router';
import { astrologyRouter } from './routers/astrology.router';
import { dailyOracleRouter } from './routers/daily-oracle.router';
import { compatibilityRouter } from './routers/compatibility.router';
import { subscriptionRouter } from './routers/subscription.router';
import { profileRouter } from './routers/profile.router';
import { historyRouter } from './routers/history.router';

export const appRouter = router({
  reading: readingRouter,
  numerology: numerologyRouter,
  astrology: astrologyRouter,
  dailyOracle: dailyOracleRouter,
  compatibility: compatibilityRouter,
  subscription: subscriptionRouter,
  profile: profileRouter,
  history: historyRouter,
});

export type AppRouter = typeof appRouter;
