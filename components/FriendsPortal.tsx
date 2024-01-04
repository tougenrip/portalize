import React, { useState } from 'react'
import {fakefriends} from '@/utils/fakefriends'
import Image from 'next/image'

const FriendsPortal = () => {

  const [selected, setSelected] = useState(null)


  return (
    <div className='absolute flex flex-col justify-center items-center bottom-0 rounded-t-3xl bg-blue-500 h-max py-5 w-screen'>
        <h1 className='font-bold text-5xl py-5'>
            Teleport!
        </h1>
        <div className={`relative flex flex-col bg-blue-gray-600 h-[70vh] overflow-y-scroll scrollbar-overflow-hidden  rounded-3xl w-11/12`}>
            <ul >
            {fakefriends?.map((item,i) => (
                <li key={i} className='bg-blue-gray-800 hover:bg-blue-gray-500 active:bg-blue-gray-400   py-2'  >
                    <a onClick={} className='mx-4 flex space-x-2'>
                        <Image className='aspect-square rounded-full' width={25} height={5} src={'/img/pp_comp.webp'}/>
                        <p>{item.name}</p>
                        </a>
                </li>
                ))}
            </ul>
            
        </div>
        {selected &&
            
        <div className={`relative flex flex-col bg-blue-gray-600 h-[70vh] overflow-y-scroll scrollbar-overflow-hidden  rounded-3xl w-11/12`}>
            <ul >
            {fakefriends?.map((item,i) => (
                <li key={i} className='bg-blue-gray-800 hover:bg-blue-gray-500 active:bg-blue-gray-400   py-2'  >
                    <a onClick={} className='mx-4 flex space-x-2'>
                        <Image className='aspect-square rounded-full' width={25} height={5} src={'/img/pp_comp.webp'}/>
                        <p>{item.name}</p>
                        </a>
                </li>
                ))}
            </ul>
            
        </div>}
    </div>
  )
}

export default FriendsPortal