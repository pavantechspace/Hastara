import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import type { Database } from '@hastara/db';
import type { User } from '@hastara/core/types';

export interface Context {
  auth: { userId: string | null };
  db: Database;
  user?: User;
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
