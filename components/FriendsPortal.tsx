import React, { useEffect, useState } from 'react'
import {fakefriends} from '@/utils/fakefriends'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Router, useRouter } from 'next/router'

const FriendsPortal =  () => {
    

    const {data:session} = useSession();
    const userFriends = session?.user?.friends
    const router = useRouter()

    //include criteria state to query key

      
    const [selected, setSelected] = useState(null)

    const { isLoading, error, data:friendMaps } = useQuery({
        queryKey: ['o', selected],
        queryFn: () =>
        fetch(`api/getMaps?o=${selected}`).then(
            (res) => res.json(),
          ),
      })


    

    useEffect(() => {
        console.log('selected friend is ' + selected);
}  ,[selected])

  return (
    <div className=' relative aspect-video w-[60vw] bg-deep-orange-400 rounded-3xl'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 h-auto aspect-video bg-gray-700 overflow-hidden rounded-3xl grid grid-cols-2'>
            <div className=' overflow-y-scroll'>
                <ul>
                    {userFriends?.map((friend,i) => (
                        <li onClick={() => {setSelected(friend);}} key={i} className='py-2 px-4 bg-blue-gray-900 hover:bg-blue-gray-800 active:bg-blue-gray-700'>
                            {friend}
                        </li>
                    ))}
                    
                </ul>
            </div>
            {selected && 
            <div className=' overflow-y-scroll'>
               
                <ul>
                    {friendMaps?.map((map,i) => (
                        <li onClick={() => router.push(`game/${map.id}`)} key={i} className='py-2 px-4 bg-blue-gray-900 hover:bg-blue-gray-800 active:bg-blue-gray-700'>
                            {map.title} 
                        </li>
                    ))}
                    
                </ul> 
            </div>}
        </div>
    </div>
  )
}

export default FriendsPortal