import {NextAuthOptions} from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import dbConnect from "../../../lib/dbConnect";
import User from "../../api/schemas/usersch";
import { compare } from "bcrypt";
import Stripe from "stripe";

const authOptions:NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise,{databaseName:'portalizedata'}) as Adapter,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await dbConnect();

        // Find user with the email
        const user = await User.findOne({
          email: credentials?.email,
        });

        // Email Not found
        if (!user) {
          throw new Error("Email is not registered"),alert("Email is not registered");
        }

        // Check hased password with DB hashed password
        const isPasswordCorrect = await compare(
          credentials!.password,
          user.hashedPassword
        );

        // Incorrect password
        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",

  },
  callbacks: {
    async jwt({token, user, trigger, session }){
      if (user) {
          token.user = {
              id: user._id,
              name: user.name,
              email: user.email,
              image:user.image,
              stripeCustomerId: user.stripeCustomerId,
              isActive: user.isActive
          }
        if(trigger === "update"&& session?.name){
          token.name = session
        }
          
      }
      return token;
  },
  // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
  session: async({session, token}) => {
          if(token){
              session.user = token.user as any;
          }
          return session
      }
  
    // async session({ session, user }) { 
    //     session!.user! = user
      
    //     user.id = user?.id;
    //     user.stripeCustomerId = user?.stripeCustomerId;
    //     user.isActive = user?.isActive;
    //     return session;
    // }
  },
  debug: process.env.NODE_ENV === "development",
  events: { createUser:async ({user}) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2022-11-15",
    });

    // Create a stripe customer for the user with their email address
    await stripe.customers
      .create({
        email: user.email!,
        name: user.name!,
      })
      .then(async (customer) => {
         return User.updateOne({email:user.email},{stripeCustomerId:customer.id})
         
        
        })
      ;
  }},
  session:{strategy:'jwt'},
  secret:process.env.NEXTAUTH_JWT_SECRETd
};


export default authOptions
