import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/authOptions';
import BannerS from '../schemas/bannersch'
import { getSession } from 'next-auth/react';

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === 'POST') {
      try {
        // extract the map data and session from the request body
        const {title, website, bannerImg } = req.body
  
        const session = await getServerSession(req,res,authOptions)
        const owner = session?.user?.id
  
        // create a new document in the Worlds collection
        const newBanner = new BannerS({
            title,
            owner,
            img:bannerImg,
            website,
            createdAt: { type: Date, expires: '2m', default: Date.now }
          } );
    
          await newBanner.save()
        // save the new document to the database
        // send a success response back to the client with the CSRF token
        res.status(201).json({ message: 'Banner saved successfully.' });
      } catch (e) {
        // send an error response back to the client
        res.status(500).json({ error: e.message });
      }
    } else {
      // send a 405 Method Not Allowed response back to the client
      res.status(405).json({ error: 'Only POST requests allowed.' });
    }
  
}