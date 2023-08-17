import { PrismaClient } from "@prisma/client";
import skyadCheckoutSession from "./stripe/skyad-checkout-session";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

export default async (req, res) => {
  if (req.method === "POST") {
    const { username,  email, password, image, rpmId, avatarUrl, stripeCustomerId, isActive, bannerEnabled } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 0);
      await prisma.user.create({
        data: {
          name: username,
          email: email,
          password: hashedPassword,
          image: image,
          rpmId: rpmId,
          avatarUrl: avatarUrl,
          stripeCustomerId: stripeCustomerId,
          isActive: isActive,
          bannerEnabled: bannerEnabled

        },
      });

      return res.status(200).end();
    } catch (err) {
      return res.status(503).json({ err: err.toString() });
    }
  } else {
    return res
      .status(405)
      .json({ error: "This request only supports POST requests" });
  }
};