
import mongoose from 'mongoose';
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../schemas/usersch";
import Mapsi from '../schemas/mapsch';
// Replace the uri string with your MongoDB deployment's connection string.


mongoose.connect(process.env.MONGODB_URI);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    

      

if (req.method === 'PUT'){
    try{
        const { userEmail,userName,userImage } = req.body;

      const session = await getServerSession(req,res,authOptions)
      const owner = session?.user?.id

      await User.findByIdAndUpdate(owner, {
        name:userName,
        email:userEmail,
        image:userImage as string
      })

      await Mapsi.updateMany(owner as any, {owner:userName,ownerEmail:userEmail})

      res.status(201).json({ message: 'Map data saved successfully.' });
    } catch (e) {
      // send an error response back to the client
      res.status(500).json({ error: e.message });
    }

    }else {
        // send a 405 Method Not Allowed response back to the client
        res.status(405).json({ error: 'Only PUT requests allowed.' });
      }
}