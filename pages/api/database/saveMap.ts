import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { getServerAuthSession } from '../auth/[...nextauth]';
import authOptions from '../auth/authOptions';
import Mapsi from '../schemas/mapsch';
import User from '../schemas/usersch';
import { getSession } from 'next-auth/react';

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);



// define and export the POST endpoint handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({req})
   if(req.headers['x-api-key'] !== process.env.API_ROUTE_SECRET){return res.status(401).send('Unauthorized Access2')}
  // if(!session){res.status(401).send('You`re not signed in!')}

  switch(req.query.function){
    case 'updateskyperm':
      await UpdateSkyPerm()
      break;
    case 'updatebannerperm': 
    await UpdateBannerPerm()
    break;
    case 'uploadMap':
      await UploadMap()
      break;
  }
  

  async function UpdateBannerPerm(){
    
    if (req.method === 'PUT') {
      try {
        // extract the map data and session from the request body
        const {state, } = req.query
  
        const session = await getServerAuthSession(req,res);
        const owner = session?.user?.id
  
        // create a new document in the Worlds collection
        await User.findByIdAndUpdate(owner,{bannerEnabled: state as unknown as boolean});
  
        // save the new document to the database
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
    
  
  async function UpdateSkyPerm(){
    
    if (req.method === 'PUT') {
      try {
        // extract the map data and session from the request body
        const {state } = req.query
  
        const session = await getServerAuthSession(req,res);
        const owner = session?.user?.id
  
        // create a new document in the Worlds collection
        await User.findByIdAndUpdate(owner,{skyEnabled: state as unknown as boolean});
  
        // save the new document to the database
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

async function UploadMap(){
  
  
  if (req.method === 'PUT') {
    
    try {
      // extract the map data and session from the request body
      const { title, desc, privite,likes,userLimit, floormap, interior,img } = req.body;

      if(!desc){
        window.alert('Please enter a description');
      }

      const session = await getServerAuthSession(req,res);
      const owner = session?.user?.name
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
        interior: interior,
        img: img,
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

}