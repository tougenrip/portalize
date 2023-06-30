import Navbar from '../components/Navbar'
import React , {Fragment, useState} from 'react'
import SideBar from '../components/SideBar'
import ExpandCard from '../components/expandcard';
import GameSlider from '../components/gameslider';
import GameCard from '../components/gamecard';
import FeaturedSlider from '../components/featuredslider';
import loadMaps from '../lib/loadMaps'







const PortalizeSB = ({data}) => {
  return (
    
    <Fragment>
      <Navbar/>
        <main className='overflow-hidden'>
            <div className=''>
                <GameSlider/>
            </div>
            <div className=' h-fit mr-0 overflow-visible'>
              <h2 className='relative text-5xl left-14 w-18 mb-7'>Featured Games</h2>
              <FeaturedSlider/>
            </div>
        </main>
    </Fragment>
  )
}

export default PortalizeSB