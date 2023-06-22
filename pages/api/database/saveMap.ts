import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import World from '../schemas/mapsch'
import { useSession } from 'next-auth/react';

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);



// define and export the POST endpoint handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  if (req.method === 'PUT') {
    try {
      // extract the map data and session from the request body
      const { title, desc, privite,likes,userLimit, floormap, interior } = req.body;
      // get a CSRF token from the session,

      // create a new document in the Worlds collection
      const newWorldMap = new World({
        title: title,
        desc: desc,
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