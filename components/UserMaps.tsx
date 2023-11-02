import React from 'react'
import useSWR from 'swr'
import GameCard from './gamecard';
import { Drawer,Typography,IconButton, Button } from '@material-tailwind/react';
import { BiCross } from 'react-icons/bi';
import DrawerButton from './DrawerButton';
import Link from 'next/link';


const UserMaps = () => {
  
    const fetcher = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('An error occurred while fetching the data.');
        }
        return response.json();
      };
      
      const useFetch = (path) => {
        const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_WEBSITE_URL}${path}`, fetcher);
      
        const isLoading = !data && !error;
      
        return { data, error, isLoading };
      };
      const {data: games, error, isLoading} = useFetch('api/user/maps')


  return (<>{games?.map((game) => <div key={game.id} className='relative -right-7 hover:right-0 transform-gpu duration-200 rounded-l-3xl bg-no-repeat !bg-center !bg-cover' style={{background:` url(${game.img || `/img/mapcomp.webp`})`, opacity:`100%`}}>
    <div   className={`relative right-[1px]  bg-gradient-to-r from-black to-transparent rounded-3xl min-h-[300px]`}><h3 className='absolute bottom-1/2 translate-y-1/2 left-16 text-5xl text-white'>{game.title}</h3>
      <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}game/${game.id}`}>
        <Button className='!absolute !shadow-sm !shadow-black hover:!shadow-lg hover:!shadow-black !bottom-5 !right-16'>Open Project</Button>
      </Link> 
      </div>
      </div>)}</>)
  
}

export default UserMaps