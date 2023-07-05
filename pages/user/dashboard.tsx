import React, { useState } from 'react'
import SideBar from '../../components/SideBar'
import Navbar from '../../components/Navbar'
import { Avatar, Button, IconButton, Input, Option, Select } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import Link from 'next/link'
import UserMaps from '../../components/UserMaps'
import axios from 'axios'

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
    setUserimg(base64);
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
              <h2 className='absolute top-[10%] left-14 text-3xl md:text-5xl font-bold'>My Spaces</h2>
              <div className='absolute flex flex-col gap-5 top-[20%] left-0 max-h-[75%] overflow-x-hidden overflow-scroll scrollbar-none h-[75%] w-full'>
                <UserMaps/>
              
              </div>
            </div>
            <div id="analytics" className='relative h-screen'><h2 className='absolute top-[20%] left-14 text-3xl md:text-5xl font-bold'>Analytics</h2>
            <div className='absolute flex flex-col gap-5 top-[30%] bg-gray-900 left-0 max-h-[75%] overflow-x-hidden overflow-hidden h-[75%] w-full rounded-l-3xl'>
                  
                  
              </div>
            </div>
            <div id="adverts" className='relative h-screen'><h2 className='absolute top-[20%] left-14 text-3xl md:text-5xl font-bold'>Advertisement Panel</h2>
              <div className='absolute flex flex-col gap-5 top-[30%] bg-gray-900 left-0 max-h-[75%] overflow-x-hidden overflow-hidden h-[75%] w-full rounded-l-3xl'>
              <div className='relative flex flex-row gap-5 justify-between px-6 top-5 left-5 min-h-[40%] rounded-3xl w-[96%]'>
                  <div className='flex flex-col justify-between py-8 px-5 w-72 rounded-3xl border text-center text-4xl'>Banner Advertisement<form> </form><Button>Buy</Button></div>
                  <div className='flex flex-col justify-between py-8 px-5 w-72 rounded-3xl border text-center text-4xl'>Sky Advertisement<form className='text-xl flex flex-row gap-2 place-self-center' >For <input type="number" placeholder='x' onChange={(e) => setMinutes(e.target.value)} className='text-center w-10'/> minutes</form><Button onClick={() => {
            if (isCheckoutLoading) return;
            else goToSkyCheckout();
          }}>Buy</Button></div>
                  <div className='flex flex-col justify-between py-8 px-5 w-72 rounded-3xl border text-center text-4xl'>Product Advertisement<Button>Buy</Button></div>
              </div>
                    
                </div>
            </div>
            <div id="accsettings" className='relative h-screen'><h2 className='absolute top-[20%] left-14 text-3xl md:text-5xl font-bold'>Account Settings</h2>
            <div className='absolute p-5 gap-10 top-[28%] bg-gray-900 left-0 max-h-[75%] overflow-x-hidden overflow-hidden h-[75%] w-full rounded-l-3xl'>
              <form onSubmit={() => updateUser()} className='flex flex-col gap-4' encType='multipart/form-data'>
              <Input label='Change Nickname' onChange={(e) => {setUsername(e.target.value); console.log(e.target.value)}}></Input>
              <Input label='Change Email*' onChange={(e) => setUseremail(e.target.value)}></Input>
              <Avatar
                variant="circular"
                size='xxl'
                alt="UserLogo"
                className={`cursor-pointer mt-5 place-self-center`}
                src={userImage || '/img/pp_comp.webp'}
              />
              <Input type="file" onChange={(e) => handleFileUpload(e)} label='Change profile picture'></Input>
              <Button type='submit' > Save </Button>
              <p className='text-center text-xs text-red-500'>*Your stripe customer mail will not change</p>
              </form>
                  
              </div>
            </div>
        </div>
    </main>
    </>
  )
}

export default Dashboard