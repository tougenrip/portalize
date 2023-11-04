import { PrismaClient } from '@prisma/client';
import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const { id } = req.query
        let fmbyid = prisma.map.findUnique({
          where: {
            id:id
          },
          select: {
            floormap:true,interior:true
          },
        });
        res.json(fmbyid);
}