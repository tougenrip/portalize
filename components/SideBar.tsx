import React , { useState, useEffect } from 'react'
import {  IconButton, Tooltip, Button, Avatar as AvatarM } from '@material-tailwind/react'
import Link from 'next/link'
import { useSession, getSession } from "next-auth/react";
import {
  Bars3Icon,
  CheckBadgeIcon,
  CodeBracketSquareIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";
import { motion} from 'framer-motion'
import { Avatar} from '@readyplayerme/visage'
import CustomerPortalButton from './CustomerPortalButton';


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
  const isActive = session?.user?.isActive;
  const subscriptionType = session?.user?.subscriptionName;
  const isDev= session?.user?.isDev;
  const rpmId= session?.user?.rpmId;
  const avatarUrl= session?.user?.avatarUrl;
  const [x,setX] = useState(0);
  const [checked, setChecked] = useState(false);


  function isBusiness(){
    if (subscriptionType === "prod_Ob1zYnZSq0R3dK"){
      return true
    } else {
      return false
    }
  }

  console.log(isBusiness())


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

{/* <div className="fixed w-60 lg:w-80 xl:w-[400px] xl:bottom-0 left-0 xl:left-20 xl:top-44 rounded-t-xl max-w-md backdrop-blur-lg flex flex-col items-center bg-[#202020] gap-3 h-[840px] px-10 py-12 rounded-[33px]">  
  <div className='flex justify-center'>
        <Avatar
                variant="circular"
                size='xxl'
                alt="UserLogo"
                className={`cursor-pointer mt-5`}
                src={userImage || '/img/pp_comp.webp'}
              />
        

        </div>
        <div className='mt-5 text-center'>
          <p className='flex flex-row gap-1 text-center justify-center place-items-center'>
            {userName} {isActive ? (<Tooltip content="Premium">
              <CheckBadgeIcon className={`relative w-6 h-6 ${isActive ? (''): ('hidden')}`}>
                </CheckBadgeIcon></Tooltip>) : ('')}</p>
                <p className='text-sm flex flex-row gap-2 text-[#666666]'>{userEmail}</p>
        </div>
        <div className='flex flex-col w-full gap-4 mt-20 '>
  <Link href={''}><Tooltip content="Coming Soon"> 
  <div className="bg-[#282828] flex flex-col ml-1 shrink-0 items-end py-2 rounded-lg border border-transparent hover:border-3 hover:border-solid hover:border-[#7F44FF] hover:bg-[#282828] focus:border-3 focus:border-solid focus:border-[#7F44FF] focus:bg-[#202020]">
    <div className="font-['Gilroy'] font-light text-white self-center">Avatar</div>
  </div>
</Tooltip></Link>
<Link href={'#myspaces'}>
   <button className="bg-[#282828] flex flex-col shrink-0 items-end w-full py-2 rounded-lg border border-transparent hover:border-3 hover:border-solid hover:border-[#7F44FF] hover:bg-[#282828] focus:border-3 focus:border-solid focus:border-[#7F44FF] focus:bg-[#202020]">
    <div className="font-['Gilroy'] font-light text-white self-center">
      My Spaces
    </div>
  </button>
</Link> 
<Link href={'#analytics'}>
  <button className=" bg-[#282828] flex flex-col shrink-0 w-full items-center py-2 h-auto rounded-lg border border-transparent hover:border-3 hover:border-solid hover:border-[#7F44FF] hover:bg-[#282828] focus:border-3 focus:border-solid focus:border-[#7F44FF] focus:bg-[#202020]">
    <div className="font-['Gilroy'] font-light text-white ">
      Analitycs
    </div>
  </button>
</Link> 
<Link href={'#adverts'}>
  <button className="bg-[#282828] flex flex-col shrink-0 items-end w-full py-2 rounded-lg border border-transparent hover:border-3 hover:border-solid hover:border-[#7F44FF] hover:bg-[#282828] focus:border-3 focus:border-solid focus:border-[#7F44FF] focus:bg-[#202020]">
    <div className="font-['Gilroy'] font-light text-white self-center">
      Advertisement Panel
    </div>
  </button>
</Link> <Link href={'#accsettings'}>
  <button className="bg-[#282828] flex flex-col shrink-0 items-end w-full py-2 rounded-lg border border-transparent hover:border-3 hover:border-solid hover:border-[#7F44FF] hover:bg-[#282828] focus:border-3 focus:border-solid focus:border-[#7F44FF] focus:bg-[#202020]">
    <div className="font-['Gilroy'] font-light text-white self-center">
      Account Settings
    </div>
  </button>
</Link> 
        </div>
  
  
  {isActive ? (''):(<button className='bg-[linear-gradient(180deg,_#9a4eff_0%,#3b2aff_100%)] bg-cover bg-50%_50% bg-blend-normal flex flex-col justify-center h-16 shrink-0 items-center mx-px w-full rounded-lg my-20' onClick={() => {if (isCheckoutLoading) return;else goToCheckout();}}>
  <div className="text-2xl font-['Gilroy'] font-bold text-white self-center">
      Upgrade
    </div>
        </button>)}
        
        {isMobile ? (<div className='absolute -right-10 top-1/4 z-50'>
          <IconButton onClick={() => setSideOpen(current => !current)} variant='gradient' color={'gray'}><Bars3Icon className='h-6 w-6' strokeWidth={2}/></IconButton>
        </div>) : ('')}
</div>  */}

   <div className="fixed z-50 w-60 lg:w-80 xl:bottom-0 left-0 xl:left-20 rounded-t-3xl max-w-md backdrop-blur-lg flex flex-col items-center bg-paffbg h-screen xl:h-[80vh]">
        
        <div className='flex'>
         <Avatar modelSrc={avatarUrl} className='!rounded-full self-end !w-12 !h-12' />
        
        <AvatarM
                variant="circular"
                size="xxl"
                alt="UserLogo"
                className={`cursor-pointer mt-5 h-24 w-24 place-self-center`}
                src={userImage || '/img/pp_comp.webp'}
              />

        
        </div>
        <div className='mt-5 text-center'><p className='flex flex-row gap-1 text-center justify-center place-items-center'>{userName} {isBusiness() ? (<Tooltip content="Business Partner"><ShieldCheckIcon className={`relative w-6 h-6 ${isBusiness() ? (''): ('hidden')}`}></ShieldCheckIcon></Tooltip>) : null} {isDev ? (<Tooltip content="Portalize Developer"><CodeBracketSquareIcon className={`relative w-6 h-6 ${isDev ? (''): ('hidden')}`}></CodeBracketSquareIcon></Tooltip>):('')} {isActive ? (<Tooltip content="Premium"><CheckBadgeIcon className={`relative w-6 h-6 ${isBusiness() ? ('hidden'): ('')} ${isActive ? (''): ('hidden')}`}></CheckBadgeIcon></Tooltip>) : ('')}</p><p className='text-sm flex flex-row gap-2 place-content-center text-[#666666]'>{userEmail}</p></div>
        <div className='w-[80%] flex flex-col space-y-4 mt-20 '>
        <Avatar halfBody={false} poseSrc={"/male.glb"}  modelSrc={avatarUrl} className='!relative  self-center !w-auto !h-[300px]  aspect-[9/13]' />
       <Link href={''} scroll={true}><Button variant='outlined' size='sm' color='purple' className='border-transparent hover:border-purple-500 rounded-xl group-hover:shadow-lg hover:shadow-md tracking-wider' fullWidth >My Avatar</Button></Link>
       <Link href={'#myspaces'} scroll={true}> <Button variant='outlined' size='sm' color='purple' className='border-transparent hover:border-purple-500 rounded-xl group-hover:shadow-lg hover:shadow-md tracking-wider' fullWidth >My Spaces</Button></Link>
        <Link href={'#analytics'} scroll={true}><Button variant='outlined' size='sm' color='purple' className='border-transparent hover:border-purple-500  rounded-xl group-hover:shadow-lg hover:shadow-md tracking-wider' fullWidth >Analytics</Button></Link>
       <Link href={'#edvertsec'} scroll={true}> <Button variant='outlined' size='sm' color='purple' className='border-transparent hover:border-purple-500 rounded-xl group-hover:shadow-lg hover:shadow-md tracking-wider' fullWidth >Advertisement Panel</Button></Link>
       <Link href={'#accsettings'} scroll={true}> <Button variant='outlined' size='sm' color='purple' className='border-transparent hover:border-purple-500 rounded-xl group-hover:shadow-lg hover:shadow-md tracking-wider' fullWidth >Account Settings</Button></Link>
       <CustomerPortalButton/>

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