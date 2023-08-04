import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
const prisma = new PrismaClient();
// Modules needed to support key generation, token encryption, and HTTP cookie manipulation
import { PrismaAdapter } from "@auth/prisma-adapter";
import { randomUUID } from "crypto";
import { getCookie, setCookie } from "cookies-next";
import { encode, decode } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  let userAccount = null;

  const bcrypt = require("bcrypt");

  const confirmPasswordHash = (plainPassword, hashedPassword) => {
    return new Promise((resolve) => {
      bcrypt.compare(plainPassword, hashedPassword, function (err, res) {
        resolve(res);
      });
    });
  };

  const generateSessionToken = () => {
    return randomUUID?.();
  };

  const adapter = PrismaAdapter(prisma);

  const fromDate = (time, date = Date.now()) => {
    return new Date(date + time * 1000);
  };

  const callbacks = {
    async signIn({ user, account, profile, email, credentials }) {
      // Check if this sign in callback is being called in the credentials authentication flow. If so, use the next-auth adapter to create a session entry in the database (SignIn is called after authorize so we can safely assume the user is valid and already authenticated).
      if (
        req.query.nextauth.includes("callback") &&
        req.query.nextauth.includes("credentials") &&
        req.method === "POST"
      ) {
        if (user) {
          const sessionToken = generateSessionToken(); // Implement a function to generate the session token (you can use randomUUID as an example)
          const sessionMaxAge = 60 * 60 * 24 * 30; //30Days
          const sessionExpiry = fromDate(sessionMaxAge); // Implement a function to calculate the session cookie expiry date

          console.log(sessionToken);

          await adapter.createSession({
            sessionToken: sessionToken,
            userId: user.id,
            expires: sessionExpiry,
          });

          setCookie("next-auth.session-token", sessionToken, {
            expires: sessionExpiry,
            req: req,
            res: res,
          });

          // console.log("user Session: ", user);
        }
      }

      return true;
    },
    async register(username, email, password) {
      try {
        await prisma.User.create({
          data: {
            username: username,
            email: email,
            password: password,
          },
        });
        return true;
      } catch (err) {
        console.error("Failed to register user. Error", err);
        return false;
      }
    },
    async jwt(token, user, account, profile, isNewUser) {
      // console.log("JWT callback. Got User: ", user);
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return Promise.resolve(token);
    },
    async session(session, token) {
      // console.log("Session. Got User: ", session, token);
      if (userAccount !== null) {
        // console.log("UserAccount Session Generation: ", userAccount);
        session.user = {
          id: userAccount.id,
          name: `${userAccount.firstName} ${userAccount.lastName}`,
          email: userAccount.email,
        };
        // console.log("Session.user: ", session.user);
      } else if (
        token &&
        typeof token.user !== typeof undefined &&
        (typeof session.user === typeof undefined ||
          (typeof session.user !== typeof undefined &&
            typeof session.user.id === typeof undefined))
      ) {
        session.user = token.user;
      } else if (typeof token !== typeof undefined) {
        session.token = token;
      }
      // console.log("Session: ", session);
      return Promise.resolve(session);
    },
  };

  const options = {
    session: {
      // strategy: "jwt",

      // NOTE:  If you use an `adapter` however, we default it to `"database"` instead.
      // strategy: "database", // Store sessions in the database and store a sessionToken in the cookie for lookups
      // jwt: false,

      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 30 * 24 * 60 * 60, // 30 days

      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
      // Customize the JWT encode and decode functions to overwrite the default behaviour of storing the JWT token in the session  cookie when using credentials providers. Instead we will store the session token reference to the session in the database.
      encode: async ({ token, secret, maxAge }) => {
        if (
          req.query.nextauth.includes("callback") &&
          req.query.nextauth.includes("credentials") &&
          req.method === "POST"
        ) {
          const cookie = getCookie("next-auth.session-token", { req: req });

          // console.log("pure Cookie: ", cookie);

          if (cookie) return cookie;
          else return "";
        }
        // Revert to default behaviour when not in the credentials provider callback flow
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

        // Revert to default behaviour when not in the credentials provider callback flow
        return decode({ token, secret });
      },
    },
    debug: process.env.NODE_ENV === "development",
    adapter,
    secret: process.env.NEXTAUTH_SECRET,
    logger: {
      error(code, metadata) {
        console.log({ type: "inside error logger", code, metadata });
      },
      warn(code) {
        console.log({ type: "inside warn logger", code });
      },
      debug(code, metadata) {
        console.log({ type: "inside debug logger", code, metadata });
      },
    },
    providers: [
      CredentialsProvider({
        name: "credentials",
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
          try {
            const user = await prisma.User.findUnique({
              where: {
                email: credentials.email,
              },
            });

            console.log("Authorize User Credentials: ", user);

            if (user !== null) {
              //Compare the hash
              const res = await confirmPasswordHash(
                credentials.password,
                user.password
              );
              if (res === true) {
                userAccount = {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  isActive: user.isActive,
                };
                // console.log("UserAccount created: ", userAccount);
                return userAccount;
              } else {
                console.log("Hash not matched logging in");
                return null;
              }
            } else {
              return null;
            }
          } catch (err) {
            console.log("Authorize error:", err);
          }
        },
      }),
      // GithubProvider({
      //   clientId: process.env.GITHUB_ID,
      //   clientSecret: process.env.GITHUB_SECRET,
      // }),
      // GoogleProvider({
      //   clientId: process.env.GOOGLE_CLIENT_ID,
      //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // }),
    ],
    callbacks: callbacks,
  };

  return await NextAuth(req, res, options);
}