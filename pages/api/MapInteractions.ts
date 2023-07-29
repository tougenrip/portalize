import mongoose from 'mongoose';
import User from './schemas/usersch';
import { getServerSession } from 'next-auth';
import authOptions from './auth/authOptions';
import Mapsi from './schemas/mapsch';

mongoose.connect(process.env.MONGODB_URI);

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
      const mapId = req.params
      const session = await getServerSession(req,res,authOptions)
      const owner = session?.user?.id

      await User.findByIdAndUpdate(owner, { 'maps.liked' : { $push : `${mapId}`} });
        

      await Mapsi.findByIdAndUpdate(mapId, {$inc: {likes:-1}})



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
          const session = await getServerSession(req,res,authOptions)
          const owner = session?.user?.id
    
          await User.findByIdAndUpdate(owner, { 'maps.liked' : [{ $push : mapId as string }] })
          await Mapsi.findOneAndUpdate(mapId, {$inc: {likes:1}})
          
     
    
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