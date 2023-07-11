import React, {useState, useEffect} from "react";
import Image from 'next/image';
import Navbar  from "../components/Navbar";
import Head from "next/head";
import side1 from "../assets/side1.png";
import side2 from "../assets/side2.png";
import marketplace from "../assets/marketplace.png";
import {TypeAnimation} from 'react-type-animation';
import { motion, useScroll } from "framer-motion";
import PricingCardFree from "../components/pricingcard-free"
import PricingCard from '../components/pricingcard'





export default function Home() {


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

  return (
    <>
    <Head>
    
        <title>Portalize - Next thing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
     
    </Head>
     
      <main className="w-[100vw] ">
      <div className='invisible md:visible absolute top-1/4 -left-14 h-96 w-96 md:scale-100 scale-50 -z-50 bg-purple-500 bg-opacity-60 blur-[170px]'></div>
      <div className='invisible md:visible absolute top-[72%] right-[25px] md:scale-100 scale-50 h-96 w-96 -z-50 bg-purple-500 bg-opacity-60 blur-[170px]'></div>
      <div className='invisible md:visible absolute top-[36%] right-[25px] md:scale-100 scale-50 4 h-96 -z-50 w-96 bg-purple-500 bg-opacity-60 blur-[170px]'></div>
      
      <div className='invisible md:visible absolute top-[56%] left-0 4 h-96 md:scale-100 scale-50 -z-50 w-96 bg-purple-500 bg-opacity-60 blur-[170px]'></div>
      <div className='invisible md:visible absolute top-[90%] right-1/2 translate-x-1/2 4 h-96 -z-50 w-96 bg-purple-500 bg-opacity-60 blur-[170px]'></div>

      <Navbar/>
        <div className="hero-section">
        
          <div className="relative w-[100vw] h-[100vh] bg-Hero bg-cover bg-no-repeat overflow-hidden ">
            <div className="absolute bg-black opacity-60 -z-20 h-full w-full"></div>
          <video className="relative  left-1/2 -translate-x-1/2 scale-[5] md:scale-[2] xl:scale-[1.50] w-[100vw] h-full overflow-hidden -z-30" autoPlay muted loop>
            <source src="/img/landing-page/herobg.webm" type="video/webm"/>
          </video>
          <motion.div
          initial={{opacity:0}}
            whileInView={{y:20, opacity:1,}}
            transition={{ delay: 1 }} 
            className="absolute top-[30%] w-[85%] left-1/2 md:translate-x-0 !-translate-x-1/2 md:left-24 text-5xl xl:text-6xl  text-center md:text-start text-white">Portalize Your <span className="text-transparent bg-gradient-to-br from-[#3b29ff] to-[#9c4fff] !bg-clip-text">
                    <TypeAnimation
                sequence={[
                  "Community",
                  1000,
                  "Game",
                  1000,
                  "Business",
                  1000,
                  "Idea",
                  1000,
                ]}
                style={{scale:`0.5`}}
                speed={40}
                repeat={Infinity}
              />
            </span>
            <motion.p 
            initial={{opacity:0}}
            whileInView={{y:20, opacity:1,}}
            transition={{ delay: 1.2 }}
            className="font-bold text-2xl xl:text-2xl">Influence New Way</motion.p>
            </motion.div>
            
            
          </div>
            
          </div>
        <div className="cta-section">
          
          <div className="relative w-[100vw] h-[700px] text-center">
            <div className="absolute w-full place-content-center gap-5 -z-10 opacity-30 flex top-1/2 -translate-y-[35%] left-1/2 -translate-x-1/2 overflow-hidden">
             
            </div>
            <p className="absolute bottom-[50%] translate-y-1/2  md:left-1/2 md:-translate-x-1/2 text-5xl font-light">Get Start Creating Your New Space</p>
            <ul className="absolute w-full md:flex grid grid-rows-4 justify-center bottom-[10%] md:bottom-[28%]  md:left-1/2 md:-translate-x-1/2 font-bold gap-2 md:gap-6 text-3xl md:text-4xl uppercase place-items-center">
              <motion.li initial={{y:10, opacity:0}} whileInView={{y:0, opacity:1}} transition={{delay:0.05}}>Domain Based</motion.li>
              <motion.li initial={{y:10, opacity:0}} whileInView={{y:0, opacity:1}} transition={{delay:0.08}}>Blockchain</motion.li>
              <motion.li initial={{y:10, opacity:0}} whileInView={{y:0, opacity:1}} transition={{delay:0.11}}>No-Code</motion.li>
              <motion.li initial={{y:10, opacity:0}} whileInView={{y:0, opacity:1}} transition={{delay:0.14}}>1000+ Assets</motion.li>
            </ul>
          </div>
        </div>

          <div className="invisible md:visible absolute -z-40  text-start text-[25rem] overflow-x-hidden opacity-10 max-w-[100vw]">
          <motion.div initial={{x:-1500, opacity:0}} whileInView={{x:0, opacity:1}} transition={{delay:0.05}} className="overflow-hidden break-normal">
          EXPRESS <br/>AUDIANCE
          </motion.div>
        </div>


        <div className="relative flex flex-col-reverse gap-10 md:gap-0 md:grid md:grid-cols-2 w-[100vw] h-screen my-[200px] md:my-24">
        <div className="flex flex-col gap-2 md:gap-9 text-start md:place-self-center md:w-[70%] -mb-10 md:mb-0">
            <motion.h2 initial={{y:25,opacity:0}} whileInView={{y:0,opacity:1}} transition={{delay:0.2}} className="text-4xl sm:text-3xl lg:text-7xl ">Analytics</motion.h2>
            <motion.span initial={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{delay:0.3}} className="w-[70%] place-self-start h-1 bg-white font-light text-blue-gray-600"></motion.span>
            <motion.p initial={{y:25,opacity:0}} whileInView={{y:0,opacity:1}} transition={{delay:0.4}} className="text-xl lg:text-3xl">Keep a Pulse on Your World. Gain insights into the pulse of your virtual space with Portalize’s analytics. Track visitor numbers, engagement, and time spent in your world effortlessly. Use these data-driven insights to evolve and optimize your virtual experience.</motion.p>
          </div>
          {isMobile ? (<div className="md:relative">
            <Image alt="side2" className="absolute right-0 top-1/2 -translate-y-1/2" width={656} height={754} quality={65} src={side2}/>
          </div>):(
            <motion.div initial={{x:500}} whileInView={{x:0}} transition={{delay:0.05}} className="md:relative">
            <Image alt="side2" className="absolute right-0 top-1/2 -translate-y-1/2" width={656} height={754} quality={65} src={side2}/>
          </motion.div>
          )}
          
        </div>

        <div className="flex flex-col place-items-center gap-28 h-screen text-center max-w-[100vw]">
          <div className="md:w-[70%]">
            <motion.h2 initial={{opacity:0, y:50}} whileInView={{opacity:1, y:0}}  transition={{delay:0.05}}  className="text-5xl sm:text-7xl mb-4">MARKETPLACE</motion.h2>
            <motion.h4 initial={{opacity:0, y:50}} whileInView={{opacity:1, y:0}}  transition={{delay:0.08}} className="text-2xl sm:text-3xl">A Wealth of Assets at Your Fingertips</motion.h4>
            <motion.p initial={{opacity:0, y:50}} whileInView={{opacity:1, y:0}}  transition={{delay:0.11}} className="text-xl lg:text-3xl ">Ignite your creativity with Portalize`s Marketplace, your gateway to a vast array of assets. From buildings to 3D props, the Marketplace has everything you need to design unique worlds. Browse, pick, and start creating!</motion.p>

          </div>
          <div>
            <Image src={marketplace} alt="marketplace"/>
          </div>
        </div>

        <div className="invisible md:visible absolute -z-40  text-start text-[25rem] overflow-x-hidden opacity-10 max-w-[100vw]">
          <motion.div initial={{x:-1500, opacity:0}} whileInView={{x:0, opacity:1}} transition={{delay:0.05}} className="overflow-hidden break-normal">
          EASY <br/>TEMPLATES
          </motion.div>
        </div>




        <div className="relative flex flex-col-reverse gap-10 md:gap-0 md:grid md:grid-cols-2 w-[100vw] h-screen my-[200px] md:my-24">
        <div className="flex flex-col gap-2 md:gap-9 text-start md:place-self-center md:w-[70%] -mb-10 md:mb-0">
            <motion.h2 initial={{y:25,opacity:0}} whileInView={{y:0,opacity:1}} transition={{delay:0.2}} className="text-4xl sm:text-3xl lg:text-7xl ">Ready-to-Use Templates</motion.h2>
            <motion.span initial={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{delay:0.3}} className="w-[70%] place-self-start h-1 bg-white font-light text-blue-gray-600"></motion.span>
            <motion.p initial={{y:25,opacity:0}} whileInView={{y:0,opacity:1}} transition={{delay:0.4}} className="text-xl lg:text-3xl">Embark with a Head Start Get started swiftly with Portalize`s ready-to-use templates. Choose from a plethora of themes ranging from industrial to fantastical. Select, customize, and you`re ready to step into your own corner of the Metaverse.</motion.p>
          </div>
          {isMobile ? (<div className="md:relative">
            <Image alt="side1" className="absolute right-0 top-1/2 -translate-y-1/2" width={656} height={754} quality={65} src={side1}/>
          </div>):(
            <motion.div initial={{x:500}} whileInView={{x:0}} transition={{delay:0.05}} className="md:relative">
            <Image alt="side1" className="absolute right-0 top-1/2 -translate-y-1/2" width={656} height={754} quality={65} src={side1}/>
          </motion.div>)}
        </div>

      


        <div className="pricing-section">
          <div className="relative w-[100vw] h-[2400px] md:h-[100vh]">
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 md:-translate-x-0 md:left-20 text-7xl font-light"><p>Join <span className="font-bold">Today</span></p></div>
            <div className="absolute grid grid-cols-1 items-start md:grid-cols-2 gap-5 md:gap-3 bottom-0 top-[15%] md:top-[50%] md:-translate-y-1/2 left-1/2 -translate-x-1/2 scale-90 w-[100vw] justify-center place-items-center">
                <PricingCardFree/>
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