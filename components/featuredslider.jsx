import React from 'react'
import GameCard from './gamecard'
import 'keen-slider/keen-slider.min.css'
import useSWR from 'swr'



 
const FeaturedSlider = () => {

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
  const {data: games, error, isLoading} = useFetch('api/user/getMaps')

  
    
      
   
    
  return (
    <div className="flex !space-x-4 !h-min place-items-center overflow-x-scroll scrollbar-none  my-3 p-[32px]">
      {games?.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
      </div>
  )
}

export default FeaturedSlider