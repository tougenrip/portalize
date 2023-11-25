
import prisma from "@/prisma/prisma";
import {Map} from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next";

  interface Data {
    posts: Map[]
    nextId: number | undefined
  }
  
  export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    if (req.method === 'GET') {
      const limit = 5
      const cursor = req.query.cursor ?? ''
      const cursorObj = cursor === '' ? undefined : { id: parseInt(cursor as string, 10) }
  
      const posts = await prisma.map.findMany({
        skip: cursor !== '' ? 1 : 0,
        cursor: cursorObj,
        take: limit,
      })
      return res.json({ posts, nextId: posts.length === limit ? posts[limit - 1].id : undefined })
    }
  }