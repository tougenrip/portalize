import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Svg } from "@react-three/drei";
import { Button, IconButton, MobileNav,MenuHandler,MenuList,MenuItem,Menu, Tooltip,Typography,Avatar  } from "@material-tailwind/react";
import {
  CloudArrowUpIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  BookmarkIcon, Bars3Icon, XMarkIcon, PencilSquareIcon,
  UserCircleIcon,Cog6ToothIcon,PowerIcon,InboxArrowDownIcon,LifebuoyIcon
} from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import ButtonWSignUp from './buttonwSignin'
const ProfileMenu = () => {
}


 const Navbar = () => {

  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const userImage = session?.user?.image;
  const userName = session?.user?.name;


  const [navOpen, setNavOpen] = useState(false)
  const [windowDimension, setWindowDimension] = useState(null);
  const [stickyClass, setStickyClass] = useState('relative');
  const [mobileSticky, setMobileSticky] = useState('relative');

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 500 ? setStickyClass('fixed bg-[#151515] top-0 w-screen left-0 z-50 gap-20 justify-between') : setStickyClass('relative !z-50');
      stickyClass ? setMobileSticky('fixed top-20 left-0 z-50 gap-20') : setMobileSticky('')
    }
  };

  

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
  

  const isMobile = windowDimension <= 768;
  const isLogged = status == 'authenticated';

  return (
    <>
    <div className=" w-screen !z-50">
    <div className={` ${stickyClass} bg-base-100 flex flex-row-reverse  justify-end md:flex-row pt-8 pb-4 px-4 gap-0 md:gap-10 md:w-screen md:justify-between md:px-20`}>
      <div className=" self-center">
        <a className="btn btn-ghost normal-case"><Image src='/img/logo_comp.webp' className=" scale-75 md:scale-100" width={218} height={38} alt="Logo"></Image></a>
      </div>

      {isMobile ? (<div>
         
        <Button color="purple" onClick={() => setNavOpen(current => !current)} ripple={false} variant="outlined" className="border-none flex items-center gap-0 p-3">
        {navOpen ? (<XMarkIcon color="purple" strokeWidth={2} className="h-5 w-5" />) : (<Bars3Icon color="purple" strokeWidth={2} className="h-5 w-5" />)}
      </Button>
      
      </div>) : (<div className="flex-row">
        <ul className="menu menu-horizontal  text-sm px-1 flex-row inline-flex gap-6">
          <li className="self-center hover:text-purple-600">
            <Link href="/">Home</Link>
          </li>
          <li className="self-center hover:text-purple-600">
            <Link href="/serverbrowser">Portals</Link>
          </li>
          <li className="self-center hover:text-purple-600">
            <Link href="https://portalize.gitbook.io/portalize/introduction/welcome-to-portalize">Docs</Link>
          </li>
          <li className="self-center opacity-10">
          <Tooltip content="Coming Soon">
            <Link href="">Community</Link>
          </Tooltip>
          </li>
          <li>
          <Menu>
            <MenuHandler>
              <Avatar
                variant="circular"
                alt="candice wu"
                className="cursor-pointer max-w-[80px]"
                src={userImage || '/img/pp_comp.webp'}
              />
            </MenuHandler>
            <MenuList>
              {isLogged ? (<><MenuItem className="flex items-center gap-2">
                <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
                <Typography  variant="small" className="font-normal">
                  <Link href={'/user/dashboard'}>My Profile</Link>
                </Typography>
              </MenuItem>
              <MenuItem className="flex items-center gap-2">
                <Cog6ToothIcon strokeWidth={2} className="h-4 w-4" />
                <Typography variant="small" className="font-normal">
                  <Link href={'/user/dashboard#accsettings'}> Edit Profile</Link>
                </Typography>
              </MenuItem>
              <MenuItem className="flex items-center gap-2">
                <LifebuoyIcon strokeWidth={2} className="h-4 w-4" />
                <Typography variant="small" className="font-normal">
                  <Link href={"https://portalize.gitbook.io/portalize/introduction/welcome-to-portalize"}>Help</Link>
                </Typography>
              </MenuItem>
              <hr className="my-2 border-blue-gray-50" />
              <MenuItem className="flex items-center gap-2 ">
                <PowerIcon strokeWidth={2} className="h-4 w-4" />
                <Typography variant="small" className="font-normal">
                  <Link onClick={() => signOut()} href={'/api/auth/signout'}> Sign Out</Link>
                </Typography>
              </MenuItem></>) : (<><MenuItem className="flex items-center gap-2">
                <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
                <Typography  variant="small" className="font-normal">
                  <Link onClick={() => signIn()} href={''}>Sign In</Link>
                </Typography>
              </MenuItem>
              <hr className="my-2 border-blue-gray-50" />
              <MenuItem className="flex items-center gap-2">
                <LifebuoyIcon strokeWidth={2} className="h-4 w-4" />
                <Typography variant="small" className="font-normal">
                  <Link href={"https://portalize.gitbook.io/portalize/introduction/welcome-to-portalize"}>Help</Link>
                </Typography>
              </MenuItem></>)}
              {/* <MenuItem className="flex items-center gap-2">
                <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
                <Typography  variant="small" className="font-normal">
                  <Link href={'/user/dashboard'}>My Profile</Link>
                </Typography>
              </MenuItem>
              <MenuItem className="flex items-center gap-2">
                <Cog6ToothIcon strokeWidth={2} className="h-4 w-4" />
                <Typography variant="small" className="font-normal">
                  <Link href={'/user/dashboard#accsettings'}> Edit Profile</Link>
                </Typography>
              </MenuItem>
              <MenuItem className="flex items-center gap-2">
                <LifebuoyIcon strokeWidth={2} className="h-4 w-4" />
                <Typography variant="small" className="font-normal">
                  <Link href={"https://portalize.gitbook.io/portalize/introduction/welcome-to-portalize"}>Help</Link>
                </Typography>
              </MenuItem>
              <hr className="my-2 border-blue-gray-50" />
              <MenuItem className="flex items-center gap-2 ">
                <PowerIcon strokeWidth={2} className="h-4 w-4" />
                <Typography variant="small" className="font-normal">
                  <Link onClick={() => signOut()} href={''}> Sign Out</Link>
                </Typography>
              </MenuItem> */}
            </MenuList>
          </Menu>
          </li>
        </ul>
        
      </div>)}
      
    </div>
    
        {isMobile ?(
          <>
        <MobileNav open={navOpen} className={`inline-block ${mobileSticky} z-50`}>
          <ul className="text-sm mt-5 mx-4 grid gap-6 align-middle text-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/serverbrowser">Portals</Link>
            </li>
            <li>
              <Link href="https://portalize.gitbook.io/portalize/introduction/welcome-to-portalize">Docs</Link>
            </li>
            <li>
            <Tooltip content="Coming Soon">
              <Link href="" className="op">Community</Link>
            </Tooltip>
            </li>
            <li>
              <Button variant="gradient" color="purple" className="inline-flex px-20"><a href="/about" >Register for Free</a></Button>
            </li>
          </ul>
          
        </MobileNav>
        
        </>
        ):("")}
        </div>
    </>
  );
};

export default Navbar