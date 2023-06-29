import NextAuth, {NextAuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import dbConnect from "../../../lib/dbConnect";
import User from "../../api/schemas/usersch";
import { compare } from "bcrypt";
import Stripe from "stripe";

export const authOptions:NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          maps:{
            owned:[],
            liked:[]
          },
          created: Date.now
        },
      },
    }),
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
    async session({ session, user }) {  
        session!.user!.id = user.id;
        session!.user!.stripeCustomerId = user.stripeCustomerId;
        session!.user!.isActive = user.isActive;
        return session;
     
    }
  },
  
  debug: process.env.NODE_ENV === "development",
  
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
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
         return User.updateOne({id:user.id},{stripeCustomerId:customer.id})
        
        // Use mongoose Client to update the user in the database with their new Stripe customer ID
        
      });
  }}
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };