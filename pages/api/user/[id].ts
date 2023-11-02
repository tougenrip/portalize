import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(req:NextApiRequest,res:NextApiResponse){

    if(req.method === "GET") {
        const user = req?.query?.id as unknown as string
         if(!user){
            res.status(404).json('User not found')
        }

        const userRes = await prisma.user.findUnique({where: {id:user} })
        if(!userRes){
            res.status(404).json('User not found')
        }

        res.status(200).json(userRes)


    }else {
            // send a 405 Method Not Allowed response back to the client
            res.status(405).json({ error: 'Only PUT requests allowed.' });
          };

}