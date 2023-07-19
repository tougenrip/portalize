import Navbar from '../components/Navbar'
import React , {Fragment, useState} from 'react'
import GameSlider from '../components/gameslider';
import List from "../components/List";
import Modal from "../components/Model";
import FeaturedSlider from '../components/featuredslider';
import FeaGameBanner from '../components/feagamebanner';
import useSWR from 'swr';







const PortalizeSB = ({data}) => {

  const [selected, setSelected] = useState(null);


  

  return (
    
    <Fragment>
      <Navbar/>
        <main className='overflow-hidden'>
            <div className=''>
                <GameSlider/>
            </div>
            <div className=' h-fit mr-0 overflow-visible'>
              <h2 className='relative text-5xl left-14 w-18 mb-7'>Featured Games</h2>
              <List setSelected={setSelected} />
              <Modal selected={selected} setSelected={setSelected} />
            </div>
            <div>
            <FeaGameBanner/>
            </div>
        </main>
    </Fragment>
  )
}

export default PortalizeSB