import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import React from 'react'
import useSWR from 'swr'
import GameCard from './gamecard';


const UserMaps = () => {
    const fetcher = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('An error occurred while fetching the data.');
        }
        return response.json();
      };
      
      const useFetch = (path) => {
        const { data, error } = useSWR(`http://localhost:3000/${path}`, fetcher);
      
        const isLoading = !data && !error;
      
        return { data, error, isLoading };
      };
      const {data: games, error, isLoading} = useFetch('api/user/maps')
  return (<>
    {games?.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
     </>
  )
}

export default UserMaps