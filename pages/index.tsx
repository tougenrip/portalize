import Navbar from '../components/Navbar'
import React , {Fragment, useState, useEffect} from 'react'
import GameSlider from '../components/gameslider';
import List from "../components/List";
import PortalNav from '../components/portalNav';
import Script from 'next/script';
import Head from 'next/head';
import { motion } from 'framer-motion'; 
import { FooterWithLogo } from '@/components/FooterWithLogo';
import NextNProgress from 'nextjs-progressbar'
import FeaturedGameSlider from '@/components/FeaturedGameSlider';


function Maintenance() {
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


  return(
    <>
      <Head>
      
          <title>Portalize - Next thing</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      
      </Head>
      <NextNProgress color='773fff'/>
      

      <main className="h-screen w-screen">
      <div className="hero-section">
        
        <div className="relative  scale-105 -z-40 w-[100vw] h-[100vh] bg-transparent bg-cover bg-no-repeat overflow-hidden ">
          <div className="absolute top-0 w-screen h-screen bg-black !overflow-hidden"></div>
        <video className="  md:w-full md:h-full opacity-20 scale-[400%]  sm:scale-[230%] md:scale-150" autoPlay muted loop >
          <source src="/img/landing-page/herobg.webm" type="video/webm"/>
        </video>
        <motion.div
        initial={{opacity:0}}
          whileInView={{y:20, opacity:1,}}
          transition={{ delay: 1 }} 
          className="absolute top-[40%] w-[85%] left-1/2 max-w-screen  md:!translate-x-0 !-translate-x-1/2 md:left-24 text-5xl xl:text-6xl  text-center md:text-start text-white">Coming soon
          
          </motion.div>
          
          
        </div>
          
        </div>
      </main>
    </>
  )
}


const PortalizeSB = ({data}) => {

  const [selected, setSelected] = useState(null);
  const [windowDimension, setWindowDimension] = useState(null);
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


  

  return (
    
    <Fragment>
      <Head>
        <title>Portalize | 3d Social Platform</title>
      </Head>
      <Navbar/>
      <div className="container">
        <Script src="https://www.googletagmanager.com/gtag/js?id=HXHGJ64EP8" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'HXHGJ64EP8');
          `}
        </Script>
      </div>
        <main className=''>
        <div>
            {/* <PortalNav/> */}
          </div>
            <div className='relative -top-24 '>
                <GameSlider repo={undefined}/> 
                {/* <FeaturedGameSlider/>*/}
            </div>
            <div className=' h-fit mr-0'>
              <h2 className='relative font-extrabold text-4xl w-max left-14 w-18 mb-7'>Featured Servers</h2>
              <div className="!scrollbar-none">
              <List  />
              </div>
            </div>
            <div className=' h-fit mr-0'>
              <h2 className='relative font-extrabold text-4xl w-max left-14 w-18 mb-7'>Recommended</h2>
              <div className="!scrollbar-none">
              <List  />
              </div>
              
            </div>
            <div className=' h-fit mr-0'>
              <h2 className='relative font-extrabold text-4xl w-max left-14 w-18 mb-7'>Popular</h2>
              <div className="!scrollbar-none">
              <List  />
              </div>
              
            </div>
            <div className=' h-fit mr-0'>
              <h2 className='relative font-extrabold text-4xl w-max left-14 w-18 mb-7'>Editor`s Choice</h2>
              <div className="!scrollbar-none">
              <List  />
              </div>
              


            </div>

            {/* <div>
            <FeaGameBanner/>
            </div> */}
            
        </main>
        <FooterWithLogo/>
    </Fragment>
  )
}

export default PortalizeSB;