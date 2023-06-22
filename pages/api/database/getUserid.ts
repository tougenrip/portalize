import mongoose from "mongoose";
import { useSession } from "next-auth/react";
import clientPromise from "../../../lib/mongodb";

export default async function getUserId(req,res) {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      const client = await clientPromise;
      const db = client.db("test")


      let interiors = (await db.collection("users").find({email: session.user.email}).toArray())?.
      res.json()
}