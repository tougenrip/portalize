import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;
    let fmbyid = prisma.maps.findUnique({
      where: {
        id:id as string
      },
      select: {
        floormap:true,
      },
    });
    res.json(fmbyid);
};