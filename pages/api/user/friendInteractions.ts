
// import { getServerSession } from 'next-auth';
// 
// import { authOptions } from '../auth/[...nextauth]';
// 
// export default  async function handler(req, res) {

  

    

//     switch(req.query.function) {
//       case 'addFriend':
//       await LikeFriend(req, res);
//       break
//       case 'removeFriend':
//       await UnlikeFriend(req, res);
//       break
//     }

  
// }

// async function LikeFriend(req, res) {
  

//   if (req.method === 'PUT'){
//       try{
//         const {id:friendId} = req.query
//         const session = await getServerSession(req,res,authOptions);
//         const owner = session?.user?.id
  
//         await prisma.user.update({where:{id:owner}, data: { friends : {push: friendId}}})
        
   
  
//         res.status(201).json({ message: `Liked the friend with ID: ${friendId}.` });
//       } catch (e) {
//         // send an error response back to the client
//         res.status(500).json({ error: e.message });
//       }
  
//       }else {
//           // send a 405 Method Not Allowed response back to the client
//           res.status(405).json({ error: 'Only PUT requests allowed.' });
//       }
// }

// async function UnlikeFriend(req, res) {

//   if (req.method === 'PUT'){
//     try{
//       const {id:friendId} = req.query
      
//           const session = await getServerSession(req,res,authOptions);
//           const owner = session?.user?.id

//           const { friends } = await prisma.user.findUnique({
//             where: {
//               id: owner
//             },
//             select: {
//               friends:true
//             },
//           });
          
//           await prisma.user.update({
//             where: {
//               id: owner
//             },
//             data: {
//               likedMaps: {
//                 set: friends.filter((i) => i !== `${friendId}`),
//               },
//             },
//           });

//           res.status(201).json({ message: `Unliked the friend with ID: ${friendId}.` });

//     } catch (e) {
//       res.status(500).json({ error: e.message });
//     }

//     }else {
//         res.status(405).json({ error: 'Only PUT requests allowed.' });
//     }

// }

