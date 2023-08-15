import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from "mongodb";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {id} = req.query
  const client = await clientPromise;
        const db = client.db("test");
        let fmbyid = (await prisma.map.findMany())
        res.json(fmbyid);
}

