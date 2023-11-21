import { Card, CardBody, CardFooter, CardHeader } from '@material-tailwind/react'
import { motion as m } from 'framer-motion'
import React, { useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { useRouter } from 'next/router';

const GameCardNew = ({ setSelected, item, itemId }) => {
    const [isOpen,setOpen] = useState(false)
    const router = useRouter();

    const handleDivClick = (url:string) => {
        // Redirect to Page A
        router.push(`/details/${url}`)
      };
    
      const handleButtonClick = (event) => {
        // Prevent the button click event from propagating to the div
        event.stopPropagation();
        // Redirect to Page B
        router.push(`${process.env.NEXT_PUBLIC_WEBSITE_URL}game/${item.id}`);
      };
    

  return (
    <m.div layout  onMouseEnter={() => setOpen(curr => !curr)} onClick={() => handleDivClick(`${itemId}`)} onMouseLeave={() => setOpen(curr => !curr)} data-isopen={isOpen} className='relative top-0 aspect-card h-[400px] duration-500 data-[isopen=true]:h-[500px] w-auto bg-blue-gray-300 bg-[url("/img/biggamebgcomp.webp")] bg-center rounded-xl'>
        <main data-isopen={isOpen} className='w-full h-full !rounded-xl backdrop-brightness-75 data-[isopen=true]:backdrop-blur-sm data-[isopen=true]:backdrop-brightness-[.25] '>
        <m.div layout data-isopen={isOpen} className='absolute bottom-[5%] data-[isopen=true]:bottom-[75%] left-8 space-y-0'>
        <m.p layout="position" data-isopen={isOpen} className='relative flex space-x-[0.5px]  h-min transition-all delay-500 rounded-xl bg-gray-900 p-2 w-min whitespace-nowrap'><BiUser className='h-4 w-4 mt-[4px] mr-1'/><span className=''>200</span></m.p>
        <m.p layout="position" data-isopen={isOpen} className='transition-all transform-none duration-500 font-extrabold data-[isopen=true]:text-3xl text-5xl'>Farmyard</m.p>
        <p data-isopen={isOpen} className='opacity-0 data-[isopen=true]:opacity-100 transition-opacity delay-500 '>Community Space</p>
        </m.div>
        <div data-isopen={isOpen} className='absolute bottom-[5%] mx-[8%] font-300 space-y-5  opacity-0 data-[isopen=true]:opacity-100 transition-opacity duration-200 delay-300'>
            <m.p 
            layout
             data-isopen={isOpen}
              className='data-[isopen=false]:hidden mr-16 relative -left-[300px] data-[isopen=true]:left-0 transition-[left] transform-gpu duration-200'
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, qui! Incidunt culpa necessitatibus optio soluta? Commodi quasi nam unde suscipit hic numquam delectus dolor sed, nesciunt at odio quis tenetur.</m.p>
            <div data-isopen={isOpen} className=' justify-between flex data-[isopen=false]:hidden '>
                <div>
                    test
                </div>
                <button
                onClick={handleButtonClick}
                className='aspect-[86/25] h-8 w-auto rounded-full bg-paff-gradient-card'
                >
                    Join
                </button>
            </div>
            
        </div>
        </main>
    </m.div>
  )
}

export default GameCardNew