/*"use client"
import Image from 'next/image'
import pokemonLogo from '../public/pokemonLogo.png'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { GameCardNew } from './List'

type PokemonType = {
  name: string,
  imageUrl: string
}

async function getPokemons({pageParam} : {pageParam : number}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/search?limit=20&offset=${pageParam}`)
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  let filtered = await data.results.map((pokemon : {

  }, index : number) => {
    let paddedIndex = pageParam === 0 ? ('00' + (index + 1)).slice(-3) : ('00' + (index + 1 + pageParam)).slice(-3)
    return {
      ...pokemon,
    }
  }) 
  return filtered
}

export default function Home() {
  const {ref, inView} = useInView();

  const {
    data : pokemons,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: getPokemons,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length === 20 ? allPages.length * 20 : undefined;
      return nextPage;
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src={pokemonLogo} alt='Pokemon logo' width={150} height={150} className='objet-cover'/> 
     <h2 className='mt-4'>Welcome to Brazil!</h2>
     <div className='w-full md:w-10/12 m-auto flex mt-5 mb-5 flex-col md:grid md:grid-cols-3 md:grid-row-1 md:items-center gap-4'>
      {status === 'success' && pokemons.pages?.map(page => 
      page.map((pokemon, index : number) => 
      {
        if (page.length == index + 1){
          return (
            <div key={pokemon.id} ref={ref} >
                <GameCardNew key={pokemon.id} itemId={pokemon.id} setSelected={undefined} item={pokemon} />
            </div>
          
          )
        } else {
          return (
            <div key={pokemon.id} >
                <GameCardNew key={pokemon.id} itemId={pokemon.id} setSelected={undefined} item={pokemon} />
            </div>
          )
        }
      }

      ))}
     </div>
    </main>

  )
}*/