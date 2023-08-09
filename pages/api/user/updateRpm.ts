
import mongoose from 'mongoose';
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../schemas/usersch";
import Mapsi from '../schemas/mapsch';
import { getServerAuthSession } from '../auth/[...nextauth]';
// Replace the uri string with your MongoDB deployment's connection string.


mongoose.connect(process.env.MONGODB_URI);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.query.function){
    case 'updateUrl':
    await updateUrl()
    break
    case 'updateId':
    await updateId()
    break
  }

  
    
  async function updateId(){
    if (req.method === 'PUT'){
        try{
            const { rpmId } = req.body;
    
          const session = await getServerAuthSession(req,res)
          const owner = session?.user?.id
    
          await User.findByIdAndUpdate(owner, {
            rpmId: rpmId,
          })
    
          res.status(201).json({ message: 'Map data saved successfully.' });
        } catch (e) {
          // send an error response back to the client
          res.status(500).json({ error: e.message });
        }
    
        }else {
            // send a 405 Method Not Allowed response back to the client
            res.status(405).json({ error: 'Only PUT requests allowed.' });
          }
  }

  async function updateUrl(){
    if (req.method === 'PUT'){
        try{
            const { avatarUrl } = req.body;
    
          const session = await getServerAuthSession(req,res)
          const owner = session?.user?.id
    
          await User.findByIdAndUpdate(owner, {
            avatarUrl: avatarUrl,
          })
    
          res.status(201).json({ message: 'Map data saved successfully.' });
        } catch (e) {
          // send an error response back to the client
          res.status(500).json({ error: e.message });
        }
    
        }else {
            // send a 405 Method Not Allowed response back to the client
            res.status(405).json({ error: 'Only PUT requests allowed.' });
          }
  }
      

}