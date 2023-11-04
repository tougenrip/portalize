import Stripe from 'stripe';
import { buffer } from 'micro';
import prisma from '@/prisma/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handleWebhookEvent(req, res) {
  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);
  let event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
  }
  // const data = JSON.parse(buf as unknown as string);
  // console.log(data)
  const session = event.data.object as Stripe.Checkout.Session
  const paymenttype = session.metadata.payment_type
  console.log(paymenttype)
  
  
  
  
  switch(paymenttype){
    case 'subscription':
      const subscription = event.data.object as Stripe.Subscription;
      
          const subscriptionId = subscription?.id
          const subscriptionName = subscription?.items?.data[0]?.plan?.id
          const subscriptionEnd = subscription?.current_period_end

          console.log(`Subscription data: ${subscriptionId+ subscriptionName+ subscriptionEnd}`)
      switch (event.type) {
          
          
        case 'customer.subscription.created':
          await prisma.user.update({where: {stripeCustomerId: subscription.customer as string},
             data: {
              isActive:true,
            subscriptionEnd:subscriptionEnd,
            subscriptionID: subscriptionId,
            subscriptionName: subscriptionName
          }})
          console.log(`User Just Subscribed: ${subscriptionId}`);
          // Handle post-payment actions here
          break;
          case 'customer.subscription.deleted':
            await prisma.user.update({where: {stripeCustomerId: subscription.customer as string},
              data: {
               isActive:false,
             subscriptionEnd:null,
             subscriptionID: "",
             subscriptionName: ""
           }})
           console.log(`User Just Deleted his subscription`);
           break;
           case 'customer.subscription.updated':
            await prisma.user.update({where: {stripeCustomerId: subscription.customer as string},
              data: {
               isActive:true,
               subscriptionEnd:subscriptionEnd,
               subscriptionID: subscriptionId,
               subscriptionName: subscriptionName
           }})
           console.log(`User Just Updated his subscription: ${subscriptionId}`);
        // Add other event types to handle as needed
            break;
              
    
        default:
          console.warn(`Unhandled event type: ${event.type}`);
      }
      break;
      case 'payment':

      const paymentIntent = event.data.object as Stripe.Subscription;
      
          const paymentIntentId = paymentIntent?.id
          const BoughtItemId = paymentIntent?.items?.data[0]?.plan?.id
          const { bannerImg, title, website } = paymentIntent.metadata
          console.log(bannerImg + title + website)

        switch (event.type) {
          
          
          case 'payment_intent.succeeded':
            
            break;
                
      
          default:
            console.warn(`Unhandled event type: ${event.type}`);
        }
        break;
  }

  

  res.status(200).end();
}

export default handleWebhookEvent;