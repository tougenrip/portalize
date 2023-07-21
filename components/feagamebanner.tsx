import { Button } from '@material-tailwind/react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React, {useState} from 'react'
import useSWR from 'swr'

const FeaGameBanner = () => {
    const [selectedId, setSelectedId] = useState(null)
    const [isOpen, setOpen] = useState(false)


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
      const {data: games} = useFetch('api/user/getMaps')
    
      
        

  return (
    <div className='relative w-[100%] h-min flex flex-col text-3xl my-4'>
      <h1 className='relative top-0 left-14 text-6xl'>Public Spaces</h1>
        <div className='w-[95%] place-self-center'>
        {/* {games?.map(item => (
            <>
            <motion.div key={item._id} layout layoutId={item._id} className='flex flex-col gap-2 h-[400px] relative rounded-3xl bg-deep-orange-400 my-5 p-5' onClick={() => {setSelectedId(item._id); setOpen(current => !current)}}>
                
                <motion.h2 className='font-bold'>{item.title}</motion.h2>
                <motion.h5>{isOpen && item.desc.substring(0,100) }</motion.h5>
            </motion.div>
        </>
            ))} */}

          <motion.div layout  className='flex flex-col gap-2 h-[400px] relative rounded-3xl bg-[url(/img/res.png)] bg-no-repeat bg-center bg-cover my-5 p-5' >
                
                <motion.h2 className='font-bold'>Restaurant</motion.h2>
                <motion.p className='font-light text-xl'>Indulge in a culinary adventure at our restaurant, where every bite is a masterpiece. From farm-fresh ingredients to innovative flavors, our talented chefs craft unforgettable dishes that ignite your senses. Experience unparalleled hospitality and ambiance that make every visit a celebration.</motion.p>
                <Link href={`/pbspace/1`}><Button color='purple' variant='gradient' className='px-14 py-4 !absolute bottom-5 right-5'>Join</Button></Link>
            </motion.div>
            

            <motion.div layout  className='flex flex-col gap-2 h-[400px] relative rounded-3xl bg-[url(/img/lab.png)] bg-no-repeat bg-center bg-cover my-5 p-5' >
                
                <motion.h2 className='font-bold'>Labyrinth</motion.h2>
                <motion.p className='text-xl'>Embark on an exhilarating journey through our Labyrinth Shooter Game Park, where adrenaline and excitement await at every twist and turn. Unleash your inner hero as you navigate intricate mazes, dodging obstacles, and conquering challenging targets. Immerse yourself in a world of pulse-pounding action, dazzling visuals, and heart-pumping sound effects. Get ready for an unforgettable adventure at the Labyrinth Shooter Game Park, where thrill-seekers become legends.</motion.p>
                <Link href={`/pbspace/2`}><Button color='purple' variant='gradient' className='px-14 py-4 !absolute bottom-5 right-5'>Join</Button></Link>
            </motion.div>
        

            </div>
        
    </div>
  )
}

export default FeaGameBanner