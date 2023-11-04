import { FeaCard } from '@/components/List';
import Navbar from '@/components/Navbar'
import PortalNav from '@/components/portalNav';
import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import useSWR from 'swr';


const fetchWorlds = async (url:string) => {
  const response = await fetch(url);
  if(!response.ok){
    throw new Error('failed to fetch worlds')
  }
  return response.json();
};

const AllPlaces = () => {
  
  
  const router = useRouter();
  const search = useSearchParams();
  const [searchquery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : ""
  );
  const searchQ = search ? search?.get('q') : null;
  const encodedSearchQuery = encodeURI(searchquery || "");
  const {data, isLoading} = useSWR(`/api/search?q=${encodedSearchQuery}`, fetchWorlds);


  console.log("Search Params:", search);
  console.log('Here is the data:', data);

  const onSearch = (event) => {
    event.PreventDefault();
    router.push(`/search?q=${encodedSearchQuery}`)
    console.log("current query", searchquery);
  }

  return (
    <>
    <Head>
      <title>Portalize | All Worlds</title>
    </Head>
    <Navbar/>
    <div>
            <PortalNav/>
          </div>
    <main className='absolute left-1/2 flex flex-col -translate-x-1/2 md:w-[80%] w-screen justify-center'>
        <div className='md:h-60 h-40 flex justify-center'>
           <h1 className='self-center text-4xl font-bold'>All places</h1>
        </div>
        <div className='w-full mb-10'>
          <input type='text' className='w-full rounded-3xl h-12 p-5' placeholder='Search all worlds' onChange={(e) => {setSearchQuery(e.target.value); console.log("Search Query:" + e.target.value)}}></input>
        </div>
        <div className='w-screen md:w-[1500px] self-center md:flex md:flex-row'>
          <div className='w-[30%] hidden md:flex flex-row space-y-3 '>
            <h2 className='mx-auto text-'>Sidebar</h2>
          </div>
          <div className="w-[70%] -translate-x-6 mx-auto flex flex-col md:grid md:grid-cols-3 space-y-10">
          {data?.map((item) => (
            <FeaCard key={item.id} itemId={item.id} setSelected={undefined} item={item} />
          ))}
          </div>
        </div>
    </main> 
    </>
  );
};

export default AllPlaces