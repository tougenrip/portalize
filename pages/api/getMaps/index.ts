
import prisma from '@/prisma/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { userAgent } from 'next/server';


export default async function handler(req:NextApiRequest,res:NextApiResponse) {
  var fmbyid
  const id = req.query.world
  const owner = req.query.o
  const usrLimit = req.query.ul as unknown as number
  const upperAgeL = req.query.upal as unknown as number || 100 
  const lowerAgeL = req.query.lwal as unknown as number || 100

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
  } else {
        fmbyid = await prisma.map.findMany({
          where: {
            cat: cat as unknown as string,
            ownerId:owner as string,
            userLimit:usrLimit,
            
            

          },
          select:{
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
      }
        res.json(fmbyid);
}

