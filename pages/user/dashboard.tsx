import React from 'react'
import SideBar from '../components/SideBar'
import { Navbar } from '../components/Navbar'
import { IconButton } from '@material-tailwind/react'

const dashboard = () => {
  return (
    <>
    <Navbar/>
    <main className='relative flex min-h-screen overflow-hidden' >
        <div className='fixed top-1/4 -left-14 h-96 w-96 bg-purple-500 bg-opacity-60 blur-[170px]'></div>
        <div className='fixed top-[7%] -right-14 h-96 w-96 bg-purple-500 bg-opacity-60 blur-[170px]'></div>
        <div className='fixed md:relative w-0 xl:w-1/3 z-50'>
            <SideBar/>
        </div>
        
        <div className='w-full md:w-2/3'>
            
            
            <div id="myspaces" className='relative h-screen'>
              <h2 className='absolute top-[10%] left-14 text-3xl md:text-5xl font-bold'>My Spaces</h2>
              <div className='absolute flex flex-col gap-5 top-[20%] left-0 max-h-[75%] overflow-x-hidden overflow-scroll scrollbar-none h-[75%] w-full'>
                  <div className='relative top-0 min-h-[40%] bg-lime-500 rounded-l-3xl'>
                  </div>
                  <div className='relative  min-h-[40%] bg-lime-500 rounded-l-3xl'>
                  </div>
                  <div className='relative  min-h-[40%] bg-lime-500 rounded-l-3xl'>
                  </div>
                  <div className='relative  min-h-[40%] bg-lime-500 rounded-l-3xl'>
                  </div>
                  <div className='relative  min-h-[40%] bg-lime-500 rounded-l-3xl'>
                  </div>
                  
              </div>
            </div>
            <div id="analytics" className='relative h-screen'><h2 className='absolute top-[20%] left-14 text-3xl md:text-5xl font-bold'>Analytics</h2>
            <div className='absolute flex flex-col gap-5 top-[30%] bg-gray-900 left-0 max-h-[75%] overflow-x-hidden overflow-hidden h-[75%] w-full rounded-l-3xl'>
                  
                  
              </div>
            </div>
            <div id="adverts" className='relative h-screen'><h2 className='absolute top-[20%] left-14 text-3xl md:text-5xl font-bold'>Advertisement Panel</h2>
              <div className='absolute flex flex-col gap-5 top-[30%] bg-gray-900 left-0 max-h-[75%] overflow-x-hidden overflow-hidden h-[75%] w-full rounded-l-3xl'>
                    
                    
                </div>
            </div>
            <div id="accsettings" className='relative h-screen'><h2 className='absolute top-[20%] left-14 text-3xl md:text-5xl font-bold'>Account Settings</h2>
            <div className='absolute flex flex-col gap-5 top-[30%] bg-gray-900 left-0 max-h-[75%] overflow-x-hidden overflow-hidden h-[75%] w-full rounded-l-3xl'>
                  
                  
              </div>
            </div>
        </div>
    </main>
    </>
  )
}

export default dashboard