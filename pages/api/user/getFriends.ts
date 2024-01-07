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
              const response = await Promise.all(friends.map((friend,i) => fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/user/${friend}`)));
              const data = await Promise.all(response.map(r => r.json()))
              console.log(data.flat());

              res.status(201).json(data);


      };

      

            
    }