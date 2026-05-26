import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const stripe = await getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ received: true, skipped: "Stripe webhook not configured." });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });

  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan === "PRO" ? "PRO" : "SOLO";
      if (userId && typeof session.customer === "string") {
        await prisma.user.update({ where: { id: userId }, data: { plan, stripeCustomerId: session.customer } });
      }
    }

    if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      const periodEnd = "current_period_end" in subscription && typeof subscription.current_period_end === "number" ? subscription.current_period_end : null;
      const customerId = typeof subscription.customer === "string" ? subscription.customer : null;
      if (customerId) {
        const priceId = subscription.items.data[0]?.price.id;
        const plan = subscription.status === "active" && priceId === process.env.STRIPE_PRO_PRICE_ID ? "PRO" : subscription.status === "active" ? "SOLO" : "FREE";
        const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } });
        if (user) {
          await prisma.user.update({ where: { id: user.id }, data: { plan } });
          await prisma.subscription.upsert({
            where: { stripeSubscriptionId: subscription.id },
            create: {
              userId: user.id,
              stripeSubscriptionId: subscription.id,
              stripePriceId: priceId,
              status: subscription.status,
              currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
            },
            update: {
              stripePriceId: priceId,
              status: subscription.status,
              currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
            },
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[stripe webhook]", error);
    return NextResponse.json({ error: "Invalid webhook." }, { status: 400 });
  }
}
