import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { decode, encode } from "next-auth/jwt";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import Cookies from "cookies";
import { randomUUID } from "crypto";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptionsWrapper = (req, res) => [
  req,
  res,
  {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
          },
          password: {
            label: "Password",
            type: "password",
          },
        },
        authorize: async (credentials) => {
          const { email, password } = credentials;

          try {
            if (!isEmail(email)) {
              throw new Error("Email should be a valid email address");
            }

            const user = await prisma.users.findUnique({
              where: {
                email,
              },
            });

            if (!user) {
              throw new Error("User account does not exist");
            }

            if (!user.active) {
              throw new Error(
                "This account is temporarily disabled, please contact customer service"
              );
            }

            const passwordsMatch = await bcrypt.compare(
              password,
              user.hashedPassword
            );

            if (!passwordsMatch) {
              throw new Error("Password is not correct");
            }

            return user;
          } catch (error) {
            console.error(error.message);

            if (
              error instanceof Prisma.PrismaClientInitializationError ||
              error instanceof Prisma.PrismaClientKnownRequestError
            ) {
              throw new Error(
                "System error. Please contact support@---.io"
              );
            }

            throw error;
          }
        },
      }),
    ],
    callbacks: {
      async signIn({ user }) {
        if (
          req.query.nextauth.includes("callback") &&
          req.query.nextauth.includes("credentials") &&
          req.method === "POST"
        ) {
          if (user) {
            const sessionToken = randomUUID();
            const sessionExpiry = new Date(
              Date.now() + 60 * 60 * 24 * 30 * 1000
            ); // 30 days

            await prisma.session.create({
              data: {
                sessionToken: sessionToken,
                userId: user.id,
                expires: sessionExpiry,
              },
            });

            const cookies = new Cookies(req, res);

            cookies.set("next-auth.session-token", sessionToken, {
              expires: sessionExpiry,
            });
          }
        }

        return true;
      },async session({ session, token, }) {  
        session.user = token
        return session
      }
    },
    secret: process.env.NEXTAUTH_JWT_SECRET,
    jwt: {
      maxAge: 60 * 60 * 24 * 30, 
      encode: async ({ token, secret, maxAge }) => {
        if (
          req.query.nextauth?.includes("callback") &&
          req.query.nextauth.includes("credentials") &&
          req.method === "POST"
        ) {
          const cookies = new Cookies(req, res);
          const cookie = cookies.get("next-auth.session-token");

          if (cookie) return cookie;
          return "";
        }

        return encode({ token, secret, maxAge });
      },
      decode: async ({ token, secret }) => {
        if (
          req.query.nextauth.includes("callback") &&
          req.query.nextauth.includes("credentials") &&
          req.method === "POST"
        ) {
          return null;
        }
        return decode({ token, secret });
      },
    },
    adapter: PrismaAdapter(prisma),
    debug: process.env.NODE_ENV === "development",
    events: {
      async signOut({ session }) {
        const { sessionToken } = session;

        const data = await prisma.session.findUnique({
          where: {
            sessionToken,
          },
        });

        if (data) {
          await prisma.session.delete({
            where: {
              sessionToken,
            },
          });
        }
      },createUser:async ({user}) => {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: "2022-11-15",
        });
    
        // Create a stripe customer for the user with their email address
        await stripe.customers
          .create({
            email: user.email,
            name: user.name,
          })
          .then(async (customer) => {
             return prisma.users.update({where:{email:user.email},data:{stripeCustomerId:customer.id}})
             
            
            }).finally(async() => {
              prisma.$disconnect();
            })
          ;
      }
    },
  },
];

export default function handler(req, res) {
  return NextAuth(...authOptionsWrapper(req, res));
}