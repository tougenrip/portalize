import React, { useState } from "react";
import Image from 'next/image';
import Button from "../components/button"
import PricingCard from "../components/pricingcard"
import GameCard from "../components/gamecard"
import Navbar  from "../components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Head from "next/head";



export default function Home() {

  
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  

  const { data: session, status } = useSession();
  const isLogged = status == 'authenticated';

  return (
    <>
    <Head>
    
        <title>Portalize - Next thing</title>
     
    </Head>
     <Navbar/>
      <main className="w-[100vw] font-body">
        <div className="hero-section">
          <div className="relative w-[100vw] h-[100vh] bg-Hero bg-cover bg-no-repeat">
            <p className="absolute bottom-[35%] w-[85%] left-1/2 md:translate-x-0 -translate-x-1/2 md:left-24 text-5xl xl:text-6xl font-light text-center md:text-start text-white">Create your 3D Space<br /><span className="font-bold text-2xl xl:text-2xl">With No-Code System</span><br /><span className="text-lg xl:text-3xl">Create 3D spaces without code knowledge and share your own domain. <br /> Explore Many Experiance and Communitys</span></p>
            <span className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-24 bottom-[14%] md:bottom-[14%]">{isLogged ? (<Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}editor`}><Button>LAUNCH EDITOR</Button></Link>) : (<Link href={'/auth'}><Button>JOIN NOW</Button></Link>)}</span>
          </div>
        </div>
        <div className="cta-section">
          
          <div className="relative w-[100vw] h-[700px] text-center">
            <div className="absolute w-full place-content-center gap-5 -z-10 opacity-30 flex top-1/2 -translate-y-[35%] left-1/2 -translate-x-1/2 overflow-hidden">
             
            </div>
            <p className="absolute bottom-[50%] translate-y-1/2  md:left-1/2 md:-translate-x-1/2 text-5xl font-light">Get Start Creating Your New Space</p>
            <ul className="absolute w-full md:flex grid grid-rows-4 justify-center bottom-[10%] md:bottom-[28%]  md:left-1/2 md:-translate-x-1/2 font-bold gap-2 md:gap-6 text-3xl md:text-4xl uppercase place-items-center">
              <li>Domain Based</li>
              <li>Blockchain</li>
              <li>No-Code</li>
              <li>1000+ Assets</li>
            </ul>
          </div>
        </div>
        <div className="room-section">
          <div className="relative w-[100vw] h-[100vh] md:h-[80vh] md:grid md:grid-cols-2">
            <div className="block md:relative"> 
              <p className="absolute align-middle top-1/2 -translate-y-1/2  md:left-24 z-10 text-2xl font-light sm:text-5xl md:text-8xl text-center md:text-start w-full"><span className="font-bold">Referance</span> Hall</p>
            </div>
            <div className="block md:relative">
              <Image src={"/img/landing-page/room-bg1_comp.webp"} className="absolute top-[20%] md:top-[50%] md:-translate-y-1/2 z-0 right-0" alt="roombg1" width={1164} height={615} quality={80}></Image>
            </div>
          </div>
        </div>
        
        <div className="room-section">
          <div className="relative w-[100vw] h-[100vh] md:h-[80vh] md:grid md:grid-cols-2">
          <div className="block md:relative">
              <Image src={"/img/landing-page/room-bg2_comp.webp"} className="absolute top-[20%] md:top-[50%] md:-translate-y-1/2 z-0" alt="roombg1" width={1164} height={615} quality={80}></Image>
            </div>
            <div className="block md:relative"> 
              <p className="absolute w-full text-center md:text-end align-middle top-1/2 -translate-y-1/2 right-24  z-10 text-2xl font-light sm:text-5xl md:text-8xl"><span className="font-bold">Referance</span> Hall</p>
            </div>
            
          </div>

          
        </div>

        <div className="room-section">
          <div className="relative w-[100vw] h-[100vh] md:h-[80vh] md:grid md:grid-cols-2">
            <div className="block md:relative"> 
              <p className="absolute align-middle top-1/2 -translate-y-1/2  md:left-24 z-10 text-2xl font-light sm:text-5xl md:text-8xl text-center md:text-start w-full"><span className="font-bold">Referance</span> Hall</p>
            </div>
            <div className="block md:relative">
              <Image src={"/img/landing-page/room-bg1_comp.webp"} className="absolute top-[20%] md:top-[50%] md:-translate-y-1/2 z-0 right-0" alt="roombg1" width={1164} height={615} quality={80}></Image>
            </div>
          </div>
        </div>

        <div className="pricing-section">
          <div className="relative w-[100vw] h-[2400px] md:h-[100vh]">
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 md:-translate-x-0 md:left-20 text-7xl font-light"><p>Join <span className="font-bold">Today</span></p></div>
            <div className="absolute grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-3 bottom-0 top-[15%] md:top-[50%] md:-translate-y-1/2 left-1/2 -translate-x-1/2 scale-90 w-[100vw] justify-center place-items-center">
                <PricingCard/>
                <PricingCard/>
                <PricingCard/>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <div className="relative w-[100vw] h-[100vh]">
            <Image src={"/img/landing-page/cta-bg_comp.webp"} width={671} height={702} alt="ctabg" className="absolute top-1/2 -translate-y-[40%] left-1/2 -translate-x-1/2"/>
            <div className="absolute top-1/2 -translate-y-1/2 text-center font-extrabold text-4xl md:text-8xl w-full">
              <p className="">JOIN COMMUNITY<br />BUILD TOGETHER</p>
            </div>
          </div>
        </div>
        
      </main>
    </>
  )
}