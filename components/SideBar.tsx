import React , { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button,MenuHandler,MenuList,MenuItem,Avatar, IconButton, Tooltip } from '@material-tailwind/react'
import Link from 'next/link'
import axios from 'axios'
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import {
  CloudArrowUpIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  BookmarkIcon, Bars3Icon, XMarkIcon, PencilSquareIcon,
  UserCircleIcon,Cog6ToothIcon,PowerIcon,InboxArrowDownIcon,LifebuoyIcon,CheckBadgeIcon
} from "@heroicons/react/24/outline";
import {animate, motion} from 'framer-motion'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

const SideBar = (req,res) => {

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  
  const goToCheckout = async () => {
    setIsCheckoutLoading(true);
    const res = await fetch(`/api/stripe/create-checkout-session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { redirectUrl } = await res.json();
    if (redirectUrl) {
      window.location.assign(redirectUrl);
    } else {
      setIsCheckoutLoading(false);
      console.log("Error creating checkout session");
    }
  };

  const getPreStatus = async() =>{const session = await getSession({req});console.log(session); return session.user.name}
  const {data: session} = useSession()
  const userName = session?.user?.name;
  const userImage = session?.user?.image;
  const userEmail = session?.user?.email;
  const isActive = session?.user.isActive;
  const [x,setX] = useState(0);
  const [checked, setChecked] = useState(false);

    const soundChange = () => {
      setX(0.75);
  };
  const handleChange = () => {
  setChecked((prev) => !prev);
  };

  const [sideOpen, setSideOpen] = useState(false)
  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    
  });
  

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

  const closeVariants = isMobile ? (isSmall
    ? {
        animate: {
          x: -240,
        },
      }
    : {
        animate: {
          x: -320,
        },
      }) : ({animate:{x:0}})
   ;
   const openVariants = {
    animate: {
      x:0
    }
   }

  
  return (
    <>
    
    <motion.div 
    variants= {sideOpen ? (openVariants):(closeVariants)}
    animate={"animate"}  
    transition={{ damping:0}}
    >
    <div className="fixed z-50 w-60 lg:w-80 xl:bottom-0 left-0 xl:left-20 rounded-t-xl max-w-md backdrop-blur-lg flex flex-col items-center bg-paffbg h-screen xl:h-[80vh]">
        
        <div className='flex'>
        <Avatar
                variant="circular"
                size='xxl'
                alt="UserLogo"
                className={`cursor-pointer mt-5`}
                src={userImage || '/img/pp_comp.webp'}
              />

        </div>
        <div className='mt-5 text-center'><p className='flex flex-row gap-1 text-center justify-center place-items-center'>{userName} {isActive ? (<Tooltip content="Premium"><CheckBadgeIcon className={`relative w-6 h-6 ${isActive ? (''): ('hidden')}`}></CheckBadgeIcon></Tooltip>) : ('')}</p><p className='text-sm flex flex-row gap-2 text-[#666666]'>{userEmail}</p></div>
        <div className='w-[80%] flex flex-col gap-4 mt-20'>
       <Link href={''}><Tooltip content="Coming Soon"><Button variant='outlined' size='sm' color='purple' className='border-transparent hover:border-purple-500 rounded-xl group-hover:shadow-lg hover:shadow-md ' fullWidth >My Avatar</Button></Tooltip></Link>
       <Link href={'#myspaces'}> <Button variant='outlined' size='sm' color='purple' className='border-transparent hover:border-purple-500 rounded-xl group-hover:shadow-lg hover:shadow-md' fullWidth >My Spaces</Button></Link>
        <Link href={'#analytics'}><Button variant='outlined' size='sm' color='purple' className='border-transparent hover:border-purple-500  rounded-xl group-hover:shadow-lg hover:shadow-md' fullWidth >Analytics</Button></Link>
       <Link href={'#adverts'}> <Button variant='outlined' size='sm' color='purple' className='border-transparent hover:border-purple-500 rounded-xl group-hover:shadow-lg hover:shadow-md' fullWidth >Advertisement Panel</Button></Link>
       <Link href={'#accsettings'}> <Button variant='outlined' size='sm' color='purple' className='border-transparent hover:border-purple-500 rounded-xl group-hover:shadow-lg hover:shadow-md' fullWidth >Account Settings</Button></Link>

        </div>
        {isActive ? (''):(<div className='absolute rounded-2xl bottom-[15%] w-[70%] bg-gradient-to-t h-14 from-purple-700 to-purple-300 text-center' onClick={() => {if (isCheckoutLoading) return;else goToCheckout();}}>
            <span className=' absolute text-xl font-semibold top-1/2 -translate-y-1/2 -translate-x-1/2'>Upgrade</span>
        </div>)}
        
        {isMobile ? (<div className='absolute -right-10 top-1/4 z-50'>
          <IconButton onClick={() => setSideOpen(current => !current)} variant='gradient' color={'gray'}><Bars3Icon className='h-6 w-6' strokeWidth={2}/></IconButton>
        </div>) : ('')}
        
    </div>
    </motion.div>
    </>
  )
}

export default SideBar