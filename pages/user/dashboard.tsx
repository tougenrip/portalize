import React, { useState } from 'react'
import SideBar from '../../components/SideBar'
import Navbar from '../../components/Navbar'
import { Avatar, Button, Input } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import UserMaps from '../../components/UserMaps'
import axios from 'axios'
import { BiGlobeAlt, BiCubeAlt, BiPyramid, BiListUl } from 'react-icons/bi'
import { FaSolarPanel } from 'react-icons/fa'
import AdvPanel from '@components/components/AdvPanel'
import Image from 'next/image'
import { AvatarCreator, EditorConfig } from "@readyplayerme/rpm-react-sdk";
import Script from 'next/script'
import BannerCreate from '@components/components/bannerCreate'
import SkyCreate from '@components/components/skyCreate'
import EventCreate from '@components/components/eventCreate'
const Dashboard = () => {

  const config: EditorConfig  = {
    clearCache: true,
    bodyType: 'fullbody',
    quickStart: false,
    language: 'en',
  };
  

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

  const handleOnAvatarExported = async (url: string) => {
    

    setAvatarUrl(url)

    await axios.put(
      "/api/user/updateRpm?function=updateUrl",
      { avatarUrl:url },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    console.log(`Avatar URL is: ${avatarUrl}`)
  };

  const handleUserSet = async (userId: string) =>{
    
    setRpmId(userId)
    await axios.put(
      "/api/user/updateRpm?function=updateId",
      { rpmId:userId },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    console.log(`User ID is: ${rpmId}`)
  }
 

  const updateUser = async () => {

    const res = await axios.put(
        "/api/user/updateuser",
        { userName, userEmail,userImage, userAge },
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
  const [userAge, setAge] = useState(null)
  const [rpmId, setRpmId] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [advpanelOpen, setAdvPanelOpen] = useState(false)
  const [minutes ,setMinutes] = useState(null)


  return (
    <>
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
    <main className='relative flex min-h-screen overflow-hidden' >
    
        <div className='fixed top-1/4 !-z-50 -left-14 h-96 w-96 bg-purple-500 bg-opacity-60 blur-[170px]'></div>
        <div className='fixed top-[7%] !-z-50  -right-14 h-96 w-96 bg-purple-500 bg-opacity-60 blur-[170px]'></div>
        <div className={`fixed  xl:relative w-0 xl:w-1/3 z-50`}>
            <SideBar/>
        </div>
        
        <div className='w-full xl:w-2/3'>



        <div id="myavatar" className='relative h-screen'>
              <h2 className='absolute top-[10%] left-14 text-3xl md:text-5xl font-bold'>My Avatar</h2>
              <div className='absolute flex flex-col gap-5 top-[20%] left-0 max-h-[75%] rounded-l-3xl overflow-x-hidden overflow-scroll scrollbar-none h-[75%] w-full'>
              
                <AvatarCreator 
                subdomain='portalize'
                onUserSet={handleUserSet}
                onAvatarExported={handleOnAvatarExported}
                editorConfig={config}
                />
              </div>
            </div>
            


            <div id="myspaces" className='relative h-screen'>
              <h2 className='absolute top-[10%] left-14 text-3xl md:text-5xl font-bold'>My Spaces</h2>
              <div className='absolute flex flex-col gap-5 top-[20%] left-0 max-h-[75%] overflow-x-hidden overflow-scroll scrollbar-none h-[75%] w-full'>
              
                <UserMaps/>
              </div>
            </div>
            
            




            <div id="analytics" className='relative  h-min'><h2 className='absolute top-[20%] left-14 text-3xl md:text-5xl font-bold'>Analytics</h2>
            <div className="text-5xl font-['Gilroy'] font-bold text-white w-full ">
                Analitycs
                <br />
                <div className="contents">
                  <br />
                </div>
              </div>
              <div className=''>
                <div className="bg-[url(https://file.rendit.io/n/ZTZoKEjYnjI6OgGA3RSP.png)] bg-cover bg-50%_50% bg-blend-normal flex flex-row w-full h-[295px] items-start pt-3 px-6">
                  <div className="text-4xl font-['Gilroy'] font-bold text-white w-5 shrink-0">
                    7
                  </div>
                  <Image
                    alt=""
                    width={18}
                    height={16}
                    src="https://file.rendit.io/n/rmN5xRJU6fKUaqyXw6Is.svg"
                    className="min-h-0 min-w-0 mt-6 w-6 shrink-0"
                  />
                </div>
                <div className="bg-[#262626] flex flex-col md:gap-10 gap-6 w-full h-full md:px-16 md:py-12 py-4 px-4 rounded-bl-[32px]">
                  <div className="whitespace-nowrap text-5xl font-['Gilroy'] font-light text-white self-start ">
                    Tedy`s Gallery
                  </div>
                  <div className="flex md:flex-row flex-col justify-start gap-4  items-center">
                    <div className="border-solid border-[#9c4fff] bg-[#202020] flex flex-col justify-center gap-4 py-3  items-center border rounded-lg px-12">
                      <div className="whitespace-nowrap font-['Gilroy'] font-light text-white">
                        Daily Users
                      </div>
                      <div className="text-4xl font-['Gilroy'] font-light text-whit">
                        60
                      </div>
                    </div>
                    <div className="border-solid border-[#9c4fff] bg-[#202020] flex flex-col justify-center gap-4 py-3 items-center border rounded-lg px-12">
                      <div className="whitespace-nowrap font-['Gilroy'] font-light text-white">
                        Monthly Users
                      </div>
                      <div className="text-4xl font-['Gilroy'] font-light text-white">
                        880
                      </div>
                    </div>
                    <div className="border-solid border-[#9c4fff] bg-[#202020] flex flex-col justify-center gap-4 w-auto py-3  items-center border rounded-lg px-16">
                      <div className="whitespace-nowrap font-['Gilroy'] font-light text-white ">
                        Total User Rate
                      </div>
                      <div className="whitespace-nowrap text-4xl font-['Gilroy'] font-light text-white text-center">
                        885 Minutes
                      </div>
                    </div>
                  </div>
                  <div className="border-solid border-white bg-[#202020] flex gap-4 md:gap-20 items-center justify-around px-20 py-4 border rounded md:flex-row flex-col">
                    <div className="flex flex-col gap-4 items-center">
                      <div className="text-xl font-['Gilroy'] font-light text-white mx-1">
                        Engagement
                      </div>
                      <div className="text-4xl font-['Gilroy'] font-light text-white">
                        68.000
                      </div>
                    </div>
                    <div className="bg-[#d9d9d9] w-px shrink-0 md:h-24 h-none" />
                    <div className="flex flex-col gap-4 items-center">
                      <div className="whitespace-nowrap text-xl font-['Gilroy'] font-light text-white self-stretch">
                        Active User
                      </div>
                      <div className="text-4xl font-['Gilroy'] font-light text-white ">
                        68
                      </div>
                    </div>
                    <div className="bg-[#d9d9d9] w-px shrink-0 md:h-24 h-none " />
                    <div className="flex flex-col items-center gap-4 w-24 shrink-0 " >
                      <div className="whitespace-nowrap text-xl font-['Gilroy'] font-light text-white">
                        Ads Clicks
                      </div>
                      <div className="text-4xl font-['Gilroy'] font-light text-white mx-3">
                        220
                      </div>
                    </div>
                    <div className="bg-[#d9d9d9] w-px shrink-0 md:h-24 h-none " />
                    <div className="flex flex-col gap-4 items-center">
                      <div className="text-xl font-['Gilroy'] font-light text-white ">
                        CPM
                      </div>
                      <div className="text-4xl font-['Gilroy'] font-light text-white self-stretch">
                        15.800
                      </div>
                    </div>
                  </div>
                  <div className="relative flex flex-col md:flex-row justify-between sm:items-start itemns-center py-3 gap-5">
                      <button className="border-solid border-white bg-[#202020] w-full md:w-2/3  border-4 rounded-lg text-center py-2">
                        <span className="text-xl font-['Gilroy'] font-bold text-white ">
                          Space Settings
                        </span>
                        </button>
                      <button className="border-solid border-[#9c4fff] w-full md:w-1/3  bg-[#202020] md:top-0 flex flex-col items-end  border-4 rounded-lg text-center py-2">
                        <span className="text-xl font-['Gilroy'] font-bold text-white w-full">
                          Promote Space
                        </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='!z-40'>
            <BannerCreate/>
            </div>
            <div className='!z-40'>
            <SkyCreate />
            </div>
            <div className='!z-40'>
            <EventCreate />
            </div> */}

            <div id="edvertsec" className='relative !visible !block h-[1300px] md:h-[1100px]'><h2 className='absolute top-[20%] left-5  md:left-14 text-3xl md:text-5xl font-bold'>Advertisement Panel</h2><BiListUl className='absolute top-[22%] z-40 right-5 md:right-20 h-5 w-5' onClick={() => setAdvPanelOpen(current => !current)}></BiListUl>
            <div className={advpanelOpen ? ('absolute z-40 top-[31.5%]  !max-w-screen md:left-10 md:w-[95%]'):('hidden')}><AdvPanel/></div>
              <div className='absolute flex flex-col gap-5 top-[30%] bg-transparent left-0 max-h-[75%] overflow-x-hidden overflow-hidden h-min w-[100%] rounded-l-3xl'>
              <div className='relative !min-h-min flex flex-col md:grid md:grid-rows-4 md:grid-cols-4 md:grid-flow-col gap-4 justify-between px-6 top-5 md:left-5 rounded-3xl md:w-[96%]'>
                  <div className='row-span-2 col-span-2 flex justify-between py-8 px-5 w-auto rounded-3xl bg-[#191919]  text-center md:text-4xl place-items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62" fill="none">
        <path d="M54.25 7.75H7.75C6.72229 7.75 5.73666 8.15826 5.00996 8.88496C4.28326 9.61166 3.875 10.5973 3.875 11.625V42.625C3.875 43.6527 4.28326 44.6383 5.00996 45.365C5.73666 46.0917 6.72229 46.5 7.75 46.5H23.25V54.25H15.5V58.125H46.5V54.25H38.75V46.5H54.25C55.2777 46.5 56.2633 46.0917 56.99 45.365C57.7167 44.6383 58.125 43.6527 58.125 42.625V11.625C58.125 10.5973 57.7167 9.61166 56.99 8.88496C56.2633 8.15826 55.2777 7.75 54.25 7.75ZM34.875 54.25H27.125V46.5H34.875V54.25ZM54.25 42.625H7.75V11.625H54.25V42.625Z" fill="white"/>
      </svg>
                    Banner Advertisement<Button color='purple' size='lg' className='bg-gradient-to-br from-purple-500 to-purple-800 text-xl' onClick={() => {if (isCheckoutLoading) return;else goToBannerCheckout();}}>Buy</Button></div>
                  <div className='row-span-2 col-span-2 flex justify-between py-8 px-5 w-auto rounded-3xl bg-[#191919]  text-center md:text-4xl place-items-center'><BiCubeAlt className='w-12 h-12 md:h-24 md:w-24 md:col-span-1 text'></BiCubeAlt>Product Advertisement<Button color='purple' size='lg' className='relative left-2 bg-gradient-to-br from-purple-500 to-purple-800 text-xl' >Buy</Button></div>
                  <div className='md:row-span-4 col-span-2  justify-between py-8 px-5 w-full rounded-3xl bg-[#191919] h-min text-center text-xl md:text-4xl place-items-center'><BiGlobeAlt className=' h-48 my-5 w-full place-self-center'></BiGlobeAlt>Sky Advertisement<form className='text-xl text-center flex place-content-center my-4 gap-3 place-self-center' >For <input type="number" placeholder='x' onChange={(e) => setMinutes(e.target.value)} className='text-center w-10'/> minutes</form><Button color='purple' size='lg' className='bg-gradient-to-br from-purple-500 to-purple-800 text-xl' onClick={() => {if (isCheckoutLoading) return;else goToSkyCheckout();}}>Buy</Button></div>
              </div>
              <div className=' w-[92%] mt-4 justify-between py-8 px-5 place-self-center rounded-3xl bg-[#191919] text-center text-4xl place-items-center'><BiPyramid className='h-24 w-full'></BiPyramid>Start Futuring</div>
              </div>
            </div>
            <div id="accsettings" className='relative h-screen'><h2 className='absolute top-[20%] left-0 md:left-14 text-3xl md:text-5xl font-bold'>Account Settings</h2>
            <div className='absolute p-5 gap-10 top-[28%] bg-transparent left-0 max-h-[75%] overflow-x-hidden overflow-hidden h-[75%] w-full rounded-l-3xl'>
              <form onSubmit={() => updateUser()} className='relative flex flex-col space-y-7 top-5 scale-110 md:left-12' encType='multipart/form-data'>
              <Avatar
                variant="circular"
                size="xxl"
                alt="UserLogo"
                className={`cursor-pointer mt-5 h-24 w-24 place-self-center`}
                src={userImage || '/img/pp_comp.webp'}
              />
              <Input type="file" color="purple"  className='border-2 !h-[46px]' onChange={(e) => handleFileUpload(e)} style={{backgroundColor:'transparent'}} label='Change profile picture'></Input>

              <Input label='Change Nickname' color="purple" size='lg' className='border-2 border-white' style={{backgroundColor:'transparent',}} onChange={(e) => {setUsername(e.target.value); console.log(e.target.value)}}></Input>
              <Input label='Change Email*' color="purple" className='border-2 border-white' style={{backgroundColor:'transparent'}} onChange={(e) => setUseremail(e.target.value)}></Input>
              <Input type="number" max={85} min={18} label='Set Age' color="purple" size='lg' className='border-2 border-white' style={{backgroundColor:'transparent',}} onChange={(e) => {setAge(e.target.value); console.log(e.target.value)}}></Input>
              <Button type='submit' color='purple' > Save </Button>
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