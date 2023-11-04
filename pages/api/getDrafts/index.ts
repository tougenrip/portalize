import { PrismaClient } from '@prisma/client';
import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const { i:id } = req.query
        let fmbyid = (await prisma.draft.findMany({
          where: {
            ownerId:id
          },select:{
            id:true,
            title:true,
            floormap:true,
            interior:true,
            isPublished:true,
            created:true
          }
        }));
        res.json(fmbyid);
}