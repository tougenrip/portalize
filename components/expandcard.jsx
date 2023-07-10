import items from './data';
import React, {useState} from 'react'
import { motion } from 'framer-motion'
import { IconButton } from '@material-tailwind/react';
import { BiSolidUser } from 'react-icons/bi'

const ExpandCard = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
     <main>
        <div className='h-[70vh] flex align-middle place-content-center items-center'>
        <motion.div
            className={`relative bg-[url(/img/biggamebg.png)] bg-cover bg-no-repeat rounded-xl w-[95%] h-[90%] text-center `}
            transition={{layout:{duration:1, type:'spring'}}}
            onClick={()=>setIsOpen(!isOpen)}
        >
            <motion.h2
                className='absolute bottom-5 left-5 md:text-4xl'
                initial={{opacity:0, x:-300,}}
                animate={{opacity:1,x:0,}}
                transition={{duration:.5,}}
            >
                TEST PURPOSE
            </motion.h2>

            <motion.div
                className='absolute bottom-5 right-9 w-24'
            >
                <IconButton className='px-14 '>Join </IconButton>
            </motion.div>
            <div
                className='absolute flex gap-1 top-10 scale-125 right-0 w-24'
            >
                <p className='relative -top-1.5 text-2xl'>22 </p> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
</svg>
            </div>
            {isOpen && 
            
            (
            <motion.div
                className=''
                layout
                initial={{opacity:0, y:-150,}}
                animate={{opacity:1, y:50,}}
            >   
            
            </motion.div>
            )}
            
        </motion.div>
        </div>
     </main>
    </>
  )
}

export default ExpandCard