import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@components/prisma/prisma";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
  var fmbyid
  const {world:id, o:owner } = req.query
  const page = req.query.p as unknown as number || 0

      if(id){ 
        fmbyid = await prisma.map.findUnique({where: {id:id as unknown as string}, select:{
          title:true,
          id:true,
          desc:true,
          owner:true,
          ownerId:true,
          img:true,
          userLimit:true,
          tags:true,
          created:true,
          floormap:false,
          interior:false
          }})
      } else if(page) { 
      fmbyid = await prisma.map.findMany({
        skip: 15 * (page - 1),
        take: 15,
        orderBy:{
          id:"desc"
        },
        select:{
          title:true,
          id:true,
          desc:true,
          owner:true,
          ownerId:true,
          img:true,
          userLimit:true,
          tags:true,
          created:true,
          floormap:false,
          interior:false
          }
      })

  } 
    else{
      fmbyid = await prisma.map.findMany({select:{
        title:true,
        id:true,
        desc:true,
        owner:true,
        ownerId:true,
        img:true,
        userLimit:false,
        tags:false,
        created:false,
        floormap:false,
        interior:false
        }})
    }
        res.json(fmbyid);
}

