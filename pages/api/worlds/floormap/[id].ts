import { PrismaClient } from '@prisma/client';
import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const {id} = req.query
        let fmbyid = (await prisma.map.findUnique({where:{id:id}, select:{floormap:true} }))
        res.json(fmbyid);
}
