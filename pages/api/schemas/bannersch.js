import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { authOptions } from '../auth/authOptions';




export const bannerSchema = new mongoose.Schema({

  title: {
    type: String
  },
  owner: {
    type: String
  },
  img: {
    type: String
  },
  website: {
    type: String
  },
});

const BannerS = mongoose.models.banners || mongoose.model('banners', bannerSchema, 'banners');

export default BannerS;