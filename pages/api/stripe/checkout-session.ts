
import Stripe from "stripe";
import getServerSession from "next-auth/next";import { authOptions } from "../auth/[...nextauth]";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req:NextRequest, res) {
  const body = await JSON.stringify(req.body).slice(1, -1);
  console.log(body)

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const session = await getServerSession(req,res,authOptions);;

  if (!session?.user) {
    return res.json(
      {
        error: {
          code: "no-access",
          message: "You are not signed in.",
        },
      },
      { status: 401 }
    );
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: session.user.stripeCustomerId,
    line_items: [
      {
        // temporarily hard coded price (subscription)
        price: body,
        quantity: 1,
      },
    ],
    success_url: process.env.NEXT_PUBLIC_WEBSITE_URL + `?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  process.env.NEXT_PUBLIC_WEBSITE_URL,
    subscription_data: {
      "metadata": {
        "payment_type": "subscription",
      }
    },
    metadata: {
      "payment_type": "subscription",
    },
  });

  if (!checkoutSession.url) {
    return res.json(
      {
        error: {
          code: "stripe-error",
          message: "Could not create checkout session",
        },
      },
      { status: 500 }
    );
  }

  return res.status(200).json({ session: checkoutSession });
}