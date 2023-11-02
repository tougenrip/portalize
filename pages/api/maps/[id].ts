
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {id} = req.query
        let fmbyid = (await prisma.map.findUnique({where:{id:id}, select:{title:true,desc:true,owner:true,img:true} }))
        res.json(fmbyid);
}
