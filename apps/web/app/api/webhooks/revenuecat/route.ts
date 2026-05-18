import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // TODO: Verify webhook auth using REVENUECAT_WEBHOOK_SECRET
  // TODO: Handle INITIAL_PURCHASE, RENEWAL, CANCELLATION,
  //       EXPIRATION, BILLING_ISSUE events
  void (await req.json());

  return NextResponse.json({ received: true });
}
