import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from "@/prisma/prisma";

export default async function handler(req:NextApiRequest,res:NextApiResponse){

    if(req.method === "GET") {

        const session = await getServerSession(req,res,authOptions);

        const user = session?.user?.id;

        const models = await prisma.file.findMany({where: {userId:user}})

        res.status(200).json(models)


    }else {
            // send a 405 Method Not Allowed response back to the client
            res.status(405).json({ error: 'Only PUT requests allowed.' });
          };

}
