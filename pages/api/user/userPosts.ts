import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from "@components/prisma/prisma";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    

    if(req.method === "GET") {
        const uid = req.query.id as unknown as string
        const models = await prisma.post.findMany({where: {user_id:uid}, select:{
            user:false
        }})

        res.status(200).json(models)


    }else {
            // send a 405 Method Not Allowed response back to the client
            res.status(405).json({ error: 'Only PUT requests allowed.' });
          };

}