import React, { useState, useEffect, useRef } from 'react'
import SideBar from '../../components/SideBar'
import Navbar from '../../components/Navbar'
import { Avatar, Button, IconButton, Input, Option, Select } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import Link from 'next/link'
import UserMaps from '../../components/UserMaps'
import axios from 'axios'
import { BiGlobeAlt, BiCubeAlt, BiPyramid, BiListUl } from 'react-icons/bi'
import { FaCross, FaSolarPanel } from 'react-icons/fa'
import AdvPanel from '@components/components/AdvPanel'
// import { AvatarCreator, EditorConfig } from "@readyplayerme/rpm-react-sdk";
// import { motion } from 'framer-motion'
// import  AvatarCreate  from '../../components/AvatCreator.js'
const Dashboard = () => {



  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  
  const goToSkyCheckout = async () => {
    setIsCheckoutLoading(true);
    const res = await fetch(`/api/stripe/skyad-checkout-session?quantity=${minutes}`, {
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
  const goToBannerCheckout = async () => {
    setIsCheckoutLoading(true);
    const res = await fetch(`/api/stripe/bannerad-checkout-session`, {
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUserimg(base64 as unknown as string);
  };

  
 

  const updateUser = async () => {

    const res = await axios.put(
        "/api/user/updateuser",
        { userName, userEmail,userImage },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        window.alert('Updated User Details successfully')
        
      }).finally(async() => {update({name:`${userName}`,email:`${userEmail}`,image:`${userImage}`})})
      .catch((error) => {
        console.log(error);
      });
    console.log(res);
  };

  const {data: session, status, update} = useSession();
  const [userName, setUsername] = useState(session?.user?.name)
  const [userEmail, setUseremail] = useState(session?.user?.email)
  const [userImage, setUserimg] = useState(session?.user?.image)
  const [advpanelOpen, setAdvPanelOpen] = useState(false)
  const [minutes ,setMinutes] = useState(null)

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
              <h2 className='absolute top-[10%] left-14 text-3xl md:text-5xl font-bold'>My Avatar</h2>
              <div className='absolute flex flex-col gap-5 top-[20%] left-0 max-h-[75%] overflow-x-hidden overflow-scroll rounded-l-xl scrollbar-none h-[75%] w-full'>
              
              </div>
            </div>

            
            <div id="myspaces" className='relative h-screen'>
              <h2 className='absolute top-[10%] left-14 text-3xl md:text-5xl font-bold'>My Spaces</h2>
              <div className='absolute flex flex-col gap-5 top-[20%] left-0 max-h-[75%] overflow-x-hidden overflow-scroll scrollbar-none h-[75%] w-full'>
              
                <UserMaps/>
              </div>
            </div>

            <div id="analytics" className='relative h-screen'><h2 className='absolute top-[20%] left-14 text-3xl md:text-5xl font-bold' >Analytics</h2>
              <div className="contents">
                <br />
              </div>
            </div>
            <div className="w-1/2 h-[528px] bg-[#262626] absolute top-[294px] left-[702px] flex flex-col justify-end gap-6 px-6 py-8 rounded-[32px]">
            <div className="whitespace-nowrap text-4xl font-['Gilroy'] font-light text-white self-start w-56">
              Tedy’s Gallery
            </div>
      </div>
            {/*<div className='absolute flex flex-col gap-5 top-[30%] bg-gray-900 left-0 max-h-[75%] overflow-x-hidden overflow-hidden h-[75%] w-full rounded-l-3xl'>
            <div className="flex flex-col items-center">
              <div className="w-full max-w-3xl">
                <img
                  src="path/to/your/image.jpg"
                  alt="Image"
                  className="w-full h-auto"
                />
              </div>

              <div className="my-8 text-center">
                <h1 className="text-3xl font-bold">Your Title</h1>
                <p className="mt-4">Your text content goes here...</p>
              </div>
              <div className='h-[30%] w-[50%] bg-white'>

              </div> 
              <div className="border-2 border-white p-4 rounded-lg w-[95%] h-[60%] ">
                <div className="flex col-4 justify-between px-6 ">
                  <div className="my-8 text-center">
                  <h1 className="text-2xl">Engagement</h1>
                  <p className="mt-4 text-4xl">68.000</p>
                </div>
                <div className='w-1 h-auto bg-white'/>
                <div className="my-8 text-center align">
                <h1 className="text-2xl">Active User</h1>
                  <p className="mt-4 text-4xl">68</p>
                </div>
                <div className='w-1 h-auto bg-white'/>
                <div className="my-8 text-center">
                <h1 className="text-2xl">Ads Click</h1>
                  <p className="mt-4 text-4xl">220</p>
                </div>
                <div className='w-1 h-auto bg-white'/>
                <div className="my-8 text-center">
                <h1 className="text-2xl">CPM</h1>
                  <p className="mt-4 text-4xl">15.800</p>
                </div>                
              </div>
              </div>

              <div className="flex justify-center w-full p-4 gap-6">
                <button className="bg-#262626 text-white font-semibold text-xl py-2 px-4 rounded-xl border-2 border-white w-[65%] hover:border-purple-500 ">
                  Promote Space
                </button>
                <button className="bg-#262626 text-white font-semibold text-xl py-2 px-4 rounded-xl border-solid border-2 border-white w-[30%] hover:border-purple-500">
                  Space Settings
                </button>
              </div>
            </div>
            </div>
          </div>*/}

           

            <div id="edvertsec" className='relative !visible !block h-[1300px] md:h-[1100px]'><h2 className='absolute top-[20%] left-5  md:left-14 text-3xl md:text-5xl font-bold'>Advertisement Panel</h2><BiListUl className='absolute top-[22%] z-40 right-5 md:right-20 h-5 w-5' onClick={() => setAdvPanelOpen(current => !current)}></BiListUl>
            <div className={advpanelOpen ? ('absolute z-40 top-[31.5%]  !max-w-screen md:left-10 md:w-[95%]'):('hidden')}><AdvPanel/></div>
              <div className='absolute flex flex-col gap-5 top-[30%] bg-transparent left-0 max-h-[75%] overflow-x-hidden overflow-hidden h-min w-[100%] rounded-l-3xl'>
              <div className='relative !min-h-min flex flex-col md:grid md:grid-rows-4 md:grid-cols-4 md:grid-flow-col gap-4 justify-between px-6 top-5 md:left-5 rounded-3xl md:w-[96%]'>
                  <div className='row-span-2 col-span-2 flex justify-between py-8 px-5 w-auto rounded-3xl bg-[#191919]  text-center md:text-4xl place-items-center'><FaSolarPanel className='w-12 h-12 md:h-24 md:w-24 md:col-span-1 text'></FaSolarPanel>Banner Advertisement<Button color='purple' size='lg' className='bg-gradient-to-br from-purple-500 to-purple-800 text-xl' onClick={() => {if (isCheckoutLoading) return;else goToBannerCheckout();}}>Buy</Button></div>
                  <div className='row-span-2 col-span-2 flex justify-between py-8 px-5 w-auto rounded-3xl bg-[#191919]  text-center md:text-4xl place-items-center'><BiCubeAlt className='w-12 h-12 md:h-24 md:w-24 md:col-span-1 text'></BiCubeAlt>Product Advertisement<Button color='purple' size='lg' className='relative left-2 bg-gradient-to-br from-purple-500 to-purple-800 text-xl' >Buy</Button></div>
                  <div className='md:row-span-4 col-span-2  justify-between py-8 px-5 w-full rounded-3xl bg-[#191919] h-min text-center text-xl md:text-4xl place-items-center'><BiGlobeAlt className=' h-48 my-5 w-full place-self-center'></BiGlobeAlt>Sky Advertisement<form className='text-xl text-center flex place-content-center my-4 gap-3 place-self-center' >For <input type="number" placeholder='x' onChange={(e) => setMinutes(e.target.value)} className='text-center w-10'/> minutes</form><Button color='purple' size='lg' className='bg-gradient-to-br from-purple-500 to-purple-800 text-xl' onClick={() => {if (isCheckoutLoading) return;else goToSkyCheckout();}}>Buy</Button></div>
              </div>
              <div className=' w-[92%] mt-4 justify-between py-8 px-5 place-self-center rounded-3xl bg-[#191919] text-center text-4xl place-items-center'><BiPyramid className='h-24 w-full'></BiPyramid>Start Futuring</div>
              </div>
            </div>
            <div className='container w-auto'>
              <div id="accsettings" className='relative h-screen'><h2 className='absolute top-[20%] left-14 text-3xl md:text-5xl font-bold'>Account Settings</h2>
                <div className='absolute p-5 gap-10 top-[28%] bg-transparent left-0 max-h-[75%] overflow-x-hidden overflow-hidden h-[75%] w-full rounded-l-3xl'>
                
                <form onSubmit={() => updateUser()} className='relative flex flex-col gap-4 top-5 scale-110 md:left-12' encType='multipart/form-data'>
                <Input label='Change Nickname' color="purple" size='lg' className='border-2 border-white' style={{backgroundColor:'#282828',}} onChange={(e) => {setUsername(e.target.value); console.log(e.target.value)}}></Input>
                <Input label='Change Email*' color="purple" className='border-2 border-white' style={{backgroundColor:'#282828'}} onChange={(e) => setUseremail(e.target.value)}></Input>
                <Avatar
                  variant="circular"
                  size='xxl'
                  alt="UserLogo"
                  className={`cursor-pointer mt-5 place-self-center`}
                  src={userImage || '/img/pp_comp.webp'}
                />
                <Input type="file" color="purple"  className='border-2 border-white' onChange={(e) => handleFileUpload(e)} style={{backgroundColor:'#282828'}} label='Change profile picture'></Input>
                <Button type='submit' color='purple' > Save </Button>
                <p className='text-center text-xs text-red-500'>*Your stripe customer mail will not change</p>
                </form>
                    
                </div>
              </div>
            </div>
        </div>
    </main>
    </>
  )
}

export default Dashboard