
import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from '../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

if (req.method === 'PUT'){
    try{
        const { userEmail,userName, userImage } = req.body;

      const session = await getServerAuthSession(
        req as unknown as NextApiRequest,
        {
          ...res,
          getHeader: (name: string) => res.headers?.get(name),
          setHeader: (name: string, value: string) => res.headers?.set(name, value),
        } as unknown as NextApiResponse);
      const owner = session?.user?.id

      await prisma.user.update({where:{id:owner}, data: {
        name:userName,
        email:userEmail,
        image:userImage,
      }});

      await prisma.map.updateMany({where:{id:owner}, data:{
        owner:userName,
        ownerEmail:userEmail
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
