
import Stripe from "stripe";
import getServerSession from "next-auth/next";import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if(req.method === 'POST'){
    const { bannerImg, title, website, productId } = req.body
    // const body = await JSON.parse(req.body).slice(1, -1);
    console.log(bannerImg)
  
  
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
      mode: "payment",
      customer: session.user.stripeCustomerId,
      invoice_creation: {
        enabled: true,
      },
      line_items: [
        {
          // temporarily hard coded price (subscription)
          price: productId,
          quantity: 1,
        },
      ],
      metadata: {
        "payment_type": "payment",
      },
      payment_intent_data: {
        "metadata": {
          "payment_type": "payment",
          "bannerImg":bannerImg,
          "title":title,
          "website": website, 
        }
      },
      success_url: process.env.NEXT_PUBLIC_WEBSITE_URL + `?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  process.env.NEXT_PUBLIC_WEBSITE_URL,
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
  
}