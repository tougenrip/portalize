// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from '../../../lib/mongodb';

// export default async function handler(req, res) {
//   const { id } = req.query
//   const client = await clientPromise;
//         const db = client.db("test");
//   let fmbyid = (await db.collection("users").find({}).toArray())
//         res.json({fmbyid});
// }

import { PrismaClient } from '@prisma/client';
import prisma from "@components/prisma/prisma";
export default async function run(req, res) {
  try {
    const {id:uid} = req.query
    const user = await prisma.user.findUnique({where:{id:uid}})
    res.json(user);
  } finally {
    await prisma.$disconnect()
  }
}