import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        // console.log(req.body);
        const {
          firstName,
          lastName,
          email,
          password,
          confirm,
          username,
          csrfToken,
        } = req.body;

        if (!(email && password && confirm && password.length >= 1)) {
          console.log("Missing Parameter");
          res.status(400).json({
            statusText: "Invalid user parameters",
          });
          break;
        }

        if (password != confirm) {
          console.log("Confirm Error");
          return res.status(400).json({
            statusText: "Password mismatch",
          });

          break;
        }

        console.log(email);

        const profileExists = await prisma.User.findUnique({
          where: {
            email: email,
          },
        });       

        console.log(profileExists);

        if ( 
          profileExists
        ) {
          console.log("Profile already exists");
          res.status(403).json({
            statusText: "User already exists",
          });
          break;
        }

        const hash = await bcrypt.hash(password, 0);
        console.log("Username: ", hash, firstName, lastName, email, hash);
        const user = await prisma.User.create({
          data: {
            firstName: firstName,
            lastName: lastName,
            name: lastName + " " + firstName,
            email: email,
            username: email,
            password: hash,
            isActive: "1",
          },
        });

        if (!user) {
          res.status(500).json({
            statusText: "Unable to create user account",
          });
        }

        const account = await prisma.Account.create({
          data: {
            userId: user.id,
            type: "credentials",
            provider: "credentials",
            providerAccountId: user.id,
          },
        });

        if (user && account) {
          res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
          });
        } else {
          res.status(500).json({
            statusText: "Unable to link account to created user profile",
          });
        }

        // console.log("RES: ", res);

        return res;

      // break;

      default:
        res.setHeader("Allow", ["POST"]);
        res
          .status(405)
          .json({ statusText: `Method ${req.method} Not Allowed` });
    }
  } catch (err) {
    return res.status(503).json({ err: err.toString() });
  }
}