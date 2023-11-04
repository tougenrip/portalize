import { PrismaClient } from "@prisma/client";
import prisma from "@/prisma/prisma";
import getServerSession from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";

export default async function hendler(req,res) {


  
    if(req.method = "POST"){
        try{
            const session = await getServerSession(authOptions);

            const {floormap, interior, title, ownerId} = req.body
            await prisma.draft.create({data:{
                ownerId: ownerId,
                title:title,
                floormap:floormap,
                interior:interior,
            }})
            return res.status(200).json('saved map draft');
        } catch (e) {
            // send an error response back to the client
            res.status(500).json({ error: e.message });
          }
        
    }else{
        res.json('only POST requests allowed')
    }

}