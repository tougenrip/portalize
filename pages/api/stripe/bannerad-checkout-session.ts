import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Stripe from 'stripe';
import authOptions from '../auth/authOptions'
import { getServerSession } from "next-auth/next"

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
  });

  // This object will contain the user's data if the user is signed in
  const session = await getServerSession(req, res, authOptions);
  const owner = session.user._id

  // Error handling
  if (!session?.user?.stripeCustomerId) {
    return res.status(401).json({
      error: {
        code: 'no-access',
        message: 'You are not signed in.',
      },
    });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
 /* This is where the magic happens - this line will automatically link this Checkout page to the existing customer we created when the user signed-up, so that when the webhook is called our database can automatically be updated correctly.*/
    customer: session.user.stripeCustomerId,
    line_items: [
      {
        price: 'price_1NR46rCzLG9nZPU4ImI57UKw',
        quantity: 1,
      },
    ],
    // {CHECKOUT_SESSION_ID} is a string literal which the Stripe SDK will replace; do not manually change it or replace it with a variable!
    success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/bannercreate`,
    cancel_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}?cancelledPayment=true`,
    payment_intent_data:{
        metadata:{
            payingUserId: session.user.id,
        }
    }
});

  if (!checkoutSession.url) {
    return res
      .status(500)
      .json({ cpde: 'stripe-error', error: 'Could not create checkout session' });
  }

  // Return the newly-created checkoutSession URL and let the frontend render it
  return res.status(200).json({ redirectUrl: checkoutSession.url});
};