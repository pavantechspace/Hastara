import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // TODO: Verify webhook signature using CLERK_WEBHOOK_SECRET
  // TODO: Handle user.created, user.updated, user.deleted events
  void (await req.json());

  return NextResponse.json({ received: true });
}
