import React, { useEffect, useRef, useState } from 'react'
import SideBar from '../../components/SideBar'
import { Avatar, Button, Input } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import UserMaps from '../../components/UserMaps'
import axios from 'axios'
import { BiGlobeAlt, BiCubeAlt, BiPyramid, BiListUl, BiXCircle } from 'react-icons/bi'
import AdvPanel from '@/components/AdvPanel'
import Image from 'next/image'
import { AvatarCreator, EditorConfig } from "@readyplayerme/rpm-react-sdk";
import Script from 'next/script'
import BannerCreate from '@/components/bannerCreate'
import SkyCreate from '@/components/skyCreate'
import EventCreate from '@/components/eventCreate'
import Navbar from '@/components/Navbar'
import Head from 'next/head'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

      


const Dashboard = () => {

  const {data: session, status, update} = useSession();
  const [userName, setUsername] = useState(session?.user?.name)
  const [userEmail, setUseremail] = useState(session?.user?.email)
  const [userImage, setUserimg] = useState(session?.user?.image)
  const [uploadImg, setUploadImg] = useState(null)
  const [uploadImgUrl, setUploadImgUrl] = useState("")
  const provider = session?.account?.provider
  const [rpmId, setRpmId] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [advpanelOpen, setAdvPanelOpen] = useState(false)
  const [minutes ,setMinutes] = useState(null)
  const [bannervisibility, setBannerVisibility] = useState(false)
  const [skyvisibility, setSkyVisibility] = useState(false)
  const [productvisibility, setProductVisibility] = useState(false)
  const [eventvisibility, setEventVisibility] = useState(false)
  const firstUpdate = useRef(true);

  

  const config: EditorConfig  = {
    clearCache: true,
    bodyType: 'fullbody',
    quickStart: true,
    language: 'en',
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
    setUploadImg(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0])
      setUploadImgUrl(url)
      
  };

  const uploadUserImage = async () => {
    try{
      const uploadTost = toast.loading("Please wait...")
      const formData = new FormData();
      formData.append('file', uploadImg);
    await axios.put(
      "/api/user/uploadUserImage",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      ).then( async () => {
        toast.update(uploadTost, {render: "Updated user profile picture!", type: "success", isLoading: false, autoClose: 5000});
        
      }
    )
    .finally(
      async() => {update({image:uploadImg})}
    )
    console.log(`Image URL is: ${uploadImg}`)
    }catch(e){
      console.log(e)
    }
  };

  useEffect(() => {
    if (firstUpdate.current) {
    firstUpdate.current = false;
    return;
  
  }
  console.log('uploading this image now' + uploadImg)
  uploadUserImage()
  },[uploadImg])

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
      ).then( async () => {
        toast.success('Congratulations! You just created your avatar!');
        update({avatarUrl:url});
      }
    )
    console.log(`Avatar URL is: ${avatarUrl}`)
  };

  const handleUserSet = async (userId: string) =>{
    if(session.user.rpmId){
      setRpmId(session.user.rpmId)
    }else{
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
    
    
  }
 
  const updateUser = async () => {

    const user = await axios.put(
        "/api/user/updateUser",
        { userName, userEmail},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        toast.success('Updated user details successfully!')
        
      }).finally(async() => {update({name:userName,email:userEmail,image:userImage})})
      .catch((error) => {
        console.log(error);
        toast.error('A error has occured. Please try again')
      });
    console.log(user);
  };

  return (
    <>
     <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="light"
        />
    <Head>
      <title>Portalize | Account</title>
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
                subdomain='portalize-dqxbvv'
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
            
            




            

             <div className='!z-40 relative' style={{display: `${bannervisibility ? '': 'none'}`}}>
             <BiXCircle className='absolute top-0 right-10 h-10 w-10' onClick={(curr) => setBannerVisibility(curr => !curr)}/>
            <BannerCreate/>
            </div>
            <div className='!z-40 relative' style={{display: `${skyvisibility ? '': 'none'}`}}>
            <BiXCircle className='absolute top-0 right-10 h-10 w-10' onClick={(curr) => setSkyVisibility(curr => !curr)}/>
            <SkyCreate />
            </div>
            <div className='!z-40 relative' style={{display: `${eventvisibility ? '': 'none'}`}}>
            <BiXCircle className='absolute top-0 right-10 h-10 w-10' onClick={(curr) => setEventVisibility(curr => !curr)}/>
            <EventCreate />
            </div> 

            <div id="edvertsec" className='relative !visible !block h-[1300px] md:h-[1100px]'><h2 className='absolute top-[20%] left-5  md:left-14 text-3xl md:text-5xl font-bold'>Advertisement Panel</h2><BiListUl className='absolute top-[22%] z-40 right-5 md:right-20 h-5 w-5' onClick={() => setAdvPanelOpen(current => !current)}></BiListUl>
            <div className={advpanelOpen ? ('absolute z-40 top-[31.5%]  !max-w-screen md:left-10 md:w-[95%]'):('hidden')}><AdvPanel/></div>
              <div className='absolute flex flex-col gap-5 top-[30%] bg-transparent left-0 max-h-[75%] overflow-x-hidden overflow-hidden h-min w-[100%] rounded-l-3xl'>
              <div className='relative !min-h-min flex flex-col md:grid md:grid-rows-4 md:grid-cols-4 md:grid-flow-col gap-4 justify-between px-6 top-5 md:left-5 rounded-3xl md:w-[96%]'>
                  <div className='row-span-2 col-span-2 flex justify-between py-8 px-5 w-auto rounded-3xl bg-[#191919]  text-center md:text-4xl place-items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62" fill="none">
        <path d="M54.25 7.75H7.75C6.72229 7.75 5.73666 8.15826 5.00996 8.88496C4.28326 9.61166 3.875 10.5973 3.875 11.625V42.625C3.875 43.6527 4.28326 44.6383 5.00996 45.365C5.73666 46.0917 6.72229 46.5 7.75 46.5H23.25V54.25H15.5V58.125H46.5V54.25H38.75V46.5H54.25C55.2777 46.5 56.2633 46.0917 56.99 45.365C57.7167 44.6383 58.125 43.6527 58.125 42.625V11.625C58.125 10.5973 57.7167 9.61166 56.99 8.88496C56.2633 8.15826 55.2777 7.75 54.25 7.75ZM34.875 54.25H27.125V46.5H34.875V54.25ZM54.25 42.625H7.75V11.625H54.25V42.625Z" fill="white"/>
      </svg>
                    Banner Advertisement<Button color='purple' size='lg' className='bg-gradient-to-br from-purple-500 to-purple-800 text-xl' onClick={() => {setBannerVisibility(curr => !curr);}}>Buy</Button></div>
                  <div className='row-span-2 col-span-2 flex justify-between py-8 px-5 w-auto rounded-3xl bg-[#191919]  text-center md:text-4xl place-items-center'><BiCubeAlt className='w-12 h-12 md:h-24 md:w-24 md:col-span-1 text'></BiCubeAlt>Product Advertisement<Button color='purple' size='lg' className='relative left-2 bg-gradient-to-br from-purple-500 to-purple-800 text-xl'  >Buy</Button></div>
                  <div className='md:row-span-4 col-span-2  justify-between py-8 px-5 w-full rounded-3xl bg-[#191919] h-min text-center text-xl md:text-4xl place-items-center flex flex-col space-y-4'><BiGlobeAlt className=' h-48 my-5 w-full place-self-center'></BiGlobeAlt>Sky Advertisement<Button color='purple' size='lg' className='bg-gradient-to-br from-purple-500 to-purple-800 text-xl' onClick={() => {setSkyVisibility(curr => !curr);}}>Buy</Button></div>
              </div>
              <div className=' w-[92%] mt-4 justify-between py-8 px-5 place-self-center rounded-3xl bg-[#191919] text-center text-4xl place-items-center'><BiPyramid className='h-24 w-full'></BiPyramid>Start Futuring</div>
              </div>
            </div>
            <div id="accsettings" className='relative h-screen'><h2 className='absolute top-[20%] left-0 md:left-14 text-3xl md:text-5xl font-bold'>Account Settings</h2>
            
            <div className='absolute p-5 gap-10 top-[28%] bg-paffbg left-0 max-h-[75%] overflow-x-hidden overflow-hidden h-[75%] w-full rounded-l-3xl'>
              <form className='relative flex flex-col space-y-7 top-5 scale-110 md:left-16' encType='multipart/form-data'>
                <div className='flex flex-row space-x-6 pl-5 place-items-center'>
              <Avatar
                variant="circular"
                size="xxl"
                alt="UserLogo"
                className={`cursor-pointer mt-5 h-24 w-24 place-self-center aspect-square`}
                src={session?.user?.image || '/img/pp_comp.webp'}
              />
              <Input type="file" color="purple" className='border-2 !h-[46px]' onChange={(e) => handleFileUpload(e)} style={{ backgroundColor: 'transparent' }} label='Change profile picture' crossOrigin={undefined}></Input>
              </div>
              <Input label='Change Nickname' color="purple" className='border-2 border-white' style={{ backgroundColor: 'transparent', }} onChange={(e) => { setUsername(e.target.value); console.log(e.target.value) } } crossOrigin={undefined}></Input>
              {provider && <Input label='Change Email*' color="purple" className='border-2 border-white' style={{ backgroundColor: 'transparent' }} onChange={(e) => setUseremail(e.target.value)} crossOrigin={undefined}></Input>}
              
              <Button type='button' onClick={() => updateUser()} color='purple' className='w-max self-center'> Save </Button>
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