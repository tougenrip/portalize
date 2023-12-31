
import prisma from '@/prisma/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { userAgent } from 'next/server';


export default async function handler(req:NextApiRequest,res:NextApiResponse) {
  var fmbyid
  const id = req.query.world
  const u = req.query.user
  const owner = req.query.o
  const page = req.query.p as unknown as number || 0
  const cat = req.query.cat

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
          isPrivate:true,
          password:true,
          cat:true,
          tags:true,
          created:true,
          floormap:false,
          interior:false
          }})
      } else if(cat) { 
      fmbyid = await prisma.map.findMany({
        where:{
          cat:cat as string
        },
        select:{
          title:true,
          id:true,
          desc:true,
          owner:true,
          ownerId:true,
          img:true,
          cat:true,
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
        cat:true,
        userLimit:false,
        tags:false,
        created:false,
        floormap:false,
        interior:false
        }})
    }
        res.json(fmbyid);
}

