import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/prisma";


export default  async function handler(req, res) {

    const session = await getServerSession(req,res,authOptions);

    const user = session?.user?.id;


    if(req.method === 'GET'){


        const {friends} = await prisma.user.findUnique({
            where:{
                id:user
            },
            select:{
                friends:true
            }
        })


        const responses = await Promise.all(friends.map(async(friend) => {
           await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/user?id=${friend}`)
        }))

            
            
        
            //return all responses
            res.status(200).json(responses);
    }
}