
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from 'next-auth';
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { PrismaClient } from '@prisma/client';
import prisma from "@/prisma/prisma";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await getServerSession(req,res,authOptions);
      const owner = session?.user?.id


if (req.method === 'PUT'){
    try{
        const { userEmail,userName, userImage, gender, bDay } = req.body;
        
      

      await prisma.user.update({where:{id:owner}, data: {
        name:userName,
        email:userEmail,
        image:userImage,
        gender:gender,
        bDay: bDay,
      }});

      await prisma.map.updateMany({where:{id:owner}, data:{
        ownerName:userName,
      }})
      res.status(201).json({ message: 'user data saved successfully.' });
    } catch (e) {
      // send an error response back to the client
      res.status(500).json({ error: e.message });
    }

    }else {
        // send a 405 Method Not Allowed response back to the client
        res.status(405).json({ error: 'Only PUT requests allowed.' });
      }
}

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '8mb' // Set desired value here
      }
  }
}
