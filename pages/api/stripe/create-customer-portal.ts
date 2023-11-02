import { cookies } from 'next/headers';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req,res) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2022-11-15",
      });

  if (req.method === 'GET') {
    try {

      const session = await getServerSession(req,res,authOptions);
      const customer = session?.user.stripeCustomerId

      if (!customer) throw Error('Could not get customer');
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}user/dashboard`
      });
      return res.status(200).json({portal: url})
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({message: err.message})
    }
  } else {
    return res.status(405).json({message:"Method Not Allowed"})
  }
}