import clientPromise from '../../lib/mongodb';
import mongoose from 'mongoose';
import User from './schemas/usersch';
import { getServerSession } from 'next-auth';
import authOptions from './auth/authOptions';
import Mapsi from './schemas/mapsch';
import { ObjectId } from 'mongodb';

mongoose.connect(process.env.MONGODB_URI);

export default  async function handler(req, res, mapId) {

    switch(req.query.function) {
      case 'likeMap':
      await LikeMap(req, res, mapId);
      break
      case 'unlikeMap':
      await UnlikeMap(req, res, mapId);
      break
    }

  
}

async function UnlikeMap(req, res, mapId) {

  if (req.method === 'PUT'){
    try{
      const mapId = req.query
      const session = await getServerSession(req,res,authOptions)
      const owner = session?.user?.id

      const user = await User.findByIdAndUpdate(owner, { 'maps.liked' : { $push : `${mapId}`} });
        
        await user.save()

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

async function LikeMap(req, res, mapId) {
  

    if (req.method === 'PUT'){
        try{
          const mapId = req.query
          const session = await getServerSession(req,res,authOptions)
          const owner = session?.user?.id
    
          await User.findByIdAndUpdate(owner, { 'maps.liked' : { $push : `${mapId}`} })
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