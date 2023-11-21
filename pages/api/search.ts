
import prisma from "@/prisma/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    const {q:query} = req.query;
    console.log("Search Query", query);

    const worlds = await prisma.map.findMany({
        where: {
            OR:[
                {
                    title: {
                        contains: query as string,
                        mode: "insensitive"
                    }
                },
                {
                    tags: {
                        has: query as string,
                    }
                },
                {
                    desc: {
                        contains: query as string,
                        mode: "insensitive"
                    }
                },
            ]
        },
        select:{
            title:true,
            id:true,
            desc:true,
            owner:true,
            ownerId:true,
            img:true,
            userLimit:false,
            tags:false,
            created:false,
            floormap:false,
            interior:false
        }
    })


    res.status(200).json(worlds);
}