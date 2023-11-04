
// import { getServerSession } from 'next-auth';
// import { authOptions } from './auth/[...nextauth]';
// import { PrismaClient } from '@prisma/client';
// import prisma from "@/prisma/prisma";
// export default  async function handler(req, res) {

  

    

//     switch(req.query.function) {
//       case 'likeorunlike':
//       await LikeOrUnlikeMap(req, res);
//       break
//     }

  
// }

// async function LikeOrUnlikeMap(req, res) {

//   if (req.method === 'POST') {
//     const { mapId, userId } = req.body;

//     // Check if the user has already liked the post
//     const existingLike = await prisma.likeMap.findUnique({
//       where: { mapId_userId: { mapId, userId } },
//     });

//     if (existingLike) {
//       // If the like exists, delete it (unlike)
//       await prisma.likeMap.delete({
//         where: { id: existingLike.id },
//       });

//       res.json({ message: 'Unliked' });
//     } else {
//       // If the like does not exist, create it (like)
//       await prisma.likeMap.create({
//         data: { mapId, userId },
//       });

//       res.json({ message: 'Liked' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }

// }

