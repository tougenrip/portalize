
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]';
import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
    
          const session = await getServerSession(req,res,authOptions);;
            const owner = session?.user?.id
   
    

        const fmbyid = await prisma.map.findMany({where:{ownerId:owner},select:{
          title:true,
          id:true,
          desc:false,
          owner:false,
          ownerId:false,
          img:true,
          userLimit:false,
          tags:false,
          created:false,
          floormap:false,
          interior:false
          } })
        res.json(fmbyid);
}



