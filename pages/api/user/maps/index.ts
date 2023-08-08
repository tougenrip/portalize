import { getServerSession } from 'next-auth';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from "mongodb";
import authOptions from '../../auth/authOptions';
import { NextApiRequest, NextApiResponse } from 'next';
import { resolve } from 'path';
import { getServerAuthSession } from '../../auth/[...nextauth]';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

      const session = await getServerAuthSession(req,res);

      // Error handling
      if (!session?.user?.id) {
        return res.status(401).json({
          error: {
            code: 'no-access',
            message: 'You are not signed in.',
          },
        });
      }
    

  const client = await clientPromise;
        const db = client.db("test");
        let fmbyid = (await db.collection("maps").find({owner: session.user.name}, {projection: {floormap:0,interior:0}}).toArray())
        res.json(fmbyid);
}



