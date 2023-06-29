import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import User from "../schemas/usersch";
import { useSession } from 'next-auth/react';

const endpointSecret ='whsec_ed4e1145e95ec4ad399f35f537cfa0f1f617c6a8d614e110c1e14fe9f481f300'

export const config = {
  api: {
    bodyParser: false, // don't parse body of incoming requests because we need it raw to verify signature
  },
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {

    
    const requestBuffer = await buffer(req);
    const sig = req.headers['stripe-signature'] as string;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2022-11-15',
    });

    let event;

    try {
      // Use the Stripe SDK and request info to verify this Webhook request actually came from Stripe
      event = stripe.webhooks.constructEvent(
        requestBuffer.toString(), // Stringify the request for the Stripe library
        sig,
        endpointSecret
      );
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook signature verification failed.`);
    }

    
    const subscription = event.data.object as Stripe.Subscription;
    // Handle the event
    switch (event.type) {
        
        case "customer.subscription.created":
            
          await User.updateOne({stripeCustomerId:subscription.customer as string},{isActive:true},function (err, docs) {
              if (err){
                  console.log(err)
              }
              else{
                  console.log("Updated Docs : ", docs);
              }})
          break;
        case "customer.subscription.deleted":
            
          await User.updateOne({stripeCustomerId:subscription.customer as string},{isActive:false},function (err, docs) {
              if (err){
                  console.log(err)
              }
              else{
                  console.log("Updated Docs : ", docs);
              }})
              
        default:
          console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
          break;
      }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  } catch (err) {
    // Return a 500 error
    console.log(err);
    res.status(500).end();
  }
};