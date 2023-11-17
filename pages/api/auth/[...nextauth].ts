import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { Adapter } from "next-auth/adapters";
import {createTransport} from 'nodemailer'

const prisma = new PrismaClient()

export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest(params) {
        const { identifier, url, provider, theme } = params
        const { host } = new URL(url)
        const transport = createTransport(provider.server)
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: `Sign in to ${host}\n${url}\n\n`,
          html: `
          <!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title></title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }

  </style>
  <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
  <!--[if lte mso 11]>
    <style type="text/css">
      .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://gistcdn.githack.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://gistcdn.githack.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css);

  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (max-width:319px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }

  </style>
  <style type="text/css">
  </style>
</head>

<body style="word-spacing:normal;background-color:#101010;">
  <div style="background-color:#101010;">
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;"><v:image style="border:0;height:500px;mso-position-horizontal:center;position:absolute;top:0;width:800px;z-index:-3;" src="https://cdn.discordapp.com/attachments/559437705394520065/1159942955814092831/image.png?ex=6532dc0f&is=6520670f&hm=e6b41995477c7d9ce338542eb5ef7f2dde0fdb52d8cdb21a8ef55f6de86bb53c&" xmlns:v="urn:schemas-microsoft-com:vml" /><![endif]-->
    <div style="margin:0 auto;max-width:600px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr style="vertical-align:top;">
            <td background="https://cdn.discordapp.com/attachments/559437705394520065/1159942955814092831/image.png?ex=6532dc0f&is=6520670f&hm=e6b41995477c7d9ce338542eb5ef7f2dde0fdb52d8cdb21a8ef55f6de86bb53c&" style="background:#101010 url('https://cdn.discordapp.com/attachments/559437705394520065/1159942955814092831/image.png?ex=6532dc0f&is=6520670f&hm=e6b41995477c7d9ce338542eb5ef7f2dde0fdb52d8cdb21a8ef55f6de86bb53c&') no-repeat center center / cover;background-position:center center;background-repeat:no-repeat;padding:20px 0px 50px 0px;vertical-align:middle;height:430px;" height="430">
              <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600" ><tr><td style=""><![endif]-->
              <div class="mj-hero-content" style="margin:0px auto;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                  <tbody>
                    <tr>
                      <td style>
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                          <tbody>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:150px;">
                                        <img src="https://portalize.io/img/logo_comp.webp" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="150" height="auto">
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <p style="border-top:solid 4px #6F3DFF;font-size:1px;margin:0px auto;width:100%;">
                                </p>
                                <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #6F3DFF;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]-->
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:50px 20px 50px 20px;word-break:break-word;">
                                <div style="font-family:Gilroy ,Sans-Serif;font-size:40px;font-weight:500;line-height:45px;text-align:center;color:#ffffff;">You Can Sign In To The App By Clicking The Button Below</div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 25px;padding-top:50px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;width:100%;line-height:100%;">
                                  <tbody>
                                    <tr>
                                      <td align="center" bgcolor="rgba(13, 12, 12, 0.50)" role="presentation" style="border:Solid #6F3DFF;border-radius:8px;cursor:auto;mso-padding-alt:10px 25px;background:rgba(13, 12, 12, 0.50);" valign="middle">
                                        <a href="${url}" style="display:inline-block;background:rgba(13, 12, 12, 0.50);color:white;font-family:Gilroy ,Sans-Serif;font-size:13px;font-weight:600;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:8px;" target="_blank">
                                          <mj-text padding-left="25px" padding-right="25px" color="#ffffff" align="center" font-size="45px" line-height="45px" font-weight="800"> LOGIN YOUR ACCOUNT </mj-text>
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:10px 0px 0px 0px;word-break:break-word;">
                                <div style="font-family:Gilroy ,Sans-Serif;font-size:10px;font-weight:800;line-height:1;text-align:center;color:rgba(255, 255, 255, 0.70);">The link will expire in 1 hour</div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="font-size:0px;padding:0px 15px;padding-top:5px;word-break:break-word;">
                                <div style="font-family:Gilroy ,Sans-Serif;font-size:12px;font-weight:400;line-height:15px;text-align:center;color:rgba(255, 255, 255, 0.50);">By signing in and using our app you agree our privacy policy and terms of service agreements</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>

          
        `,
        })
        const failed = result.rejected.concat(result.pending).filter(Boolean)
        if (failed.length) {
          throw new Error(`Email (${failed.join(", ")}) could not be sent`)
        }
      },
      maxAge: 1 * 60 * 60
    }),
    
  ],
  events:{
     async createUser ({ user }) {
      // Create stripe API client using the secret key env variable
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2022-11-15",
      });

      // Create a stripe customer for the user with their email address
      await stripe.customers
        .create({
          email: user.email,
        })
        .then(async (customer) => {
          // Use the Prisma Client to update the user in the database with their new Stripe customer ID
          return prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId: customer.id,
            },
          });
        });
    },

  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.provider = account.provider
      }
      
      return token
    },
    async session({ session,  user, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user = user
      return session
    },
  }
}

export default NextAuth(authOptions)