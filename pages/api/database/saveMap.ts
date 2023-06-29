import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/authOptions';
import Mapsi from '../schemas/mapsch';

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);



// define and export the POST endpoint handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  
  if (req.method === 'PUT') {
    try {
      // extract the map data and session from the request body
      const { title, desc, privite,likes,userLimit, floormap, interior } = req.body;

      const session = await getServerSession(req,res,authOptions)
      const owner = session?.user?.id
      const ownerEmail = session?.user?.email

      // create a new document in the Worlds collection
      const newWorldMap = new Mapsi({
        title: title,
        desc: desc,
        owner: owner,
        ownerEmail: ownerEmail,
        privite: privite,
        likes: likes,
        userLimit:userLimit, 
        floormap: floormap,
        interior: interior
      });

      // save the new document to the database
      await newWorldMap.save();

      // send a success response back to the client with the CSRF token
      res.status(201).json({ message: 'Map data saved successfully.' });
    } catch (e) {
      // send an error response back to the client
      res.status(500).json({ error: e.message });
    }
  } else {
    // send a 405 Method Not Allowed response back to the client
    res.status(405).json({ error: 'Only POST requests allowed.' });
  }
}