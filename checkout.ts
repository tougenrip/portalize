import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import getStripe from "./pages/utils/getStripe";

export async function checkout({lineItems}) {
  

  const stripe = new Stripe('sk_test_51NLvXtCzLG9nZPU4KoEkjrc1IBSkNyuqzdMyLBKYvaAMwsr23LKStlnaBKncntwNF6o4X2L4ISK8k1RtpdSO38T700xrz04TNo', {apiVersion:'2022-11-15'})
  const session = await getSession()

  if (!session?.user) {
    return NextResponse.json(
      {
        error: {
          code: "no-access",
          message: "You are not signed in.",
        },
      },
      { status: 401 }
    );
  }

  const checkoutSession = stripe.checkout.sessions.create({
    mode: "subscription",
    customer: session.user.stripeCustomerId,
    line_items: lineItems,
    success_url: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  window.location.origin,
    subscription_data: {
      metadata: {
        // so that we can manually check in Stripe for whether a customer has an active subscription later, or if our webhook integration breaks.
        payingUserId: session.user.id,
      },
    },
  });

  if (!(await checkoutSession).url) {
    return NextResponse.json(
      {
        error: {
          code: "stripe-error",
          message: "Could not create checkout session",
        },
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ session: checkoutSession }, { status: 200 });
}