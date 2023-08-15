import { NextApiRequest, NextApiResponse } from 'next';
import { getServerAuthSession } from '../auth/[...nextauth]';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// connect to MongoDB



// define and export the POST endpoint handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({req})
   if(req.headers['x-api-key'] !== process.env.API_ROUTE_SECRET){return res.status(401).send('Unauthorized Access2')}
  // if(!session){res.status(401).send('You`re not signed in!')}

  switch(req.query.function){
    case 'uploadMap':
      await UploadMap()
      break;
  }


async function UploadMap(){
  
  
  if (req.method === 'PUT') {
    
    try {
      // extract the map data and session from the request body
      const {title, desc, likes, userLimit, floormap, interior, img} = req.body;

      const session = await getServerAuthSession(req,res);
      const owner = session?.user?.name
      const ownerEmail = session?.user?.email

      // create a new document in the Worlds collection
      await prisma.map.create({data: {
        title: title,
        desc: desc,
        owner: owner,
        ownerEmail: ownerEmail,
        likes: likes,
        userLimit:userLimit, 
        floormap: floormap,
        interior: interior,
        img: img,
      }});

      // send a success response back to the client with the CSRF token
      res.status(201).json({ message: 'Map data saved successfully.' });
    } catch (e) {
      // send an error response back to the client
      res.status(500).json({ error: e.message });
    }
  } else {
    // send a 405 Method Not Allowed response back to the client
    res.status(405).json({ error: 'Only PUT requests allowed.' });
  }
}

}