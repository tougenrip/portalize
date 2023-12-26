
import prisma from '@/prisma/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { userAgent } from 'next/server';


export default async function handler(req:NextApiRequest,res:NextApiResponse) {
  var fmbyid
  const id = req.query.world
  const u = req.query.user
  const owner = req.query.o
  const page = req.query.p as unknown as number || 0

      if(id){ 
        fmbyid = await prisma.map.findUnique({where: {id:parseInt(id as unknown as string)}, select:{
          title:true,
          id:true,
          desc:true,
          owner:true,
          ownerId:true,
          img:true,
          userLimit:true,
          ageLimit:true,
          cat:true,
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

  } else if (u) {
    fmbyid = await prisma.map.findMany({
      where: {
        ownerId: u as unknown as string
      },
      orderBy:{
        created:'desc'
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

