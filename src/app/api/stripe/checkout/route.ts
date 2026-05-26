import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { getAppUrl, getStripe } from "@/lib/stripe";

const checkoutSchema = z.object({ plan: z.enum(["SOLO", "PRO"]) });

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in before upgrading." }, { status: 401 });

  const parsed = checkoutSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Choose Solo or Pro." }, { status: 400 });

  const priceId = parsed.data.plan === "SOLO" ? process.env.STRIPE_SOLO_PRICE_ID : process.env.STRIPE_PRO_PRICE_ID;
  const stripe = await getStripe();
  if (!stripe || !priceId) {
    return NextResponse.json({
      error: "Stripe is not configured in this environment. The app remains usable on the Free plan.",
      missingConfiguration: true,
    }, { status: 200 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${getAppUrl()}/app/billing?checkout=success`,
    cancel_url: `${getAppUrl()}/app/billing?checkout=cancelled`,
    metadata: { userId: user.id, plan: parsed.data.plan },
  });

  return NextResponse.json({ url: session.url });
}
