import mongoose from 'mongoose';
import { useSession } from 'next-auth/react';




export const mapSchema = new mongoose.Schema({

  title: {
    type: String,
  },
  owner: {
    type: String,
  },
  desc: {
    type: String,
  },
  img:{
    type: String,
   },
   tags:{
     type: String,
  },
  privite:{
    type: String,
  },
  likes: {
    type: String,
  },
  userLimit:{
    type: String,
  },
  created:{
    type: Date, default: Date.now()
  },
  floormap: { type: String,},interior: { type: String, }
  
});

const Mapsi = mongoose.models.map || mongoose.model('map', mapSchema, 'map');

export default Mapsi;