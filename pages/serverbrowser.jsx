import Navbar from '../components/Navbar'
import React , {Fragment, useState, useEffect} from 'react'
import GameSlider from '../components/gameslider';
import List from "../components/List";
import Modal from "../components/Model";
import FeaturedSlider from '../components/featuredslider';
import FeaGameBanner from '../components/feagamebanner';
import PortalNav from '../components/portalNav';
import useSWR from 'swr';







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
      <Navbar/>
        <main className='overflow-hidden'>
        <div>
            <PortalNav/>
          </div>
            <div className=''>
                <GameSlider/>
            </div>
            <div className=' h-fit mr-0 overflow-visible'>
              <h2 className='relative text-4xl left-14 w-18 mb-7'>Featured Games</h2>
              <List setSelected={setSelected} />
              
              {isMobile ?(null):(<Modal selected={selected} setSelected={setSelected} />)}
            </div>
            <div>
            <FeaGameBanner/>
            </div>
        </main>
    </Fragment>
  )
}

export default PortalizeSB