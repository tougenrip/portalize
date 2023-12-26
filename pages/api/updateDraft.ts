import prisma from '@/prisma/prisma';

import type { NextApiRequest, NextApiResponse } from "next";

export default async function hendler(req:NextApiRequest,res:NextApiResponse) {

    if(req.method = "POST"){
        const {ownerId, floormapDraft, interiorDraft, title, worldId} = req.body
        
        await prisma.draft.update({where: {id:worldId as unknown as string},data:{
            ownerId: ownerId,
            title: title,
            floormap: floormapDraft,
            interior: interiorDraft,
        }})
        return res.status(200).end();
    }else{
        res.json('only POST requests allowed')
    }

}