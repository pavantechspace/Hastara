import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // TODO: Verify webhook signature using STRIPE_WEBHOOK_SECRET
  // TODO: Handle checkout.session.completed, invoice.paid,
  //       customer.subscription.updated, customer.subscription.deleted
  void (await req.text());

  return NextResponse.json({ received: true });
}
