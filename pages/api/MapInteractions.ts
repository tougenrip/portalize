
import { getServerAuthSession } from './auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default  async function handler(req, res) {

    

    switch(req.query.function) {
      case 'likeMap':
      await LikeMap(req, res);
      break
      case 'unlikeMap':
      await UnlikeMap(req, res);
      break
    }

  
}

async function UnlikeMap(req, res) {

  if (req.method === 'PUT'){
    try{
      const {mapId} = req.body
          const session = await getServerAuthSession(req,res)
          const owner = session?.user?.id
    
           

      res.status(201).json({ message: `Unliked the map with ID: ${mapId}.` });
    } catch (e) {
      // send an error response back to the client
      res.status(500).json({ error: e.message });
    }

    }else {
        // send a 405 Method Not Allowed response back to the client
        res.status(405).json({ error: 'Only PUT requests allowed.' });
    }

}

async function LikeMap(req, res) {
  

    if (req.method === 'PUT'){
        try{
          const {mapId} = req.body
          const session = await getServerAuthSession(req,res)
          const owner = session?.user?.id
    
          const user = await prisma.user.findUnique({where:{id:owner}})
          user.likedMaps.push(mapId)
          await prisma.map.update({
            where: { id: mapId },
            data: { likes: { increment: 1 } }
          })
                    
          
     
    
          res.status(201).json({ message: `Liked the map with ID: ${mapId}.` });
        } catch (e) {
          // send an error response back to the client
          res.status(500).json({ error: e.message });
        }
    
        }else {
            // send a 405 Method Not Allowed response back to the client
            res.status(405).json({ error: 'Only PUT requests allowed.' });
        }
}