'use client'
import Navbar from '@/components/Navbar'
import Head from 'next/head';
import React from 'react';
import type { Map } from "@prisma/client"
import prisma from '@/prisma/prisma';
import PlacesSearch from '@/components/PlacesSearch';




const AllPlaces = async () => {
  return (
    <>
    
    <Head>
      <title>Portalize | All Worlds</title>
    </Head>
    <Navbar/>
    <div>
          </div>
    <PlacesSearch/>
    </>
  );
};

export default AllPlaces