"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button,MenuHandler,MenuList,MenuItem,Menu, Tooltip,Typography,Avatar, Collapse  } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon,
  UserCircleIcon,Cog6ToothIcon,PowerIcon,LifebuoyIcon
} from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import InstallPWA from "./InstallPWA";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";

 const Navbar = () => {

  const router = useRouter()
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const userImage = session?.user?.image;
  const userName = session?.user?.name;

  const [navOpen, setNavOpen] = useState(false)
  const [windowDimension, setWindowDimension] = useState(null);
  const [stickyClass, setStickyClass] = useState('relative');
  const [mobileSticky, setMobileSticky] = useState('relative');
  const [searchVisibility, setSearchVisibility] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);
    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 50 ? setSearchVisibility(true) : setSearchVisibility(false)
      windowHeight > 50 ? setStickyClass('fixed bg-[#101010] top-0 w-[100%] left-0 !z-50') : setStickyClass(' z-50');
      stickyClass ? setMobileSticky('fixed top-20 left-0 !z-50 gap-20') : setMobileSticky('!z-50');
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
  

  const isMobile = windowDimension <= 900;
  const isLogged = status === 'authenticated';

  return (
    <>
    <div id="header" className="w-screen !z-[999]">
    <div className={` ${stickyClass} ${stickyClass ? "!bg-gradient-to-b !from-black !to-transparent" : ""} flex flex-row-reverse z-50 md:flex-row py-5 px-4 space-x-0 md:!space-x-32 md:w-screen md:px-20`}>
      <div className=" self-center">
        <Link href={`/`}><Image src='/img/logo_comp.webp' className=" scale-75 md:scale-100" width={218} height={38} alt="Logo" unoptimized></Image></Link>
      </div>

      {isMobile ? (<div>
         
        <Button name="mobile-menu-button" aria-label="mobile-menu" color="purple" onClick={() => setNavOpen(current => !current)} ripple={false} variant="outlined" className="border-none flex items-center space-x-0 p-3">
        {navOpen ? (<XMarkIcon color="purple" strokeWidth={2} className="h-5 w-5" />) : (<Bars3Icon color="purple" strokeWidth={2} className="h-5 w-5" />)}
      </Button>
      
      </div>) : (<div className="flex flex-row justify-between w-full items-center space-x-5">
        <div className={searchVisibility ? "w-full" : "hidden"}>
        <SearchBar onSearch={function (searchText: string): void {
                throw new Error("Function not implemented.");
              } }/>
        </div>
       
        <ul className="menu menu-horizontal  text-sm px-1 flex-row !ml-auto pl-10 inline-flex space-x-6">
          <li className="self-center hover:text-purple-600 transform-gpu duration-200">
            <Link href="/">Home</Link>
          </li>
          <li className="self-center hover:text-purple-600 transform-gpu duration-200">
            <Link href="/about">Editor</Link>
          </li>
          
          <li className="self-center hover:text-purple-600 transform-gpu duration-200">
            <Link href="https://portalize.gitbook.io/portalize/introduction/welcome-to-portalize">Docs</Link>
          </li>
          <li className="self-center  hover:text-purple-600 transform-gpu duration-200">
         
            <Link href="/social">Community</Link>

          </li>
          <li className="self-center opacity-10">
              <InstallPWA className={`${isMobile ? null : "hidden"} link-button w-min p-3 !bg-gradient-to-br hover:scale-[1.03] !transform-gpu rounded-full tracking-wider from-[#3b29ff] to-[#9c4fff]`}/>
               
              </li>
        {isLogged ? (<li className="self-center ">
            <Link href="/editor"><Button  variant="gradient" color="purple" className="!bg-gradient-to-br whitespace-nowrap hover:scale-[1.03] hover:shadow-3xl !transform-gpu rounded-full tracking-wider from-[#3b29ff] to-[#9c4fff]">Launch Editor</Button></Link>
          </li>):('')}
          
          <li>
            {isLogged ? (
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
            <Link href={'/user/dashboard'}>
               <MenuItem className="flex items-center gap-2">
                <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
                <Typography  variant="small" className="font-normal">
                  My Profile
                </Typography>
              </MenuItem>
              </Link>
              <Link href={'/user/dashboard#accsettings'}>
              <MenuItem className="flex items-center gap-2">
                <Cog6ToothIcon strokeWidth={2} className="h-4 w-4" />
                <Typography variant="small" className="font-normal">
                   Edit Profile
                </Typography>
              </MenuItem>
              </Link>
              <Link href={"https://portalize.gitbook.io/portalize/introduction/welcome-to-portalize"}>
              <MenuItem className="flex items-center gap-2">
                <LifebuoyIcon strokeWidth={2} className="h-4 w-4" />
                <Typography variant="small" className="font-normal">
                  Help
                </Typography>
              </MenuItem>
              </Link>
              <hr className="my-2 border-blue-gray-50" />
              <MenuItem className="flex items-center gap-2 " onClick={() => signOut()}>
              
                <PowerIcon strokeWidth={2} className="h-4 w-4" />
                <Typography variant="small" className="font-normal">
                   Sign Out
                </Typography>
               
              </MenuItem>
              
            </MenuList>
          </Menu> 

            ) :(
            
              <Button variant="gradient" onClick={() => router.push(`/api/auth/signin`)} color="purple" className={`!bg-gradient-to-br  ${searchVisibility ? "relative top-[2px]" : ""}    whitespace-nowrap rounded-full  from-[#3b29ff] to-[#9c4fff]`}>Create Virtual Space</Button>
  
  
              )  }
            


            
          
          </li>



        </ul>
        
      </div>)}
      
    </div>
    
        {isMobile ?(
          <>
            <Collapse open={navOpen} className={`inline-block ${mobileSticky} z-50 bg-paffbg`}>
              <ul className="text-sm mt-5 mx-4 grid gap-6 align-middle text-center  pb-9">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">Editor</Link>
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
                  {isLogged ? (
                    <>
                    <div>
                    <Link href={`/user/dashboard`}>
                    <div className="grid grid-cols-4 grid-rows-2">
                      <Avatar
                      variant="circular"
                      alt="candice wu"
                      className="cursor-pointer max-w-[80px] col-span-1 row-span-2"
                      src={userImage || '/img/pp_comp.webp'}
                      />
                      <p className=" col-span-2 row-span-1">{userName}</p>
                      <p className="col-span-2 row-span-1 break-normal text-blue-gray-300">{userEmail}</p>
                      
                      
                    </div>
                    </Link>
                    </div>
                    <div>
                        <div onClick={() => signOut()}  className="flex place-content-center place-items-center mt-4 ">
                          <Typography variant="small" className="font-normal">
                            Sign Out
                          </Typography>
                        </div>
                        </div>
                        </>
                  ) :(<Link href={`/api/auth/signin`}><Button variant="gradient" color="purple" className="inline-flex px-20">Register for Free</Button></Link>)}
                </li>
              </ul>
              
            </Collapse>
          </>
        ):("")}
        </div>
    </>
  );
};

export default Navbar