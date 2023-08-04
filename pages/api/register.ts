import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

export default async (req, res) => {
  if (req.method === "POST") {
    const { username,  email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 0);
      await prisma.user.create({
        data: {
          name: username,
          email: email,
          password: hashedPassword,
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