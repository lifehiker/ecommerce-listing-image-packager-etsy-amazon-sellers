import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getAppUrl, getStripe } from "@/lib/stripe";

export async function POST() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in to manage billing." }, { status: 401 });

  const stripe = await getStripe();
  if (!stripe || !user.stripeCustomerId) {
    return NextResponse.json({
      error: "Billing portal is unavailable until Stripe is configured and a subscription exists.",
      missingConfiguration: true,
    });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${getAppUrl()}/app/billing`,
  });
  return NextResponse.json({ url: session.url });
}
