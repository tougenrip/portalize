// import { PrismaClient } from "@prisma/client";
// import Stripe from "stripe";
// import prisma from "@/prisma/prisma";
// const bcrypt = require("bcrypt");
// const nodemailer = require('nodemailer');


// export default async (req, res) => {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: "2022-11-15",
//   });
//   if (req.method === "POST") {
//     const { username,  email, password, image, rpmId, avatarUrl, stripeCustomerId, isActive, bannerEnabled, verfcode, likedMaps, ownedMaps } = req.body;


//     // const transporter = nodemailer.createTransport({
//     //   host:"smtp.hostinger.com",
//     //   port:465,
//     //   secure:true,
//     //   auth: {
//     //     user:'hello@portalize.io',
//     //     pass:'Paff!2023'
//     //   }
//     // })


//     // if(!verfcode || verfcode === ''){
//     //   return res.status(401).json({ err: 'Unauthorized' });
//     // }
//     // const codefrDb = async(res)  => {await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/checkcode/${verfcode}`); res.json(codefrDb);}

//     // const parsedCode = 
    
//     // const match = await bcrypt.compare(verfcode, codefrDb)

//   //   if(match){
     
    
      
//   //     else{
//   //     return res.status(401).json({ err: 'Unauthorized' });
//   //   }

    
  
//   // } else {

//   try {
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = await prisma.user.create({
//       data: {
//         name: username,
//         email: email,
//         password: hashedPassword,
//         image: image,
//         rpmId: rpmId,
//         avatarUrl: avatarUrl,
//         likedMaps: likedMaps,
//         ownedMaps: ownedMaps,
//         stripeCustomerId: stripeCustomerId,
//         isActive: isActive,
//         bannerEnabled: bannerEnabled
//       },
//     }).then(
//       async (user) => {
  
//       // Create a stripe customer for the user with their email address
//       const customer = await stripe.customers
//         .create({
//           email: user.email,
//           name: user.name,
//         })
//         await prisma.user.update({
//           where: { email: email },
//           data: {
//             stripeCustomerId: customer.id,
//           },
//         });
//       }
//     );

//     // const info = await transporter.sendMail({
//     //   from: "hello@portalize.io",
//     //   to: email,
//     //   subject:'Welcome to Portalize!',
//     //   html: `<h1>You have been successfully registered to Portalize!</h1></br><p>Your Username:${username}</br>Your Email:${email}</p></br><h2>We hope you have fun!</h2>`
//     // })
//     // console.log(info)

//     return res.status(200).end();
//   } catch (err) {
//     return res.status(503).json({ err: err.toString() });
//  }
//   //   return res
//   //     .status(405)
//   //     .json({ error: "This request only supports POST requests" });
//   // }
// }};