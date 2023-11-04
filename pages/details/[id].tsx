import { FooterWithLogo } from '@/components/FooterWithLogo'
import Navbar from '@/components/Navbar'
import { Avatar, Button, Chip, Tooltip } from '@material-tailwind/react'
import Link from 'next/link'
import React, { useEffect, useState} from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import {TbHeartHandshake} from 'react-icons/tb' 
import NextNProgress from 'nextjs-progressbar'

 
export const getServerSideProps = async(req,res,ctx) => {
  
  const options = {
    method: 'GET',
    headers: {
      'x-api-key': `${process.env.API_ROUTE_SECRET}`
    }
  };

  const {id} = req.query
  const gamedata = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/getMaps?world=${id}`, options)
  const gamedatares = await gamedata.json()
  const gameownerId = gamedatares.ownerId
  const ownerData = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/user?id=${gameownerId}`, options)
  const ownerDataRes = await ownerData.json()

return{
  
  props:{gamedatares, ownerDataRes}
  
  
};
}
const Details = ({gamedatares, ownerDataRes}) => {

  const [windowDimension, setWindowDimension] = useState(null);
  const gameCreated = gamedatares.created as unknown as string
  const gameTags = gamedatares.tags as unknown as Array<string>
  const [userImage] = useState(ownerDataRes?.image)

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }
  
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  const isMobile = windowDimension <= 1140;
  const isSmall = windowDimension <= 960;


  return (
    
    <>
    <Navbar/>
    <NextNProgress color='773fff'/>
    
       <div className=' relative h-96 md:h-[35rem] md:bottom-32 w-full bg-no-repeat bg-cover bg-center' style={{backgroundImage: `url(${gamedatares.img || "/img/mapcomp.webp"})`}}>
            <div className={`${isSmall ? "hidden": null} absolute py-5 px-5  flex justify-between space-x-2 bg-paffbg rounded-t-3xl md:rounded-[35px] w-full h-20 md:h-32 md:w-[85%] shadow-2xl shadow-[#030303c5] -bottom-1 md:bottom-12 left-1/2 -translate-x-1/2 `}>
              <div className='flex space-x-6'>
                <h2 className='flex space-x-3 font-bold text-5xl self-center ml-5'><span>{gamedatares.title}</span><Tooltip content="Coming Soon"><TbHeartHandshake className='h-8 w-8 self-center bg-clip-text stroke-[#9C4FFF] !bg-gradient-to-br !from-[#3B29FF] !to-[#9C4FFF] '/></Tooltip></h2>
             
            </div>
            <div className='flex space-x-5 self-center items-center'>
              <div className='flex space-x-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='scale-[1]' fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6699 13.13C18.0399 14.06 18.9999 15.32 18.9999 17V20H22.9999V17C22.9999 14.82 19.4299 13.53 16.6699 13.13Z" fill="white"/>
              <path d="M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C14.53 4 14.09 4.1 13.67 4.24C14.5305 5.30422 15 6.6314 15 8C15 9.3686 14.5305 10.6958 13.67 11.76C14.09 11.9 14.53 12 15 12ZM9 13C6.33 13 1 14.34 1 17V20H17V17C17 14.34 11.67 13 9 13Z" fill="white"/>
            </svg>
            <p className='text-xl uppercase font-light'>256m</p>
              </div>
              <div className='flex space-x-1'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='scale-[1]' fill="none">
              <path d="M7.5 4C4.4625 4 2 6.4625 2 9.5C2 15 8.5 20 12 21.163C15.5 20 22 15 22 9.5C22 6.4625 19.5375 4 16.5 4C14.64 4 12.995 4.9235 12 6.337C11.4928 5.6146 10.8191 5.02505 10.0358 4.61824C9.25245 4.21144 8.38265 3.99938 7.5 4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p className='text-xl uppercase font-light'>25m</p>
              </div>
           
            
            <Link href={`/game/${gamedatares.id}`}><Button  className="flex gap-3 justify-center !mx-5 w-56 !bg-gradient-to-br !from-[#3B29FF] !to-[#9C4FFF] text-center rounded-full h-min text-2xl whitespace-nowrap normal-case font-light !z-50">Join Space</Button></Link>
            </div>
            </div>
       </div>

       <div className='relative h-min w-[95%] mx-auto rounded-3xl shadow-2xl pb-5 flex justify-between lg:hidden z-50 bottom-32 bg-paffbg'>
          <div className='flex flex-col '>
          
          <h2 className="flex space-x-2 text-start text-3xl font-bold px-5 pt-5 pb-2 whitespace-nowrap"><span>{gamedatares.title}</span><Tooltip content="Coming Soon"><TbHeartHandshake className='mt-1 h-6 w-6 self-center'/></Tooltip> </h2>

                <div className='flex flex-row ml-4 space-x-5  scale-95'>
                  <div className='flex space-x-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='scale-[1]' fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6699 13.13C18.0399 14.06 18.9999 15.32 18.9999 17V20H22.9999V17C22.9999 14.82 19.4299 13.53 16.6699 13.13Z" fill="white"/>
                        <path d="M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C14.53 4 14.09 4.1 13.67 4.24C14.5305 5.30422 15 6.6314 15 8C15 9.3686 14.5305 10.6958 13.67 11.76C14.09 11.9 14.53 12 15 12ZM9 13C6.33 13 1 14.34 1 17V20H17V17C17 14.34 11.67 13 9 13Z" fill="white"/>
                      </svg>
                      <p className='text-xl uppercase font-light'>256m</p>
                  </div>

                  <div className='flex space-x-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='scale-[1]' fill="none">
                      <path d="M7.5 4C4.4625 4 2 6.4625 2 9.5C2 15 8.5 20 12 21.163C15.5 20 22 15 22 9.5C22 6.4625 19.5375 4 16.5 4C14.64 4 12.995 4.9235 12 6.337C11.4928 5.6146 10.8191 5.02505 10.0358 4.61824C9.25245 4.21144 8.38265 3.99938 7.5 4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p className='text-xl uppercase font-light'>25m</p>
                  </div>
                  
                </div>
         
          </div>
          <Link href={`/game/${gamedatares.id}`}><Button color="purple" className=" !space-x-3 mr-8 mt-7 !bg-gradient-to-r !from-[#3B29FF] !to-[#9C4FFF] hover:scale-110 py-3 px-3 w-min text-center whitespace-nowrap rounded-full h-14 text-lg font-light float-right"> <FaPlayCircle className="h-full w-auto"/></Button></Link>
       </div>
       <div className={`h-min flex flex-col space-y-4 p-6 !-mt-28 md:mt-0 md:w-[85%] md:mx-auto`}>
            <div className={`flex flex-col md:grid md:grid-cols-2 space-y-10 md:space-y-0 md:space-x-7`}>
              <div className=' space-y-3'>
                <h2 className='text-4xl md:text-5xl font-extrabold'>Description</h2>
                  <p className='text-md md:text-2xl font-light'>{gamedatares.desc}</p>

              </div>
              <div className={`h-min flex flex-col space-x-0`}>
                <div className='flex flex-row border-b-2 space-x-3 border-white p-3 m-0'>
                  <h4 className='self-center'>Created by</h4>
                  <Avatar
                  variant="circular"
                  size="md"
                  alt="UserLogo"
                  className={`cursor-pointer place-self-center`}
                  src={userImage ? userImage : '/img/pp_comp.webp'}
                  />
                  <p className='self-center'>{ownerDataRes.name}</p>
                </div>
                <div className='flex flex-row justify-between border-b-2 border-white p-3 m-0'>
                  <h4 >Server Size</h4>
                  <p>{gamedatares.userLimit}</p>
                </div>
                <div className='flex flex-row justify-between border-b-2 border-white p-3 m-0'>
                  <h4>Created At</h4>
                  <p>{gameCreated.slice(0,10).replace("-","/").replace("-","/")}</p>
                </div>
                <div className={`flex flex-row flex-wrap mt-6 gap-3`}>
                  {gameTags.map((tags, i) => <Chip key={i} value={tags} className='rounded-full'  color='purple'/> )}
                </div>
            </div>
          </div>
          
       </div>
    
    <FooterWithLogo/>
    </>
  )
}

export default Details