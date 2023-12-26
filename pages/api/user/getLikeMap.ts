// 
// import { NextApiRequest, NextApiResponse } from 'next';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../auth/[...nextauth]';
// 

// export default async function handler(req:NextApiRequest,res:NextApiResponse){

//     if(req.method === "GET") {

//         const session = await getServerSession(req,res,authOptions);

//         const user = session?.user?.id;

//         const likedMaps = await prisma.user.findUnique({where: {id:user}, select : { likedMaps : true} })

//         res.status(200).json(likedMaps)


//     }else {
//             // send a 405 Method Not Allowed response back to the client
//             res.status(405).json({ error: 'Only PUT requests allowed.' });
//           };

// }
