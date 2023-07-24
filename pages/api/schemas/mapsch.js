import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { authOptions } from '../auth/authOptions';




export const mapSchema = new mongoose.Schema({

  title: {
    type: String,
  },
  owner: {
    type: String
  },
  ownerEmail: {
    type: String
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
    type: Number, default: 0
  },
  userLimit:{
    type: String,
  },
  created:{
    type: Date, default: Date.now()
  },
  floormap: { type: String,},interior: { type: String, }
  
});

const Mapsi = mongoose.models.maps || mongoose.model('maps', mapSchema, 'maps');

export default Mapsi;