import React, { useCallback, useEffect, useState } from 'react'
import {fakefriends} from '@/utils/fakefriends'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Router, useRouter } from 'next/router'
import { BiXCircle } from 'react-icons/bi'

const FriendsPortal =  ({visibility}) => {
    

    const {data:session} = useSession();
    const userFriends = session?.user?.friends
    const router = useRouter()

    //include criteria state to query key

      
    const [selected, setSelected] = useState(null)

    const { isLoading, error, data:friendMaps } = useQuery({
        queryKey: ['o', selected],
        queryFn: () =>
        fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/getMaps?o=${selected}`).then(
            (res) => res.json(), 
          ),
      })

      const launchNewWorld = useCallback((_worldURL) => {
        console.log(`getting into the world ${_worldURL}`)
        router.push(_worldURL)
      },[])
    

    useEffect(() => {
        console.log('selected friend is ' + selected);
}  ,[selected])

    

  return (
    <div className={`  flex flex-col p-2 items-center  aspect-video w-screen md:w-[50vw] md:max-w[60vw]  bg-paffbg rounded-3xl`}>
        <h1 className='text-4xl font-bold text-center'>Select a world to travel!</h1>
        <div className=' w-11/12 h-auto aspect-video bg-paffbg border-purple-500 border-2  overflow-hidden rounded-3xl grid grid-cols-2'>
            <div className=' overflow-y-scroll'>
                <ul>
                    {userFriends?.map((friend,i) => (
                        <li onClick={() => {setSelected(friend);}} key={i} className='py-2 px-4 text-sm bg-purple-900  hover:bg-purple-800 active:bg-purple-700'>
                            {friend}
                        </li>
                    ))}
                    
                </ul>
            </div>
            {selected && 
            <div className=' overflow-y-scroll'>
               
                <ul>
                    {friendMaps?.map((map,i) => (
                        <a href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}game/${map.id}`} key={i}>
                            <li key={i} onClick={(e) => {launchNewWorld(`${process.env.NEXT_PUBLIC_WEBSITE_URL}game/${map.id}`)}} className='py-2 px-4 text-sm bg-purple-900 hover:bg-purple-800 active:bg-purple-700'>
                                {map.title} 
                            </li>
                        </a>
                        
                    ))}
                    
                </ul> 
            </div>}
        </div>
    </div>
  )
}

export default FriendsPortal