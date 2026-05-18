import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@hastara/api';
import type { Context } from '@hastara/api/trpc';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: (): Context => ({
      auth: { userId: null }, // TODO: Extract from Clerk session
      db: null as unknown as Context['db'], // TODO: Initialize Drizzle client
    }),
  });

export { handler as GET, handler as POST };
